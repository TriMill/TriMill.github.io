//p5.disableFriendlyErrors = true;

var balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(var i = 0; i < 12; i++) {
    balls.push(new Ball(random(width-60)+30, random(height-60)+30));
  }
  background(0);
}

function draw() {
  background(0);
  for(var i = 0; i < balls.length; i++) {
    balls[i].show();
    balls[i].update();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
