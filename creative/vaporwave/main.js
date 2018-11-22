var img = null;
var hues = [0.46, 0.61, 0.84, 0.93]

var s = 500;
function setup() {
	var canvas = createCanvas(s, s);
  canvas.parent('canvas-wrapper');
  let context = canvas.elt.getContext('2d');
  context.mozImageSmoothingEnabled = false;
  context.webkitImageSmoothingEnabled = false;
  context.msImageSmoothingEnabled = false;
  context.imageSmoothingEnabled = false;
}

function draw() {
  if(img != null) {
    background(0);
    var w = img.width;
    var h = img.height;
    image(img, 0, 0, s, (s/w)*h);
  }
}

// Image processing

function mousePressed() {
  if(img == null) return;
  if(mouseX < 0 || mouseY < 0 || mouseX >= width || mouseY >= width) return;
  img.loadPixels();
  for(var y = 0; y < img.height; y++) {
    for(var x = 0; x < img.width; x++) {
      var idx = (x + y*img.width) * 4;
      var hsv = rgbToHsv(img.pixels[idx+0], img.pixels[idx+1], img.pixels[idx+2]);
      var minDist = 100;
      var finalIdx = 0;
      for(var i = 0; i < hues.length; i++) {
        var h = hues[i];
        var dist = Math.sqrt(Math.pow(Math.cos(h)-Math.cos(hsv[0]), 2) + Math.pow(Math.sin(h)-Math.sin(hsv[0]), 2));
        if(dist < minDist) {
          minDist = dist;
          finalIdx = i;
        }
      }
      hsv[1] = 1 - (1-hsv[1])*(1-hsv[1]);
      hsv[2] = Math.min(hsv[2]+0.2, 1);
      var rgb = hsvToRgb(hues[finalIdx], hsv[1], hsv[2]);
      img.pixels[idx] = (img.pixels[idx]+rgb[0]*2)/3.0;
      img.pixels[idx+1] = (img.pixels[idx+1]+rgb[1]*2)/3.0;
      img.pixels[idx+2] = (img.pixels[idx+2]+rgb[2]*2)/3.0;
    }
  }
  img.updatePixels();
  console.log("done");
}

// Image loading

function handleFileSelect(evt) {
  var files = evt.target.files;
  var f = files[0]; // Only one file
  var reader = new FileReader();
  // Closure to capture the file information
  reader.onload = (function(theFile) {
    return function(e) {
      img = loadImage(e.target.result);
      document.getElementById('message').innerHTML = "【﻿ｃｌｉｃｃ　ｔｏ　ＶＡＰＯＲＷＡＶＥ】";
    };
  })(f);
  // Read in the image file as a data URL
  reader.readAsDataURL(f);
}
