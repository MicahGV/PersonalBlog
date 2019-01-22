---
title: 'How To: 2D Metaballs'
date: '2019-01-02T00:28:35-06:00'
draft: false
tags:
  - 'Graphics'
  - 'JS'
  - 'Metaballs'
categories:
  - ''
---
- - -

{{<canvas canvasId="blobCanvas" canvasWidth="200" canvasHeight="200" src="js/metablobs.js">}}

- - -
[metablob.js source](https://github.com/MicahGV/PersonalBlog/blob/master/static/js/metablobs.js)

Here's a quick how to make some neat 2D metaballs.

Also, If you don't know what metaballs are they are a neat old graphics technique made by a guy a named Jim Blinn in the 1980s that made organic looking balls smoothly meld into each other. here's the wikipedia [link](https://en.wikipedia.org/wiki/Metaballs) for your convenience.

Lissajous curve

I'll first start off discussing what I believe is generally happening within the code then go into specifics.
If I explain something incorrectly, please leave a comment telling me I am wrong.

So, metaballs is actually pretty simple because, for the most part, it is about just checking if a particular pixel's distances from each ball's center passes a certain threshold. That threshold being based on a few constants.

 Below is the work horse for the whole thing, and I will break down what is happening at each step.
```javascript


  function isPixelIsOnOrOff(pixelX, pixelY) {
    let totalDistance = 1;
    for (const blob of blobs) {
      const xDist = Math.pow(pixelX - blob.x, 2);
      const yDist = Math.pow(pixelY - blob.y, 2);
      blob.lastCalculatedDistance = Math.sqrt(xDist + yDist);
      totalDistance *= blob.lastCalculatedDistance;

      lastClosestBlob = closestBlobToPixel(blob, lastClosestBlob);
    }

    const flooredDistance = Math.floor(
      options.blobEdgeRange - totalDistance / options.distConstant / Math.pow(10, blobs.length * 2)
    );

    const clampedDistance = Math.max(Math.min(flooredDistance, 255), 0);
    // Returns 255 or 0
    return clampedDistance;
  }
```


So, let's start breaking down the code.

First part is where I am setting several global variables to be used.
If you had ever used the [canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) element a few of these will look pretty familiar and a few of the others are self explantory. I will go over the ones that are not as obvious.

* [r,g,b]: is related to how I'm making the blobs gradually shift in color.
* Options: an object that I use with [dat gui](https://github.com/dataarts/dat.gui) to allow some interactivity

```javascript
let canvas = document.getElementById("blobCanvas"),
  canvasParent = canvas.parentNode,
  ctx = null,
  currentTime = 0,
  width = canvas.width,
  height = canvas.height,
  [r, g, b] = [1, 1, 1],
  blobs = [];

const options = {
  numOfBlobs: 25,
  distConstant: 1,
  blobEdgeRange: 255,
  redTransitionDecrement: 0.04,
  greenTransitionDecrement: 0.04,
  blueTransitionDecrement: 0.00,
};
```

Now to give you a brief overview of the metablob class.
```javascript
const metablob = class {
  constructor(x = 0, y = 0, speed = 0, color = [0, 0, 0], randoX = Math.random(), randoY = Math.random()) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.randoX = randoX;
    this.randoY = randoY;
    this.color = color;
    this.lastCalculatedDistance = 0;
  }
};
```
