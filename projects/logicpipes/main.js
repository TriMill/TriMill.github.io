// Sides: up is 0, right is 1, down is 2, left is 3.
const MAX_LEVEL = 12;

let sceduledUpdates = [];
let runLoop = true;
let grid = new Grid(3, 3);
let xoff = 0;
let yoff = 0;
let sc = 2;

function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMode(CORNERS);
	grid.set(0, 0, new SourcePipe(0, 0, [false, true, true, false]));
	grid.set(1, 0, new SwitchPipe(1, 0, 1));
	grid.set(2, 0, new SimplePipe(2, 0, [false, false, true, true]));
	grid.set(0, 1, new SwitchPipe(0, 1, 0));
	grid.set(2, 1, new SwitchPipe(2, 1, 0));
	grid.set(0, 2, new SimplePipe(0, 2, [true, true, false, false]));
	grid.set(1, 2, new PumpPipe(1, 2, 3));
	grid.set(2, 2, new SimplePipe(2, 2, [true, false, true, true]));
	grid.set(2, 3, new LedPipe(2, 3, 0, 'red'));

	grid.set(4, 0, new SourcePipe(4, 0, [false, true, true, false]));
	grid.set(5, 0, new SimplePipe(5, 0, [false, true, true, true]));
	grid.set(6, 0, new SimplePipe(6, 0, [false, false, true, true]));
	grid.set(4, 1, new SimplePipe(4, 1, [true, false, true, false]));
	grid.set(5, 1, new SwitchPipe(5, 1, 0));
	grid.set(6, 1, new SwitchPipe(6, 1, 0));
	grid.set(4, 2, new SimplePipe(4, 2, [true, true, false, false]));
	grid.set(5, 2, new TransistorPipe(5, 2, 0));
	grid.set(6, 2, new TransistorPipe(6, 2, 3));
	grid.set(6, 3, new LedPipe(6, 3, 0, 'green'));
}

function draw() {
	background(0);
	noStroke();
	translate(xoff, yoff);
	scale(sc);
	if(frameCount == 1) init();
	for(let x = 0; x < grid.getWidth(); x++) {
		for(let y = 0; y < grid.getHeight(); y++) {
			translate(x*64, y*64);
			if(grid.get(x, y) != undefined)
				grid.get(x, y).show();
			translate(-x*64, -y*64);
		}
	}
	let maxUpdates = runLoop ? 50 : 0;
	let i = 0;
	while(sceduledUpdates.length > 0) {
		let xy = sceduledUpdates.shift();
		let tile = grid.get(xy[0], xy[1]);
		if(tile != undefined) {
			tile.updated();
			// console.log('@ ' + tile.x + ' ' + tile.y + ' ' + tile.getName() + ' updated');
		}
		i++;
		if(i > maxUpdates) break;
	}
	noStroke();
	fill(240);
	text('LogicPipes WIP', 220, 220);
}

function init() {
	for(let x = 0; x < grid.getWidth(); x++) {
		for(let y = 0; y < grid.getHeight(); y++) {
			if(grid.get(x, y) != undefined && grid.get(x, y).getName() == 'SourcePipe') {
				updateNeighbors(x, y, grid.get(x, y).open);
			}
		}
	}
}

function getTileOnSide(x, y, side) {
	let xo = (side === 1 ? 1 : 0) + (side === 3 ? -1 : 0);
	let yo = (side === 0 ? -1 : 0) + (side === 2 ? 1 : 0);
	return [xo+x, yo+y];
}

function mouseClicked() {
	let xc = floor((mouseX-xoff)/64/sc);
	let yc = floor((mouseY-yoff)/64/sc);
	let tile = grid.get(xc, yc);
	if(tile != undefined && tile.onClick)
		tile.onClick();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

let lastX = 0;
let lastY = 0;
function mousePressed() {
	lastX = mouseX;
	lastY = mouseY;
}

function mouseDragged() {
	let xdiff = mouseX - lastX;
	let ydiff = mouseY - lastY;
	xoff += xdiff;
	yoff += ydiff;
	lastX = mouseX;
	lastY = mouseY;
}

function mouseWheel(event) {
	let sfac = event.delta > 0 ? 1/2 : 2;
	sc *= sfac;
	xoff = (xoff - mouseX) * sfac + mouseX;
	yoff = (yoff - mouseY) * sfac + mouseY;
	return false;
}
