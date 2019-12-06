Number.prototype.decimals = function() {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return (this.toString().split(".")[1] || '').length;
}

Math.trueRound = function(number, precision) {
  var shift = function (number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }
    var numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
}

window.onload = function() {
  measureUpdate();
}

function measureUpdate() {
  let units = length.units;
  let select = length.select;
  switch($('#measure').val()) {
    case 'length': units = length.units; select = length.select; break;
    case 'temp':   units = temp.units;   select = temp.select;   break;
    case 'mass':   units = mass.units;   select = mass.select;   break;
    case 'area':   units = area.units;   select = area.select;   break;
    case 'time':   units = time.units;   select = time.select;   break;
    case 'volume': units = volume.units; select = volume.select; break;
    case 'energy': units = energy.units; select = energy.select; break;
    case 'computing': units = computing.units; select = computing.select; break;
  }
  updateUnits(units, select);
  recalc();
}

function updateUnits(units, select) {
  $('#unit1').empty();
  $('#unit2').empty();
  s1 = units.indexOf(select[0]);
  s2 = units.indexOf(select[1]);
  for(let i = 0; i < units.length; i++) {
    let elem = $('<option></option>').val(units[i]).text(units[i]);
    if(i == s1) elem = elem.attr('selected', true);
    $('#unit1').append(elem);
  }
  for(let i = 0; i < units.length; i++) {
    let elem = $('<option></option>').val(units[i]).text(units[i]);
    if(i == s2) elem = elem.attr('selected', true);
    $('#unit2').append(elem);
  }
}

function recalc() {
  let m = length;
  switch($('#measure').val()) {
    case 'length': m = length; break;
    case 'temp': m = temp; break;
    case 'mass': m = mass; break;
    case 'area': m = area; break;
    case 'time': m = time; break;
    case 'volume': m = volume; break;
    case 'energy': m = energy; break;
    case 'computing': m = computing; break;
  }

  let value = $('#val1').val();
  let result = 0;

  if(m.ctype == 'mul') {

    // Simple multiplication
    let u1 = $('#unit1').val(), u2 = $('#unit2').val();
    let done = false;

    // Check custom conversions
    for(let i = 0; i < m.custom.length; i++) {
      let c = m.custom[i];

      if(c[0] == u1 && c[1] == u2) {
        result = Math.trueRound(value*c[2], 12);
        done = true;
      } else if(c[0] == u2 && c[1] == u1) {
        result = Math.trueRound(value/c[2], 12);
        done = true;
      }
    }
    if(!done) {

      // Convert
      let indexFrom = m.units.indexOf(u1), indexTo = m.units.indexOf(u2);
      let fc = m.conversions[indexFrom], tc = m.conversions[indexTo];
      newv = value*fc/tc;
      result = Math.trueRound(newv, 12);
    }
  } else if(m.ctype == 'funct') {

    // Function (for temp)
    newv = m.conversions[':'+$('#unit2').val()](m.conversions[$('#unit1').val()+':'](value))
    result = Math.trueRound(newv, 8);
  }
  $('#val2').val(result);
}

function swap() {
  let u1 = $('#unit1').val();
  let u2 = $('#unit2').val();
  let v1 = $('#val1').val();
  let v2 = $('#val2').val();
  $('#unit1').val(u2);
  $('#unit2').val(u1);
  $('#val1').val(v2);
  $('#val2').val(v1);
}
