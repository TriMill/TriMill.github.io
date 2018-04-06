window.onload = function() {
  document.getElementById('starting-tab').click();
}
function getElem(id) { return document.getElementById(id); }
function getSelectedRB(name) { return document.querySelector('input[name="' + name + '"]:checked'); }
function getByClass(cl) { return document.getElementsByClassName(cl); }
function enableRadioButtons(name) {
  let elems = document.getElementsByName(name);
  for(let i in elems) elems[i].disabled = false;
}
function disableRadioButton(id) { getElem(id).disabled = true; }
function selectRadioButton(id) { getElem(id).selected = true; }

function openTab(evt, id) {
  let content = getByClass('content');
  for (let i = 0; i < content.length; i++)
    content[i].style.display = 'none';
  let tabbuttons = getByClass('tabbutton');
  for (let i = 0; i < tabbuttons.length; i++)
    tabbuttons[i].removeAttribute('active');
  getElem(id).style.display = 'block';
  evt.currentTarget.setAttribute('active', true);
  lastEvt = evt.currentTarget;
}

function getVerb() {
  return getElem('verb').value;
}

function getVerbType() {
  let elem = getSelectedRB('verbtype');
  if(elem == null) return null;
  return elem.id[9];
}

function getStemChangeIndex() {
  let name = getSelectedRB('stemchange').id.substring(11);
  if(name == 'none') return null;
  parts = name.split('.');
  for(let i = 0; i < stemChanges.length; i++) {
    if(stemChanges[i][0] == parts[0] && stemChanges[i][1] == parts[1]) return i;
  }
  return null;
}

function getStemChangeYo() {
  let name = getSelectedRB('yochange').id.substring(9);
  return (name == 'true');
}

function getYoAddLetter() {
  let name = getSelectedRB('yoletter').id.substring(9);
  return name;
}

function getRemoveVosAcc() {
  let name = getSelectedRB('vosacc').id.substring(7);
  return (name == 'true');
}

function changeOccured() {
  run(getVerb(), getVerbType(), getStemChangeIndex(), getStemChangeYo(), getYoAddLetter(), getRemoveVosAcc());
}
