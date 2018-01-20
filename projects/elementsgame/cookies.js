function getCookie() {
  found = Cookies.get('found')['list'];
}

function setCookie() {
  Cookies.set('found', {'list':found});
}
