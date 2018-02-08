// -----------------------------------------------------------------------------

function SimplePipe(x, y, openings) {
  this.level = 0;
  this.open = openings;
  this.x = x;
  this.y = y;

  this.updated = function() {
    let newLevel = getMaxWaterLevel(this.x, this.y, this.open);
    if(this.level != newLevel) {
      this.level = newLevel;
      updateNeighbors(this.x, this.y, this.open);
    }
  }

  this.getLevelOnSide = function(side) { return this.open[side] ? this.level : 0; }

  this.show = function() { showStandardPipe(this.level, this.open); }

  this.getName = function() { return 'SimplePipe'; }
}

// -----------------------------------------------------------------------------

function SourcePipe(x, y, openings) {
  this.level = MAX_LEVEL;
  this.open = openings;
  this.x = x;
  this.y = y;
  //updateNeighbors(this.x, this.y, this.open);

  this.updated = function() {
  }

  this.getLevelOnSide = function(side) { return this.open[side] ? this.level : 0; }

  this.show = function() {
    showStandardPipe(this.level, this.open);
    fill(colors.wall);
    ellipse(32, 32, 20);
    fill(colors.water);
    ellipse(32, 32, 10);
    showStandardPipe(-1, this.open);
  }

  this.getName = function() { return 'SourcePipe'; }
}

// -----------------------------------------------------------------------------

function SwitchPipe(x, y, sourceSide) {
  // Source and drain are actually the same
  this.source = sourceSide;
  this.drain = (sourceSide+2)%4;
  this.sourceLevel = 0;
  this.drainLevel = 0;
  this.open = false;
  this.x = x;
  this.y = y;

  this.updated = function() {
    let newSourceLevel = max(getWaterLevel(this.x, this.y, this.source) - 1, 0);
    let newDrainLevel  = max(getWaterLevel(this.x, this.y, this.drain ) - 1, 0);
    if(this.open) {
      newSourceLevel = max(newSourceLevel, newDrainLevel);
      newDrainLevel = newSourceLevel;
    }
    if(newSourceLevel != this.sourceLevel) {
      this.sourceLevel = newSourceLevel;
      let openings = [false, false, false, false];
      openings[this.source] = true;
      updateNeighbors(this.x, this.y, openings);
    }
    if(newDrainLevel != this.drainLevel) {
      this.drainLevel = newDrainLevel;
      let openings = [false, false, false, false];
      openings[this.drain] = true;
      updateNeighbors(this.x, this.y, openings);
    }
  }

  this.getLevelOnSide = function(side) {
    if(side === this.source) return this.sourceLevel;
    if(side === this.drain) return this.drainLevel;
    return 0;
  }

  this.show = function() {
    let openings = [false, false, false, false];
    openings[this.source] = true;
    openings[this.drain] = true;
    showStandardPipe(0, openings);
    fill(255, 0, 0);
    ellipse(32, 32, 16);
    fill(getWaterFillColor(this.sourceLevel));
    water['center-'+this.source]();
    water[this.source]();
    fill(getWaterFillColor(this.drainLevel));
    water['center-'+this.drain]();
    water[this.drain]();
    fill(colors.wall);
    if(this.source % 2 == 0) {
      rect(16, 24, 24, 40);
      rect(40, 24, 48, 40);
    } else {
      rect(24, 16, 40, 24);
      rect(24, 40, 40, 48);
    }
    fill(colors.control);
    if(!this.open) ellipse(32, 32, 16);
    else ellipse(32, 32, 8);

  }

  this.onClick = function() {
    this.open = !this.open;
    update(this.x, this.y);
    console.log(this.open);
  }

  this.getName = function() { return 'SwitchPipe'; }
}

// -----------------------------------------------------------------------------

function TransistorPipe(x, y, gateSide) {
  // Source and drain are actually the same
  this.gate = gateSide;
  this.source = (gateSide+1)%4;
  this.drain = (gateSide+3)%4;
  this.gateLevel = 0;
  this.sourceLevel = 0;
  this.drainLevel = 0;
  this.x = x;
  this.y = y;

  this.updated = function() {
    let newSourceLevel = max(getWaterLevel(this.x, this.y, this.source) - 1, 0);
    let newDrainLevel  = max(getWaterLevel(this.x, this.y, this.drain ) - 1, 0);
    let newGateLevel   = max(getWaterLevel(this.x, this.y, this.gate  ) - 1, 0);
    if(newGateLevel < 1) {
      newSourceLevel = max(newSourceLevel, newDrainLevel);
      newDrainLevel = newSourceLevel;
    }
    if(newSourceLevel != this.sourceLevel || newDrainLevel != this.drainLevel || newGateLevel != this.gateLevel) {
      this.sourceLevel = newSourceLevel;
      this.drainLevel = newDrainLevel;
      let openings = [false, false, false, false];
      openings[this.source] = true;
      openings[this.drain] = true;
      updateNeighbors(this.x, this.y, openings);
    }
    if(newGateLevel != this.gateLevel) {
      this.gateLevel = newGateLevel;
      let openings = [false, false, false, false];
      openings[this.gate] = true;
      updateNeighbors(this.x, this.y, openings);
    }
  }

  this.getLevelOnSide = function(side) {
    if(side === this.source) return this.sourceLevel;
    if(side === this.drain)  return this.drainLevel;
    if(side === this.gate)   return 0;
    return 0;
  }

  this.show = function() {
    let openings = [false, false, false, false];
    openings[this.source] = true;
    openings[this.drain] = true;
    openings[this.gate] = true;
    showStandardPipe(0, openings);
    // Source water
    fill(getWaterFillColor(this.sourceLevel));
    water['center-'+this.source]();
    water[this.source]();
    // Drain water
    fill(getWaterFillColor(this.drainLevel));
    water['center-'+this.drain]();
    water[this.drain]();
    // Gate input water
    fill(getWaterFillColor(this.gateLevel));
    water[this.gate]();

    // Easier for non-rect shapes
    translate(32, 32);
    rotate(TAU/4 * this.gate);
    // Gate center water
    fill(getWaterFillColor(this.gateLevel));
    triangle(12-32, 12-32, 52-32, 12-32, 0, 0);
    // Triangle-shaped separation lines
    noFill();
    stroke(colors.wall);
    strokeWeight(8);
    line(12-32, 12-32, 0, 0);
    line(52-32, 12-32, 0, 0);
    // Green control line
    stroke(colors.control);
    strokeWeight(2);
    if(this.gateLevel > 0) line(0, -8, 0, 16);
    else line(0, -24, 0, 0);
    // Transform back
    rotate(-TAU/4 * this.gate);
    translate(-32, -32);
    noStroke();

  }

  this.getName = function() { return 'TransistorPipe'; }
}

