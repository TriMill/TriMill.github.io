const PIPE_CAP = 120;
const PIPE_GAP = 300;
const PIPE_WIDTH = 130;
const CAP_WIDTH = 200;

function Pipe() {
  this.x = width+CAP_WIDTH;
  this.top = height-(random(height - PIPE_CAP*2 - PIPE_GAP)+PIPE_CAP+PIPE_GAP);
  this.bottom = this.top+PIPE_GAP;
  this.passed = false;

  this.show = function() {
    stroke(0);
    strokeWeight(3);
    fill(100, 200, 100);
    rect(this.x, -10, PIPE_WIDTH, this.top);
    rect(this.x, this.bottom, PIPE_WIDTH, height+10);

    rect(this.x-CAP_WIDTH/2+PIPE_WIDTH/2, this.top-PIPE_CAP, CAP_WIDTH, PIPE_CAP);
    rect(this.x-CAP_WIDTH/2+PIPE_WIDTH/2, this.bottom, CAP_WIDTH, PIPE_CAP);

    if(this.x + CAP_WIDTH < 0) return true;
    return false;
  }

  this.intersects = function(b) {
    if(b.xpos+b.width > this.x && b.xpos < this.x+PIPE_WIDTH) {
      if(!this.passed) {
        this.passed = true;
        score++;
      }
      return (b.pos < this.top || b.pos+b.height > this.bottom);
    }
  }
}
