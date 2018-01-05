function Circle(x, y, color) {
  this.x = x;
  this.y = y;
  this.r = 1;
  this.color = color;
  this.toDelete = false;

  this.show = function() {
    fill(this.color[0], this.color[1], this.color[2], 100)
    stroke(this.color);
    strokeWeight(2);
    ellipse(this.x, this.y, this.r*2);
  }

  this.grow = function() {
    this.r += 1;
  }

  this.hitEdge = function() {
    return(this.x + this.r) >= width || (this.x - this.r) <= 0 || (this.y + this.r) >= height || (this.y - this.r) <= 0;
  }

  this.hitCircle = function(c) {
    return dist(this.x, this.y, c.x, c.y) <= this.r + c.r + 2;
  }
}
