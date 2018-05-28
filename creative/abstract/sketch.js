function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
}

function draw() {
	strokeWeight(3);
	if(frameCount % 20 == 0) {
		switch(floor(random()*3)){
			case 0: addCircle(); break;
			case 1: addSquare(); break;
			case 2: addLine(); break;
		}
	}
}

function addCircle() {
	noFill();
	stroke(randomColor());
	push()
	translate(random()*width, random()*height);
	ellipse(0, 0, random()*(width+height)/8+(width+height)/30);
	pop();
}

function addLine() {
	let midx = random()*width*3/4 + width*1/8;
	let midy = random()*height*3/4 + height*1/8;
	let horizontal = random([true, false]);
	noFill();
	stroke(randomColor());
	if(horizontal) {
		let len = random()*width*1/2 + width*1/20;
		line(midx - len/2, midy, midx + len/2, midy)
	} else {
		let hig = random()*height*1/2 + height*1/20;
		line(midx, midy - hig/2, midx, midy + hig/2)
	}
}

function addSquare() {
	let size = random()*(width+height)/6;
	let x = random()*(width-size);
	let y = random()*(height-size);
	noFill();
	stroke(randomColor());
	rect(x, y, size, size);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	background(0);
}

function randomColor() {
	return [random()*255, random()*255, random()*255, random()*128+127];
}
