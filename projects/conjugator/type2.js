function compute2(input, type) {
  let irType = (type == 'i') ? 'e' : type;
  let root;
  let lastLetter = input[input.length - 1].toLowerCase();
  let nextLetter = input[input.length - 2].toLowerCase();
  console.log(input, type);
  if(lastLetter == 'o' || lastLetter == irType) {
    // "yo" and "el" forms
    root = input.slice(0, input.length - 1);
  } else if(lastLetter == 's' && nextLetter == irType) {
    // "tu" form
    root = input.slice(0, input.length - 2);
  } else if(lastLetter == 's' && nextLetter == 'o') {
    // "nosotros" form
    root = input.slice(0, input.length - 4);
  } else if(lastLetter == 's' && nextLetter == 'i') {
    // "vosotros" form for "ar" and "er" verbs
    root = input.slice(0, input.length - 3);
  } else if(lastLetter == 's' && nextLetter == 'í') {
    // "vosotros" form for "ir" verbs
    root = input.slice(0, input.length - 2);
  } else if(lastLetter == 'n') {
    // "ellos" form
    root = input.slice(0, input.length - 2);
  } else {
    document.getElementById('error').innerHTML = 'Invalid conjugation';
    updateTable(['', '', '', '', '', '']);
    document.getElementById('new-inf').innerHTML = 'New infinitive: ';
    return;
  }
  let results = conjugate(root, type);
  updateTable(results);
  document.getElementById('new-inf').innerHTML = 'New infinitive: ' + root + type + 'r';
  document.getElementById('error').innerHTML = '';
}
