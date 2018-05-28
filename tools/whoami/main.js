$(load);

let results = '';
function load() {

  addEntry('User Agent', navigator.userAgent);
  results += '<br>';
  let ua = UAParser();
  console.log(ua);
  addEntry('Name', ua.browser.name);
  addEntry('Version', ua.browser.version);
  addEntry('CPU', ua.cpu.architecture);
  addEntry('Engine Name', ua.engine.name);
  addEntry('Engine Version', ua.engine.version);
  addEntry('OS Name', ua.os.name);
  addEntry('OS Version', ua.os.version);
  results += '<br>';
  addEntry('App Name', navigator.appName);
  addEntry('Codename', navigator.appCodeName);
  addEntry('Java Enabled', navigator.javaEnabled());
  addEntry('Language', navigator.language);
  addEntry('Languages', navigator.languages);
  addEntry('Vendor', navigator.vendor);
  addEntry('Cookies Enabled', navigator.cookieEnabled);
  addEntry('Platform', navigator.platform);
  addEntry('Query', (window.location.search.split('?')[1] || 'none').split('&'));
  if(navigator.connection != null)
    addEntry('Connection', navigator.connection.effectiveType);
  results += '<br>';
  if(navigator.getBattery)
    navigator.getBattery().then(function(battery) {
      addEntry('Battery Charge', battery.level*100+'%');
      addEntry('Charging', battery.charging);
      results += '<br>';
      finalize();
    });
  finalize();
}

function addEntry(name, value) {
  let z = '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n';
  value = (z+value).substring(name.length);
  value = value.replace(/\n/g, '&nbsp;');
  results += '<br>' + name + ':' + value;
}
function finalize() { $('#results').html(results); }

function requestLocation() {
  navigator.geolocation.getCurrentPosition(function(location) {
    console.log(location);
    addEntry('Latitude', location.coords.latitude);
    addEntry('Longitude', location.coords.longitude);
    finalize();
  }, function(err) {
    addEntry('Location', 'Error - ' + err.message);
    finalize();
  });
  $('#location').remove();
  $('#lbr').remove();
}
