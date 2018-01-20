function getCookie() {
  found = Cookies.get('found').split(' ');
}

function setCookie() {
  Cookies.set('found', arrayToString(found), {expires: 30, path: ''});
}

function arrayToString(arr) {
  let str = '';
  for(let i = 0; i < arr.length; i++) {
    str += (i > 0 ? ' ' : '') + arr[i];
  }
  return str;
}
