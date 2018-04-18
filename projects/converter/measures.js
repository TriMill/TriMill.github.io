let length = {
  units: ['Picometer', 'Nanometer', 'Micrometer', 'Millimeter', 'Centimeter',
    'Decimeter', 'Meter', 'Decameter', 'Hectometer', 'Kilometer', 'Megameter',
    'Gigameter', 'Barleycorn', 'Thou', 'Digit', 'Inch', 'Palm', 'Stick', 'Hand',
    'Link', 'Foot', 'Yard', 'Rod', 'Fathom', 'Chain', 'Shackle', 'Cable', 'Furlong',
    'Mile', 'Nautical Mile', 'League', 'AU', 'Light-Year'],
  common: 'Meter',
  ctype: 'mul',
  select: ['Meter', 'Foot'],
  conversions: [1e-12, 1e-9, 1e-6, 0.001, 0.01,
    0.1, 1, 10, 100, 1000, 1e+6,
    1e+9, 127/15000, 0.0000254, 0.01905, 0.0254, 0.0508, 0.0762, 0.1016,
    0.201168, 0.3048, 0.9144, 5.0292, 1.852, 20.1168, 27.432, 185.2, 201.168,
    1609.344, 1852, 4828.032, 149597870700, 9460730472580800],
  custom: [['Foot', 'Inch', 12], ['Yard', 'Foot', 3], ['Mile', 'Foot', 5280],
  ['Inch', 'Centimeter', 2.54], ['Mile', 'Kilometer', 1.609344]]
}

let temp = {
  units: ['Celcius', 'Fahrenheit', 'Kelvin', 'Rankine', 'Delisle'],
  common: 'Celcius',
  ctype: 'funct',
  select: ['Celcius', 'Fahrenheit'],
  conversions: {
    'Celcius:': (n)=>{return n;},
    ':Celcius': (n)=>{return n;},
    'Fahrenheit:': (n)=>{return (n-32)*(5/9);},
    ':Fahrenheit': (n)=>{return (n*9/5) + 32;},
    'Kelvin:': (n)=>{return n - 273.15;},
    ':Kelvin': (n)=>{return n + 273.15;},
    'Rankine:': (n)=>{return (n-491.67)*(5/9);},
    ':Rankine': (n)=>{return (n+273.15)*(9/5);},
    'Delisle:': (n)=>{return 100-(n*2/3);},
    ':Delisle': (n)=>{return (100-n)*3/2;},
  },
  custom: []
}

let mass = {
  units: ['Picogram', 'Nanogram', 'Microgram', 'Milligram', 'Centigram', 'Decigram',
    'Gram', 'Decagram', 'Hectogram', 'Kilogram', 'Tonne', 'Pound', 'Slug', 'Stone',
    'US Ton', 'Solar Mass', 'Earth Mass'],
  common: 'Kilogram',
  ctype: 'mul',
  select: ['Kilogram', 'Pound'],
  conversions: [1e-15, 1e-12, 1e-9, 1e-6, 1e-5, 1e-4,
    0.001, 0.01, 0.1, 1, 1000, 0.45359237, 14.593903, 6.35029318,
    907.18474, 1.98855e+30, 5.9722e+24],
  custom: [['US Ton', 'Pound', 2000]]
}

let area = {
  units: ['Square Millimeter', 'Square Centimeter', 'Square Meter', 'Hectare',
    'Square Kilometer', 'Square Inch', 'Square Foot', 'Square Yard', 'Square Mile',
    'Acre'],
  common: 'Square Meter',
  ctype: 'mul',
  select: ['Square Kilometer', 'Square Mile'],
  conversions: [1e-12, 1e-10, 1e-6, 0.01, 1, 6.4516e-10, 9.290304e-8, 8.3612736e-7,
    2.589988110336, 0.0040468564224],
  custom: []
}

let time = {
  units: ['Microsecond', 'Millisecond', 'Second', 'Minute', 'Hour', 'Day', 'Week',
    'Fortnight', 'Siderial Month', 'Lunar Month', '30 Days', 'Month', 'Quarter',
    'Common Year', 'Julian Year', 'Year', 'Sidereal Year', 'Leap Year', 'Decade',
    'Average Human Life', 'Century', 'Millenium'],
  common: 'Day',
  ctype: 'mul',
  select: ['Year', 'Second'],
  conversions: [1/86400000000, 1/86400000, 1/86400, 1/1440, 1/24, 1, 7,
    14, 27.321661, 29.530588, 30, 30.4166666667, 91.25,
    365, 365.25, 365.2425, 365.256363004, 366, 3652.425,
    25749.59625, 36524.25, 365242.5],
  custom: []
}
