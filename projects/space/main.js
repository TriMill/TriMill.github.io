const MILLIS_PER_LEVEL = 15*1000;
const paddleWidth = 50;
const paddleHeight = 10;
var food = [];
var superfood = [];
var spikes = [];
var bullets = [];
var paddle;
var paddleVelocity;
var difficulty = 0;
var millisLastLevel = 0;
var lives = 3;
var score = 0;
var col;

function setup() {
  createCanvas(700, 700);
  paddle = createVector(width/2, height-40);
  paddleVelocity = 0;
  rectMode(CENTER);
  col = color(0);
}

function draw() {
  if(lives > 0)
    drawGame();
  else
    drawDeath();
}

function drawGame() {
  background(col);
  doAllObjects();
  var m = millis() - millisLastLevel;
  if(m > MILLIS_PER_LEVEL && difficulty < 11) {
    difficulty++;
    millisLastLevel = millis();
  }
  drawText();
  drawPaddle();
  if(keyIsDown(LEFT_ARROW)  || keyIsDown(65) || keyIsDown(74)) {
    paddleVelocity -= 1;
  }
  if(keyIsDown(RIGHT_ARROW) || keyIsDown(68) || keyIsDown(76)) {
    paddleVelocity += 1;
  }
  if(paddle.x<30) {
    paddle.x=30;
    paddleVelocity=0;
  }
  if(paddle.x>width-30) {
    paddle.x=width-30;
    paddleVelocity=0;
  }
  paddleVelocity *= 0.98;
  paddleVelocity = constrain(paddleVelocity, -10, 10);
  paddle.x += paddleVelocity;

  col = lerpColor(col, color(0), 0.03);
  if(col.levels[0]<30)
    col.levels[0] /= 1.2;
  if(col.levels[1]<30)
    col.levels[1] /= 1.2;
  if(col.levels[2]<30)
    col.levels[2] /= 1.2;
}

function doAllObjects() {
  doObjects(food, objects.food, diffs[difficulty][0], width, 0);
  doObjects(superfood, objects.superfood, diffs[difficulty][1], width, 0);
  doObjects(spikes, objects.spike, diffs[difficulty][2], width, 0);
  doObjects(bullets, objects.bullet, diffs[difficulty][3], 150, paddle.x-paddleWidth/2);
}

function drawText() {
  noStroke();
  fill(255);
  textSize(24);
  textAlign(LEFT, CENTER);
  text("Score: " + score, 10, 20);
  textAlign(CENTER, CENTER);
  text("Lives: " + lives, width/2, 20);
  textAlign(RIGHT, CENTER);
  text("Level: " + (difficulty+1), width-10, 20);
}

function drawPaddle() {
  noStroke();
  fill(60, 90, 250);
  rect(paddle.x, paddle.y, paddleWidth, paddleHeight);
}

function doObjects(arr, obj, chance, range, offset) {
  if(frameCount%chance==0)
    arr.push(createVector(random(range)+offset, 0));
  for(var i = 0; i < arr.length; i++) {
    var q = arr[i];
    obj.show(q.x, q.y);
    arr[i].y += obj.speed;
    if(q.y > height) {
      arr.splice(i, 1);
      i--;
      continue;
    }
    if(q.y > paddle.y-paddleHeight/2 && q.y < paddle.y+paddleHeight/2) {
      if(q.x > paddle.x-paddleWidth/2 && q.x < paddle.x+paddleWidth/2) {
        addPoints(obj);
        obj.col();
        arr.splice(i, 1);
        i--;
      }
    }
  }
}

function addPoints(obj) {
  var p = obj.points;
  var q = p.substring(1);
  var r = p[0];
  if(r == 'p') score += int(q);
  if(r == 'l') lives += int(q);
}
