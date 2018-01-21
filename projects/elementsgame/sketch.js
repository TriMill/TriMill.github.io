// Initial elements the user starts with
let found = ['Water', 'Earth', 'Fire', 'Air'];
// Sorted list of elements
let sortedFound = found;
// Number of hints available
let numHints = 1;
// Next number of milliseconds after start to give new hint at
let nextHint = 60000;
// Saved time for cookies
let savedTime = 0;

// Index of selected element
let curIndex = -1;
// Scroll offset
let offset = 0;
// Whether or not to show the stopwatch
let showTime = true;
//
let clearText = false;

function setup() {
	createCanvas(600, 600);
	loadCookie();
}

function draw() {
	// Black background
	background(0);
	if(clearText) {
		noStroke();
		fill(255, 0, 0)
		textSize(22);
		textFont('Calibri');
		textAlign(CENTER, CENTER);
		text('Savedata cleared. Please reload the page.\nIf this was a mistake, press ENTER', width/2, height/2);
		return;
	}
	if(frameCount == 0) {
		foundUpdated();
	}

	noStroke();
	manageHints();
	drawFound();
	showText();
}

function manageHints() {
	if(numHints < 5) {
		if(realMillis() >= nextHint) {
			numHints++;
			nextHint = realMillis() + 60000;
			saveCookie();
		}
	} else {
		nextHint = realMillis() + 60000;
	}
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
		let min = ('0' + floor(realMillis()/60000)).slice(-2);
		let sec = ('0' + floor((realMillis()/1000)%60)).slice(-2);
		text('Time: ' + min + ':' + sec, 597, 15);
	}
	textAlign(CENTER, CENTER);
	// Show number of hints and time until next hint
	let timeText = (numHints >= 5) ? '' : ' (' + ceil((nextHint - realMillis())/1000) + ' sec)';
	text('Hints: ' + numHints + timeText, 300, 585);
	if(clearText) {
		background(0)
		textAlign(CENTER, CENTER);
		text('Savedata cleared. Please reload the page ');
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

// Selects an element that can be used right now
function getHint() {
	// If all elements have been found
	if(found.length >= elements.length) return false;
	// Select random elements until one works
	let e1 = random(found);
	while(true) {
		// Go through each of the elements
		for(let i = 0; i < found.length; i++) {
			let outputs = getOutputs(e1, found[i]);
			let hasOutput = false;
			for(let i = 0; outputs != null && i < outputs.length; i++) {
				if(found.indexOf(outputs[i]) < 0) hasOutput = true;
			}
			// If the random element can be combined with another element to produce new
			// results, select it and return
			if(outputs != null && hasOutput) {
				curIndex = found.indexOf(e1);
				return true;
			}
		}
		e1 = random(found);
	}
}

function realMillis() {
	return millis() + savedTime;
}

// When adding, removing, or changing found elements always call this immediately after
function foundUpdated() {
	sortedFound = aSort(found);
	saveCookie();
}
