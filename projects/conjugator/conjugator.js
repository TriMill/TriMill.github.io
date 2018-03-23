function updateResults(verb, type) {
  conjugate(getStem(verb, type), type);
}

function conjugate(stem, type) {
  let suffixes = (type=='a' ? suffixesAR : (type=='e' ? suffixesER : suffixesIR));
  let forms = []
  for(let i = 0; i < suffixes.length; i++) {
    let st = stem;
    if(doChange[i]) st = addStemChange(getSelectedStemChange(), st);
    forms.push(st + suffixes[i]);
  }
  let results = document.getElementById('results');
  results.innerHTML = '';
  for(let i = 0; i < forms.length; i++) {
    results.innerHTML += forms[i] + '<br>';
  }
}

function getInfinitive(stem, type) {
  return stem + type + 'r';
}
