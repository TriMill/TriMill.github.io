let gravity = 1.2;
let termVel = 25;
let flapForce = -22;
let birdDrawSize = 60;
let birdHitboxSize = 60;
// Not settable in GUI
let pipeCap = 120;
let pipeGap = 240;
let pipeWidth = 130;
let capWidth = 200;
let blockSize = 360;

let guiElems = [];
let activeElement = undefined;

function saveAndExit() {
  gravity = 1*guiElems[2].text;
  termVel = 1*guiElems[4].text;
  flapForce = 1*guiElems[6].text;
  birdDrawSize = 1*guiElems[8].text;
  birdHitboxSize = 1*guiElems[10].text;
  gamestate = 'start';
}

function initMenu() {
  guiElems[0] = new Button(50, height-90, width-100, 40, 'Save & Exit', saveAndExit);
  guiElems[1] = new Label  (50,  50,  140, 40, 'Gravity: ');
  guiElems[2] = new Textbox(240, 50,  200, 40, gravity);
  guiElems[3] = new Label  (50,  100, 140, 40, 'Terminal velocity: ');
  guiElems[4] = new Textbox(240, 100, 200, 40, termVel);
  guiElems[5] = new Label  (50,  150, 140, 40, 'Flap force: ');
  guiElems[6] = new Textbox(240, 150, 200, 40, flapForce);
  guiElems[7] = new Label  (50,  200, 140, 40, 'Bird icon size: ');
  guiElems[8] = new Textbox(240, 200, 200, 40, birdDrawSize);
  guiElems[9] = new Label  (50,  250, 140, 40, 'Bird hitbox size: ');
  guiElems[10] = new Textbox(240, 250, 200, 40, birdHitboxSize);
}

function drawMenu(width, height) {
  background(25);
  for(const elem of guiElems) {
    elem.show();
  }
}

function menuKey(key, keyCode) {
  print(activeElement);
  if(activeElement) {
    activeElement.onKeyType(key, keyCode);
  }
}

function menuPress(mouseX, mouseY, button) {
  for(const elem of guiElems) {
    if(mouseX >= elem.x && mouseY >= elem.y 
      && mouseX < (elem.x + elem.w) && mouseY < (elem.y + elem.h)) {
      elem.onPress(mouseX, mouseY, mouseX - elem.x, mouseY - elem.y, button);
      return;
    }
  }
}
function menuRelease(mouseX, mouseY, button) {
  for(const elem of guiElems) {
    if(mouseX >= elem.x && mouseY >= elem.y 
      && mouseX < (elem.x + elem.w) && mouseY < (elem.y + elem.h)) {
      elem.onRelease(mouseX, mouseY, mouseX - elem.x, mouseY - elem.y, button);
      return;
    }
  }
}
function menuClick(mouseX, mouseY, button) {
  for(const elem of guiElems) {
    if(mouseX >= elem.x && mouseY >= elem.y 
      && mouseX < (elem.x + elem.w) && mouseY < (elem.y + elem.h)) {
      elem.onClick(mouseX, mouseY, mouseX - elem.x, mouseY - elem.y, button);
      return;
    }
  }
  activeElement = undefined;
}

class GUIElement {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.enabled = true;
    this.pressed = false;
  }
  onPress(absX, absY, relX, relY, mouseButton) { this.pressed = true; }
  onRelease(absX, absY, relX, relY, mouseButton) { this.pressed = false; }
  onClick(absX, absY, relX, relY, mouseButton) { activeElement = this; }
  onKeyType(key, keyCode) { }
  isActive() { return false; }
  setEnabled(enabled) { this.enabled = enabled; }
  show() { }
}

class Button extends GUIElement{
  constructor(x, y, w, h, text, onClickFunc) {
    super(x, y, w, h);
    this.text = text;
    this.onClickFunc = onClickFunc;
  }
  onClick(absX, absY, relX, relY, mouseButton) {
    activeElement = this;
    this.onClickFunc(mouseButton)
  }
  show() {
    stroke(255);
    strokeWeight(3);
    fill(this.pressed ? 25 : 120);
    rect(this.x, this.y, this.w, this.h);
    textSize(18);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(255);
    text(this.text, this.x+this.w/2, this.y+this.h/2)
  }
}

class Label extends GUIElement{
  constructor(x, y, w, h, text,) {
    super(x, y, w, h);
    this.text = text;
  }
  show() {
    textSize(18);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(255);
    text(this.text, this.x+this.w/2, this.y+this.h/2)
  }
}

class Textbox extends GUIElement{
  constructor(x, y, w, h, text) {
    super(x, y, w, h);
    this.text = '' + text + '';
    this.cursor = 0;
  }
  onKeyType(key, keyCode) {
    if(keyCode == 8) {
      if(cursor != 0) {
        this.text = this.text.slice(0, this.cursor-1) + this.text.slice(this.cursor)
        this.cursor = Math.min(this.text.length, this.cursor = Math.max(0, this.cursor))
      }
    } else if(keyCode == 37) {
      this.cursor = Math.max(0, this.cursor-1)
    } else if(keyCode == 39) {
      this.cursor = Math.min(this.text.length, this.cursor+1)
    } else if(key.length == 1) {
      this.text = this.text.slice(0, this.cursor) + key + this.text.slice(this.cursor)
      this.cursor += 1;
    }
  }
  onClick(absX, absY, relX, relY, mouseButton) {
    activeElement = this;
  } 
  show() {
    stroke(255);
    strokeWeight(3);
    fill(25);
    rect(this.x, this.y, this.w, this.h);
    textSize(18);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(255);
    let displayText = this.text;
    if(activeElement === this) {
      displayText = this.text.slice(0, this.cursor) 
        + (millis()%1000 > 500 ? '│' : ' ') 
        + this.text.slice(this.cursor);
    }
    text(displayText, this.x+this.w/2, this.y+this.h/2)
  }
}