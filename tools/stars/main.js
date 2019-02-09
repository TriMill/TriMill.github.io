var p = 8, q = 3;

function setup() {
  var canvas = createCanvas(600, 600);
  canvas.parent("canvas-wrapper");
  frameRate(5);
}

function draw() {
  push();
  background(240);
  noFill();
  stroke(0, 200);
  strokeWeight(2);
  translate(width/2, height/2);
  rotate(-TAU/4);
  var iterations = gcd(p, q);
  for(var i = 0; i < iterations; i++) {
    beginShape();
    for(var j = 0; j < p/iterations; j++) {
      var point = getPoint(p, j*q+i, width/2-20);
      vertex(point.x, point.y);
    }
    endShape(CLOSE);
  }
  pop();
}

function getPoint(count, index, r) {
  var x = r * Math.cos((TAU*index)/count);
  var y = r * Math.sin((TAU*index)/count);
  return createVector(x, y);
}

$(()=>{
  $("#points").change(update);
  $("#jump").change(update);
  update();
})

function update() {
  p = +$("#points").val();
  q = +$("#jump").val();
  draw();
}

function gcd(a,b) {return (!b)?a:gcd(b,a%b);}
