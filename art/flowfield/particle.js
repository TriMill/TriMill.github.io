function Particle(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.lastPos = createVector(x, y);

  this.update = function() {
    this.lastPos = createVector(this.pos.x, this.pos.y);
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);
    this.acc.mult(0);
    let ch = false;
    if(this.pos.x > width)  {this.pos.x = 0;      ch = true;}
    if(this.pos.x < 0)      {this.pos.x = width;  ch = true;}
    if(this.pos.y > height) {this.pos.y = 0;      ch = true;}
    if(this.pos.y < 0)      {this.pos.y = height; ch = true;}
    if(ch) this.lastPos = createVector(this.pos.x, this.pos.y);
  }

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.show = function() {
    //noStroke();
    //fill(FOREGROUND);
    //ellipse(this.pos.x, this.pos.y, 1);
    stroke(FOREGROUND);
    line(this.lastPos.x, this.lastPos.y, this.pos.x, this.pos.y);
  }

  this.flow = function(field) {
    let index = floor(this.pos.x/SCALE) + w*floor(this.pos.y/SCALE);
    this.applyForce(field[index]);
  }
}
