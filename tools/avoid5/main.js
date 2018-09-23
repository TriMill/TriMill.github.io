/*
  I wrote this programming to try to minimize using fifthglyphs,
  but I had to occasionally.
*/

function findGlyphs() {
  var x = $('#writing').val();
  var count = 0;
  for(var i = 0; i < x.length; i++) {
    if(x[i] == 'E' || x[i] == 'e') {
      x = x.substr(0, i) + '-' + x.substr(i+1);
      count++;
    }
  }
  $('#fix').val(x);
  $('#count').html('Count of fifthglyphs: ' + count);
  var tips = 'Tips:';
  var ks = Object.keys(switching);
  for(var i = 0; i < ks.length; i++) {
    var k = ks[i];
    if(x.toLowerCase().includes(k)) {
      tips += '<br>Replace ' + k + ' with ' + switching[k];
      console.log(k, switching[k]);
    }
  }
  $('#tips').html(tips);
}
