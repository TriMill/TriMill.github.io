var cs = 60;
var pix = [];
var xoff, yoff;
var updateCanvas = true;
var updateCircle = true;
var rad = 5;
var steps = 2000;
var gridShow = 10;
var evenCenter = false;

function setup() {
  createCanvas(900, 675);
  document.getElementById('radius').value = rad;
  document.getElementById('radiusText').value = rad;
  document.getElementById('evenCenter').value = evenCenter;
  document.getElementById('accuracy').value = steps;
  xoff = width/2-cs/2, yoff = height/2-cs/2;
  resetPix();
}

function resetPix() {
  pix = [];
  pix.push({x: 0, y: 0, c: color(200, 40, 30)});
  if(evenCenter) {
    pix.push({x: 0, y: 1, c: color(200, 40, 30)});
    pix.push({x: 1, y: 0, c: color(200, 40, 30)});
    pix.push({x: 1, y: 1, c: color(200, 40, 30)});
  }
}

function draw() {
  if(updateCanvas || updateCircle) {
    background(220);
    stroke(0);
    if(cs > gridShow) {
      strokeWeight(1);
    } else {
      noStroke();
    }
    noFill();
    if(updateCircle) {
      resetPix();
      var r = rad;
      if(!evenCenter && abs(round(r) - r) == 0.5) 
        r -= 0.000001; 
      else if(evenCenter && round(r) - r == 0) 
        r -= 0.000001;
      traceCircle(r);
    }
    drawPix();
    stroke(0);
    strokeWeight(1);
    if(cs > gridShow)
      drawGrid(xoff, yoff, cs);
    drawCirclePath()
    updateCircle = false;
    updateCanvas = false;
  }
}

function drawGrid(xoff, yoff, gap) {
  for(var x = xoff%gap; x < width; x += gap) {
    line(x, 0, x, height);
  }
  for(var y = yoff%gap; y < height; y += gap) {
    line(0, y, width, y);
  }
}

var lastX, lastY
function mouseDragged() {
  if(mouseX > 0 && mouseY > 0) {
    xoff += mouseX - lastX;
    yoff += mouseY - lastY;
    lastX = mouseX;
    lastY = mouseY;
    updateCanvas = true;
  }
}

function mousePressed() {
  lastX = mouseX;
  lastY = mouseY;
}

function mouseWheel(event) {
  cs *= event.delta > 0 ? 6/5 : 5/6;
  updateCanvas = true;
}

function traceCircle(r) {
  var lx, ly;
  var cx = 0, cy = 0;
  if(evenCenter) { cx = 0.5; cy = 0.5; }
  for(var ang = 0; ang < 1; ang += 1/steps) {
    var x = round(r * cos(ang*TAU) + cx);
    var y = round(r * sin(ang*TAU) + cy);
    var obj = {x: x, y: y, c: color(100)};
    if(x != lx || y != ly) {
      pix.push(obj);
      lx = x;
      ly = y;
    }
  }
}

function drawPix() {
  noStroke()
  for(var i = 0; i < pix.length; i++) {
    fill(pix[i].c);
    rect(pix[i].x*cs + xoff, pix[i].y*cs + yoff, cs, cs);
  }
}

function drawCirclePath() {
  noFill();
  if(cs > 5) strokeWeight(2);
  else strokeWeight(0.8);
  var cx = 0, cy = 0;
  if(evenCenter) { cx = 0.5; cy = 0.5; }
  stroke(220, 42, 32);
  strokeWeight(2)
  ellipse(xoff + cx*cs + cs/2, yoff + cy*cs + cs/2, 2*rad*cs, 2*rad*cs);
}

function updateRadius(value) {
  document.getElementById('radius').value = value;
  document.getElementById('radiusText').value = value;
  rad = value;
  updateCircle = true;
}

function updateAccuracy(value) {
  if(value != 0) {
    steps = +value;
    updateCircle = true;
  }
}

function updateCenter(value) {
  old = evenCenter
  if(old == true && value == false) {
    xoff += 0.5*cs;
    yoff += 0.5*cs;
  } else if(old == false && value == true) {
    xoff -= 0.5*cs;
    yoff -= 0.5*cs;
  }
  evenCenter = value;
  
  updateCircle = true;
}
