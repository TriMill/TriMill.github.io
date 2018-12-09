const SAMPLES = 500000;
const TRIES = 50000;
const FAILTEXT = 'Input conditions may be impossible: tried ' + TRIES + ' times and failed.';

var minLength = 3;
var maxLength = 10;
var order = 1;

window.onload = function() {
	repopulate();
}

function repeatRun(times) {
	document.getElementById('results').innerHTML = '';
	for(var i = 0; i < times; i++) {
		var word = getGoodChainOutput();
		if(word == null) {
			document.getElementById('results').innerHTML = FAILTEXT;
			return;
		}
		var p = document.createElement("P");
		p.className = "nospace";
		p.innerHTML = word;
		document.getElementById('results').appendChild(p);
	}
}

function repeatRunReturn(times) {
	var ret = [];
	for(var i = 0; i < times; i++) {
		var ch = getGoodChainOutput();
		if(ch == null) return null;
		ret.push(ch);
	}
	return ret;
}

function getGoodChainOutput() {
	var word = runChain();
	var i = 0;
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
	var run = repeatRunReturn(SAMPLES);
	if(run == null) {
		document.getElementById('results').innerHTML = FAILTEXT;
	}
	var results = {};
	for(var i = 0; i < run.length; i++) {
		var w = run[i];
		if(results[w] != undefined) results[w] += 1;
		else results[w] = 1;
	}
	var sorted = Object.keys(results).sort(function(a, b) {return results[b]-results[a]});
	sorted.splice(50);
	var final = '';
	for(var i = 0; i < sorted.length; i++) {
		final += sorted[i];
		var ns = Math.ceil((maxLength+1)/2) - sorted[i].length + 1;
		for(var i = 0; i < ns; i++) { final += '&nbsp;'; }
		final += '(' + format(Math.round(10000*results[sorted[i]]/SAMPLES)/100, 1, 2) + '%)';
		final += '<br>';
	}
	document.getElementById('results').innerHTML = final;
}

function format(number, wholeDigits, decimalDigits) {
	var nstr = String(number);
	var parts = nstr.split('.');
	var whole = parts[0], decimal = parts[1];
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
	var corpus = document.getElementById('corpus').value;
	populateChain(corpus);
}

function minmax() {
	minLength = document.getElementById('min_length').value;
	maxLength = document.getElementById('max_length').value;
}

function setOrder() {
  order = document.getElementById('markov_order').value;
  repopulate();
}

function preset() {
  document.getElementById('corpus').value = presets[document.getElementById('preset').value];
  repopulate();
}
