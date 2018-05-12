function elem(id) {return document.getElementById(id);}

function updateFG() {
  var select = elem('selectfg');
  elem('colorfg').value = select.options[select.selectedIndex].value;
  var evt = new Event('change');
  elem('colorfg').dispatchEvent(evt)
}

function updateBG() {
  var select = elem('selectbg');
  elem('colorbg').value = select.options[select.selectedIndex].value;
  var evt = new Event('change');
  elem('colorbg').dispatchEvent(evt)
}

var options = [
  ['Black',  '0, 0, 0'],
  ['White',  '255, 255, 255'],
  ['Light Gray', '200, 200, 208'],
  ['Gray',   '150, 150, 158'],
  ['Dark Gray', '100, 100, 108'],
  ['Pink',   '240, 100, 200'],
  ['Red',    '200, 20, 10'],
  ['Orange', '250, 100, 10'],
  ['Yellow', '250, 255, 30'],
  ['Light Green', '140, 255, 90'],
  ['Green',  '0, 180, 10'],
  ['Cyan',   '30, 240, 250'],
  ['Light Blue', '140, 160, 255'],
  ['Blue',   '20, 20, 240'],
  ['Purple', '100, 10, 130'],
  ['Brown', '90, 45, 20'],
]
function setupSelects() {
  var sfg = elem('selectfg');
  var sbg = elem('selectbg');
  for(var i = 0; i < options.length; i++) {
    var option = document.createElement('option');
    option.text = options[i][0];
    option.value = options[i][1];
    sfg.add(option);
    option = document.createElement('option');
    option.text = options[i][0];
    option.value = options[i][1];
    sbg.add(option);
  }
  sfg.options[0].selected = 'selected';
  sbg.options[1].selected = 'selected';
}

function newMaze() {
  canvasWidth = elem('width').value;
  canvasHeight = elem('height').value;
  resizeCanvas(canvasWidth, canvasHeight);
  mazeWidth = elem('maze-width').value;
  mazeHeight = elem('maze-height').value;
  shiftpop = elem('shiftpop').value/100;
  var selectBias = elem('bias');
  bias = selectBias.options[selectBias.selectedIndex].value;
  frameRate(int(elem('speed').value));
  resetMaze();
  loop();
}

function getPermalinkURL() {
  var url = location.href;
  if(url.endsWith('index.html')) url = url.substring(0, url.length-'index.html'.length);
  url += 'v/?';
  var w = canvasWidth, h = canvasHeight, mw = mazeWidth, mh = mazeHeight;
  var fg = red(colorfg)+'_'+green(colorfg)+'_'+blue(colorfg);
  var bg = red(colorbg)+'_'+green(colorbg)+'_'+blue(colorbg);
  var wte = borderWeight;
  var code = encode(cells);
  url += 'w='+w+'&h='+h+'&mw='+mw+'&mh='+mh+'&fg='+fg+'&bg='+bg+'&wte='+wte+'&code='+code;
  return url;
}

function prop(from) {
  if(elem('proportional').checked) {
    var setW = elem('width').value,
      setH = elem('height').value,
      setMW = elem('maze-width').value,
      setMH = elem('maze-height').value;
      console.log(setW, setH, setMW, setMH, from);
    switch(from) {
      case 'w':
        elem('height').value = round(setMH/setMW*setW);
        break;
      case 'h':
        elem('width').value = round(setMW/setMH*setH);
        break;
      case 'mw':
        elem('width').value = round(setMW/setMH*setH);
        break;
      case 'mh':
        elem('height').value = round(setMH/setMW*setW);
        break;
    }
  }
}
