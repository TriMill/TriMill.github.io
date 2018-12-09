var chain = {
	'!':[]
}

function runChain() {
	var index = '!';
	var word = '';
	while(index != '') {
		var exits = chain[index];
		var next = exits[Math.floor(Math.random() * exits.length)];
    if(next == '') break;
    if(order == 1)
      index = next;
    else
		  index = index.slice(-order+1) + next;
		word += next;
	}
	return word;
}

function populateChain(corpus) {
  chain = {'!':[]};
  corpus = corpus.replace(/[^A-Za-z\s]|_/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  corpus = ' ' + corpus + ' ';
  for(var i = 1; i < corpus.length; i++) {
    var cur = corpus[i];
    var prev = '';
    for(var j = 0; j < order; j++) {
      if(corpus[i-1-j] == ' ') {
        prev = '!' + prev;
        break;
      }
      prev = corpus[i-1-j] + prev;
    }
    if(cur == ' ') cur = '';
    if(chain[prev] == undefined) chain[prev] = [];
    chain[prev].push(cur);
  }
  console.log(chain);
}
