function getCookie() {
  let cookie = Cookies.getJSON('found');
  if(cookie != undefined) {
    let chip = cookie['list'];
    console.log(chip);
    if(chip != undefined) {
      found = chip;
      foundUpdated();
    }
  }
}

function setCookie() {
  console.log('Setting cookie');
  Cookies.set('found', {'list':found}, {expires: 30, path: ''});
}
