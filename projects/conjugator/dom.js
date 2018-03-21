let lastEvt = null;

window.onload = function() {
  document.getElementById('starting-tab').click();
}

function openTab(evt, id) {
    let content = document.getElementsByClassName('content');
    for (let i = 0; i < content.length; i++) {
      content[i].style.display = 'none';
    }
    let tabbuttons = document.getElementsByClassName('tabbutton');
    for (let i = 0; i < tabbuttons.length; i++) {
      tabbuttons[i].removeAttribute('active');
    }
    document.getElementById(id).style.display = 'block';
    evt.currentTarget.setAttribute('active', true);
    lastEvt = evt.currentTarget;
}

function getVerbType() {
  let id = document.querySelector('input[name="verbtype"]:checked').id;
  return id[9];
}

function verbChanged() {
  let verb = document.getElementById('verb').value;
  document.getElementById("verbtype-ar").disabled = true;
  document.getElementById("verbtype-er").disabled = true;
  document.getElementById("verbtype-ir").disabled = true;
  if(endsWith(verb, suffixesAR)) {
    document.getElementById("verbtype-ar").disabled = false;
  }
  if(endsWith(verb, suffixesER)) {
    document.getElementById("verbtype-er").disabled = false;
  }
  if(endsWith(verb, suffixesIR)) {
    document.getElementById("verbtype-ir").disabled = false;
  }
  changeOccured();
}

function endsWith(str, array) {
  for(let i = 0; i < array.length; i++) {
    if(str.endsWith(array[i])) return true;
  }
  return false;
}

function radioChanged() {
  changeOccured();
}

function changeOccured() {
  let verb = document.getElementById("verb").value;
  let type = getVerbType();
  updateResults(verb, type);
}
