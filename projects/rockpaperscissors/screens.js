let buttons = [
  new Button(170, 180, 260, 90, 'Next Round', () => {}),
  new Button(170, 280, 260, 90, 'New Game', () => {}),
  new Button(170, 380, 260, 90, 'Switch to RPSLS', () => {}),
];

function showGameBackground() {
  background(colors.gray);
	noStroke();
	fill(colors.black);
	rect(20, 20, 290, 580);
	rect(310, 20, 580, 580);
}

function showGameGUI() {

}

function showMenuBackground() {
  background(colors.gray);
	noStroke();
	fill(colors.black);
	rect(20, 20, 580, 580);
}

function showMenuGUI() {
  textSize(72);
  noStroke();
  fill(colors.white);
  textAlign(CENTER, CENTER);
  text('Round Over', 300, 110);
  buttons[0].show();
  buttons[1].show();
  buttons[2].show();
}
