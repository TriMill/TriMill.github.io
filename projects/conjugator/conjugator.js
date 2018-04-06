function run(verb, type, stemChange, doStemChangeYo, yoAddLetter, doRemoveVosAcc) {
  let suffixes = (type == 'a' ? suffixesAR : (type == 'e' ? suffixesER : suffixesIR));
  let changes = doStemChangeYo ? doChange : doChangeNoYo;
  console.log(verb, suffixes);
  // ## Remove 'y' from yo form if yoAddLetter is 'y' ##
  if(yoAddLetter == 'y' && verb.endsWith('oy')) {
    verb = verb.substring(0, verb.length-1);
  }
  console.log(verb);
  // ## Add vosotros accent if neccesary ##
  if(doRemoveVosAcc && verb.endsWith('ais') || verb.endsWith('eis')) {
    verb = verb.slice(0, verb.length-3) + (verb[verb.length-3] == 'a' ? 'á' : 'é') +
    verb.slice(verb.length - 2);
  } else if(doRemoveVosAcc && verb.endsWith('is')) {
    verb = verb.slice(0, verb.length-2) + 'í' +verb.slice(verb.length - 1);
  }
  console.log(verb);
  // ## Get verb stem (ignoring stem change) ##
  let stem, conj;
  for(let i = 0; i < suffixes.length; i++) {
    if(verb.endsWith(suffixes[i])) {
      stem = verb.substring(0, verb.length - suffixes[i].length);
      conj = i;
      break;
    }
  }
  console.log(stem, conj);
  // ## Factor in stem change ##
  if(stemChange != null && changes[conj]) {
    let i = stem.lastIndexOf(stemChanges[stemChange][1]);
    stem = stem.slice(0, i) + stemChanges[stemChange][0] +
    stem.slice(i+stemChanges[stemChange][1].length);
  }
  console.log(stem);
  // ## Remove 'g' from 'g' verbs ##
  if(yoAddLetter == 'g' && stem.endsWith('g') && conj == 1) {
    stem = stem.substring(0, stem.length-1);
  }
  console.log(stem);

//   #############################################
//   #      Stem finished, time to conjugate     #
//   #############################################

  let forms = [];
  for(let i = 0; i < suffixes.length; i++) {
    let newstem = stem;
    // Stem change
    if(stemChange != null && changes[i]) {
      let i = newstem.lastIndexOf(stemChanges[stemChange][0]);
      newstem = newstem.slice(0, i) + stemChanges[stemChange][1] +
      newstem.slice(i+stemChanges[stemChange][0].length);
    }
    // Regular
    let form = newstem + suffixes[i];
    // Extra 'y' or 'g'
    if(i == 1 && yoAddLetter == 'y') {
      form += 'y';
    } else if(i == 1 && yoAddLetter == 'g') {
      form = addG(form);
    }
    // Remove accent on vosotros
    let len = form.length;
    if(i == 5 && doRemoveVosAcc && (form.endsWith('áis') || form.endsWith('éis'))) {
      form = form.slice(0, len-3) + (form[len-3] == 'á' ? 'a' : 'e') +
      form.slice(len - 2);
    } else if(i == 5 && doRemoveVosAcc && form.endsWith('ís')) {
      form = form.slice(0, len-3) + 'i' + form.slice(len - 2);
    }
    forms.push(form)
  }
  console.log(forms);
  let text = '';
  for(let i = 0; i < forms.length; i++) {
    text += forms[i];
    if(i != forms.length - 1) text += '<br>';
  }
  getElem('results').innerHTML = text;
}
