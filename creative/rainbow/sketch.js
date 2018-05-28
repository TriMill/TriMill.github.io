const LINE_WIDTH = 5;
let seed;
let change = true;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 100, 100, 100);
	newSeed();
}

function draw() {
	if(change) {
		background(0);
		drawLines();
		change = false;
	}
}

function drawLines() {
	noStroke();
	randomSeed(seed);
	for(let i = 0; i < width; i += LINE_WIDTH*2) {
		fill(i*100/width + random(4)-2, 100, 75);
		rect(i, 0, LINE_WIDTH, floor(random(2*height/3)));
	}
}

function keyTyped() {
	if(key === ' ') newSeed();
}

function newSeed() {
	seed = (new Date()).getTime() + millis();
	change = true;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	change = true;
}
