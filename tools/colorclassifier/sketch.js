let samples = [
	['Red', 				[255, 0  , 0  ]],
	['Dark Red', 		[140, 0  , 0  ]],
	['Salmon', 			[255, 128, 115]],
	['Peach', 			[255, 230, 180]],
	['Orange', 			[255, 120, 0  ]],
	['Yellow', 			[255, 255, 0  ]],
	['Gold', 				[255, 190, 40 ]],
	['Yellow Green',[175, 255, 50 ]],
	['Green', 			[0  , 255, 0  ]],
	['Dark Green',	[0  , 128, 30 ]],
	['Olive Green',	[140, 190, 60 ]],
	['Forest Green',[  0, 110, 70 ]],
	['Cyan', 				[0  , 240, 255]],
	['Aqua', 				[0  , 230, 190]],
	['Blue', 				[0  , 0  , 255]],
	['Dark Blue',		[0  , 30 , 128]],
	['Teal', 				[70 , 170, 170]],
	['Periwinkle',	[150, 170, 230]],
	['Magenta', 		[255, 0  , 255]],
	['Purple', 			[120, 0  , 150]],
	['Hot Pink', 		[255, 70 , 180]],
	['Pink', 				[255, 200, 200]],
	['Black', 			[0  , 0  , 0  ]],
	['Gray',				[150, 150, 150]],
	['White',				[255, 255, 255]],
	['Chestnut', 		[150, 80 , 20 ]],
	['Brown', 			[160, 120, 80 ]]
]

let lightColors = ['White', 'Yellow', 'Yellow Green'];

let hexchars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

let current = [0, 0, 0];
let code = '';

function setup() {
	createCanvas(800, 800);
}

function draw() {
	if(code.length == 6) {
		current = decodeHexCode(code);
	}

	noStroke();

	let name = identify(current);
	let underscore = '';
	if(code.length < 6 && second() % 2 == 0) underscore = '_';

	background(keyIsDown(SHIFT) ? samples[name[2]][1] : current);
	textSize(20);
	textFont('Consolas');
	fill(lightColors.indexOf(name[0]) < 0 ? 255 : 0);
	textAlign(LEFT, TOP);
	text('#' + code + underscore, 10, 10);
	text(name[0], 10, 35);
	text('Distance: ' + round(name[1]*10)/10, 10, 60);
	text('Sample: ' + rgbToHex(samples[name[2]][1]), 10, 85);
	text('Hold SHIFT to view sample', 10, 110);
}

function componentToHex(c) { return (c.toString(16).length == 1 ? '0' : '') + c.toString(16); }

function rgbToHex(rgb) { return '#' + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]); }

function keyPressed() {
	if(keyCode === BACKSPACE || keyCode === DELETE) {
		code = code.substring(0, code.length - 1);
	}
	if(hexchars.indexOf(key) >= 0 && code.length < 6) {
		code += key.toUpperCase();
	}
}

function decodeHexCode(hex) {
	let r = parseInt(hex[0] + hex[1], 16);
	let g = parseInt(hex[2] + hex[3], 16);
	let b = parseInt(hex[4] + hex[5], 16);
	return [r, g, b];
}

function identify(col) {
	let closest = 'null';
	// max score is 442
	let closestScore = 500;
	let index = -1;
	for(let i = 0; i < samples.length; i++) {
		let cur = samples[i][1];
		let score = dist(cur[0], cur[1], cur[2], col[0], col[1], col[2]);
		if(score < closestScore) {
			closest = samples[i][0];
			closestScore = score;
			index = i;
		} else if(score == closestScore) {
			closest += ' or ' + samples[i][0];
		}
	}
	return [closest, closestScore, index];
}
