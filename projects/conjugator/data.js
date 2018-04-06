let suffixesAR = ['ar', 'o', 'as', 'a', 'amos', 'áis', 'an'];
let suffixesER = ['er', 'o', 'es', 'e', 'emos', 'éis', 'en'];
let suffixesIR = ['ir', 'o', 'es', 'e', 'imos', 'ís', 'en'];
let vosotrosNoAcc = {'a':'ais', 'e':'eis', 'i':'is'};
let vowels = 'aeiouáéíóúü';
let doChange =     [false, true , true, true, false, false, true];
let doChangeNoYo = [false, false, true, true, false, false, true];
let stemChanges = [['e', 'ie'], ['o', 'ue'], ['e', 'i'], ['i', 'ie'], ['u', 'ue']];

function addG(yo) {
  yo = yo.slice(0, yo.length - 1);
  if(vowels.split('').indexOf(yo[yo.length-1]) >= 0)
    yo += 'i';
  yo += 'go';
  return yo;
}
