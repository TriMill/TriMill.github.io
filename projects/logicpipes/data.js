function updateNeighbors(x, y, openings) {
  for(let s = 0; s < 4; s++) {
    if(openings[s]) {
      let bxy = getTileOnSide(x, y, s);
      update(bxy[0], bxy[1]);
    }
  }
}

function update(x, y) {
  if(sceduledUpdates.length == 0)
    sceduledUpdates.push([x, y]);
  else {
    let previous = sceduledUpdates[sceduledUpdates.length-1];
    if(!(previous[0] == x && previous[1] == y))
      sceduledUpdates.push([x, y]);
  }
}

function getMaxWaterLevel(x, y, openings) {
  let maxLevel = 0;
  for(let s = 0; s < 4; s++) {
    if(openings[s]) {
      let bxy = getTileOnSide(x, y, s);
      let bordering = grid.get(bxy[0], bxy[1]);
      if(bordering != undefined) {
        if(bordering.getLevelOnSide((s+2)%4) > maxLevel) {
          maxLevel = bordering.getLevelOnSide((s+2)%4);
        }
      }
    }
  }
  return max(maxLevel - 1, 0);
}

function getWaterLevel(x, y, side) {
  let bxy = getTileOnSide(x, y, side);
  let bordering = grid.get(bxy[0], bxy[1]);
  if(bordering != undefined)
    return bordering.getLevelOnSide((side+2)%4);
  else return undefined;
}

function showStandardPipe(level, openings) {
  let waterc = getWaterFillColor(level);
  if(waterc != undefined) {
    fill(waterc);
    water.center();
    for(let i = 0; i < 4; i++) {
      if(openings[i]) water[i]();
    }
  }
  fill(colors.wall);
  for(let i = 0; i < 4; i++) {
    if(openings[i]) {
      caseWalls[(i+1)%4+'-0']();
      caseWalls[(i+3)%4+'-2']();
    } else {
      caseWalls[i+'-1']();
      caseWalls['4-'+i]();
      caseWalls['4-'+(i+1)%4]();
    }
  }
}

function getWaterFillColor(level) {
  if(level < 0) return undefined;
  if(level == 0) return colors.pipe;
  if(level == 1) return colors.waterEnd;
  return colors.water;
}

let colors = {
  wall:[150, 150, 160],
  water:[60, 60, 200],
  waterEnd:[50, 50, 160],
  pipe:[80, 80, 85],
  control:[40, 145, 20],
  led_red:[200, 20, 20],
  led_yellow:[200, 200, 20],
  led_green:[20, 200, 20],
  led_blue:[20, 20, 200],
  led_off:[5, 5, 30],
}

let caseWalls = {
  '0-0':() => rect(0, 8, 16, 16),
  '0-1':() => rect(16, 8, 48, 16),
  '0-2':() => rect(48, 8, 64, 16),

  '1-0':() => rect(48, 0, 56, 16),
  '1-1':() => rect(48, 16, 56, 48),
  '1-2':() => rect(48, 48, 56, 64),

  '2-0':() => rect(48, 48, 64, 56),
  '2-1':() => rect(16, 48, 48, 56),
  '2-2':() => rect(0, 48, 16, 56),

  '3-0':() => rect(8, 48, 16, 64),
  '3-1':() => rect(8, 16, 16, 48),
  '3-2':() => rect(8, 0, 16, 16),

  '4-0':() => rect(8,  8,  16, 16),
  '4-1':() => rect(48, 8,  56, 16),
  '4-2':() => rect(8,  48, 16, 56),
  '4-3':() => rect(48, 48, 56, 56)
}

let water = {
  center:() => rect(16, 16, 48, 48),
  '0':() => rect(16, 0, 48, 16),
  '1':() => rect(48, 16, 64, 48),
  '2':() => rect(16, 48, 48, 64),
  '3':() => rect(0, 16, 16, 48),
  'center-0':() => rect(16, 16, 48, 32),
  'center-1':() => rect(32, 16, 48, 48),
  'center-2':() => rect(16, 32, 48, 48),
  'center-3':() => rect(16, 16, 32, 48)
}
