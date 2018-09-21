var cs = 40;
var pix = [];
var xoff, yoff;
var updateCanvas = true;
var updateCircle = true;
var rad = 5;
var step = 0.005;
var gridShow = 10;

function setup() {
  createCanvas(900, 675);
  xoff = width/2-cs/2, yoff = height/2-cs/2;
  resetPix();
}

function resetPix() {
  pix = [];
  pix.push({x: 0, y: 0, c: color(200, 40, 30)});
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
      traceCircle(rad);
    }
    drawPix();
    stroke(0);
    strokeWeight(1);
    if(cs > gridShow)
      drawGrid(xoff, yoff, cs);
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
  cs *= event.delta > 0 ? 4/3 : 3/4;
  updateCanvas = true;
}

function traceCircle(r) {
  var lx, ly;
  for(var ang = 0; ang < TAU; ang += step) {
    var x = round(r * cos(ang));
    var y = round(r * sin(ang));
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
  noFill();
  stroke(200, 40, 30);
  if(cs > 5)
    strokeWeight(2);
  else
    strokeWeight(0.8);
  ellipse(xoff+cs/2, yoff+cs/2, 2*rad*cs, 2*rad*cs);
}

function updateRadius(value) {
  document.getElementById('radius').value = value;
  document.getElementById('radiusText').value = value;
  rad = value;
  updateCircle = true;
}

function updateAccuracy(value) {
  if(value != 0) {
    step = +value;
    updateCircle = true;
  }
}
