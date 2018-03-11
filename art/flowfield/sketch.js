const BACKGROUND = [0];
const FOREGROUND = [255, 4];
const SCALE = 10;
const INC = 0.12;
const EDGES = 100;

let w, h;
let particles = [];
let vectors = [];
let fr;

function setup() {
	createCanvas(600, 600);
	w = floor(width/SCALE);
	h = floor(height/SCALE);
	fr = createP();
	for(let i = 0; i < 300; i++) {
		particles.push(new Particle(random(width), random(height)));
	}
	background(BACKGROUND);
}

function draw() {
	fill(0, 0.1)
	let xoff = 0;
	for(let x = 0; x < w; x++) {
		let yoff = 0;
		for(let y = 0; y < h; y++) {
			let index = x + y*w;
			let v = p5.Vector.fromAngle(noise(xoff, yoff, frameCount/3000)*TAU);
			v.setMag(0.2);
			vectors[index] = v;
			yoff += INC;
		}
		xoff += INC;
	}
	for(let i = 0; i < particles.length; i++) {
		particles[i].flow(vectors);
		particles[i].update();
		if(frameCount > 20) particles[i].show();
	}

	fr.html(floor(frameRate()));
}
