
function Block() {
  this.x = width+capWidth;
  this.y = height-(random(height-blockSize)+blockSize);
  this.passed = false;

  this.show = function() {
    stroke(0);
    strokeWeight(3);
    fill(100, 200, 100);
    rect(this.x, this.y, blockSize, blockSize);
    if(this.x + blockSize < 0) return true;
    return false;
  }

  this.intersects = function(b) {
    if(b.xpos+b.width > this.x && b.xpos < this.x+blockSize) {
      if(!this.passed) {
        this.passed = true;
        score++;
      }
      return (b.pos+b.width > this.y && b.pos < this.y+blockSize);
    }
  }
}
