p5.disableFriendlyErrors = true;

var canvasSize = 720; //2^4 * 3^2 * 5
var numCells = 18;
var colorfg, colorbg, borderWeight;
var showOverlay = true;
var showCurrent = true;

var canvas;
 // 3d array, cells[x][y] = [top wall, right wall, bottom wall, left wall, available, in stack]
var cells;
var stack;
var cx, cy;
var done;
var bias = 0;

function setup() {
  canvas = createCanvas(canvasSize+0.5, canvasSize+0.5);
  canvas.parent('canvas-wrapper');
  canvas.id('maze-canvas');
  setupSelects();
  colorfg = color(0);
  colorbg = color(255);
  borderWeight = 2;
  resetMaze();
  frameRate(30);
}

function resetMaze() {
  background(colorbg);
  cells = []; stack = []; done = false;
  for(var x = 0; x < numCells; x++) {
    cells.push([]);
    for(var y = 0; y < numCells; y++) {
      cells[x][y] = [true, true, true, true, true, false];
    }
  }
  cx = floor(random(numCells));
  cy = floor(random(numCells));
  cells[cx][cy][4] = false;
  elem('status').innerHTML = 'Generating...';
}


function draw() {
  background(colorbg);
  drawCells();
  chooseNextCell();
}

function drawCells() {
  stroke(colorfg);
  strokeWeight(borderWeight);
  var cw = canvasSize/numCells;
  var x, y, c
  // Show overlay
  if(!done && showOverlay) {
    noStroke();
    for(x = 0; x < numCells; x++) {
      for(y = 0; y < numCells; y++) {
        c = cells[x][y];
        // Fill with blue if visited & on stack
        if(!c[4] && c[5])
          {fill( 99,  99, 255); rect(x*cw, y*cw, cw, cw);}
        // Fill with light blue if visited but not on stack
        if(!c[4] && !c[5])
          {fill(150, 180, 255); rect(x*cw, y*cw, cw, cw);}
      }
    }
    stroke(colorfg);
  }
  if(!done && showCurrent) {
    noStroke();
    var d = false;
    var x, y;
    for(x = 0; x < numCells; x++) {
      for(y = 0; y < numCells; y++) {
        // Fill with green if current cell
        if(cx == x && cy == y)
          {fill(0, 230,  50); rect(x*cw, y*cw, cw, cw); d=true; break; }
      }
      if(d) break;
    }
    stroke(colorfg);
  }
  for(x = 0; x < numCells; x++) {
    for(y = 0; y < numCells; y++) {
      c = cells[x][y];
      if(c[0]) line(x*cw, y*cw, x*cw+cw, y*cw);
      if(c[1]) line(x*cw+cw, y*cw, x*cw+cw, y*cw+cw);
      if(c[2]) line(x*cw, y*cw+cw, x*cw+cw, y*cw+cw);
      if(c[3]) line(x*cw, y*cw, x*cw, y*cw+cw);
    }
  }
  if(done) noLoop();
}

function chooseNextCell() {
  var choices = [];
  // Check left, right, up, and down
  if(cells[cx-1] && cells[cx-1][cy] && cells[cx-1][cy][4]) {
    choices.push([cx-1, cy, 3]);
    if(bias > 0) {choices.push([cx-1, cy, 3]); choices.push([cx-1, cy, 3]);}
  }
  if(cells[cx+1] && cells[cx+1][cy] && cells[cx+1][cy][4]) {
    choices.push([cx+1, cy, 1]);
    if(bias > 0) {choices.push([cx+1, cy, 1]); choices.push([cx+1, cy, 1]);}
  }
  if(cells[cx]   && cells[cx][cy-1] && cells[cx][cy-1][4]) {
    choices.push([cx, cy-1, 0]);
    if(bias < 0) {choices.push([cx, cy-1, 0]); choices.push([cx, cy-1, 0]);}
  }
  if(cells[cx]   && cells[cx][cy+1] && cells[cx][cy+1][4]) {
    choices.push([cx, cy+1, 2]);
    if(bias < 0) {choices.push([cx, cy+1, 2]); choices.push([cx, cy+1, 2]);}
  }
  if(choices.length > 0){
    // Push current cell to stack
    stack.push([cx, cy]);
    cells[cx][cy][5] = true;
    // Choose randomly if choices
    var choice = random(choices);
    // Remove wall
    cells[cx][cy][choice[2]] = false;
    // Move to new cell
    cx = choice[0];
    cy = choice[1];
    // Remove wall
    cells[cx][cy][(choice[2]+2)%4] = false;
    // Mark cell as visited
    cells[cx][cy][4] = false;
  } else if(stack.length > 0) {
    // Otherwise, pop the stack
    var n = stack.pop();
    cx = n[0];
    cy = n[1];
    cells[cx][cy][5] = false;
  } else {
    // If stack is empty, we're done
    done = true;
    elem('status').innerHTML = 'Done!';
  }
}