// -----------------------------------------------------------------------------

function CrossoverPipe(x, y, topSource) {
  this.topLevel = 0;
  this.topOpen = [false, false, false, false];
  this.topOpen[topSource] = true;
  this.topOpen[(topSource+2)%4] = true;
  this.bottomLevel = 0;
  this.bottomOpen = [false, false, false, false];
  this.bottomOpen[(topSource+1)%4] = true;
  this.bottomOpen[(topSource+3)%4] = true;
  this.x = x;
  this.y = y;

  this.updated = function() {
    let newTopLevel = getMaxWaterLevel(this.x, this.y, this.topOpen);
    let newBottomLevel = getMaxWaterLevel(this.x, this.y, this.bottomOpen);
    if(this.topLevel != newTopLevel) {
      this.topLevel = newTopLevel;
      updateNeighbors(this.x, this.y, this.topOpen);
    }
    if(this.bottomLevel != newBottomLevel) {
      this.bottomLevel = newBottomLevel;
      updateNeighbors(this.x, this.y, this.bottomOpen);
    }
  }

  this.getLevelOnSide = function(side) {
    return this.topOpen[side] ? this.topLevel : (this.bottomOpen[side] ? this.bottomLevel : 0);
  }

  this.show = function() {
    showStandardPipe(this.bottomLevel, this.bottomOpen);
    showStandardPipe(this.topLevel, this.topOpen);
  }

  this.getName = function() { return 'CrossoverPipe'; }
}

// -----------------------------------------------------------------------------

function PumpPipe(x, y, sourceSide) {
  this.source = sourceSide;
  this.drain = (sourceSide+2)%4;
  this.sourceLevel = 0;
  this.drainLevel = 0;
  this.x = x;
  this.y = y;

  this.updated = function() {
    let newSourceLevel = max(getWaterLevel(this.x, this.y, this.source) - 1, 0);
    let newDrainLevel  = max(getWaterLevel(this.x, this.y, this.drain ) - 1, 0);
    newDrainLevel = max(newDrainLevel, newSourceLevel);
    if(newSourceLevel != this.sourceLevel) {
      this.sourceLevel = newSourceLevel;
    }
    if(newDrainLevel != this.drainLevel) {
      this.drainLevel = newDrainLevel;
      let openings = [false, false, false, false];
      openings[this.drain] = true;
      updateNeighbors(this.x, this.y, openings);
    }
  }

  this.getLevelOnSide = function(side) {
    if(side === this.source) return 0;
    if(side === this.drain) return this.drainLevel;
    return 0;
  }

  this.show = function() {
    let openings = [false, false, false, false];
    openings[this.source] = true;
    openings[this.drain] = true;
    showStandardPipe(0, openings);
    fill(255, 0, 0);
    ellipse(32, 32, 16);
    fill(getWaterFillColor(this.sourceLevel));
    water['center-'+this.source]();
    water[this.source]();
    fill(getWaterFillColor(this.drainLevel));
    water['center-'+this.drain]();
    water[this.drain]();
    fill(colors.wall);
    if(this.source % 2 == 0) {
      rect(16, 24, 24, 40);
      rect(40, 24, 48, 40);
    } else {
      rect(24, 16, 40, 24);
      rect(24, 40, 40, 48);
    }
    translate(32, 32);
    rotate(TAU/4 * this.drain);
    fill(colors.control);
    triangle(-16, -8, 0, -24, 16, -8);
    rect(-8, -8, 8, 24);
    rotate(-TAU/4 * this.drain);
    translate(-32, -32);

  }

  this.getName = function() { return 'PumpPipe'; }
}

// -----------------------------------------------------------------------------

function LedPipe(x, y, sourceSide, ledColor) {
  this.level = 0;
  this.source = sourceSide;
  this.x = x;
  this.y = y;
  this.col = ledColor;

  this.updated = function() {
    let openings = [false, false, false, false];
    openings[this.source] = true;
    let newLevel = getMaxWaterLevel(this.x, this.y, openings);
    if(this.level != newLevel) {
      this.level = newLevel;
    }
  }

  this.getLevelOnSide = function(side) { return 0; }

  this.show = function() {
    let openings = [false, false, false, false];
    openings[this.source] = true;
    showStandardPipe(this.level, openings);
    fill(colors.wall);
    rect(20, 20, 44, 44);
    if(this.level > 0) fill(colors['led_'+this.col]);
    else fill(colors['led_off']);
    rect(24, 24, 40, 40);
  }

  this.getName = function() { return 'LedPipe'; }
}

// -----------------------------------------------------------------------------
