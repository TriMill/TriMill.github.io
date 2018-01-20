function getCookie() {
  let n = Cookies.getJSON('found')['list'];
  console.log(n);
  if(n != undefined) {
    found = n;
  }
}

function setCookie() {
  console.log('Setting cookie');
  Cookies.set('found', {'list':found}, {expires: 30, path: ''});
}
