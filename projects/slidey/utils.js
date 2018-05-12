function erp(a, b, amt) {return (b-a)*amt+a;}

function drawLevelIcon(lname, x, y, w, done) {
  let c = isMouseInRect(x-w/2, y-w/2, w, w) ? colors.level_hover : (done ? colors.level_done : colors.level);
  fill(c);
  rect(x-w/2, y-w/2, w, w);
  w2 = w * 0.9;
  fill(colors.background);
  rect(x-w2/2, y-w2/2, w2, w2);
  w2 = w * 0.8;
  fill(c);
  rect(x-w2/2, y-w2/2, w2, w2);
  fill(colors.background);
  drawText(lname, x, y, 10);
}

function drawLevelLine(x1, y1, x2, y2) {
  fill(colors.connector);
  if(x2-x1 > y2-y1) {
    rect(erp(x1, x2,  4/17), y1-5, 1/17*(x2-x1), 10);
    rect(erp(x1, x2,  6/17), y1-5, 1/17*(x2-x1), 10);
    rect(erp(x1, x2,  8/17), y1-5, 1/17*(x2-x1), 10);
    rect(erp(x1, x2, 10/17), y1-5, 1/17*(x2-x1), 10);
    rect(erp(x1, x2, 12/17), y1-5, 1/17*(x2-x1), 10);
  } else {
    rect(x1-5, erp(y1, y2,  4/17), 10, 1/17*(y2-y1));
    rect(x1-5, erp(y1, y2,  6/17), 10, 1/17*(y2-y1));
    rect(x1-5, erp(y1, y2,  8/17), 10, 1/17*(y2-y1));
    rect(x1-5, erp(y1, y2, 10/17), 10, 1/17*(y2-y1));
    rect(x1-5, erp(y1, y2, 12/17), 10, 1/17*(y2-y1));
  }
}

function drawBack() {
  fill(isMouseInRect(0, 0, 150, 70) ? colors.link : colors.text);
  drawText('Back', 75, 35, 4);
}

function mouseOnBack() {
  return isMouseInRect(0, 0, 150, 70);
}

function linkInRect(x, y, w, h) {
  fill(isMouseInRect(x, y, w, h) ? colors.link : colors.link_text);
  rect(x, y, w, h);
}
