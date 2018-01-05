let circles = [];
let stopped = false;
let show = true;

function setup() {
	createCanvas(500, 500);
	randomize();
}

function draw() {
	background(0);
	if(show) {
		showCircles();
	}
	growCircles();
	if(!stopped) {
		tryToMakeCircles();
	}
	if(frameCount < 200) {
		stroke(0);
		strokeWeight(5);
		fill(255);
		textSize(18);
		textAlign(CENTER, CENTER);
		text('Press SPACE to restart, press ENTER to show/hide', width/2, 15);
	}
}

function showCircles() {
	for(let i = 0; i < circles.length; i++) {
		circles[i].show();
	}
}

function growCircles() {
	for(let i = 0; i < circles.length; i++) {
		let c = circles[i];
		if(c.hitEdge()) continue;
		let hit = false;
		for(let j = 0; j < circles.length; j++) {
			if(i == j) continue;
			let o = circles[j];
			if(c.hitCircle(o)) hit = true;
		}
		if(!hit)
			c.grow();
	}
}

function tryToMakeCircles() {
	let c = null;
	let tries = 0;
	while(c == null && tries < 30) {
		c = createCircle();
		tries++;
	}
	if(c != null)
		circles.push(c);
	else {
		stopped = true;
		console.log("STOPPED");
	}
}

function createCircle() {
	let x = random(width);
	let y = random(height);
	for(let i = 0; i < circles.length; i++) {
		if(dist(x, y, circles[i].x, circles[i].y) <= circles[i].r + 2)
			return null;
	}
	let color = getColor(x, y);
	return new Circle(x, y, color);
}


function keyTyped() {
	if(key == " ") {
		circles = [];
		randomize();
		stopped = false;
	}	else if(keyCode == ENTER) {
		show = !show;
	}
}
