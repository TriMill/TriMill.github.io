/*

@	Begin program (flow right)
/	Change direction: up -> right, right -> up, down -> left, left -> down
\	Change direction: up -> left, left -> up, down -> right, right -> down
% Flip direction
^ Change direction to up
V Change direction to down
< Change direction to left
> Change direction to right
+	Increment cell
-	Decrement cell
0 Set cell to zero
} Move pointer forward
{ Move pointer backward
! Skip next instruction
? Skip next instruction if cell is zero
, Input ASCII code
. Output ASCII code
$ Input number
#	Output number
;	End program

*/

let halted = false;
let memory = [];
let pointerM = 0;
let pointerX = 0;
let pointerY = 0;
let direction = 1; // 0 up, 1 right, 2 down, 3 left
let maxLength = 0;
let program;
function resetProgram() {
  halted = false;
  memory = [];
  pointerM = 0;
  pointerX = 0;
  pointerY = 0;
  direction = 1;
  maxLength = 0;
}

function getCharAt(x, y) {
  if(x < 0 || y < 0) return ';';
  if(y > program.length) return ';';
  if(x > maxLength) return ';';
  let a = program[y];
  if(a == undefined) return ' ';
  let b = a[x];
  if(b == undefined) return ' ';
  return b;
}

function gotoStart() {
  for(let y = 0; y < program.length; y++) {
    for(let x = 0; x < program[y].length; x++) {
      if(getCharAt(x, y) == '@') {
        pointerX = x;
        pointerY = y;
        direction = 1;
        return;
      }
    }
  }
}

function setMem(val) {
  while(val < 0)
    val = val + 256;
  memory[pointerM] = val%256;
}

function getMem() {
  let a = memory[pointerM];
  if(a == undefined && pointerM >= 0) return 0;
  return a;
}

function runProgram() {
  clearOutput();
  resetProgram();
  let text = $('#code').val();
  let lines = text.split('\n');
  program = lines;
  for(let i = 0; i < program.length; i++) {
    if(program[i].length > maxLength) maxLength = program[i].length;
  }
  gotoStart();
  if(isDelayZero()) {
    while(!halted) {
      doChar(false);
    }
  } else {
    doChar(true);
  }
}

function doChar(repeat) {
  let ch = getCharAt(pointerX, pointerY);
  if(codes[ch] != undefined)
    codes[ch]();
  pointerX += direction==1?1:(direction==3?-1:0);
  pointerY += direction==0?-1:(direction==2?1:0);
  if(ch == '!' || (ch == '?' && getMem() == 0)) {
    pointerX += direction==1?1:(direction==3?-1:0);
    pointerY += direction==0?-1:(direction==2?1:0);
  }
  if(!halted && repeat) {
    setTimeout(doChar, getDelay());
  }
}

let codes = {
  '@': ()=>{},
  '/': ()=>{direction=(direction==0?1:(direction==1?0:(direction==2?3:2)));},
  '\\': ()=>{direction=(direction==0?3:(direction==3?0:(direction==2?1:2)));},
  '%': ()=>{direction=(direction==0?2:(direction==2?0:(direction==1?3:1)));},
  '^': ()=>{direction=0;},
  '>': ()=>{direction=1;},
  'V': ()=>{direction=2;},
  '<': ()=>{direction=3;},
  '!': ()=>{/* Skip, interpreted in doChar funct */},
  '?': ()=>{/* Conditional Skip, interpreted in doChar funct */},
  '+': ()=>{setMem(getMem()+1);},
  '-': ()=>{setMem(getMem()-1);},
  '0': ()=>{setMem(0);},
  '}': ()=>{pointerM++;},
  '{': ()=>{pointerM--; if(pointerM<0) halted=true;},
  '#': ()=>{output(getMem(), false);},
  '$': ()=>{setMem(popInput(false));},
  '.': ()=>{output(getMem(), true);},
  ',': ()=>{setMem(popInput(true));},
  ';': ()=>{halted = true;}
}
