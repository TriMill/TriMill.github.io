function getCookie() {
  let n = Cookies.get('found')['list'];
  console.log(n);
  if(n != undefined) {
    found = n;
  }
}

function setCookie() {
  Cookies.set('found', {'list':found}, {expires: 30, path: ''});
}
