---
path: "/blog/one-step-at-a-time"
date: "2018-06-07"
title: "One Step at a Time"
tags: ["cpat"]
---

*There's something to be learned in walking before you attempt tearing through a marathon of code.* Bad memories of exhaustion aside, I have progress to present again.

:D

## React?

CPAT is currently being implemented with React.

- It's "nice enough" for my needs at the moment.
- It seems wise to learn it, and well...this is a great opportunity to do so.

Notice, I *did not* say, "will be implemented". Javascript is simply too fragmented for me to say I'll stick to any specific framework. I'll keep using what works.

<hr />

My biggest problem so far has been myself. My ideas for this project take it into being something  huge. Here's the hard work that often stumps me: relishing in those ideas; writing them down; and reigning the scope back into actionable items. Items that are actionable and reasonable for working in the evenings. ***That*** is tough.

Honestly, sometimes it's more of an exercise in project management/planning than writing code or solving some highly technical problem. The valuable lesson here, is even though that doesn't produce sexy Github profiles it's just as valuable of a skill to be learned. See my note up there about *not* tearing through a marathon?

<hr />

## Parsing and storing nmap data
For now, here's the major part of the progress: [https://github.com/meddlin/CPAT/commit/acb6a39f17b620532870ef5948df4099b9515e24](https://github.com/meddlin/CPAT/commit/acb6a39f17b620532870ef5948df4099b9515e24)

It's messy, but this is a work-in-progress series of updates anyway. Below is a pseudo-code version of the meat and potatoes of what is going on.

```js
let xml = `<nmaprun ...>"lots of data"</nmaprun>`;
let test = xmljs.xml2json(xml); // parse with xmljs

jsonData = JSON.parse(test); // convert to object
let addrInfo = resource.elements[3].elements[3].elements[1].attributes; // find stuff, specifically an IP address

/* in another file */
YourCollection.insert(addrInfo);
```

## Next Step

Honestly, a fair amount of research. I could begin pulling out more interesting bits of the nmap reports, but that is trivial. I'll more than likely delegate that action to an open-source nmap parser executed on the server anyway.

The real interesting piece is what to relate the nmap data to. I'm interested to see if there is any perceived link between the data "social reconnaissance" tools like [metagoofil](http://www.edge-security.com/metagoofil.php) or [FOCA](http://lifeofpentester.blogspot.com/2014/11/foca-metadata-analysis-tool.html) produce, and a possible nmap scan. Some other source may be necessary to produce a link in the datasets, or there might not be anything useful at all.

That's half of what is driving this project though; once you get this data, what use is it? The other half is learning how to use all of this stuff.