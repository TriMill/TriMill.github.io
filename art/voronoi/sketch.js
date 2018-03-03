let seeds = [];
let availablePixels = [];
let numSeeds = 20;
let pointsPerFrame = 15;

function setup() {
	createCanvas(400, 400);
	for(let x = 0; x < width; x++) {
		for(let y = 0; y < height; y++) {
			availablePixels.push([x, y]);
		}
	}
	for(let i = 0; i < numSeeds; i++) {
		seeds.push([random(width), random(height), random(255), random(255), random(255)]);
	}
	background(0);
	setFPSUpdateRate(0.2);
	setUpdateFunction(logFPS);
}

function draw() {
	updateFPS();
	for(let i = 0; i < pointsPerFrame && availablePixels.length >= 0; i++) {
		drawNewPixel();
	}
	drawSeeds();
	if(availablePixels.length <= 0) {
		noLoop();
		console.log("DONE");
	}
}

function drawNewPixel() {
	let pix = random(availablePixels);
	availablePixels.splice(availablePixels.indexOf(pix), 1);
	let closeSeed = getClosestSeed(pix[0], pix[1]);
	stroke(closeSeed[2], closeSeed[3], closeSeed[4]);
	point(pix[0], pix[1]);
}

function getClosestSeed(x, y) {
	let closeI = 0;
	let closeD = dist(seeds[0][0], seeds[0][1], x, y);
	for(let i = 1; i < seeds.length; i++) {
		let d = dist(seeds[i][0], seeds[i][1], x, y);
		if(d < closeD) {
			closeD = d;
			closeI = i;
		}

	}
	return seeds[closeI];
}

function drawSeeds() {
	noStroke();
	for(let i = 0; i < seeds.length; i++) {
		fill(0);
		if(millis() < 20000) {
			stroke(seeds[i][2], seeds[i][3], seeds[i][4]);
		}
		ellipse(seeds[i][0], seeds[i][1], 10);
	}
}

function logFPS() {
	console.log(getRoundedFPS(1));
}
