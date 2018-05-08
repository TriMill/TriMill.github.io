//p5.disableFriendlyErrors = true;

var w, h, mw, mh, cells, fg, bg, wte;

function setup() {
  getData();
  canvas = createCanvas(w+0.5, h+0.5);
  canvas.parent('canvas-wrapper');
  canvas.id('maze-canvas');
  noLoop();
  redraw();
}

function draw() {
  var cw = w/mw, ch = h/mh;
  background(bg);
  stroke(fg);
  strokeWeight(wte);
  for(x = 0; x < cells.length; x++) {
    for(y = 0; y < cells[x].length; y++) {
      c = cells[x][y];
      if(c[0]) line(x*cw, y*ch, x*cw+cw, y*ch);
      if(c[1]) line(x*cw+cw, y*ch, x*cw+cw, y*ch+ch);
      if(c[2]) line(x*cw, y*ch+ch, x*cw+cw, y*ch+ch);
      if(c[3]) line(x*cw, y*ch, x*cw, y*ch+ch);
    }
  }
}

function getData() {
  w = int(query('w'));
  h = int(query('h'));
  mw = int(query('mw'));
  mh = int(query('mh'));
  fg = color('rgb('+query('fg').replace(/_/g, ', ')+')');
  bg = color('rgb('+query('bg').replace(/_/g, ', ')+')');
  wte = int(query('wte'));
  cells = decode(query('code'), mw, mh);
}


function query(key) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}
