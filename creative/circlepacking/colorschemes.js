let mode;
let rand;

function randomize() {
  mode = random([0, 1, 2, 3]);
  rand = random(0, 1);
}

function getColor(x, y) {
  switch(mode) {
    case 0: return noiseColor(x, y);
    case 1: return randomBlueGreenColor(x, y);
    case 2: return radiantColor(x, y);
    case 3: return pinkColor(x, y);
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

function radiantColor(x, y) {
  let hu = dist(width/2, height/2, x, y)/dist(0, 0, width/2, height/2);
  return hsvToRgb(hu, 1, 1);
}

function pinkColor(x, y) {
  let c1 = random(160, 255);
  let c2 = random(0, 160);
  let c3 = random(0, 160);
  return [max(c1, max(c2, c3)), min(c1, min(c2, c3)), max(min(c1,c2), min(max(c1,c2),c3))];
}

// https://gist.github.com/mjackson/5311256
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
