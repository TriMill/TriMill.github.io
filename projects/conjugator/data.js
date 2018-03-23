let suffixesAR = ['ar', 'o', 'as', 'a', 'amos', 'áis', 'an'];
let suffixesER = ['er', 'o', 'es', 'e', 'emos', 'éis', 'en'];
let suffixesIR = ['ir', 'o', 'es', 'e', 'imos', 'ís', 'en'];
let vowels = 'aeiouáéíóúü';
let doChange = [false, true, true, true, false, false, true];
let stemChanges = [['e', 'ie'], ['o', 'ue'], ['e', 'i'], ['i', 'ie'], ['u', 'ue']];

function getStem(verb, type) {
  let suffixes = (type=='a' ? suffixesAR : (type=='e' ? suffixesER : suffixesIR));
  let s = null;
  if(verb.endsWith(suffixes[0])) s = verb.substring(0, verb.length-2);
  if(verb.endsWith(suffixes[1])) s = verb.substring(0, verb.length-1);
  if(verb.endsWith(suffixes[2])) s = verb.substring(0, verb.length-2);
  if(verb.endsWith(suffixes[3])) s = verb.substring(0, verb.length-1);
  if(verb.endsWith(suffixes[4])) s = verb.substring(0, verb.length-4);
  if(verb.endsWith(suffixes[5])) s = verb.substring(0, verb.length-(type == 'i' ? 2 : 3));
  if(verb.endsWith(suffixes[6])) s = verb.substring(0, verb.length-2);
  if(needsStemChange(verb, suffixes)) {
    s = removeStemChange(getSelectedStemChange(), s);
  }
  return s;
}

function needsStemChange(verb, suffixes) {
  for(let i = 0; i < suffixes.length; i++) {
    if(doChange[i] && verb.endsWith(suffixes[i])) return true;
  }
  return false;
}

function isPossibleStemChange(index, stem) {
  let vwl = stem[indexOfLastVowel(stem)];
  return (stemChanges[index][0] == vwl);
}

function addStemChange(index, stem) {
  if(index == null) return stem;
  let sidx = indexOfLastVowel(stem);
  let arr = stem.split('');
  arr.splice(sidx, 1, stemChanges[index][1]);
  return arr.join('');
}

function removeStemChange(index, stem) {
  if(index == null) return stem;
  let sidx = indexOfLastVowel(stem) - stemChanges[index][1].length + 1;
  let arr = stem.split('');
  arr.splice(sidx, stemChanges[index][1].length, stemChanges[index][0]);
  return arr.join('');
}

function indexOfLastVowel(str) {
  for(let i = str.length - 1; i >= 0; i--) {
    if(vowels.indexOf(str[i]) >= 0) return i;
  }
  return -1;
}
