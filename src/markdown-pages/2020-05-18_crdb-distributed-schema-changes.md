---
path: "/blog/cockroachdb-distributed-schema-changes"
date: "2020-05-18"
title: "Cockroach DB Distributed Schema Changes"
tags: ["cpat"]
---

I threw this on [Twitter](https://twitter.com/meddlin_dev/status/1259240663666896898) pretty quickly when it happened. Now that I've sat on it for a little bit I think it deserves a longer post here.

https://twitter.com/meddlin_dev/status/1259240663666896898?ref_src=twsrc%5Etfw

<hr />

_tl;dr_

Schema changes in Cockroach DB are distributed by design--_the same as the data._ This is inherently difficult to maintain. Changes are garbage collected based on a TTL-basis, not exactly like a transaction. Inconsistent relation names hang around the DB until this GC-TTL completes. After which, everything returns to normal. I dropped a table; had to abandon the CLI session; then had to wait for garbage collection before I could create a new table with the same name.

<hr />

## What Happened?

While working in a SQL CLI instance to make a schema change to a local CRDB database, I issued `drop table location;` and the CLI locked up. Or it appeared to.

Easy enough, I had left it open for a few days anyway. `Ctrl+C`, re-open, and move on with life, right?

Not quite.

Something happened between issuing the `DROP` command, and exiting the "presumed"-stuck CLI, causing the table to not completely drop. So, when followed up with `create table location (...)` the CRDB threw an error because "relations" of a table by the same name already existed. _And we surely can't have two tables of the same name, right?!_ Leading me to the strange error in the screenshot above. A quick (and bewildered) Google search later led me to an interesting edge-case of distributed database design I had never considered.

### `DROP` isn't transactional

As referenced here, [on the Cockroach Labs forum](https://forum.cockroachlabs.com/t/schema-inconsistency/500), someone else found themselves in a similar situation where these weird "relations" were hanging around in memory even though the supposed table was gone.

Then, [u/vivek](https://forum.cockroachlabs.com/u/vivek) explains:

> I’m curious if you were eventually able to drop the database? Cockroachdb doesn’t support transactional drop of a table, because it’s designed to cache table descriptors on all nodes. However we recently added the capability to allow the table name to be released quickly, and that is in the latest beta.

Things still were about as clear as mud, but this jumped out: "...doesn't support transactional drop of a table, because it's designed to cache table descriptors on all nodes." Interesting. So, how do we get rid of messy data that _exists but doesn't_?

### More Investigating

The forum discussion linked above is relatively old at the time of writing this post (~3 years ago), and the issue was later fixed in [this Github commit](https://github.com/cockroachdb/cockroach/commit/bff307a7dc25082b8d37ab1028ef0b0bfdd7b4c6). This was enough to explain there were things happening in CRDB between `DROP` and data being deleted that I wasn't aware of, but why were we talking about garbage collection?

While that's certainly nice this fix is in place, it's still unclear what is happening.

> 
```
This change fixes two problems with descriptor name reuse
when a session ends after committing a schema change but before
executing it. The asynchronous execution of schema changes had
two bugs.

1. The table data GC delay was being incorrectly applied to
VIEW and SEQUENCE types.
2. A table that was dropped was put on the delayed deletion
queue without first checking if its name had been GC-ed.

Release note (sql change): Fix problem with VIEW/TABLE name not
being recycled quickly after DROP VIEW/TABLE.
```

### An Explanation

Also from that forum post, a [linked blog article](https://www.cockroachlabs.com/blog/how-online-schema-changes-are-possible-in-cockroachdb/) paints a clearer picture of what is going on and why commands like `DROP`  _**can't**_ be completely transactional in CRDB.

Keep in mind, CRDB is all about _distributed data_ and strives to remain performant across large data sets. So...how do you support schema changes _without any downtime_ and while supporting _distributed nodes_?

It clicked when I read this concise reasoning for the design choice, from a [Cockroach Labs blog post](https://www.cockroachlabs.com/blog/how-online-schema-changes-are-possible-in-cockroachdb/).

> Our solution for maintaining a consistent distributed schema cache and consistent table data embraces the concurrent use of multiple versions of the schema, allowing the rollout of a new schema while the older version is still in use. It backfills (or deletes) the underlying table data without holding locks. This solution is derived from the work done by the F1 team at Google.

The [rest of that blog post](https://www.cockroachlabs.com/blog/how-online-schema-changes-are-possible-in-cockroachdb/) explains more in depth what's happening; I won't repeat that same detail here. Drawing a couple diagrams did help me understand it though, so I'll cover that.

### An Example

This isn't meant to cover what actually happens inside of Cockroach DB, but only a rough idea of what has been described above.

Let's say we have:

- A 3-node CRDB cluster with _"some tables/schema"_.
- We issue a simple `DROP TABLE` command.

<img src="https://meddlin-web.s3.us-east-2.amazonaws.com/2020-05-11_post_crdb-distributed-schema/schema-01.png" />

- Let's say, in this hypothetical node 1, we could see the incoming operations.
- Because the nodes are distributed, those operations haven't been propagated to the other nodes yet.

<img src="https://meddlin-web.s3.us-east-2.amazonaws.com/2020-05-11_post_crdb-distributed-schema/schema-02.png" />

- Keep in mind, schema is also distributed across the nodes: "...a consistent distributed schema cache" ([quoted here](https://www.cockroachlabs.com/blog/how-online-schema-changes-are-possible-in-cockroachdb/))
- So, our operations are coming in, but the schema cache has not yet changed on any node.

<img src="https://meddlin-web.s3.us-east-2.amazonaws.com/2020-05-11_post_crdb-distributed-schema/schema-03.png" />

- Now the `DROP` command has executed, so node 1 has dropped the table.
- However, the distributed schema cache _hasn't propagated to the other nodes yet._
- So, this is the point we must wait for the garbage collecting TTL to wipe away any unused "relations". _Hence the issue that kicked off this whole post._

<img src="https://meddlin-web.s3.us-east-2.amazonaws.com/2020-05-11_post_crdb-distributed-schema/schema-04.png" />

## "Waiting for the garbage collector"

By the time I had ran around reading all of these posts/articles it was clear. Enough time had passed (I never stopped the DB, only the SQL CLI) the garbage collection TTL likely had timed out and "collected" my leftover table "relations". 

Issued my `CREATE TABLE(...)` command--_done! No error._

..._**It was fixed**_. All we had to do was wait for that GC-TTL to take care of it.

Admittedly, this is a lot of explanation for a final answer of "wait for garbage collection". However, it was also a clear departure away from how we normally think about databases. And that's what I wanted to show, how operating in a distributed nature has side-effects affecting things all the way to the simplest commands we might take for granted.

## Further Reading

- Forum post: https://forum.cockroachlabs.com/t/schema-inconsistency/500
- GH commit showing it was resolved: https://github.com/cockroachdb/cockroach/commit/bff307a7dc25082b8d37ab1028ef0b0bfdd7b4c6
- Configure replication docs: https://www.cockroachlabs.com/docs/stable/configure-replication-zones.html
- CRDB blog about how online schema changes are rolled out: https://www.cockroachlabs.com/blog/how-online-schema-changes-are-possible-in-cockroachdb/
- (Google Research) Online, Asynchronous Schema Changes in F1: [https://research.google/pubs/pub41376/](https://research.google/pubs/pub41376/)