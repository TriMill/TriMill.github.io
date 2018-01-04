function mouseClicked() {
	let i = getIndexOfCoords(mouseX, mouseY);
	if(i == -1) return;
	if(curIndex == -1) {
		curIndex = i;
	} else {
		combine(sortedFound[curIndex], sortedFound[i]);
		curIndex = -1;
	}
}

function mouseWheel(event) {
	if(event.delta > 0)
		offset++;
	if(event.delta < 0 && offset > 0)
		offset--;
	return false;
}

function keyTyped() {
	if(key == 'q') {
		window.alert(helpText);
	} else if(key == 'm') {
  	nextSortMode();
		foundUpdated();
  } else if(key == 't') {
		showTime = !showTime;
	} else if(keyCode = ENTER) {
		foundUpdated();
  }
	return false;
}
