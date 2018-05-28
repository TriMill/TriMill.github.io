// Current sort mode
let sortMode = 0;

// Go to next sort mode
function nextSortMode() {
  sortMode = (sortMode + 1) % 7;

}

// Sort array based on current sort mode
function aSort(arr) {
  newArr = arr.slice(0);
  switch(sortMode) {
    case 0:
      return creationSort(newArr);
    case 1:
      return creationSort(newArr).reverse();
    case 2:
      return nameSort(newArr);
    case 3:
      return nameSort(newArr).reverse();
    case 4:
      return classSort(newArr);
    case 5:
      return classSort(newArr).reverse();
    case 6:
      return randomSort(newArr);
  }
}

// Get the name of the current sort mode
function getSortModeName() {
  switch(sortMode) {
    case 0:
      return 'Creation Time';
    case 1:
      return 'Creation Time (Reverse)';
    case 2:
      return 'Name';
    case 3:
      return 'Name (Reverse)';
    case 4:
      return 'Class';
    case 5:
      return 'Class (Reverse)';
    case 6:
      return 'Random';
  }
  return 'Mode ' + mode;
}

// Sort in order of the list
function creationSort(arr) {
  return arr;
}

// Sort alphabetically
function nameSort(arr) {
  arr.sort()
  return arr;
}

// Sort by class
function classSort(arr) {
  arr.sort();
  arr.sort(function(a, b) {
	   let ac = getClass(a), bc = getClass(b);
	   if(ac > bc) {
       return 1;
     } else if(ac == bc) {
       return 0;
     } else return -1;
   })
  return arr;
}

// Sort randomly
function randomSort(arr) {
  arr.sort(function(a, b) {
    return random() - 0.5;
  })
  return arr;
}
