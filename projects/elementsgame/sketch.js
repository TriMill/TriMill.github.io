// Initial elements the user starts with
let found = ['Water', 'Earth', 'Fire', 'Air'];
// Sorted list of elements
let sortedFound = found;

// Index of selected element
let curIndex = -1;
// Scroll offset
let offset = 0;
// Whether or not to show the stopwatch
let showTime = true;

function setup() {
	createCanvas(600, 600);
	foundUpdated();
}

function draw() {
	// Black background
	background(0);
	noStroke();
	drawFound();
	showText();
}

function showText() {
	textSize(18);
	textAlign(CENTER, CENTER);
	// Show number of elements found
	text('Found: ' + found.length + ' / ' + elements.length, 300, 15);
	textAlign(LEFT, CENTER);
	// Show current sorting mode
	text('Sort Mode: ' + getSortModeName(), 3, 585);
	textAlign(RIGHT, CENTER);
	// Show help message
	text('Press Q for Help', 597, 585);
	// Show stopwatch if supposed to
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
		// Calculate grid-y coordinate
		let gridy = floor(i / 9) - offset
		// Draw the element at the grid-x and grid-y positions if it's onscreen
		if(gridy >= 0 && gridy < 9)
			drawElement(i % 9, gridy, sortedFound[i]);
	}
}

// Size of elements
let es = 50;
function drawElement(x, y, elem) {
	// Calculate real x and y coordinates from grid-x and grid-y
	let realx = x*es*1.25 + es;
	let realy = y*es*1.25 + es;
	// Draw a white circle around the selected element
	if(sortedFound[curIndex] == elem) {
		fill(240);
		ellipse(realx, realy, es*1.1);
	}
	// Draw the element as a colored circle
	fill(getColor(getClass(elem)));
	ellipse(realx, realy, es);
	// Show the name of the element
	fill(255);
	text(elem, realx, realy);
}

// Combine two elements and add the outcome to the found list
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

// Convert real-x and real-y to an index. Returns -1 if invalid
function getIndexOfCoords(x, y) {
	let ex = round((x - es)/(es*1.25));
	let ey = round((y - es)/(es*1.25));
	if(ex < 0 || ey < 0 || ex > 8 || ey > 8) {
		return -1;
	}
	return ex + (ey + offset)*9;
}

function getHint() {
	// TODO Implement hints, new hint every few minutes, hints select one element that can be used
}

// When adding, removing, or changing found elements always call this immediately after
function foundUpdated() {
	sortedFound = aSort(found);
}
