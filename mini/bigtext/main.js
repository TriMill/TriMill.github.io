$(function() {
  let text = param('text'), fg = param('fg'), bg = param('bg')
  let font = param('font'), gft = param('gft');
  if(text && fg && bg && font) {
    display(text, '#'+fg, '#'+bg, font, gft);
    return;
  }
  addFontsToDropdown();
  setupColorPickers();
});

function addFontsToDropdown() {
  let fonts = ['Arial', 'Helvetica', 'Verdana', 'Segoe UI', 'Trebuchet MS', 'Impact',
    'Times New Roman', 'Times', 'Georgia', 'Courier', 'Consolas', 'Fixedsys Excelsior 3.01', 'FakeFont'];
  for(let i = 0; i < fonts.length; i++) {
    if(isFontAvailable(fonts[i])) {
      $('#font').append($('<option value="'+fonts[i]+'">'+fonts[i]+'</option>'));
    }
  }
}

function setupColorPickers() {
  let foreground = $('#foreground');
  let foregroundWrapper = $('#wrapper_foreground');
  foreground.change(function() { foregroundWrapper.css('background-color', foreground.val());})
  foregroundWrapper.css('background-color', foreground.val());

  let background = $('#background');
  let backgroundWrapper = $('#wrapper_background');
  background.change(function() { backgroundWrapper.css('background-color', background.val());})
  backgroundWrapper.css('background-color', background.val());
}



function show() {
  let text = $('#text').val();
  let fg = $('#foreground').val().substring(1);
  let bg = $('#background').val().substring(1);
  let gft = $('[name="ftype"]:checked').val() == 'ggl';
  let font = $('#font').val();
  if(gft)
    font = $('#gfont').val();
  window.location.href = window.location.href.split('?')[0] +
    '?text='+(text==''?'%00':text)+'&fg='+fg+'&bg='+bg+'&font='+font+'&gft='+gft;
}

function display(text, fg, bg, font, gft) {
  console.log(font);
  let body = $('body');
  body.html('');
  let div = $('<div></div>');
  div.html(text);
  body.append(div);
  $('#main').remove();
  $('#style').remove();
  if(gft == 'true') {
    console.log(gft);
    $('head').append('<link href="https://fonts.googleapis.com/css?family='+ font + '" rel="stylesheet">');
  }
  body.css('font-family', '"'+font+'"');
  body.css('color', fg);
  body.css('background-color', bg);
  body.css('line-height', 1);
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
