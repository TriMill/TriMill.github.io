let rects = [];
let newestRects = [new Rectangle(0, 0, 600, [180, 180, 180])];
let change = true;

function setup() {
	createCanvas(600, 600);
}

function draw() {
	if(change) {
		background(0);
		for(let i = 0; i < rects.length; i++) {
			rects[i].show();
		}
		for(let i = 0; i < newestRects.length; i++) {
			newestRects[i].show();
		}
		change = false;
	}
}

function mouseClicked() {
	change = true;
	let oldRects = newestRects;
	newestRects = [];
	for(let i = 0; i < oldRects.length; i++) {
		let n = oldRects[i].subdivide();
		newestRects = newestRects.concat(n);
	}
	rects = rects.concat(oldRects);
}

function Rectangle(x, y, w, col) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.col = col;

	this.show = function() {
		stroke(0);
		strokeWeight(2);
		fill(this.col);
		rect(this.x, this.y, this.w, this.w);
	}

	this.subdivide = function() {
		let ret = [];
		if(random() < 0.45 || rects.length == 0) {
			let o = this.w/2;
			let newcol = changeColor(this.col, this.w);
			ret.push(new Rectangle(this.x  , this.y  , this.w/2, newcol));
			newcol = changeColor(this.col, this.w);
			ret.push(new Rectangle(this.x+o, this.y  , this.w/2, newcol));
			newcol = changeColor(this.col, this.w);
			ret.push(new Rectangle(this.x  , this.y+o, this.w/2, newcol));
			newcol = changeColor(this.col, this.w);
			ret.push(new Rectangle(this.x+o, this.y+o, this.w/2, newcol));
		}
		return ret;
	}
}

function changeColor(col, size) {
	let factor = size/5;
	let r = col[0] + random()*factor - factor/2;
	let g = col[1] + random()*factor - factor/2;
	let b = col[2] + random()*factor - factor/2;
	return [r, g, b];
}
