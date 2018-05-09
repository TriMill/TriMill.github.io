function compressMaze(maze) {
  if(maze == undefined) return undefined;
  if(maze.length == 0) return [0, 0];
  var a = [];
  var x, y, i;
  for(x = 0; x < maze.length; x++) {
    for(y = 0; y < maze[x].length; y++) {
      a.push(maze[x][y][0]);
      a.push(maze[x][y][1]);
      a.push(maze[x][y][2]);
      a.push(maze[x][y][3]);
    }
  }
  return a;
}

function expandMaze(maze, w, h) {
  if(maze == undefined) return undefined;
  if(w == 0 || h == 0) return [];
  var a = [];
  for(x = 0; x < w; x++) {
    a.push([]);
    for(y = 0; y < h; y++) {
      a[x][y] = [];
      var index = 4*(y + x*h)
      a[x][y].push(maze[index+0]);
      a[x][y].push(maze[index+1]);
      a[x][y].push(maze[index+2]);
      a[x][y].push(maze[index+3]);
    }
  }
  return a;
}

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
function arrToB64(arr) {
  while(arr.length%6 != 0) {
    arr.push(false);
  }
  var str = '';
  while(arr.length > 0) {
    var n = arr.shift()*32+arr.shift()*16+arr.shift()*8+arr.shift()*4+arr.shift()*2+arr.shift();
    str += b64[n];
  }
  return str;
}

function b64ToArr(str64) {
  var arr = [];
  for(var i = 0; i < str64.length; i++) {
    var index = b64.indexOf(str64[i]);
    if(index<0) continue;
    arr.push((index>>5)%2 != 0);
    arr.push((index>>4)%2 != 0);
    arr.push((index>>3)%2 != 0);
    arr.push((index>>2)%2 != 0);
    arr.push((index>>1)%2 != 0);
    arr.push((index>>0)%2 != 0);
  }
  return arr;
}

function encode(maze) {
  return arrToB64(compressMaze(maze));
}

function decode(code, w, h) {
  return expandMaze(b64ToArr(code), w, h);
}
