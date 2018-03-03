function setup() {
	createCanvas(600, 600);
	rectMode(CORNERS)
}

function draw() {
	showMenuBackground();
	showMenuGUI();
}

// States:
// 0 - Main menu
// 1 - RPS P1
// 2 - RPS P2
// 3 - RPS Results
// 4 - RPS New Round
// 5 - RPSLS P1
// 6 - RPSLS P2
// 7 - RPSLS Results
// 8 - RPSLS New Round
let state = 0;
function nextState(selection) {
	switch(state) {
		case 0: return selection == 0 ? 1 : (selection == 1 ? 5 : 0);
		case 1: return 2;
		case 2: return 3;
		case 3: return 
	}
}

function Button(x, y, w, h, message, pressFunction) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.message = message;
	this.enabled = true;
	this.pressed = false;
	this.pressFunction = pressFunction;

	this.onPress = function() {
		if(this.isInButton(mouseX, mouseY)) {
			this.pressFunction();
			this.pressed = true;
		}
	}

	this.onRelease = function() {
		if(this.isInButton(mouseX, mouseY)) {
			this.pressed = false;
		}
	}

	this.show = function() {
		noStroke();
		fill(colors.gray);
		rect(this.x, this.y, this.x+this.w, this.y+this.h);
		fill(this.enabled ? (this.pressed ? colors.darkgray : colors.lightgray) : colors.gray);
		rect(this.x+10, this.y+10, this.x+this.w-10, this.y+this.h-10);
		fill(this.enabled ? colors.black : colors.darkgray);
		textAlign(CENTER, CENTER);
		textSize(20);
		text(message, this.x+this.w/2, this.y+this.h/2);
	}

	this.isInButton = function(mx, my) {
		return mx >= this.x && mx <= this.x+this.w && my >= this.y && my <= this.y+this.h && this.enabled;
	}
}

function mousePressed() {
	for(let i = 0; i < buttons.length; i++) {
		buttons[i].onPress();
	}
}

function mouseReleased() {
	for(let i = 0; i < buttons.length; i++) {
		buttons[i].onRelease();
	}
}
