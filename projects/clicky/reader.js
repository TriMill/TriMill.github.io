let levels = null;
let levelCount;

let count;
let order;
let reset;

function gotLevels(ls) {
  levels = ls;
  console.log('Succesfully loaded levels.json');
  console.log(levels);
  loadLevel(1);
}

function loadLevel(l) {
  levelCount = l;
  count = levels['levels']['' + l]['count'];
  order = levels['levels']['' + l]['order'];
  reset = levels['levels']['' + l]['reset'];
}
