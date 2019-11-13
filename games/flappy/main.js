var bgImage1;
var bgImage2;
var birdImage;
var bird;
var pipes = [];
var blocks = [];

var gamestate = 'ld';
var bscroll1 = 0;
var bscroll2 = 0;
var score = 0;
var frame = 0;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight).elt;
  var context = canvas.getContext('2d');
  context.mozImageSmoothingEnabled = false;
  context.webkitImageSmoothingEnabled = false;
  context.msImageSmoothingEnabled = false;
  context.imageSmoothingEnabled = false;
  textFont('Courier New');
  frameRate(30);
  initMenu();
  loadAssets();
}

function draw() {
  if(gamestate == 'ld') {
    drawLoading();
  } else if(gamestate == 'game') {
    background(25);
    var imageWidth = bgImage1.width*(height/bgImage1.height);
    drawBackground(imageWidth);
    doBird();
    pipesAndBlocks();
    showScore();
    bscroll1 += 2*scrollSpeed;
    bscroll1 %= imageWidth;
    bscroll2 += 1*scrollSpeed;
    bscroll2 %= imageWidth;
    frame++;
  } else if(gamestate == 'dead' || gamestate == 'start') {
    background(25);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(255);
    textSize(100);
    if(gamestate == 'dead') {
      text('You died!', width/2, height/2-150);
      textSize(50);
      text('Score: ' + score, width/2, height/2);
      text('Play', width/2-width/7, height/2+150);
      text('Options', width/2+width/7, height/2+150);
    } else if(gamestate == 'start') {
      text('Flappy T', width/2, height/2-150);
      textSize(50);
      text('Play', width/2-width/7, height/2+150);
      text('Options', width/2+width/7, height/2+150);
    }
  } else if(gamestate == 'menu') {
    drawMenu();
  }
}

function drawBackground(imageWidth) {
  image(bgImage2, -bscroll2, 0, imageWidth, height);
  image(bgImage2, -bscroll2+imageWidth, 0, imageWidth, height);
  image(bgImage1, -bscroll1, 0, imageWidth, height);
  image(bgImage1, -bscroll1+imageWidth, 0, imageWidth, height);
}

function doBird() {
  bird.applyForce(gravity, 'grav');
  bird.update();
  bird.show();
  if(bird.pos > height) gamestate = 'dead';
  if(bird.pos < -bird.height) gamestate = 'dead';
}

function pipesAndBlocks() {
  if(frame % framesBetweenObstacle == 0)  {
    if(random(1) < blockChance)
      blocks.push(new Block());
    else
      pipes.push(new Pipe());
  }
  for(var i = 0; i < pipes.length; i++) {
    pipes[i].x -= 3*scrollSpeed;
    var p = pipes[i].show();
    if(pipes[i].intersects(bird)) gamestate = 'dead';
    if(p) {
      pipes.splice(i, 1);
      i--;
    }
  }
  for(var i = 0; i < blocks.length; i++) {
    blocks[i].x -= 3*scrollSpeed;
    var p = blocks[i].show();
    if(blocks[i].intersects(bird)) gamestate = 'dead';
    if(p) {
      blocks.splice(i, 1);
      i--;
    }
  }
}

function showScore() {
  textAlign(CENTER, CENTER);
  stroke(0);
  strokeWeight(3);
  fill(255);
  textSize(120);
  text(score, width/2, 100);
}

function drawLoading() {
  background(25);
  var total = 3;
  var count = 0;
  if(bgImage1 != undefined) count++;
  if(bgImage2 != undefined) count++;
  if(birdImage != undefined) count++;
  if(count >= total) gamestate = 'start';
  var w = (count/total)*(width-50);
  noStroke();
  fill(0, 255, 0);
  rect(25, 25, w, 75);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newGame() {
  bird = new Bird();
  blocks = [];
  pipes = [];
  frame = 0;
  score = 0;
  gamestate = 'game';
}

function mousePressed() {
  if(gamestate == 'menu') {
    menuPress(mouseX, mouseY, mouseButton);
  }
}

function mouseReleased() {
  if(gamestate == 'menu') {
    menuRelease(mouseX, mouseY, mouseButton);
  }
}

function mouseClicked() {
  if(gamestate == 'menu') {
    menuClick(mouseX, mouseY, mouseButton);
  } else if(gamestate == 'game' ) {
    bird.applyForce(flapForce, 'flap');
  } else if((gamestate == 'start' || gamestate == 'dead') && mouseY > height/2 + 75) {
    if(mouseX < width/2) {
      newGame()
    } else {
      gamestate = 'menu'
    }
  }
}
