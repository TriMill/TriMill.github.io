let conjugations = {
	'a':['o', 'as', 'a', 'amos', 'áis', 'an'],
	'e':['o', 'es', 'e', 'emos', 'éis', 'en'],
	'i':['o', 'es', 'e', 'imos', 'ís', 'en']
}

window.onload = function() {
	enter2Clicked();
	enter1Clicked();
}

function enter1Clicked() {
	let input = document.getElementById('in-1').value;
	compute1(input);
}

function enter2Clicked() {
	let input = document.getElementById('in-2').value;
	let type;
	if (document.getElementById('a-radio').checked) {
  	type = document.getElementById('a-radio').value;
	} else if (document.getElementById('e-radio').checked) {
  	type = document.getElementById('e-radio').value;
	} else {
  	type = document.getElementById('i-radio').value;
	}
	compute2(input, type);
}

function updateTable(results) {
	document.getElementById('yo').innerHTML = results[0];
	document.getElementById('tu').innerHTML = results[1];
	document.getElementById('el').innerHTML = results[2];
	document.getElementById('nosotros').innerHTML = results[3];
	document.getElementById('vosotros').innerHTML = results[4];
	document.getElementById('ellos').innerHTML = results[5];
}
