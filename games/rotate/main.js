p5.disableFriendlyErrors = true;

var colors;
var blockSize = 100;
var angle = 0;

var pairs = [];

function setup() {
  colors = {
    fgcol: color(90, 50, 30),
    bgcol: color(240, 230, 216),
    lgray: color(210, 200, 195),
    dgray: color(140, 130, 125)
  }
  colors.light = lerpColor(colors.fgcol,
    colors.bgcol, 0.9)
  colors.block = lerpColor(colors.bgcol,
    color(255), 0.3);

  createCanvas(windowWidth, windowHeight);
  background(colors.bgcol);
  frameRate(45);
}

function draw() {
  background(colors.bgcol);
  drawGrid(0, 0);
  for(var i = 0; i < pairs.length; i++) {
    translate(pairs[i][0], pairs[i][1]);
    rotate(pairs[i][2]*TAU/4);
    translate(-pairs[i][0], -pairs[i][1]);
  }
  drawBlock(blocks.l_block);
}

function drawGrid(cx, cy) {
  stroke(colors.light);
  strokeWeight(round(blockSize/9)/2);
  for(var x = cx; x < width; x += blockSize) {
    line(x, 0, x, height);
  }
  for(var y = cy; y < height; y += blockSize) {
    line(0, y, width, y);
  }
}

function drawRect(x, y, w, h, sides) {
  // top right bottom left
  stroke(colors.fgcol);
  strokeWeight(round((w+h)/9)/2);
  if(sides[0]) line(x, y, x+w, y);
  if(sides[1]) line(x+w, y, x+w, y+w);
  if(sides[2]) line(x, y+h, x+w, y+w);
  if(sides[3]) line(x, y, x, y+h);
}

function drawBlock(block) {
  var [screenX, screenY] = getScreenCoords(mouseX, mouseY);
  for(var i = 0; i < block.length; i++) {
    var rx = block[i][0]*blockSize;
    var ry = block[i][1]*blockSize;
    var [sx, sy] = getReverseScreenCoords(rx+blockSize/2, ry+blockSize/2);
    if(sx < 0 || sx > width || sy < 0 || sy > height) {
      //continue;
    }

    noStroke();
    fill(colors.block);
    rect(rx, ry, blockSize, blockSize);
    fill(isMouseInRect(rx, ry, blockSize, blockSize, screenX, screenY) ?
      colors.dgray : colors.lgray);
    ellipse(rx+blockSize/2, ry+blockSize/2, blockSize/2.5);
    stroke(colors.fgcol);
    drawRect(rx, ry,
      blockSize, blockSize, block[i][2]);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function isMouseInRect(x, y, w, h, mx, my) {
  return (mx >= x && mx < x+w &&
    my >= y && my < y+h);
}

function mousePressed() {
  if(mouseX)
  var [tx, ty] = getScreenCoords(mouseX, mouseY);
  console.log(tx, ty);
  pairs.push([
    floor(tx/blockSize)*blockSize+blockSize/2,
    floor(ty/blockSize)*blockSize+blockSize/2,
    mouseButton == LEFT ? 1 : (mouseButton == RIGHT ? -1 : 2)
  ]);
  return false;
}

function getScreenCoords(x, y) {
  var tx, ty;
  for(var i = 0; i < pairs.length; i++) {
    x = x - pairs[i][0];
    y = y - pairs[i][1];
    if(pairs[i][2]==1) {
      tx = y;
      ty = -x;
    } else if(pairs[i][2]==-1) {
      tx = -y;
      ty = x;
    } else {
      tx = -x;
      ty = -y;
    }
    x = tx + pairs[i][0];
    y = ty + pairs[i][1];
  }
  return [x, y];
}

function getReverseScreenCoords(x, y) {
  var tx, ty;
  for(var i = pairs.length-1; i >= 0; i--) {
    x = x - pairs[i][0];
    y = y - pairs[i][1];
    if(pairs[i][2]==1) {
      tx = y;
      ty = -x;
    } else if(pairs[i][2]==-1) {
      tx = -y;
      ty = x;
    } else {
      tx = -x;
      ty = -y;
    }
    x = tx + pairs[i][0];
    y = ty + pairs[i][1];
  }
  return [x, y];
}
