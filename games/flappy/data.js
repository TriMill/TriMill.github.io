let gravity = 1.2;
let termVel = 25;
let flapForce = -22;
let birdDrawSize = 60;
let birdHitboxSize = 60;

let pipeGap = 240;
let pipeCap = 120;
let pipeWidth = 130;
let capWidth = 200;
let blockSize = 360;

let framesBetweenObstacle = 240;
let scrollSpeed = 1;
let blockChance = 0.33333;
let birdXPosition = 300
let initialAcceleration = -3;

let cancelVelOptions = ['No', 'Yes']
let cancelVelocity = 0;

let guiElems = [];
let activeElement = undefined;

function toggleVelOptions(element, mouseButton) {
  cancelVelocity = 1 - cancelVelocity
  element.text = cancelVelOptions[cancelVelocity];
}

function flipGravity(element, mouseButton) {
  guiElems[2].text = ''+-1*guiElems[2].text;
  guiElems[6].text = ''+-1*guiElems[6].text;
  guiElems[30].text = ''+-1*guiElems[30].text;
}

function saveAndExit(element, mouseButton) {
  gravity = 1*guiElems[2].text;
  termVel = 1*guiElems[4].text;
  flapForce = 1*guiElems[6].text;
  birdDrawSize = 1*guiElems[8].text;
  birdHitboxSize = 1*guiElems[10].text;
  pipeGap = 1*guiElems[12].text;
  pipeCap = 1*guiElems[14].text;
  pipeWidth = 1*guiElems[16].text;
  capWidth = 1*guiElems[18].text;
  blockSize = 1*guiElems[20].text;
  framesBetweenObstacle = 1*guiElems[22].text;
  scrollSpeed = 1*guiElems[24].text;
  blockChance = 1*guiElems[26].text;
  birdXPosition = 1*guiElems[28].text;
  initialAcceleration = 1*guiElems[30].text;
  gamestate = 'start';
}

function initMenu() {
  guiElems[0] = new Button(50, height-90, width-100, 40, 'Save & Exit', saveAndExit);
  guiElems[1] = new Label   (50,  50,  140, 40, 'Gravity: ');
  guiElems[2] = new Textbox (250, 50,  200, 40, gravity);
  guiElems[3] = new Label   (50,  100, 140, 40, 'Terminal velocity: ');
  guiElems[4] = new Textbox (250, 100, 200, 40, termVel);
  guiElems[5] = new Label   (50,  150, 140, 40, 'Flap force: ');
  guiElems[6] = new Textbox (250, 150, 200, 40, flapForce);
  guiElems[7] = new Label   (50,  200, 140, 40, 'Bird icon size: ');
  guiElems[8] = new Textbox (250, 200, 200, 40, birdDrawSize);
  guiElems[9] = new Label   (50,  250, 140, 40, 'Bird hitbox size: ');
  guiElems[10] = new Textbox(250, 250, 200, 40, birdHitboxSize);
  
  guiElems[11] = new Label  (50,  300, 140, 40, 'Pipe gap: ');
  guiElems[12] = new Textbox(250, 300, 200, 40, pipeGap);
  guiElems[13] = new Label  (50,  350, 140, 40, 'Pipe cap size: ');
  guiElems[14] = new Textbox(250, 350, 200, 40, pipeCap);
  guiElems[15] = new Label  (50,  400, 140, 40, 'Pipe width: ');
  guiElems[16] = new Textbox(250, 400, 200, 40, pipeWidth);
  guiElems[17] = new Label  (50,  450, 140, 40, 'Cap width: ');
  guiElems[18] = new Textbox(250, 450, 200, 40, capWidth);
  guiElems[19] = new Label  (50,  500, 140, 40, 'Block size: ');
  guiElems[20] = new Textbox(250, 500, 200, 40, blockSize);
  
  guiElems[21] = new Label  (550, 50, 140, 40, 'Frames between obstacle: ');
  guiElems[22] = new Textbox(750, 50, 200, 40, framesBetweenObstacle);
  guiElems[23] = new Label  (550, 100, 140, 40, 'Scroll speed: ');
  guiElems[24] = new Textbox(750, 100, 200, 40, scrollSpeed);
  guiElems[25] = new Label  (550, 150, 140, 40, 'Block chance: ');
  guiElems[26] = new Textbox(750, 150, 200, 40, blockChance);
  guiElems[27] = new Label  (550, 200, 140, 40, 'Bird X position: ');
  guiElems[28] = new Textbox(750, 200, 200, 40, birdXPosition);
  guiElems[29] = new Label  (550, 250, 140, 40, 'Initial acceleration: ');
  guiElems[30] = new Textbox(750, 250, 200, 40, initialAcceleration);
  
  guiElems[31] = new Label  (575, 300, 140, 40, 'Cancel velocity when flapping: ');
  guiElems[32] = new Button(850, 300, 100, 40, cancelVelOptions[cancelVelocity], toggleVelOptions);
  guiElems[33] = new Button(525, 450, 405, 40, 'Flip gravity', flipGravity);
}

function drawMenu(width, height) {
  background(25);
  for(const elem of guiElems) {
    elem.show();
  }
}

function menuKey(key, keyCode) {
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
    this.onClickFunc(this, mouseButton)
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