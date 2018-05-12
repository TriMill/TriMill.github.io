let fs = {
  'Title': [drawTitleScreen, clickTitleScreen],
  'Levels': [drawLevelsScreen, clickLevelsScreen],
  'About': [drawAboutScreen, clickAboutScreen]
}

function drawTitleScreen() {
  background(colors.background);
  fill(colors.text);
  drawText('Slidey', width/2, 120, 14);
  fill(isMouseInRect(width*2/5, 320, width*1/5, 100) ? colors.link : colors.text);
  drawText('Levels', width/2, 370, 5);
  fill(isMouseInRect(width*2/5, 520, width*1/5, 100) ? colors.link : colors.text);
  drawText('About', width/2, 570, 5);
}
function clickTitleScreen() {
  if(isMouseInRect(width*2/5, 320, width*1/5, 100)) return 'scr$Levels';
  if(isMouseInRect(width*2/5, 520, width*1/5, 100)) return 'scr$About';
  return null;
}

function drawLevelsScreen() {
  drawLevelLine(width/2, height/2, width/2+300, height/2);
  drawLevelLine(width/2, height/2-300, width/2, height/2);
  drawLevelIcon('1', width/2, height/2, 150, true);
  drawLevelIcon('2', width/2+300, height/2, 150, false);
  drawLevelIcon('3', width/2, height/2-300, 150, false);
  drawBack();
}
function clickLevelsScreen() {
  if(mouseOnBack()) return 'scr$Title';
  return null;
}

function drawAboutScreen() {
  drawBack();
  fill(colors.text);
  drawText('Slidey', width/2, 120, 12);
  drawText('A game by TriMill', width/2, 220, 5);
  drawText('Version ' + VERSION, width/2, 270, 3);
  drawText('The text in Slidey is set in Press Start 2P,\ndesigned by CodeMan38,' +
  ' which is available through Google Fonts.\nIf you find this hard to read, '+
  'click HERE to change it\n(this may result in some broken links).', width/2, 350);
  drawText('If you use any of the code in this project,\n'+
  'please credit me with a link to this page\nor the homepage of my website', width/2, 480);
  if(keyIsDown(SHIFT) || DBMODE) {
    fill(isMouseInRect(0, height - 40, width, 40) ? colors.link : colors.link_text);
    drawText((DBMODE?'Disable':'Enable') + ' debug mode', width/2, height - 20);
  }
  blendMode(DARKEST);
  linkInRect(width/2+100, 310, 250, 20);
  linkInRect(width/2+145, 350, 70, 20);
  blendMode(BLEND);
}
function clickAboutScreen() {
  if(mouseOnBack()) return 'scr$Title';
  if(isMouseInRect(width/2+100, 310, 250, 20))
  return 'href$https://fonts.google.com/specimen/Press+Start+2P';
  if(isMouseInRect(width/2+145, 350, 70, 20))
    FONT = ((FONT === 'Arial') ? '"Press Start 2P"' : 'Arial');
  if(isMouseInRect(0, height - 40, width, 40) && (keyIsDown(SHIFT) || DBMODE)) DBMODE = !DBMODE;
  return null;
}

function drawLevel() {
  let l = levels['1'];
  for(let i = 0; i < l.length; i++) {
    for(let j = 0; j < l[i].length; j++) {
      translate(j*64, i*64);
      tiles[l[i][j]]();
      translate(-j*64, -i*64);
    }
  }
}
