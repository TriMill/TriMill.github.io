function getNum(value) {
  value = value.toString();
  if(value == null || value == '') return NaN;
  let num = 0;
  if(value.startsWith('[') && value.endsWith(']')) {
    value = value.substring(1, value.length - 1);
  }
  if(value.startsWith('0x')) {
    num = parseInt(value, 16);
  } else if(value.startsWith('0b')) {
    num = parseInt(value.substring(2), 2);
  } else if(value.startsWith('0') && value.length > 1) {
    num = parseInt(value.substring(1), 8);
  } else {
    num = parseInt(value);
  }
  if(isNaN(num)) return NaN;
  return num;
}

function getData(addr) {
  return getNum(program[addr]);
}

let programCounter = 0;
let acc = 0;
let flagLessThan = false;
let flagEqual = false;
let halted = false;
let program;
function runProgram() {
  clearOutput();
  let text = $('#code').val();
  let lines = text.split('\n');
  program = lines;
  runLine();
}

function resetProgram() {
  programCounter = 0;
  acc = 0;
  flagLessThan = false;
  flagEqual = false;
  halted = false;
}

function runLine() {
  let addr = programCounter;
  programCounter++;
  selectLine(addr);
  let line = program[addr];
  if(line == undefined || line.trim() == '' || line.startsWith('#')) {
    line = 'NOP';
  }
  line = line.split(' ');
  let cmd = 'NOP', data = 0;
  if(isNaN(getNum(line[0]))) {
    cmd = line[0];
    if(line.length > 1)
      data = getNum(line[1]);
  } else if(line.length < 2) {
    data = getNum(line[0]);
  }
  cmd = cmd.toUpperCase();
  ops[cmd](data);
  let delay = getDelay();
  if(!halted) {
    if(programCounter > program.length) {
      console.warn('All programs should end with a HLT (halt) instruction.');
      output('\n\nWARNING: All programs should end with a HLT (halt) instruction.', false);
      halted = true;
    }
    setTimeout(runLine, delay);
  } else {
    setTimeout(resetProgram(), delay);
  }
}

let ops = {
  NOP: (par)=>{},
  LDA: (par)=>{acc = getData(par);},
  STA: (par)=>{program[par] = acc;},
  LDI: (par)=>{acc = par;},
  ADD: (par)=>{acc = acc + getData(par);},
  MUL: (par)=>{acc = acc * getData(par);},
  SUB: (par)=>{acc = acc - getData(par);},
  DIV: (par)=>{acc = Math.floor(acc / getData(par));},
  MOD: (par)=>{acc = acc % getData(par);},
  INC: (par)=>{acc++;},
  DEC: (par)=>{acc--;},
  JMP: (par)=>{programCounter = par;},
  JLT: (par)=>{if(flagLessThan){programCounter = par;}},
  JMT: (par)=>{if(!flagLessThan){programCounter = par;}},
  JEQ: (par)=>{if(flagEqual){programCounter = par;}},
  JNE: (par)=>{if(!flagEqual){programCounter = par;}},
  INP: (par)=>{acc = popInput()},
  OUT: (par)=>{output(acc, false);},
  CHR: (par)=>{output(acc, true)},
  CMP: (par)=>{
    flagLessThan = false; flagEqual = false;
    if(getData(par) > acc) {flagLessThan = true;}
    if(getData(par) == acc) {flagEqual = true;}
               },
  HLT: (par)=>{halted = true}
}
