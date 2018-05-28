// When mouse is clicked
function mouseClicked() {
	// Get index of element clicked
	let i = getIndexOfCoords(mouseX, mouseY);
	if(curIndex == -1 && i < found.length && i >= 0) {
		// If no element is selected and an element was clicked on, select the element that was just clicked
		curIndex = i;
	} else if(i < found.length && i >= 0) {
		// If an element is selected and an element was clicked on, combine them
		combine(sortedFound[curIndex], sortedFound[i]);
		curIndex = -1;
	} else {
		// If the empty backgound was clicked, clear the selected element
		curIndex = -1;
	}
}

// Scroll the elements
function mouseWheel(event) {
	if(event.delta > 0)
		offset++;
	if(event.delta < 0 && offset > 0)
		offset--;
	return false;
}

function keyTyped() {
	if(key == 'q') {
		// Show help text
		window.alert(helpText);
	} else if(key == 'm') {
		// Change mode
  	nextSortMode();
		foundUpdated();
  } else if(key == 't') {
		// Show/hide stopwatch
		showTime = !showTime;
	} else if(key == 'h') {
		// Try to give a hint
		if(numHints > 0) {
			getHint();
			numHints--;
			saveCookie();
		}
	} else if(key == 'x') {
		Cookies.remove('savedata', {path: ''});
		clearText = true;
  } else if(keyCode == ENTER) {
		// Recalculate
		foundUpdated();
		clearText = false;
  }
	return false;
}
