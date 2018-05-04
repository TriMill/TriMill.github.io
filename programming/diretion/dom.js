$(window).bind('beforeunload', function(){
   return 'Are you sure you want to leave?\nDiretion does not save your code yet.';
});

function isDelayZero() {
  let d = getDelay();
  return d == '0' || d == '' || d == null;
}
