var p = 8, q = 3, useCols = false;

var colors;

function setup() {
  var canvas = createCanvas(600, 600);
  canvas.parent("canvas-wrapper");
  frameRate(5);
  colors = [color(0), color(220, 20, 0), color(10, 200, 30), color(20, 40, 240), color(30, 180, 240), color(230, 210, 50), color(150, 50, 150), color(240, 120, 20), color(150, 150, 150), color(150, 100, 50)];
}

function draw() {
  push();
  background(240);
  translate(width/2, height/2);
  rotate(-TAU/4);

  noFill(0, 10)
  strokeWeight(2);
  drawStar();

  pop();
}

function drawStar() {
  var iterations = gcd(p, q);
  for(var i = 0; i < iterations; i++) {
    if(useCols)
      stroke(colors[i%colors.length]);
    beginShape();
    for(var j = 0; j < p/iterations; j++) {
      var point = getPoint(p, j*q+i, width/2-20);
      vertex(point.x, point.y);
    }
    endShape(CLOSE);
  }
}

function getPoint(count, index, r) {
  var x = r * Math.cos((TAU*index)/count);
  var y = r * Math.sin((TAU*index)/count);
  return createVector(x, y);
}

$(()=>{
  $("#points").change(update);
  $("#jump").change(update);
  $("#colors").change(update);
  update();
})

function update() {
  p = +$("#points").val();
  q = +$("#jump").val();
  useCols = $("#colors").prop("checked");
  draw();
}

function gcd(a,b) {return (!b)?a:gcd(b,a%b);}
