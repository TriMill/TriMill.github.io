function setup() {
	createCanvas(600, 600);
	background(0);
}

function draw() {
	if(millis() < 10000) {
		translate(300, 300);
		addLine();
	}
}

function addLine() {
	let angle = random(0, TAU);
	let x1 = 500 * cos(angle);
	let x2 = -500 * cos(angle);
	let y1 = 500 * sin(angle);
	let y2 = -500 * sin(angle);
	translate(100*cos(angle+TAU/4), 100*sin(angle+TAU/4));
	noFill();

	stroke(random(200, 255), 15);
	line(x1, y1, x2, y2);
}
