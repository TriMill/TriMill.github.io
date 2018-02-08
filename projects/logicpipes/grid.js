function Grid(rows, columns) {
  this.tileGrid = [[null, null], [null, null]];
  this.xoff = 0;
  this.yoff = 0;

  this.set = function(x, y, tile) {
    if(x >= this.getWidth()) this.addColumns(x - this.getWidth()+1);
    if(y >= this.getHeight()) this.addRows(y - this.getHeight()+1);
    this.tileGrid[x][y] = tile;
  }

  this.get = function(x, y) {
    let sub = this.tileGrid[x];
  	if(sub == undefined) return undefined;
  	return sub[y];
  }

  this.addColumns = function(columns) {
    for(let i = 0; i < columns; i++) {
      let newArray = [];
      for(let j = 0; j < this.getHeight(); j++) { newArray.push(null); }
      this.tileGrid.push(newArray);
    }
  }

  this.addRows = function(rows) {
    for(let i = 0; i < rows; i++) {
      for(let j = 0; j < this.getWidth(); j++) { this.tileGrid[j].push(null); }
    }
  }

  this.getWidth = function() {
    return this.tileGrid.length;
  }

  this.getHeight = function() {
    return this.tileGrid[0].length;
  }
}
