$(function(){
  var code = param('c');
  if(code != undefined) {
    var url = atob(code);
    if (url.substr(0, 'http://'.length) !== 'http://' &&
      url.substr(0, 'https://'.length) !== 'https://') {
      url = 'https://' + url;
    }
    window.location.href = url;
  } else {
    $('#encode').click(function(){
      var url = $('#url').val();
      var code = btoa(url);

      var url = window.location.href + '?c=' + code;
      $('#result').val(url);
      $('#link').attr('href', url);
    });
  }
});

function param(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
