function drawDeath() {
  background(0);
  col = color(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(60);
  text("You died!", width/2, height*2/5);
  textSize(40);
  text("Score: " + score, width/2, height*3/5);
  text("Press SPACE to play again", width/2, height*7/10);
}

function keyPressed() {
  if(key == ' ') {
    food = [];
    superfood = [];
    spikes = [];
    bullets = [];
    paddle = createVector(width/2, height-40);
    paddleVelocity = 0;
    difficulty = 0;
    millisLastLevel = millis();
    score = 0;

    lives = 3;
  }
}
