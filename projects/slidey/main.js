let scr = 'Title';
p5.disableFriendlyErrors = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  setFPSUpdateRate(1);
  setUpdateFunction(()=>{if(DBMODE)console.log(getRoundedFPS(2));});
}

function draw() {
  background(0);
  noStroke();
  drawLevel();
  //fs[scr][0]();
  updateFPS();
}

function drawText(txt, x, y, size) {
  push();
  noStroke();
  textSize(8*size || 16);
  textAlign(CENTER, CENTER);
	textFont(FONT);
	text(txt, x, y);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function isMouseInRect(x, y, w, h) {
  return (mouseX >= x && mouseX <= x+w) && (mouseY >= y && mouseY <= y+h);
}

function mouseClicked() {
  console.log(mouseX-width/2, mouseY);
  let result = fs[scr][1]();
  if(result == null) return;
  let a = result.split('$');
  switch(a[0]) {
    case 'scr': scr = a[1]; break;
    case 'href': window.location = a[1]; break;
  }
}
