let chain = {
	_start_:[]
}

function runChain() {
	let index = '_start_';
	let word = '';
	while(index != '') {
		let exits = chain[index];
		let next = exits[Math.floor(Math.random() * exits.length)];;
		index = next;
		word += next;
	}
	return word;
}

function populateChain(corpus) {
  chain = {_start_:[]};
  corpus = corpus.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ').toLowerCase();
  corpus = ' ' + corpus + ' ';
  for(let i = 0; i < corpus.length; i++) {
    if(corpus[i+1] == undefined) break;
    let curr = corpus[i];
    let next = corpus[i+1];
    if(curr == ' ') curr = '_start_';
    if(next == ' ') next = '';
    if(chain[curr] == undefined) chain[curr] = [];
    chain[curr].push(next);
  }
}
