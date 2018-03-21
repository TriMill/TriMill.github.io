let suffixesAR = ['ar', 'o', 'as', 'a', 'amos', 'áis', 'an'];
let suffixesER = ['er', 'o', 'es', 'e', 'emos', 'éis', 'en'];
let suffixesIR = ['ir', 'o', 'es', 'e', 'imos', 'ís', 'en'];

function getStem(verb, type) {
  let suffixes = (type=='a' ? suffixesAR : (type=='e' ? suffixesER : suffixesIR));
  if(verb.endsWith(suffixes[0])) return verb.substring(0, verb.length-2);
  if(verb.endsWith(suffixes[1])) return verb.substring(0, verb.length-1);
  if(verb.endsWith(suffixes[2])) return verb.substring(0, verb.length-2);
  if(verb.endsWith(suffixes[3])) return verb.substring(0, verb.length-1);
  if(verb.endsWith(suffixes[4])) return verb.substring(0, verb.length-4);
  if(verb.endsWith(suffixes[5])) return verb.substring(0, verb.length-(type == 'i' ? 2 : 3));
  if(verb.endsWith(suffixes[6])) return verb.substring(0, verb.length-2);
  return null;
}
