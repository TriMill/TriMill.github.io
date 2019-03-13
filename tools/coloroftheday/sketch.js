function update() {
  rand = new Math.seedrandom(document.getElementById('date').value);
  colorOTD = [Math.floor(rand()*255), Math.floor(rand()*255), Math.floor(rand()*255)];
  hex = rgbToHex(colorOTD)
  name = identify(colorOTD);
  document.getElementById('color-name').innerHTML = name + ' (' + hex + ')';
  document.getElementById('color-square').style.backgroundColor = hex;
}

function today() {
  document.getElementById('date').value = new Date().toJSON().slice(0,10);
  update();
}

var random, name, colorOTD = [];

var samples = [
	['Red', 		[255, 0  , 0  ], 'Reddish'],
	['Orange', 	[255, 120, 0  ], 'Orangish'],
	['Yellow', 	[255, 255, 0  ], 'Yellowish'],
	['Gold', 		[255, 190, 40 ], 'Golden'],
	['Green', 	[0  , 255, 0  ], 'Greenish'],
	['Olive',   [140, 190, 60 ], 'Olive'],
	['Cyan', 		[0  , 240, 240], 'Cyanish'],
	['Blue', 		[0  , 0  , 255], 'Bluish'],
	['Teal', 		[70 , 170, 170], 'Tealish'],
	['Magenta', [255, 0  , 255], 'Magentish'],
	['Purple', 	[120, 0  , 150], 'Purplish'],
	['Pink', 	  [255, 200, 200], 'Pinkish'],
	['Black', 	[0  , 0  , 0  ], 'Dark'],
	['Gray',		[150, 150, 150], '-'], // Grayish and Brownish are not allowed
	['White',		[255, 255, 255], 'Light'],
	['Brown', 	[160, 120, 80 ], '-']
];

function setup() {
	canvas = createCanvas(200, 200);
  canvas.parent('canvas-wrapper');
}

function draw() {
	noStroke();
  background(colorOTD[0], colorOTD[1], colorOTD[2]);
}

function componentToHex(c) { return (c.toString(16).length == 1 ? '0' : '') + c.toString(16); }

function rgbToHex(rgb) { return '#' + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]); }

function identify(col) {
  for(var row of samples) {
    row[3] = colDistSq(row[1], col);
  }
	var sorted = samples.slice().sort(function(a, b){return a[3] - b[3]});
  if(sorted[0][3] < 2500 || sorted[1][2] == '-')
    return sorted[0][0]
  else
    return sorted[1][2] + ' ' + sorted[0][0];
}

function colDistSq(a, b) {
  return distSq(a[0], a[1], a[2], b[0], b[1], b[2]);
}

function distSq(x1, y1, z1, x2, y2, z2) {
  var dx = x2-x1;
  var dy = y2-y1;
  var dz = z2-z1;
  return dx*dx + dy*dy + dz*dz;
}
