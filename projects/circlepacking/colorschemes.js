let mode;
let rand;

function randomize() {
  mode = random([0, 1, 2]);
  rand = random(0, 1);
}

function getColor(x, y) {
  switch(mode) {
    case 0: return noiseColor(x, y);
    case 1: return randomBlueGreenColor(x, y);
    case 2: return radiantColor(x, y);
  }
}

function noiseColor(x, y) {
	let n = map(noise(x/200, y/200, rand*7948), 0, 1, -50, 305);
	return [n, n, n];
}

function randomBlueGreenColor(x, y) {
  let r = random(20, 70);
  let g = random(60, 240);
	let b = random(60, 240);
	return [r, g, b];
}

function noiseColor(x, y) {
	let n = map(noise(x/200, y/200, rand*1000), 0, 1, -50, 305);
	return [n, n, n];
}

function radiantColor(x, y) {
  let hu = dist(width/2, height/2, x, y)/dist(0, 0, width/2, height/2);
  return hsvToRgb(hu, 1, 1);
}

function hsvToRgb(h, s, v) {
  var r, g, b;
  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return [r * 255, g * 255, b * 255];
}
