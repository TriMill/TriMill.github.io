let combinations = {
  '0 2':'Smashes',
  '0 3':'Squishes',
  '1 0':'Covers',
  '1 4':'Disproves',
  '2 1':'Cuts',
  '2 3':'Decapitates',
  '3 1':'Eats',
  '3 4':'Poisons',
  '4 0':'Vaporizes',
  '4 2':'Crushes',
  'tie':'Ties'
};

let moves = {
  '0':'Rock',
  '1':'Paper',
  '2':'Scissors',
  '3':'Lizard',
  '4':'Spock'
};

function moveName(num) {
  return moves[num];
}

function getWinner(p1move, p2move) {
  let p1s = p1move + ' ' + p2move;
  let p2s = p2move + ' ' + p1move;
  if(combinations[p1s] != undefined) {
    return 1;
  } else if(combinations[p2s] != undefined) {
    return 2;
  } else return 0;
}

function getWinText(p1move, p2move, winner) {
  let winningMove = (winner == 1) ? p1move : p2move;
  let losingMove  = (winner == 1) ? p2move : p1move;
  let verb;
  if(winner == 0) verb = combinations['tie'];
  else verb = combinations[winningMove + ' ' + losingMove];
  return moveName(winningMove) + ' ' + verb + ' ' + moveName(losingMove);
}

function getSymbol(winner) {
  switch(winner) {
    case 0: return '=';
    case 1: return '>';
    case 2: return '<';
  }
}

let colors = {
  'black':[0],
  'darkgray':[100, 101, 110],
  'gray':[140, 142, 155],
  'lightgray':[200, 203, 220],
  'white':[250, 250, 250]
}
