---
path: "/blog/my-first-post"
date: "2019-05-04"
title: "My first blog post"
tags: ["test-tag", "first", "software"]
---

Some content down here.

It's nice.

Check out this code.

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]
```