let savedTime = 0;

function loadCookie() {
  let cookie = Cookies.getJSON('savedata');
  // If no cookie exists, don't try to load one
  if(cookie != undefined) {
    // Get found elements from cookie
    let elems = cookie['list'];
    if(elems != undefined) {
      console.log('Loaded save: ' + elems);
      // Set found elements to cookie
      found = elems;
    }
    numHints = cookie['hints'];
    if(numHints == undefined) numHints = 1;
    foundUpdated(true);
    savedTime = cookie['time'];
    if(savedTime != undefined) {
      nextHint = savedTime + 60000;
    } else savedTime = 0;
    foundUpdated(true);
  }
}

function saveCookie() {
  console.log('Saving: ' + found);
  // Set the cookie
  Cookies.set('savedata', {
    'list':found,
    'hints':numHints,
    'time':realMillis()
  }, {expires: 30, path: ''});
}
