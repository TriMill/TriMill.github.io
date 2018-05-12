p5.disableFriendlyErrors = true;

var radius = 15;
var infoHeight = 30;

var fps = 60;
var fpsshow = 60;
var points = [];
var dragIndex = -1;
var isChange = true;
var total = 0;

function setup() {
  var c = createCanvas(700, 700);
  c.parent('canvas');
  background(0);
}

function draw() {
  if(isChange) {
    background(0);
    noStroke();
    fill(255);
    total = drawLines();
    noStroke();
    for(var i = 0; i < points.length; i++) {
      fill(255);
      ellipse(points[i][0], points[i][1], radius);
      fill(0);
      ellipse(points[i][0], points[i][1], radius-4);
    }
    isChange = false;
  }

  fps = (fps + frameRate())/2;
  if(frameCount % 100 == 0) fpsshow = fps;
  noStroke();
  fill(0);
  rect(0, 0, width, infoHeight);
  fill(255);
  textSize(18);
  textAlign(LEFT, CENTER);
  text('Framerate: ' + round(fpsshow*10)/10, 10, 15);
  text('Points: ' + points.length, 300, 15);
  text('Total distance: ' + round(total*100)/100, 490, 15);
}

function drawLines() {
  if(points.length < 2) return 0;
  stroke(255);
  strokeWeight(2);
  var totalDist = 0;
  var used = [], unused = points.slice();
  used.push(unused[0]);
  unused.splice(0, 1);
  var index1, index2, record, i, j, d;
  while(unused.length > 0) {
    index1 = -1;
    index2 = -1;
    record = 10000;
    for(i = 0; i < unused.length; i++) {
      for(j = 0; j < used.length; j++) {
        d = dist(unused[i][0], unused[i][1], used[j][0], used[j][1]);
        if(d < record) {
          index1 = i;
          index2 = j;
          record = d;
        }
      }
    }
    totalDist += record;
    line(unused[index1][0], unused[index1][1], used[index2][0], used[index2][1]);
    used.push(unused[index1]);
    unused.splice(index1, 1);
  }
  return totalDist;
}

function mousePressed() {
  var index = -1;
  for(var i = 0; i < points.length; i++) {
    if(dist(mouseX, mouseY, points[i][0], points[i][1]) <= radius) {
      index = i;
      break;
    }
  }
  if(index < 0) {
    if(mouseButton == LEFT) {
      dragIndex = points.length;
      points.push([mouseX, mouseY]);
    }
  } else if(mouseButton == LEFT) {
    dragIndex = index;
  } else {
    points.splice(index, 1);
  }
  isChange = true;
  return true;
}

function mouseDragged() {
  if(dragIndex < 0) return;
  points[dragIndex][0] = mouseX;
  points[dragIndex][1] = mouseY;
  isChange = true;
}

function mouseReleased() {
  dragIndex = -1;
  isChange = true;
}

function keyPressed() {
  if(key == 'A') {
    for(var i = 0; i < 10; i++)
      points.push([random(width), random(height-infoHeight)+infoHeight])
  } else if(key == 'R') {
    points = [];
  }
  isChange = true;
}
