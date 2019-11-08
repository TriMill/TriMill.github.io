function Pipe() {
  this.x = width+capWidth;
  this.top = height-(random(height - pipeCap*2 - pipeGap)+pipeCap+pipeGap);
  this.bottom = this.top+pipeGap;
  this.passed = false;

  this.show = function() {
    stroke(0);
    strokeWeight(3);
    fill(100, 200, 100);
    rect(this.x, -10, pipeWidth, this.top);
    rect(this.x, this.bottom, pipeWidth, height+10);

    rect(this.x-capWidth/2+pipeWidth/2, this.top-pipeCap, capWidth, pipeCap);
    rect(this.x-capWidth/2+pipeWidth/2, this.bottom, capWidth, pipeCap);

    if(this.x + capWidth < 0) return true;
    return false;
  }

  this.intersects = function(b) {
    if(b.xpos+b.width > this.x && b.xpos < this.x+pipeWidth) {
      if(!this.passed) {
        this.passed = true;
        score++;
      }
      return (b.pos < this.top || b.pos+b.height > this.bottom);
    }
  }
}
