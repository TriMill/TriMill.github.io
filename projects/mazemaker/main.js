p5.disableFriendlyErrors = true;

var canvas;
var canvasSize = 720; //2^4 * 3^2 * 5
var numCells = 18;
var cells; // 3d array, cells[x][y] = [top wall, right wall, bottom wall, left wall, available]
var stack;
var cx, cy;
var done;

function setup() {
  canvas = createCanvas(canvasSize+0.5, canvasSize+0.5);
  canvas.parent('canvas-wrapper');
  canvas.id('maze-canvas');
  resetMaze();
  frameRate(30);
}

function resetMaze() {
  background(255);
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
}


function draw() {
  background(255);
  drawCells();
  chooseNextCell();
}

function drawCells() {
  stroke(0);
  strokeWeight(2);
  var cw = canvasSize/numCells;
  var x, y, c
  for(x = 0; x < numCells; x++) {
    for(y = 0; y < numCells; y++) {
      c = cells[x][y];
      // Fill with blue if visited & on stack
      if(!c[4] && c[5] && !done) {noStroke(); fill(99, 99, 255); rect(x*cw, y*cw, cw, cw); stroke(0);}
      // Fill with light blue if visited but not on stack
      if(!c[4] && !c[5] && !done) {noStroke(); fill(150, 180, 255); rect(x*cw, y*cw, cw, cw); stroke(0);}
      // Fill with green if current cell
      if(cx == x && cy == y && !done) {noStroke(); fill(0, 230, 50); rect(x*cw, y*cw, cw, cw); stroke(0);}
      // Draw edges
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
  if(cells[cx-1] && cells[cx-1][cy] && cells[cx-1][cy][4])
    choices.push([cx-1, cy, 3]);
  if(cells[cx+1] && cells[cx+1][cy] && cells[cx+1][cy][4])
    choices.push([cx+1, cy, 1]);
  if(cells[cx]   && cells[cx][cy-1] && cells[cx][cy-1][4])
    choices.push([cx, cy-1, 0]);
  if(cells[cx]   && cells[cx][cy+1] && cells[cx][cy+1][4])
    choices.push([cx, cy+1, 2]);
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
    setTimeout(addDataURL, 10);
  }
}

function newMaze() {
  done = false;
  canvasSize = document.getElementById('maze-width').value;
  resizeCanvas(canvasSize, canvasSize);
  numCells = document.getElementById('num-cells').value;
  frameRate(int(document.getElementById('speed').value));
  resetMaze();
  loop();
}

function addDataURL() {
  var elem = document.getElementById('data-url');
  elem.value = document.getElementById('maze-canvas').toDataURL();
}

function copyURL() {
  var elem = document.getElementById('data-url');
  elem.select();
  document.execCommand('Copy');
  alert('Copied to clipboard');
}
