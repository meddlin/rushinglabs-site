---
path: "/blog/cpat-concept-complete"
date: "2020-07-28"
title: "CPAT Concept is Proven"
tags: ["cpat"]
---

_It works! ...well, sorta_

I've been working on my CPAT project for a while now. Quite honestly, I've grown tired of looking at ideas instead of code. So, I felt I needed to push for the inflection point where it was either proven, or failed in spectacular over-ambition.

The [last real progress for this project](https://rushinglabs.com/blog/one-step-at-a-time) I shared was from 2018, and mentioend the project was moving to React. While yes, I did finally make the move to React, I also completely redesigned the system.

## Recap: What are we trying to accomplish?

_In short, it's a real-time, collaborative, decentralized application for network pentesting engagements._

Way back in 2014, while working with a friend in college, we wanted to know if it was possible to build data aggregation for OSINT tools. This was fueled by seeing real-time data moving in [Meteor.js](https://www.meteor.com/#!). This project went on to get us through our senior capstone class, and even spark a [research paper](https://ieeexplore.ieee.org/document/7119262). _Fun stuff._

Before any of those motions, it was the [LAIR project from DEFCON 21](https://www.youtube.com/watch?v=71Hix58keCU) that got me thinking about the possibilities of mixing network penetration testing and collaborative, real-time web applications. LAIR was a project sponsored by FishNet Security (_now they're [Optiv](https://www.optiv.com/#)?_), and based on their [slide notes](https://defcon.org/images/defcon-21/dc-21-presentations/Steele-Kottman/DEFCON-21-Steele-Kottman-Collaborative-Penetration-Testing-With-Lair.pdf) it appears they were interested in a few of these hypothetical benefits too:

> "Simplifies real-time synchronization of information across multiple, distributed clients"
> - Reduces duplication of effort: Workflow, Status tracking
> - Enhances information sharing: Credentials/hashes found, Manually identified vulnerabilities, Successful exploitation, False positives, Screenshots
> - Team Instant Messaging

<iframe width="560" height="315" src="https://www.youtube.com/embed/71Hix58keCU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I liked LAIR being real-time and collaborative, but I wanted to see if I could introduce a new feature: _data decentralization--ideally geographically decentralized._

_At the time, I didn't realize how far above my head I was by shooting for all of that together. I still don't, but I didn't then either._ ¯\\_(ツ)_/¯

<hr />

## New Tech Stack

For a while I tried to recreate this project with Meteor.js, but I quickly ran into scalability concerns and complexity issues. Meteor scales relatively well for certain application designs, but I was seeking something truly decentralized. Meteor's app server design runs pretty counter to that.

So, I needed to abandon Meteor.js, and choose something else--leading to micro-services. Using a service-oriented architecture did lay the ground work for scaling later on, but it also gave me a means to upgrade any "piece" of the project if technologies were moving faster than I could develop. So, I decided on a new stack:

- Web application
    - [React.js](https://reactjs.org/)
    - [Redux](https://redux.js.org/)
    - [Evergreen](https://evergreen.segment.com/) for UI
    - [Formik](https://formik.org/)
    - _and lots of dependencies_
- Core API
    - [.NET Core](https://docs.microsoft.com/en-us/dotnet/core/about)
    - [SignalR](https://docs.microsoft.com/en-us/aspnet/core/signalr/introduction?view=aspnetcore-3.1)
    - [NPoco](https://github.com/schotime/NPoco)
    - [MongoDB](https://www.mongodb.com/), [CockroachDB](https://www.cockroachlabs.com/) (_more on this later_)
- OSINT tooling API
    - Python, [Flask](https://pypi.org/project/Flask/)
    - [nmap](https://nmap.org/), [metagoofil](https://tools.kali.org/information-gathering/metagoofil), etc. _as needed_
- Data streaming
    - [Apache Kafka](https://kafka.apache.org/), [ksql](https://www.confluent.io/blog/ksql-streaming-sql-for-apache-kafka/)
- Search
    - [ElasticSearch](https://www.elastic.co/)

_...and it's orchestrated with Docker for the time being._

## Moving Data through the Pipeline

Taking a step back, this "real-time, collaborative, decentralized application" for pentesting, is a _streaming ETL pipeline at its core_. Since I've never built one of these before, that means I needed to prove the core features could actually work--at least in theory--before moving onto the more sensible software design chores. _Especially that data decentralization one._

- Real-time: Websockets connection between React and .NET Core via SignalR
- Collaborative: data from one user's actions automatically propagated to another user's available data (_this is complicated_)
- Decentralized: no single "node" of the system is a complete point of failure (_this is more complicated_)
- Service-oriented
- Full-text search
- Manageable on consumer hardware

This diagram is a rough idea of the architecture.

<img src="https://meddlin-web.s3.us-east-2.amazonaws.com/2020-08-04_post_cpat-concept/2020-08-04+23_10_42-Window.png" />

**cpat-client**

_Tooling: React.js front-end_

It connects to `cpat-core` via Websockets and basic REST calls. It also sends REST calls to `osint-api` when a script kickoff is requested. Currently using Redux for the REST data, but I have a kludgy implementation for the Websockets communication. At this point it's good just to have things working. Relatively speaking, once I figured out how to make a Websocket connection on-demand and on page load...this was the easy part.

**cpat-core**

_Tooling: C#, .NET Core API, NPoco_

This is the main "business logic" for CPAT. Even though, Kafka is enabling the stream processing, which is much heavier lifting than `cpat-core`, this central API is commanding the data. `cpat-core` sets the tone for how data should be treated across the whole system.

Any new data entered manually from `cpat-client` is funnelled through here to MongoDB. `cpat-client` relies on `cpat-core` for Websocket connections, too. The idea being that with Websockets the networking foundations exist for live data to be piped back to the web client regardless if it comes from another user manually entering/uploading data, or some automated script in `osint-api` uploading results.

Notice `cpat-client` has a connection to `osint-api`, and then onto `cpat-core`. The Python `osint-api` sends job metadata to `cpat-core` when `cpat-client` request a script be kicked off. So `cpat-core` is storing and retrieving job analytics as well.

On the backend, `cpat-core` also has ORM logic to communicate with MongoDB provided via NPoco. This is pretty standard-faire; just wanted to mention it as its another concern funneling data to the data storage.

**OSINT API**

_Tooling: Python, Flask, various OSINT tools_

Any script or tool set to be automated via the `cpat-client` is "hosted" or configured here. I'm using the Flask framework to build the REST API quickly, and this should be considered highly-experimental. There is a whole slew of security concerns opening up automation tools that run within a CLI. Plenty of logistical issues too. Each tool (for now only `nmap`) is kicked off in a new process with `Popen`. This means ferrying data is primarily done by managing `STDIN`, `STDOUT`, and `STDERR`. Not to mention, OSINT tools are scanning across the public internet, and any files dumped from such a tool would also need to be managed. 

_We can just call this a minefield._

Providing OSINT tools behind a REST API also opens a big question for extensibility. While the theoretical capability of kicking off a few dozen long-running scan tools, asynchronously uploading their results, and watching CPAT re-analyze as the dataset grows larger is enticing...it would be difficult to dynamically add more tooling behind the API. Especially since the tools are tightly coupled to their CLI implementation, require unique automation parameters, and are sending back schema-less data.

Needless to say this is a piece of CPAT I wanted to integrate for testing and "concept" purposes, but for now I'm not keen on deploying this anywhere. This type of tooling can be integrated in other ways.

**MongoDB and a note on CockroachDB**

MongoDB is currently in the architecture diagrams--it's all pretty standard here. Except...

> Long story short, CPAT's current design heavily relies (relied?) on CockroachDB to provide native data decentralization. CockroachDB is marketed as a "resilient geo-distributed SQL database". Impressive. And to be direct, an appropriate price follows those features. Yes, the core product is [freely available](https://www.cockroachlabs.com/get-started-cockroachdb/?utm_expid=.k5d4bN3bS82Lb-CYzJK9_g.1&utm_referrer=https%3A%2F%2Fwww.cockroachlabs.com%2F) and [open-source](https://github.com/cockroachdb/cockroach), however the [CDC feature](https://www.cockroachlabs.com/docs/stable/change-data-capture.html) is limited to paid offerings. This isn't to paint CRDB or CockroachLabs in a poor light--_their product is worth every penny_. Unfortunately though, until I can provide enough funding CPAT will have to get by with whatever solution can be built with other database systems.
>
> See: `EXPERIMENTAL CHANGEFEED` vs. `CREATE CHANGEFEED`) [https://www.cockroachlabs.com/docs/stable/change-data-capture.html#configure-a-changefeed-enterprise](https://www.cockroachlabs.com/docs/stable/change-data-capture.html#configure-a-changefeed-enterprise)

After that discovery, the switch was made to MongoDB. It's not a perfect replacement (_honestly, not sure if any other DB offers what CRDB does_), but it will suffice while CPAT is in an alpha/proof-of-concept stage.

The keen-eyed will notice this was a switch from a SQL-compliant RDBMS to a NoSQL, document-based database. Coming from Meteor.js initially, MongoDB was actually my first choice just to keep things simple and continue using what I had before. Considering the schema-less nature of the unfiltered OSINT data I would be capturing, all of this seemed to be working naturally anyway. So, I actually had to design around CRDB's relational structure; moving to back to MongoDB removed some of this. 

The specifics of the schema changes and some of CRDB's other intricacies are outside the scope of this post, but that is all to say _real-time data_ and _decentralization_ are completely _**possible**_ just expensive.

**Kafka and ElasticSearch**

These pieces have given me the most grief. Kafka, ksql-db, and the possibilities for manipulating data in a streaming pipeline are completely new to me. Further, while I've worked with ElasticSearch before, I didn't realize until putting the final pieces together that I hadn't stopped to consider some real data denormalization concerns for what I was planning on indexing into Elastic.

_Humbling._

For now, it works enough for me to call it a success. Much of Kafka and ksql remain a black box to me, but after somehow setting up a rudimentary implementation of it all...I _was_ able to push data from `cpat-core` to Mongo to Kafka and onto Elastic. This meant:

- Received real-time data flow for ingesting into Mongo _and showing up on separate `cpat-client` instances_
- Automatic pushing to Elastic for search capabilities

> _A note on analytics._
>
> The next step here is to integrate more of the ELK stack for analytics. Another win for setting up the backend in Docker containers this early in the project was to enable quick access to [Kibana](https://www.elastic.co/kibana) and the [Elastic Observability products](https://www.elastic.co/observability). It's possible to experiment with [Elastic SIEM](https://www.elastic.co/security) from here too--unsure if that fits the intention of CPAT though.

**Architecture**

So, in theory, the "full" architecture should resemble something like the following when deployed. Consider this diagram a very _"hand-wavy idea"_ though. I hope it's an accurate representation of how data flows through clustered instances of MongoDB, Kafka, and ElasticSearch, but for now I'll admit there's much for me to learn on those systems.

<img src="https://meddlin-web.s3.us-east-2.amazonaws.com/2020-08-04_post_cpat-concept/2020-08-04+23_58_08-containerized-arch.png" />

> _A note on early scalability_
> 
> _Normally, I wouldn't front-load a project with so much effort for scalability. However, that aspect was central to the original idea that inspired me to try this at all. Without horizontal scaling and some semblance towards decentralization, the project could've stayed on Meteor.js or just reverted to being a CRUD/ETL workflow focused on network pentesting. All of which is fine just not as fun._

<hr />

## Future Improvements

### Collaboration

Currently, the UI is basically nonexistent. _However_, it is possible to open the application in two separate browser instances (i.e. one "normal", one incognito mode) and create data at the same time. This shows a primitive level of "collaboration", if we're stretching the word.

What's needed?

- Support for separate users (i.e. separate data to separate users)
- Associate data created to specific users
- JWT support and some basic security _kind of_ follows naturally from allowing user accounts.

### Real-time

The first major design issue. _It almost killed the thing, and quite frankly still might._

What's needed?

- An understanding of a Kafka stack (Apache _**or**_ Confluent based)
- Solve the failing ElasticSearch sink connectors
- Figure out how to provide data transformations, aggregations via `ksql`
- *Funding for CockroachDB

### Decentralized data

This is theoretically proven through seeing how others have operated CockroachDB and MongoDB at varying levels of decentralization. See the note on _funding for CRDB_ below for why I opted for MongoDB over CRDB. _This feature is key to demonstrating whether it's possible to have a truly cloud-agnostic deployment one day._ Unfortunately, it also stands as the most difficult to develop/test independently--so, we must mostly rely on the stories from others' adventures.

What's needed?

- Engineering effort/time into testing a 3, 5, and 7-node MongoDB deployment.
- Determine how to operate a globally distributed rollout of MongoDB. If it can't be done, document it.
- *Funding for CockroachDB

### Service-oriented

To even attempt this project in a monolithic fashion is a non-starter. The desires of the project are micro-service oriented just by nature...and it works.

What's needed?

- A sane way to enable HTTPS across all services.
- Revisit the various data models used as data is communicated across each service.

### Full-text Search

This is probably the most important feature of the entire application. It's where the reporting data/queries will come from, and it's an entry point into natural language processing (NLP) and other AI/ML enhancements. _A lot of stuff is left to uncover here._

What's needed?

- Data denormalization
- Fixing the ElasticSearch sink connectors bringing in data from Kafka
- An indexing strategy: one global index, and consider other indexes for specific data types
- Testing with a 3, 5, 7-node setup

### Manageable on consumer hardware

The most important statement I wanted to make with this project was for what's possible on consumer hardware now, with a little bit of engineering. Development started on a 2011 Mac mini (when the project was on Meteor.js), and is now on a more modern, powerful machine but still very "consumer". Currently, it's being developed with a Ryzen 7 3800X, 32GB of RAM, and "enough" SSD storage space. It's not cheap or "entry-level", but still approachable.

What's needed?

- _Nothing really._
- Pin down minimum hardware requirements? (Probably quad-core CPU, 8-16GB RAM)


**Special Notes**

*Funding for CockroachDB--CRDB is prohibitively expensive for where this project currently stands. At ~$1800/CPU core/yr for on-premise, or ~$85/mo for a SaaS-based cloud offering...the personal funding simply doesn't stand currently. To add to this, the only feature needed is CDC; the rest of the open-source version of the database works just fine. So, shy of production needs, the project will be sticking with some other type of database technology (i.e. Mongo + Elastic)