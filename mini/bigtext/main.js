window.onload = function() {
  let foreground = document.getElementById('foreground');
  let foregroundWrapper = document.getElementById('wrapper_foreground');
  foreground.onchange = function() { foregroundWrapper.style.backgroundColor = foreground.value; }
  foregroundWrapper.style.backgroundColor = foreground.value;

  let background = document.getElementById('background');
  let backgroundWrapper = document.getElementById('wrapper_background');
  background.onchange = function() { backgroundWrapper.style.backgroundColor = background.value; }
  backgroundWrapper.style.backgroundColor = background.value;
}

function show() {
  text = document.getElementById('text').value;
  foreground = document.getElementById('foreground').value;
  background = document.getElementById('background').value;
  font = document.getElementById('font').value;
  let body = document.getElementById('body');
  body.innerHTML = '';
  let div = document.createElement('div');
  div.innerHTML = text;
  body.appendChild(div);

  var sheet = document.getElementById('main');
  sheet.disabled = true;
  sheet.parentNode.removeChild(sheet);

  body.style.fontFamily = font;
  body.style.paddingTop = '8vw';
  body.style.fontSize = '22vw';
  body.style.alignContent = 'center';
  body.style.textAlign = 'center';
  body.style.color = foreground;
  body.style.backgroundColor = background;
  body.style.lineHeight = 0;
}
