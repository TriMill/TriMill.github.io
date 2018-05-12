/*

> Increment pointer
< Decrement pointer
A Write value at pointer to A
B Write value at pointer to B
C Write value at pointer to C
a Set value at pointer to A
b Set value at pointer to B
c Set value at pointer to C
+ Add A and B, storing result in C
- Subtract B from A, storing result in C
r Rotate A,B,C: A to B, B to C, C to A
[ Jump to matching ] if A is 0
] Jump to matching [ if A isn't 0

Attempting to write to a previously written cell should have no affect

*/

let halted = false;
let mem = [];
let fix = [];
let ptr = 0;
let reg_A = 0, reg_B = 0, reg_C = 0;
let program;
function resetProgram() {
  halted = false;
  memory = [];
  written = [];
  ptr = 0;
  reg_A = 0; reg_B = 0; reg_C = 0;
}

function setMem(val) {
  if(fix[ptr] == 1) return;
  while(val < 0)
    val = val + 256;
  mem[ptr] = val%256;
  fix[ptr] = 1;
}

function getMem() {
  let a = mem[ptr];
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
