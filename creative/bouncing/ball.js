function Ball(x, y) {
  this.pos = createVector(x, y);
  this.r = 30;
  this.vel = p5.Vector.random2D();
  this.vel.mult(3);

  this.show = function() {
    stroke(255);
    strokeWeight(5);
    fill(200);
    ellipse(this.pos.x, this.pos.y, this.r*2);
  }

  this.update = function() {
    if(this.pos.x < this.r || this.pos.x > width-this.r) {
      this.vel.x *= -1
    }
    if(this.pos.y < this.r || this.pos.y > height-this.r) {
      this.vel.y *= -1;
    }
    for(var i = 0; i < balls.length; i++) {
      if(balls[i] == this) continue;
      var d = dist(this.pos.x, this.pos.y, balls[i].pos.x, balls[i].pos.y)
      if(d < this.r + balls[i].r) {
        var x = this.vel;
        this.vel = balls[i].vel
        balls[i].vel = x;
      }
    }
    this.pos.add(this.vel);
  }
}
