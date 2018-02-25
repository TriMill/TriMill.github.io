let points = [];
let direct;
let num = 0;
let lines = [];
const LENGTH = 8;
const SPEED = 7;
const CHANGE = 0.1;
let xoff, yoff;
let moved = false;

function setup() {
	createCanvas(600, 600);
	xoff = width/2;
	yoff = height/2;
	background(0);
	points.push(createVector(0, 0));
	direct = p5.Vector.random2D();
	direct.mult(SPEED);
}

function draw() {
	if(moved) background(0);
	translate(xoff, yoff);
	if(moved) drawLines();
	else if(lines.length > 0) drawLine(lines.length-1);
	if(points.length > LENGTH)
		addLine();
	movePoints();
	num += CHANGE;
	moved = false;
}

function addLine() {
	let p1 = points[points.length - 1];
	let p2 = points[0];
	lines.push([p1, p2]);
}

function movePoints() {
	let p = points[0];
	p = p5.Vector.add(p, direct);
	direct.rotate((noise(num)-0.5)*3);
	if(points.length > LENGTH) points.pop();
	points.splice(0, 0, p);
}

function drawLines() {
	for(let i = 0; i < lines.length; i++) {
		drawLine(i);
	}
}

function drawLine(index) {
	if(lines[index] == undefined) return;
	let p1 = lines[index][0];
	let p2 = lines[index][1];
	stroke(250, 100);
	noFill();
	line(p1.x, p1.y, p2.x, p2.y);
	noStroke();
	fill(250, 100);
	ellipse(p1.x, p1.y, 8);
	ellipse(p2.x, p2.y, 8);
}

let lastX = 0;
let lastY = 0;
function mousePressed() {
	lastX = mouseX;
	lastY = mouseY;
	moved = true;
}

function mouseDragged() {
	let xdiff = mouseX - lastX;
	let ydiff = mouseY - lastY;
	xoff += xdiff;
	yoff += ydiff;
	lastX = mouseX;
	lastY = mouseY;
	moved = true;
}
