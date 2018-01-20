function loadCookie() {
  let cookie = Cookies.getJSON('found');
  // If no cookie exists, don't try to load one
  if(cookie != undefined) {
    // Get found elements from cookie
    let chip = cookie['list'];
    if(chip != undefined) {
      console.log('Loaded save: ' + chip);
      // Set found elements to cookie
      found = chip;
      foundUpdated(true);
    }
  }
}

function saveCookie() {
  console.log('Saving: ' + found);
  // Set the cookie
  Cookies.set('found', {'list':found}, {expires: 30, path: ''});
}
