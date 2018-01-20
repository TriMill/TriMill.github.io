
function compute1(input) {
	if(isValidInfinitive(input)) {
		let type = getType(input);
		let root = input.slice(0, input.length - 2);
		let results = conjugate(root, type);
		updateTable(results);
		document.getElementById('error').innerHTML = '';
	} else {
		updateTable(['', '', '', '', '', '']);
		document.getElementById('error').innerHTML = 'Invalid infinitive';
	}
}

function isValidInfinitive(inf) {
	return inf[inf.length - 1] == 'r' &&
	(inf[inf.length - 2] == 'a' ||
	inf[inf.length - 2] == 'e' ||
	inf[inf.length - 2] == 'i');
}

function getType(inf) {
	return inf[inf.length - 2];
}

function conjugate(root, type) {
	let ret = [];
	let list = conjugations[type];
	for(let i = 0; i < list.length; i++) {
		ret.push(root + list[i]);
	}
	return ret;
}
