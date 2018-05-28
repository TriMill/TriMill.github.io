function loadExample() {
  value = $("#example option:selected").val();
  $('#code').val(examples[value]);
}

function lineNumberMode(mode) {
  let value = $('#code').val();
  let w = $('.linedwrap').width();
  $('.roundbutton').attr('class', 'roundbutton');
  $('#' + mode).addClass('active');
  switch(mode) {
    case 'bin': base = 2; break;
    case 'oct': base = 8; break;
    case 'dec': base = 10; break;
    case 'hex': base = 16; break;
  }
  $('#outerwrap').empty();
  $('#outerwrap').append('<textarea class="lined" rows="30" cols="80" id="code"></textarea>')
  $('.lined').width(w-4);
  $('.lined').linedtextarea({});
  $('#code').val(value);
}

function output(num, asChar) {
  let str = asChar ? String.fromCharCode(num) : (num + ' ');
  $('#output').val($('#output').val() + str);
}

function clearOutput() {
  $('#output').val('');
}

function selectLine(n) {
  if (n < -1) return false;
  $('.lineno.lineselect').removeClass('lineselect');
  if(n >= 0)
    $('.lineno').eq(n).addClass('lineselect');
}

function getDelay() {
  return $('#delay').val();
}

function popInput(asChar) {
  let inp = $('#input').val();
  if(inp == null || inp.length <= 0) return 0;
  if(asChar) {
    let c = inp.charCodeAt(0);
    $('#input').val(inp.substring(1, inp.length));
    return c;
  } else {
    let num = '';
    let char = inp[0];
    while(char != ' ' && char != undefined) {
      num += char;
      inp = inp.substring(1, inp.length);
      char = inp[0];
    }
    inp = inp.substring(1, inp.length);
    $('#input').val(inp);
    return parseInt(num);
  }
}

function checkZero() {
  if(isDelayZero()) {
    $('.hidezero').css('display', 'unset');
  } else {
    $('.hidezero').css('display', 'none');
  }
}
