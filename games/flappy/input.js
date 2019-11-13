// Prevent backspace key from going back in page history
$(document).unbind('keydown').bind('keydown', function (event) {
  if (event.keyCode === 8) {
      var doPrevent = true;
      var types = ["text", "password", "file", "search", "email", "number", "date", "color", "datetime", "datetime-local", "month", "range", "search", "tel", "time", "url", "week"];
      var d = $(event.srcElement || event.target);
      var disabled = d.prop("readonly") || d.prop("disabled");
      if (!disabled) {
          if (d[0].isContentEditable) {
              doPrevent = false;
          } else if (d.is("input")) {
              var type = d.attr("type");
              if (type) {
                  type = type.toLowerCase();
              }
              if (types.indexOf(type) > -1) {
                  doPrevent = false;
              }
          } else if (d.is("textarea")) {
              doPrevent = false;
          }
      }
      return !doPrevent;
  }
});

document.addEventListener('keydown', keyDown);

function keyDown(e) {
  if(gamestate == 'menu') {
    menuKey(e.key, e.keyCode);
  }
  else if(e.key == ' ' && gamestate != 'dead' && gamestate != 'start')
    bird.applyForce(flapForce, 'flap');
  else if(e.keyCode == 13 && (gamestate == 'dead' || gamestate == 'start')) {
    newGame()
  }
}