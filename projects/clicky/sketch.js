let slider = 0;
let maxSlider = 4;
let spacing;

function setup() {
	createCanvas(600, 600);
	spacing = width/6;
	init();
}

function draw() {
	background(0);
	drawSlider();
	if(frameCount % 45 == 0) {
		slider = random([0, 1, 2, 3, 4]);
	}
}

function drawSlider() {
	stroke(240);
	strokeWeight(30);
	line(spacing, spacing, width-spacing, spacing);
	noStroke();
	for(let i = 0; i <= maxSlider; i++) {
		fill(100);
		ellipse(spacing*(i + 1), spacing, 10);
	}
	stroke(0);
	strokeWeight(3);
	fill(50, 50, 180);
	ellipse(spacing*(slider + 1), spacing, 50);
}
