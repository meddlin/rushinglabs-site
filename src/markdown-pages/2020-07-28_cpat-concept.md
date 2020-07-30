---
path: "/blog/cpat-concept-complete"
date: "2020-07-28"
title: "CPAT Concept is Proven"
tags: ["cpat"]
---

# It works! ...well, sorta

_This is gonna be a long one..._

I've been working on my CPAT project for a while now. I felt like I needed to get it to a precipice where the idea was either proven, or it all fell apart.

The [last real progress for this project](https://rushinglabs.com/blog/one-step-at-a-time) I shared was from 2018, and covered how the project was moving to React. While true, several more developments have taken place since then. 

## Recap: What are we trying to accomplish?

_In short: a real-time, collaborative, decentralized application for network pentesting engagements._

Way back in 2014, while working with a friend in college, we wanted to know if it was possible to build data aggregation for OSINT tools. This was fueled by seeing real-time data moving in [Meteor.js](https://www.meteor.com/#!). This project went on to get us through our senior capstone class, and even spark a [research paper](https://ieeexplore.ieee.org/document/7119262). _Fun stuff._

Before any of those motions, it was the [LAIR project from DEFCON 21](https://www.youtube.com/watch?v=71Hix58keCU) that got me thinking about the possibilities of mixing network penetration testing and collaborative, real-time web applications. LAIR was a project sponsored by FishNet Security (_now they're [Optiv](https://www.optiv.com/#)?_), and based on their [slide notes](https://defcon.org/images/defcon-21/dc-21-presentations/Steele-Kottman/DEFCON-21-Steele-Kottman-Collaborative-Penetration-Testing-With-Lair.pdf) it appears they were interested in a few of these hypothetical benefits too:

> "Simplifies real-time synchronization of information across multiple, distributed clients"
> - Reduces duplication of effort: Workflow, Status tracking
> - Enhances information sharing: Credentials/hashes found, Manually identified vulnerabilities, Successful exploitation, False positives, Screenshots
> - Team Instant Messaging

<iframe width="560" height="315" src="https://www.youtube.com/embed/71Hix58keCU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

I liked LAIR being real-time and collaborative, but I wanted to see if I could introduce a new feature: _data decentralization--ideally geographically decentralized._

_At the time, I didn't realize how far ahead of my own capabilities I was by seeking these three features, together._

## Recap: New Tech Stack

For a while I tried to recreate this project on my own with Meteor.js, but I quickly ran into scalability concerns and complexity issues. I quickly learned one of the key issues with Meteor.js was its app server. You could load balance (somewhat) across the front-ends, and setup MongoDB clusters and Redis caches--_**but there ultimately needed to be a Meteor instance to tie the reactivity together.**_

So, this led me to redesign the project properly introducing micro-services. Yes, it laid the ground work for scaling later on, but gave me an out to upgrade any "piece" of the project if technologies were moving faster than I could develop. So, I decided on a new stack:

- Web application
    - [React.js](https://reactjs.org/)
    - [Redux](https://redux.js.org/)
    - [Evergreen](https://evergreen.segment.com/) for UI
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

_...and orchestrated with Docker for the time being._

<hr />

The concept of CPAT has been proven to have an acceptable level of plausibility and technical function. Yes, the last release was titled "leaving the concept phase" or whatever, but...now we can talk about it.

The main _features of design_ (characteristics?) we were shooting for were:

- Collaborative
- Real-time
- Decentralized data (_or possibility of it_)
- Service-oriented
- Full-text search
- Manageable on consumer hardware

## Future Improvements, Current Drawbacks

A brief overview of the more immediate hurdles in front of the next things to be done.

###  Collaborative

Currently, the UI doesn't look too collaborative. _However_, it is possible to open the application in two  separate browser instances (i.e. one "normal", one incognito mode) and create data at the same time. This shows a primitive level of "collaboration", if we're stretching the word.

What's needed?

- Support for separate users
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

This is theoretically proven through seeing how others have operated CockroachDB and MongoDB at varying levels of decentralization. See the note on _funding for CRDB_ below for why CPAT opted for MongoDB over CRDB. _This feature is key to demonstrating whether it's possible to have a truly cloud-agnostic deployment one day._ Unfortunately, it also stands as the most difficult to develop/test independently--so, we must mostly rely on the stories from others' adventures.

What's needed?

- Engineering effort/time into testing a 3, 5, and 7-node MongoDB deployment.
- Determine how to operate a globally distributed rollout of MongoDB. If it can't be done, document it.
- *Funding for CockroachDB

### Service-oriented

To even attempt this project in a monolithic fashion is a non-starter. The desires of the project are micro-service oriented just by nature...and  it works.

What's needed?

- A sane way to enabled HTTPS across all services.
- Revisit the various data models used as data is communicated across each service.

### Full-text Search

This is probably the most important feature of the entire application. It's where the reporting data/queries will come from, and it's an entry point into natural language processing (NLP) and other AI/ML enhancements. _A lot of stuff is left to uncover here._

What's needed?

- Data denormalization
- Fixing the ElasticSearch sink connectors bringing in data from Kafka
- An indexing strategy: one global index, and consider other indexes for specific data types
- Testing with a 3, 5, 7-node setup

### Manageable on consumer hardware

The most important statement I wanted to make with this project was for what's possible on consumer hardware now, with a little bit of engineering. Development started on a 2011 Mac mini (when the project was on Meteor.js), and is now on a more modern, powerful machine but still very "consumer". Currently, it's being developed with a Ryzen 7 3800X, 32GB of RAM, and "enough" SSD storage space. It's not cheap or "entry-level", but still very much approachable for many developers. 

What's needed?

- _Nothing really._
- Pin down minimum hardware requirements? (Probably quad-core CPU, 8-16GB RAM)


**Special Notes**

*Funding for CockroachDB--CRDB is prohibitively expensive for where this project currently stands. At ~$1800/CPU core/yr for on-premise, or ~$85/mo for a SaaS-based cloud offering...the personal funding simply doesn't stand currently. To add to this, the only feature needed is CDC; the rest of the open-source version of the database works just fine. So, shy of production needs, the project will be sticking with some other type of database technology (i.e. Mongo + Elastic)