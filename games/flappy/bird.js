function Bird() {
  this.width = birdHitboxSize;
  this.height = birdHitboxSize;
  this.iconwidth = birdDrawSize;
  this.iconheight = birdDrawSize;
  this.pos = height/2-this.height/2;
  this.vel = 0;
  this.acc = initialAcceleration;
  this.xpos = birdXPosition;

  this.show = function() {
    image(birdImage, this.xpos, this.pos, this.iconwidth, this.iconheight);
  }

  this.update = function() {
    this.vel += this.acc;
    this.vel = constrain(this.vel, -termVel, termVel);
    this.pos += this.vel;
    this.acc = 0;
  }

  this.applyForce = function(force, type) {
    if(type === 'flap' && cancelVelocity == 1) {
      this.vel = 0;
      this.acc = force;
    } else {
      this.acc += force;
    }
  }
}
