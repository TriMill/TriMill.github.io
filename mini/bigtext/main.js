$(function() {
  let text = param('text'), fg = param('fg'), bg = param('bg'), font = param('font');
  console.log(text, fg, bg, font);
  if(text && fg && bg && font) {
    display(text, '#'+fg, '#'+bg, font);
    return;
  }
  let foreground = $('#foreground');
  let foregroundWrapper = $('#wrapper_foreground');
  foreground.change(function() { foregroundWrapper.css('background-color', foreground.val());})
  foregroundWrapper.css('background-color', foreground.val());

  let background = $('#background');
  let backgroundWrapper = $('#wrapper_background');
  background.change(function() { backgroundWrapper.css('background-color', background.val());})
  backgroundWrapper.css('background-color', background.val());
});

function show() {
  let text = $('#text').val();
  let fg = $('#foreground').val().substring(1);
  let bg = $('#background').val().substring(1);
  let font = $('#font').val();
  window.location.href = window.location.href.split('?')[0] +
    '?text='+(text==''?'%00':text)+'&fg='+fg+'&bg='+bg+'&font='+font;
}

function display(text, fg, bg, font) {
  let body = $('#body');
  body.html('');
  let div = $('<div></div>');
  div.html(text);
  body.append(div);
  $('#main').remove();
  $('#style').remove();
  body.css('font-family', font);
  body.css('color', fg);
  body.css('background-color', bg);
  body.css('line-height', 0);
  $('head').append('<link rel="stylesheet" type="text/css" href="show.css">');
}

function param(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
  if (!results) return undefined;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
