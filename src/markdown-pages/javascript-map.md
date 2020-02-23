---
path: "/blog/javascript-has-a-new-map"
date: "2018-04-20"
title: "JavaScrpt has a New Map()"
tags: ["software"]
---

> _If you'd like to skip all of this you can jump straight to the code._
>
> [https://github.com/meddlin/map-sandbox](https://github.com/meddlin/map-sandbox)

Alright, so jumping right in...I had a dataset that looked a little something like below. There was an array where each item was essentially a date associated to some data.

So... `{ a date, {some-object} }`.

The problem was that some of the dates were duplicated, representing multiple entries for a single day. Basically, I wanted "to group the dataset on the date". This is a trivial problem for SQL, LINQ, or something similar. However, I needed to do this in JavaScript, and didn't have access to underscore.js.

```json
[
	{ date: 2018-03-01, {object} },
	{ date: 2018-03-01, {object} },
	{ date: 2018-03-02, {object} },
	{ date: 2018-03-05, {object} },
	{ date: 2018-03-05, {object} },
	{ date: 2018-03-05, {object} },
	{ date: 2018-03-10, {object} }
]
```

So, we can break down this task into two major steps: 

1) Iterate over the data

2) Check if the date already exists in our result set


_Easy!_

Luckily, the native JavaScript API has a few functions which can accomplish these tasks: `Array.reduce()` and `Map.get()`, `Map.set()`, and `Map.has()`.

_Even easier!_

### 1. Iterating

Cool, so let's jump in!

Setting up a call to `.reduce()` accomplishes the first of our major steps. We are simply iterating over `sampleArr` and returning it back to a new array, `maply`. Notice we're passing two parameters to the iterator function.

```js
sampleArr = [ { date: '2018-03-01', {object} }, ... ]

var maply = sampleArr.reduce( function(acc, curr) {
	/* iterate here...make good decisions!... */
	return acc;
}, new Map());
```

`acc` is our "accumulator" and will hold a reference to the *new data structure we are building*. While `curr` represents a "current value", and is a reference to a single item of the `sampleArr` array. Lastly--**this is key**--we are setting the initial value of `acc` to `new Map()`.

_A full walkthrough of `Array.reduce()` is out of the scope of this article; play around with the [examples in the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) for a refresher if you need to._

### 2. Making Decisions

Watch that second step...it's a doozie. <br />
This time let's start with the code. We will be putting the following block inside of our iterator function.
```
if ( acc.has(curr.date) ) {
	acc.get(curr.date).push(curr);
} else {
	acc.set(curr.date, [curr]);
}
```

_Check out the [docs for the new Map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)._


Alright, let's get a grip on `Map.has()` real quick. <br />
We pass the function a "key", and a boolean is returned based on if that key exists in the `Map` object. *Simple.*

So here we are using `acc.has()` to determine if our Map already has an entry for a specific date. *Hint: This is the **key decision** which "reduces" our duplicate dates in the original array.*

Alright, so `acc.get()` and `acc.set()`. <br />
If `acc.has(curr.date) == true`, then we use `acc.get(curr.date)` to get the key-value store, in our Map, for that date. Since the 'value' to our 'key-value' store is an array we simply push our current value to the array *at the key-value store for that date*.

*"Else"*, `acc.has(curr.date) == false`, then this means we currently *do not* have a 'key' in our map for the current date. So, `acc.set(curr.date, [curr])` sets up a new key-value pair in our Map--where `curr.date` is the 'key' and the 'value' is a new array holding a single object. This *'object'*--`curr`--is the current item in our original array, `sampleArr`.

Alright, that's quite a bit so let's take a look at it all together.

```js
var maply = sampleArr.reduce(function(acc, curr) { // iterate over the array
	
    if ( acc.has(curr.date) ) { // check if current date exists
		acc.get(curr.date).push(curr); // 'push' object onto key-value store for date
	} else {
		acc.set(curr.date, [curr]); // create new key-value for the date and object
	}

	return acc;

}, new Map());
```

The data structure we're left with after reducing the array should very closely resemble this.

```js
maply = {
	{
		date: 2018-03-01, [ {id: 1, date: 2018-03-01}, {id: 2, date: 2018-03-01} ]
	},
	{
		date: 2018-03-02, [ {id: 3, date: 2018-03-02} ]
	},
	{
		date: 2018-03-05, [ {id: 4, date: 2018-03-05} ]
	},
	{
		date: 2018-03-10, [ 
				{id: 5, date: 2018-03-10}, 
				{id: 6, date: 2018-03-10}, 
				{id: 7, date: 2018-03-10} ]
	}
}
```