/*jshint esversion: 6 */
let canvas = document.getElementById("blobCanvas"),
  canvasParent = canvas.parentNode,
  ctx = null,
  currentTime = 0,
  width = canvas.width,
  height = canvas.height,
  [r, g, b] = [1, 1, 1],
  blobs = [];

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

const options = {
  numOfBlobs: 25,
  distConstant: 1,
  blobEdgeRange: 255,
  redTransitionDecrement: 0.04,
  greenTransitionDecrement: 0.04,
  blueTransitionDecrement: 0.00,
};

window.onload = function init() {
  if (typeof canvas.getContext !== undefined) {
    ctx = canvas.getContext("2d");
    addBlobs(options.numOfBlobs);
    mainLoop();
    GUI();
  }
};

function mainLoop() {
  render();
  window.requestAnimationFrame(mainLoop);
}

function GUI() {
  var gui = new dat.GUI();
  gui.add(options, "numOfBlobs", 1).step(1).onChange(value => addOrRemoveBlobs(value));
  gui.add(options, "distConstant");
  gui.add(options, "blobEdgeRange");
  gui.add(options, "redTransitionDecrement").onChange(value => reAdjustBlobColorGradients(value));
  gui.add(options, "greenTransitionDecrement").onChange(value => reAdjustBlobColorGradients(value));
  gui.add(options, "blueTransitionDecrement").onChange(value => reAdjustBlobColorGradients(value));
  canvasParent.appendChild(gui.domElement);
}

function render() {
  currentTime = performance.now();
  let lastClosestBlob = blobs[0];

  moveBlobs();

  let frame = getNewFrameData();
  ctx.putImageData(frame, 0, 0);
  

  function getNewFrameData() {
    let frame = ctx.getImageData(0, 0, width, height);
    // Offset is used to grab data from the Imagedata frame
    let offset = 0;
    for (x = 0; x < width; x++) {
      for (y = 0; y < height; y++) {
        const OnOrOff = isPixelIsOnOrOff(x, y);
        // Set Image data
        frame.data[offset++] = OnOrOff * lastClosestBlob.color[0]; // R
        frame.data[offset++] = OnOrOff * lastClosestBlob.color[1]; // G
        frame.data[offset++] = OnOrOff * lastClosestBlob.color[2]; // B
        frame.data[offset++] = 0xff; // A
      }
    }
    return frame;
  }

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

  function closestBlobToPixel(firstBlob, secondBlob) {
    if (firstBlob.lastCalculatedDistance < secondBlob.lastCalculatedDistance) {
      return firstBlob;
    } else {
      return secondBlob;
    }
  }

  function moveBlobs() {
    for (const blob of blobs) {
      blob.x = ((Math.cos((currentTime / 1000) * blob.speed * blob.randoX) * width) / 2 + width / 2);
      blob.y = ((Math.sin((currentTime / 1000) * blob.speed * blob.randoY) * height) / 2 + height / 2);
    }
  }
}

function addOrRemoveBlobs(count) {
  if (count < blobs.length) {
    removeBlobs(count);
  } else if (count > blobs.length) {
    addBlobs(count);
  }
}

function removeBlobs(count) {
  let numOfBlobsToRemove = blobs.length - count;
  for (let i = 0; i < numOfBlobsToRemove; i++) {
    blobs.pop();
  }
  reAdjustBlobColorGradients();
}

function addBlobs(count) {
  let numOfBlobsToAdd = count - blobs.length;
  for (let i = 0; i < numOfBlobsToAdd; i++) {
    const randomSpeed = 1 - 2 * Math.random();
    blobs.push(new metablob(0, 0, randomSpeed, [Math.random(), Math.random(), Math.random()]));
  }
  reAdjustBlobColorGradients();
}

function reAdjustBlobColorGradients(value) {
  [r, g, b] = [1, 1, 1];
  for (const blob of blobs) {
    blob.color = [r, g, b];
    r -= options.redTransitionDecrement;
    g -= options.greenTransitionDecrement;
    b -= options.blueTransitionDecrement;
  }
}