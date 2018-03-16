function analyze() {
	let table = document.getElementById('results');
	let text = document.getElementById('text').value;
	text = text.toUpperCase();

	let stats = statistics(text);
	table.rows[1].cells[0].innerHTML = stats;
	let charfreq = charFrequencies(text);
	table.rows[1].cells[1].innerHTML = charfreq;
	let wordfreq = wordFrequencies(text);
	table.rows[1].cells[2].innerHTML = wordfreq;
}

function statistics(text) {
	let length = text.length;
	let wlen = (text.match(/\w/g) || []).length;
	let sentences = (text.match(/\.|\?|\!/g) || []).length;
	let words = (text.match(/\w+/g) || []).length;

	let ret = 'Characters: ' + length + '<br>';
	ret +=    'Word Characters: ' + wlen + '<br>';
	ret +=    'Sentences: ' + sentences + '<br>';
	ret +=    'Words: ' + words + '<br>';
	return ret;
}

function charFrequencies(text) {
	let chars = {};
	for(let i = 0; i < text.length; i++) {
		let c = text[i];
		if(chars[c] == undefined) chars[c] = 0;
		chars[c]++;
	}
	let keys = Object.keys(chars);
	let sorted = keys.sort(function(a, b) {return chars[b]-chars[a]});
	let ret = '';
	for(let i = 0; i < sorted.length; i++) {
		let char = sorted[i]
		if(/[\s\f\n\r\t\v\u00A0\u2028\u2029]/.test(char)) char = '\'' + char + '\'';
		ret += char + '&nbsp;&nbsp;&nbsp;';
		ret += chars[sorted[i]] + '<br>';
	}
	return ret;
}

function wordFrequencies(text) {
	text = text.toLowerCase();
	let words = text.replace(/[^A-Za-z\s]|_/g, '').split(/\s/);
	let count = {};
	for(let i = 0; i < words.length; i++) {
		let w = words[i];
		if(count[w] == undefined) count[w] = 0;
		count[w]++;
	}
	let keys = Object.keys(count);
	let sorted = keys.sort(function(a, b) {return count[b]-count[a]});
	let ret = '';
	for(let i = 0; i < sorted.length; i++) {
		let char = sorted[i]
		ret += char + '&nbsp;&nbsp;&nbsp;';
		ret += count[sorted[i]] + '<br>';
	}
	return ret;
}
