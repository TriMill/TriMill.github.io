const G = 0.5;
const TERM = 8;

function Bird() {
  this.width = 60;
  this.height = 60;
  this.pos = height/2-this.height/2;
  this.vel = 0;
  this.acc = -3;
  this.xpos = 300;

  this.show = function() {
    image(birdImage, this.xpos, this.pos, this.width, this.height);
  }

  this.update = function() {
    this.vel += this.acc;
    this.vel = constrain(this.vel, -15, 15);
    this.pos += this.vel;
    this.acc = 0;
  }

  this.applyForce = function(force) {
    if(force < 0 && this.acc > 0) this.acc = 0;
    this.acc += force;
  }
}
