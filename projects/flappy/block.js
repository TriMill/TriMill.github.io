const BLOCK_SIZE = 300;

function Block() {
  this.x = width+CAP_WIDTH;
  this.y = height-(random(height-BLOCK_SIZE*2)+BLOCK_SIZE);
  this.passed = false;

  this.show = function() {
    stroke(0);
    strokeWeight(3);
    fill(100, 200, 100);
    rect(this.x, this.y, BLOCK_SIZE, BLOCK_SIZE);
    if(this.x + BLOCK_SIZE < 0) return true;
    return false;
  }

  this.intersects = function(b) {
    if(b.xpos+b.width > this.x && b.xpos < this.x+BLOCK_SIZE) {
      if(!this.passed) {
        this.passed = true;
        score++;
      }
      return (b.pos+b.width > this.y && b.pos < this.y+BLOCK_SIZE);
    }
  }
}
