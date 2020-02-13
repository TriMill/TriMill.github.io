let length = {
  units: ['Picometer', 'Nanometer', 'Micrometer', 'Millimeter', 'Centimeter',
    'Decimeter', 'Meter', 'Decameter', 'Hectometer', 'Kilometer', 'Megameter',
    'Gigameter', 'Barleycorn', 'Thou', 'Digit', 'Inch', 'Palm', 'Stick', 'Hand',
    'Link', 'Foot', 'Yard', 'Rod', 'Fathom', 'Chain', 'Shackle', 'Cable', 'Furlong',
    'Mile', 'Nautical Mile', 'League', 'AU', 'Light-Year', 'Smoot'],
  common: 'Meter',
  ctype: 'mul',
  select: ['Meter', 'Foot'],
  conversions: [1e-12, 1e-9, 1e-6, 0.001, 0.01,
    0.1, 1, 10, 100, 1000, 1e+6,
    1e+9, 127/15000, 0.0000254, 0.01905, 0.0254, 0.0508, 0.0762, 0.1016,
    0.201168, 0.3048, 0.9144, 5.0292, 1.852, 20.1168, 27.432, 185.2, 201.168,
    1609.344, 1852, 4828.032, 149597870700, 9460730472580800, 1.7],
  custom: [['Foot', 'Inch', 12], ['Yard', 'Foot', 3], ['Mile', 'Foot', 5280],
  ['Inch', 'Centimeter', 2.54], ['Mile', 'Kilometer', 1.609344]]
};

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
    ':Rankine': (n)=>{return (n*9/5)+491.67;},
    'Delisle:': (n)=>{return 100-(n*2/3);},
    ':Delisle': (n)=>{return (100-n)*3/2;},
  },
  custom: []
};

let mass = {
  units: ['Picogram', 'Nanogram', 'Microgram', 'Milligram', 'Centigram', 'Decigram', 
    'Gram', 'Decagram', 'Hectogram', 'Kilogram', 'Metric tonne', 'Ounce', 'Pound', 'Slug', 'Stone', 'US ton', 'Solar mass', 'Earth mass'],
  common: 'Kilogram',
  ctype: 'mul',
  select: ['Kilogram', 'Pound'],
  conversions: [1e-15, 1e-12, 1e-9, 1e-6, 1e-5, 1e-4,
    0.001, 0.01, 0.1, 1, 1000, 0.028349523125, 0.45359237,
    14.593903, 6.35029318, 907.18474, 1.98855e+30, 5.9722e+24],
  custom: [['US Ton', 'Pound', 2000], ['Pound', 'Ounce', 16]]
};

let area = {
  units: ['Square millimeter', 'Square centimeter', 'Square meter', 'Hectare',
    'Square kilometer', 'Square inch', 'Square foot', 'Square yard', 'Square mile',
    'Acre'],
  common: 'Square meter',
  ctype: 'mul',
  select: ['Square kilometer', 'Square mile'],
  conversions: [1e-12, 1e-10, 1e-6, 0.01, 1, 6.4516e-10, 9.290304e-8, 8.3612736e-7,
    2.589988110336, 0.0040468564224],
  custom: []
};

let time = {
  units: ['Microsecond', 'Millisecond', 'Second', 'Minute', 'Hour', 'Day', 'Week',
    'Fortnight', 'Siderial month', 'Lunar month', '30 Days', 'Month', 'Quarter',
    'Common year', 'Julian year', 'Year', 'Sidereal year', 'Leap Year', 'Decade',
    'Average human life', 'Century', 'Millenium'],
  common: 'Day',
  ctype: 'mul',
  select: ['Year', 'Second'],
  conversions: [1/86400000000, 1/86400000, 1/86400, 1/1440, 1/24, 1, 7,
    14, 27.321661, 29.530588, 30, 30.4166666667, 91.25,
    365, 365.25, 365.2425, 365.256363004, 366, 3652.425,
    25749.59625, 36524.25, 365242.5],
  custom: []
};

let volume = {
  units: ['Microliter', 'Milliliter', 'Centiliter', 'Deciliter', 'Liter',
    'Decaliter', 'Hectoliter', 'Kiloliter', 'Cubic inch', 'Cubic foot', 'Cubic yard', 'Minim', 'Fluid dram', 'Teaspoon', 'Tablespoon', 'Fluid ounce', 'Shot', 'Cup', 'Pint', 'Quart', 'Gallon', 'Barrel', 'Hogshead', 'Cord'],
  common: 'Milliliter',
  ctype: 'mul',
  select: ['Liter', 'Cup'],
  conversions: [0.001, 1, 10, 100, 1000, 10000, 100000, 1000000, 16.387064, 28316.8, 
    764555, 0.061611519921875, 	3.6966911953125, 4.92892159375, 14.78676478125, 29.5735295625, 30, 44.36029434375, 236.5882365, 473.176473, 946.352946, 3785.411784,119240.471196, 238480.942392, 3624556.3648],
  custom: [['Cubic foot', 'Cubic inch', 1728], ['Cubic yard', 'Cubic foot', 27], ['Tablespoon', 'Teaspoon', 3], ['Fluid ounce', 'Cubic inch', 1.8046875], ['Cup', 'Tablespoon', 16], ['Cup', 'Teaspoon', 48]]
};

let energy = {
  units: ['Microjoule', 'Millijoule', 'Joule', 'Kilojoule', 'Megajoule', 'Gigajoule', 'Terajoule', 'Exajoule', 'Microwatt-hour', 'Milliwatt-hour', 'Watt-hour', 'Kilowatt-hour', 'Megawatt-hour', 'Gigawatt-hour', 'Terawatt-hour', 'Calorie', 'Kilocalorie', 'Foot-pound'],
  common: 'Joule',
  ctype: 'mul',
  select: ['Kilowatt-hour', 'Joule'],
  conversions: [1e-6, 0.001, 1, 1000, 1e6, 1e9, 1e12, 1e15, 0.0036, 3.6, 3600, 3.6e6, 3.6e9, 3.6e12, 3.6e15, 4.184, 4184, 1.35582],
  custom: []
}

let computing = {
  units: ['Bit', 'Kibibit', 'Kilobit', 'Mebibit', 'Megabit', 'Gibibit', 'Gigabit', 'Tebibit', 'Terabit', 'Pebibit', 'Petabit', 'Ebibit', 'Exabit', 'Zebibit', 'Zettabit', 'Yobibit', 'Yottabit', 'Nibble', 'Byte', 'Kibibyte', 'Kilobyte', 'Mebibyte', 'Megabyte', 'Gibibyte', 'Gigabyte', 'Tebibyte', 'Terabyte', 'Pebibyte', 'Petabyte', 'Ebibyte', 'Exabyte', 'Zebibyte', 'Zettabyte','Yobibyte', 'Yottabyte'],
  common: 'Byte',
  ctype: 'mul',
  select: ['Gigabyte', 'Megabyte'],
  conversions: [1/8, 2**7, 10**3/8, 2**17, 10**6/8, 2**27, 10**9/8, 2**37, 10**12/8, 2**47, 10**15/8, 2**57, 10**18/8, 2**67, 10**21/8, 2**77, 10**24/8, 1/2, 1, 2**10, 10**3, 2**20, 10**6, 2**30, 10**9, 2**40, 10**12, 2**50, 10**15, 2**60, 10**18, 2**70, 10*21, 2**80, 10**24],
  custom: []
}
