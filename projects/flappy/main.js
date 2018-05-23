var bgImage;
var birdImage;
var bird;
var pipes = [];
var blocks = [];

var ld = true;
var bscroll = 0;
var dead = false;
var score = 0;
var frame = 0;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight).elt;
  var context = canvas.getContext('2d');
  context.mozImageSmoothingEnabled = false;
  context.webkitImageSmoothingEnabled = false;
  context.msImageSmoothingEnabled = false;
  context.imageSmoothingEnabled = false;
  bird = new Bird();
  loadAssets();
}

function draw() {
  if(ld==true) {
    drawLoading();
  } else if(!dead) {
    background(0);
    var imageWidth = bgImage.width*(height/bgImage.height);
    var birdWidth = 100;
    image(bgImage, -bscroll, 0, imageWidth, height);
    image(bgImage, -bscroll+imageWidth, 0, imageWidth, height);
    bird.applyForce(0.5);
    bird.update();
    bird.show();
    if(bird.pos > height) dead = true;
    if(bird.pos < -bird.height) dead = true;
    bscroll += 1;
    bscroll %= imageWidth;
    if(frame%240==0)  {
      if(random(3)>1)
        pipes.push(new Pipe());
      else
        blocks.push(new Block());
    }
    for(var i = 0; i < pipes.length; i++) {
      pipes[i].x -= 3;
      var p = pipes[i].show();
      if(pipes[i].intersects(bird)) dead = true;
      if(p) {
        pipes.splice(i, 1);
        i--;
      }
    }
    for(var i = 0; i < blocks.length; i++) {
      blocks[i].x -= 3;
      var p = blocks[i].show();
      if(blocks[i].intersects(bird)) dead = true;
      if(p) {
        blocks.splice(i, 1);
        i--;
      }
    }
    frame++;
    textAlign(CENTER, CENTER);
    stroke(0);
    strokeWeight(3);
    fill(255);
    textSize(120);
    text(score, width/2, 100);
  } else {
    background(0);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(255);
    textSize(100);
    text('You died!', width/2, height/2-150);
    textSize(50);
    text('Score: ' + score, width/2, height/2);
    text('Press ENTER to play again', width/2, height/2+150);
  }
}

function drawLoading() {
  background(50);
  var total = 2;
  var count = 0;
  if(bgImage != undefined) count++;
  if(bird != undefined) count++;
  if(count == total) ld = false;
  var width = (count/total)*(width-50);
  noStroke();
  fill(255);
  rect(25, 25, width, 75);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if(key == ' ' && !dead)
    bird.applyForce(-14);
  if(keyCode == ENTER && dead) {
    bird = new Bird();
    blocks = [];
    pipes = [];
    frame = 0;
    score = 0;
    dead = false;
  }
}
