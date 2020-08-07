// Cell size; the width/height of each pixel
var cs = 30;
// The zoom level
var zoom = 0;
// The list of pixels to shade
var pix = [];
// The x and y offsets
var xoff, yoff;
// If the canvas or circle need updating
var updateCanvas = true;
var updateCircle = true;
// The circle's radius
var rad = 5.1;
// The accuracy of the circle
var steps = 8000;
// The cell size below which the grid is not drawn
var gridShow = 10;
// Whether or not the center is even
var evenCenter = false;

// Theme colors
var BACKGR, FOREGR, COLOR;

//Create the canvas, initialize the input fields, and set the theme colors.
function setup() {
	var canvas = createCanvas(900, 675);
	canvas.parent('canvas-wrapper');
	document.getElementById('radius-slider').value = rad;
	document.getElementById('radius-text').value = rad;
	document.getElementById('even-center').value = evenCenter;
	document.getElementById('accuracy').value = steps;
	xoff = width / 2 - cs / 2;
	yoff = height / 2 - cs / 2;
	resetPix();
	BACKGR = color(220);
	FOREGR = color(100);
	COLOR = color(30, 160, 60);
	document.getElementById("defaultCanvas0").onwheel = function (event) {
		event.preventDefault();
	};
	document.getElementById("defaultCanvas0").onmousewheel = function (event) {
		event.preventDefault();
	};
}

//Delete the old circle and create the highlighted center
function resetPix() {
	pix = [];
	pix.push({ x: 0, y: 0, c: COLOR });
	if (evenCenter) {
		pix.push({ x: 0, y: 1, c: COLOR });
		pix.push({ x: 1, y: 0, c: COLOR });
		pix.push({ x: 1, y: 1, c: COLOR });
	}
}

//When an update occurs, redraw the canvas on the next frame.
function draw() {
	if (updateCanvas || updateCircle) {
		background(BACKGR);
		// If only the canvas is updated, the circle doesn't need to be retraced.
		if (updateCircle) {
			resetPix();
			// Slightly decrease the radius in certian cases to prevent glitches.
			var r = rad;
			if (!evenCenter && abs(round(r) - r) == 0.5)
				r -= 0.00000001;
			else if (evenCenter && round(r) - r == 0)
				r -= 0.00000001;
			// Trace the circle to find which pixels are inside it.
			traceCircle(r);
		}
		// Draw the colored pixels to the screen.
		drawPix();
		stroke(0);
		strokeWeight(1);
		// If not zoomed out too far, draw the grid.
		if (cs > gridShow)
			drawGrid(xoff, yoff, cs);
		// Draw the highlighted circle path.
		drawCirclePath()
		// Do not update again immediately after this.
		updateCircle = false;
		updateCanvas = false;
	}
}

//Draw the grid of horsizontal and veritcal lines.
function drawGrid(xoff, yoff, gap) {
	for (var x = xoff % gap; x < width; x += gap) {
		line(x, 0, x, height);
	}
	for (var y = yoff % gap; y < height; y += gap) {
		line(0, y, width, y);
	}
}

var lastX, lastY;
//Start the drag.
function mousePressed() {
	lastX = mouseX;
	lastY = mouseY;
}

//Move the image around when dragged.
function mouseDragged() {
	if (mouseX > 0 && mouseY > 0) {
		xoff += mouseX - lastX;
		yoff += mouseY - lastY;
		lastX = mouseX;
		lastY = mouseY;
		updateCanvas = true;
	}
}

//Zoom in and out by scrolling.
function mouseWheel(event) {
	if(mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
		var c = event.delta;
		var f = (c > 0) ? 8 / 9 : (c < 0) ? 9 / 8 : 1;
		cs *= f;
		xoff = (xoff - mouseX) * f + mouseX;
		yoff = (yoff - mouseY) * f + mouseY;
		updateCanvas = true;
	}
}

//Find which pixels are in the path of the circle by tracing it.
function traceCircle(r) {
	var lx, ly;
	var cx = 0, cy = 0;
	if (evenCenter) { cx = 0.5; cy = 0.5; }
	// Go around the circle in <steps> number of steps
	for (var ang = 0; ang < 1; ang += 1 / steps) {
		var x = round(r * cos(ang * TAU) + cx);
		var y = round(r * sin(ang * TAU) + cy);
		// If the location is different from the previous one...
		if (x != lx || y != ly) {
			// ...create a shaded pixel at the location
			var obj = { x: x, y: y, c: color(FOREGR) };
			pix.push(obj);
			lx = x;
			ly = y;
		}
	}
}

// Draw the colored pixels to the screen
function drawPix() {
	noStroke()
	for (var i = 0; i < pix.length; i++) {
		fill(pix[i].c);
		rect(pix[i].x * cs + xoff, pix[i].y * cs + yoff, cs, cs);
	}
}

// Draw the colored circle path
function drawCirclePath() {
	noFill();
	// Choose stroke weight based on zoom level
	if (cs > 20) strokeWeight(2.5);
	else if (cs > gridShow) strokeWeight(1.5);
	else strokeWeight(1);
	var cx = 0, cy = 0;
	if (evenCenter) { cx = 0.5; cy = 0.5; }
	stroke(COLOR);
	ellipse(xoff + cx * cs + cs / 2, yoff + cy * cs + cs / 2, 2 * rad * cs, 2 * rad * cs);
}

// Change the radius of the circle
function updateRadius(value) {
	// Make sure the slider and text field match.
	document.getElementById('radius-slider').value = value;
	document.getElementById('radius-text').value = value;
	rad = value;
	updateCircle = true;
}


// Change the accuracy.
function updateAccuracy(value) {
	if (value != 0) {
		steps = +value;
		updateCircle = true;
	}
}

// Change the center between odd (one pixel) and even (four pixels).
function updateCenter(value) {
	old = evenCenter
	if (old == true && value == false) {
		xoff += 0.5 * cs;
		yoff += 0.5 * cs;
	} else if (old == false && value == true) {
		xoff -= 0.5 * cs;
		yoff -= 0.5 * cs;
	}
	evenCenter = value;

	updateCircle = true;
}

// Reset drag and zoom.
function resetMotion() {
	zoom = 0;
	cs = 60;
	xoff = width / 2 - cs / 2;
	yoff = height / 2 - cs / 2;
	updateCircle = true;
}
