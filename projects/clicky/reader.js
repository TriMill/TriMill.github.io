let levels;
let levelCount;
let count;

function init() {
  loadJSON('levels.json', gotLevels);
  loadLevel(0)
}

function gotLevels(ls) {
  levels = ls;
  console.log('Succesfully loaded levels.json')
}

function loadLevel(l) {
  levelCount = l;

}
