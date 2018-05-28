let levels = {
  '1': [
    '    XXX    ',
    '    XFX    ',
    '    X X    ',
    '    X X    ',
    '    X X    ',
    '    X X    ',
    '    XSX    ',
    '    XXX    ',]
};

let tiles = {
  ' ': ()=>{},
  'X': ()=>{
    fill(colors.t_wall);
    rect(0, 0, 64, 64);
    fill(colors.t_wall_h);
    rect(0, 0, 4, 60);
    rect(0, 0, 60, 4);
    fill(colors.t_wall_s);
    rect(60, 4, 4, 60);
    rect(4, 60, 60, 4);
  },
  'S': ()=>{},
  'F': ()=>{
    fill(colors.t_finish);
    rect(16, 16, 32, 32);
    fill(colors.t_finish_h);
    rect(16, 16, 28, 4);
    rect(16, 16, 4, 28);
    fill(colors.t_finish_s);
    rect(44, 20, 4, 28);
    rect(20, 44, 28, 4);

  }
}
