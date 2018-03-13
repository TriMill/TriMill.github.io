const SAMPLES = 500000;
const TRIES = 50000;
const FAILTEXT = 'Input conditions may be impossible: tried ' + TRIES + ' times and failed.';

let minLength = 3;
let maxLength = 10;

window.onload = function() {
	repopulate();
}

function repeatRun(times) {
	document.getElementById('results').innerHTML = '';
	for(let i = 0; i < times; i++) {
		let word = getGoodChainOutput();
		if(word == null) {
			document.getElementById('results').innerHTML = FAILTEXT;
			return;
		}
		let p = document.createElement("P");
		p.className = "nospace";
		p.innerHTML = word;
		document.getElementById('results').appendChild(p);
	}
}

function repeatRunReturn(times) {
	let ret = [];
	for(let i = 0; i < times; i++) {
		let ch = getGoodChainOutput();
		if(ch == null) return null;
		ret.push(ch);
	}
	return ret;
}

function getGoodChainOutput() {
	let word = runChain();
	let i = 0;
	while(word.length < minLength || word.length > maxLength) {
		word = runChain();
		i++
		if(i > 5000) return null;
	}
	return word;
}

function analyze() {
	document.getElementById('results').innerHTML = 'Analyzing...';
	setTimeout(doAnalyze);
}

function doAnalyze() {
	let run = repeatRunReturn(SAMPLES);
	if(run == null) {
		document.getElementById('results').innerHTML = FAILTEXT;
	}
	let results = {};
	for(let i = 0; i < run.length; i++) {
		let w = run[i];
		if(results[w] != undefined) results[w] += 1;
		else results[w] = 1;
	}
	let sorted = Object.keys(results).sort(function(a, b) {return results[b]-results[a]});
	sorted.splice(50);
	let final = '';
	for(let i = 0; i < sorted.length; i++) {
		final += sorted[i];
		let ns = Math.ceil((maxLength+1)/2) - sorted[i].length + 1;
		for(let i = 0; i < ns; i++) { final += '&nbsp;'; }
		final += '(' + format(Math.round(10000*results[sorted[i]]/SAMPLES)/100, 1, 2) + '%)';
		final += '<br>';
	}
	document.getElementById('results').innerHTML = final;
}

function format(number, wholeDigits, decimalDigits) {
	let nstr = String(number);
	let parts = nstr.split('.');
	let whole = parts[0], decimal = parts[1];
	while(whole != null && whole.length < wholeDigits) {
		whole = '0' + whole;
	}
	while(decimal != null && decimal.length < decimalDigits) {
		decimal += '0';
	}
	if(whole == undefined) whole = 0;
	if(decimal == undefined) decimal = 0;
	return whole + '.' + decimal;
}

function repopulate() {
	let corpus = document.getElementById('corpus').value;
	populateChain(corpus);
}

function minmax() {
	minLength = document.getElementById('min_length').value;
	maxLength = document.getElementById('max_length').value;
}
