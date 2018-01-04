let found = ['Water', 'Earth', 'Fire', 'Air'];
let sortedFound = found;

let curIndex = -1;
let offset = 0;
let showTime = true;

function setup() {
	createCanvas(600, 600);
	foundUpdated();
}

function draw() {
	background(0);
	noStroke();
	drawFound();
	textSize(18);
	textAlign(CENTER, CENTER);
	text('Found: ' + found.length + ' / ' + elements.length, 300, 15);
	textAlign(LEFT, CENTER);
	text('Sort Mode: ' + getSortModeName(), 3, 585);
	textAlign(RIGHT, CENTER);
	text('Press Q for Help', 597, 585);
	if(showTime) {
		textAlign(RIGHT, CENTER);
		let min = ('0' + floor(millis()/60000)).slice(-2);
		let sec = ('0' + floor((millis()/1000)%60)).slice(-2);
		text('Time: ' + min + ':' + sec, 597, 15);
	}
}

function drawFound() {
	textSize(14);
	textFont('Calibri');
	textAlign(CENTER, CENTER);
	for(let i = 0; i < found.length; i++) {
		let yco = floor(i / 9) - offset
		if(yco >= 0 && yco < 9)
			drawElement(i % 9, yco, sortedFound[i]);
	}
}

let es = 50;
function drawElement(x, y, elem) {
	let realx = x*es*1.25 + es;
	let realy = y*es*1.25 + es;
	if(sortedFound[curIndex] == elem) {
		fill(240);
		ellipse(realx, realy, es*1.1);
	}
	fill(getColor(getClass(elem)));
	ellipse(realx, realy, es);
	fill(255);
	text(elem, realx, realy);
}

function combine(e1, e2) {
	let e3 = getOutputs(e1, e2);
	if(e3 != null) {
		for(let i = 0; i < e3.length; i++) {
			if(found.indexOf(e3[i]) < 0) {
				found.push(e3[i]);
			}
		}
	}
	foundUpdated();
}

function getIndexOfCoords(x, y) {
	let ex = round((x - es)/(es*1.25));
	let ey = round((y - es)/(es*1.25));
	if(ex < 0 || ey < 0 || ex > 8 || ey > 8) {
		return -1;
	}
	return ex + (ey + offset)*9;
}

function getHint() {
	
}

function foundUpdated() {
	sortedFound = aSort(found);
}
