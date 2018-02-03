// Classes and their color
let classes = [
  ['null',    0,   0,   0  ],
  ['water',   5,   30,  140],
  ['earth',   145, 90,  30 ],
  ['fire',    160, 20,  5  ],
  ['air',     60,  130, 200],
  ['stone',   70,  70,  70 ],
  ['energy',  240, 200, 20 ],
  ['life',    80,  165, 40 ],
  ['animal',  195, 65,  45 ],
  ['human',   240, 100, 10 ],
  ['death',   60,  90,  15 ],
  ['space',   20,  20,  30 ],
  ['wood',    70,  40,  0  ],
  ['food',    110, 50,  130],
  ['tools',   210, 200, 200],
  ['computer',160, 160, 170]
]

// Elements and their class
let elements = [
  ['Water', 'water'],
  ['Earth', 'earth'],
  ['Fire', 'fire'],
  ['Air', 'air'],
  ['Mud', 'earth'],
  ['Lava', 'fire'],
  ['Stone', 'stone'],
  ['Cloud', 'air'],
  ['Smoke', 'air'],
  ['Steam', 'air'],
  ['Sand', 'stone'],
  ['Rain', 'water'],
  ['Ocean', 'water'],
  ['Salt', 'stone'],
  ['Energy', 'energy'],
  ['Earthquake', 'earth'],
  ['Swamp', 'earth'],
  ['Life', 'life'],
  ['Algae', 'life'],
  ['Bird', 'animal'],
  ['Plant', 'life'],
  ['Mammal', 'animal'],
  ['Tree', 'life'],
  ['Glass', 'stone'],
  ['Brick', 'stone'],
  ['Monkey', 'animal'],
  ['Egg', 'life'],
  ['Phoenix', 'fire'],
  ['Human', 'human'],
  ['Love', 'human'],
  ['Clay', 'earth'],
  ['Wall', 'stone'],
  ['Family', 'human'],
  ['House', 'human'],
  ['Town', 'human'],
  ['City', 'human'],
  ['Metal', 'stone'],
  ['Electricity', 'energy'],
  ['Dust', 'earth'],
  ['Lightning', 'energy'],
  ['Atmosphere', 'air'],
  ['Planet', 'space'],
  ['Star', 'space'],
  ['Ash', 'stone'],
  ['Mountain', 'earth'],
  ['Volcano', 'fire'],
  ['Stick', 'wood'],
  ['Axe', 'tools'],
  ['Wood', 'wood'],
  ['Campfire', 'fire'],
  ['Wind', 'air'],
  ['Cold', 'air'],
  ['Seeds', 'life'],
  ['Grass', 'life'],
  ['Penguin', 'animal'],
  ['Ostrich', 'animal'],
  ['Chicken', 'animal'],
  ['Roast Chicken', 'food'],
  ['Pig', 'animal'],
  ['Bacon', 'food'],
  ['Ham', 'food'],
  ['Cow', 'animal'],
  ['Steak', 'food'],
  ['Wheat', 'life'],
  ['Flour', 'food'],
  ['Dough', 'food'],
  ['Bread', 'food'],
  ['Toast', 'food'],
  ['Blade', 'tools'],
  ['Knife', 'tools'],
  ['Shavings', 'wood'],
  ['Wood Pulp', 'wood'],
  ['Paper', 'tools'],
  ['Ice', 'water'],
  ['Snow', 'water'],
  ['Fish', 'animal'],
  ['Whale', 'animal'],
  ['Sheep', 'animal'],
  ['Worker', 'human'],
  ['Blacksmith', 'human'],
  ['Shepherd', 'human'],
  ['Farmer', 'human'],
  ['Wire', 'computer'],
  ['Robot', 'computer'],
  ['Computer', 'computer'],
  ['Network', 'computer'],
  ['Internet', 'computer'],
  ['Pet', 'animal'],
  ['Cat', 'animal'],
  ['Dog', 'animal'],
  ['Meme', 'computer'],
  ['Corpse', 'death'],
  ['Bone', 'death'],
  ['Zombie', 'death'],
  ['Alien', 'death'],
  ['Rainbow', 'air'],
  ['Unicorn', 'animal'],
  ['Bonfire', 'fire'],
  ['Storm', 'air'],
  ['Hurricane', 'air'],
  ['Tornado', 'air'],
  ['Potato', 'food'],
  ['Fruit', 'life'],
  ['Apple', 'food'],
  ['Watermelon', 'food'],
  ['Eggplant', 'food'],
  ['Crab', 'animal'],
  ['Milk', 'food'],
  ['Butter', 'food'],
  ['Forest', 'life'],
  ['Jungle', 'life'],
  ['Banana', 'food'],
  ['Skyscraper', 'human'],
  ['Goldfish', 'animal'],
  ['Wheel', 'wood'],
  ['Car', 'computer'],
  ['Book', 'tools'],
  ['Children', 'human'],
  ['School', 'human']
]

// Recipes: two inputs and some outputs
let recipes = [
  ['Water',  'Earth',  ['Mud']],
  ['Fire',   'Earth',  ['Lava']],
  ['Lava',   'Water',  ['Stone']],
  ['Air',    'Water',  ['Cloud']],
  ['Air',    'Fire',   ['Smoke']],
  ['Stone',  'Water',  ['Sand']],
  ['Water',  'Cloud',  ['Rain']],
  ['Water',  'Water',  ['Ocean']],
  ['Ocean',  'Fire',   ['Salt']],
  ['Water',  'Fire',   ['Steam', 'Energy']],
  ['Energy', 'Earth',  ['Earthquake']],
  ['Mud',    'Water',  ['Swamp']],
  ['Swamp',  'Energy', ['Life']],
  ['Life',   'Water',  ['Algae']],
  ['Life',   'Air',    ['Bird']],
  ['Algae',  'Earth',  ['Plant']],
  ['Life',   'Earth',  ['Mammal']],
  ['Plant',  'Air',    ['Tree']],
  ['Sand',   'Fire',   ['Glass']],
  ['Clay',   'Fire',   ['Brick']],
  ['Tree',   'Mammal', ['Monkey']],
  ['Monkey', 'Fire',   ['Human']],
  ['Bird',   'Stone',  ['Egg']],
  ['Bird',   'Fire',   ['Phoenix']],
  ['Monkey', 'Fire',   ['Human']],
  ['Human',  'Human',  ['Love']],
  ['Mud',    'Swamp',  ['Clay']],
  ['Brick',  'Brick',  ['Wall']],
  ['Human',  'Love',   ['Family']],
  ['Wall',   'Family', ['House']],
  ['House',  'House',  ['Town']],
  ['Town',   'Town',   ['City']],
  ['Fire',   'Stone',  ['Metal']],
  ['Metal',  'Energy', ['Electricity']],
  ['Air',    'Earth',  ['Dust']],
  ['Fire',   'Air',    ['Smoke']],
  ['Energy', 'Air',    ['Lightning']],
  ['Air',    'Air',    ['Atmosphere']],
  ['Atmosphere', 'Earth', ['Planet']],
  ['Planet', 'Fire',   ['Star']],
  ['Tree',   'Fire',   ['Ash']],
  ['Plant',  'Fire',   ['Ash']],
  ['Earth',  'Earth',  ['Mountain']],
  ['Lava',   'Mountain', ['Volcano']],
  ['Tree',   'Stone',  ['Stick']],
  ['Stick',  'Stone',  ['Axe']],
  ['Tree',   'Axe',    ['Wood']],
  ['Wood',   'Fire',   ['Campfire', 'Smoke']],
  ['Air',    'Atmosphere', ['Wind']],
  ['Wind',   'Water',  ['Cold']],
  ['Life',   'Sand',   ['Seeds']],
  ['Seeds',  'Earth',  ['Grass']],
  ['Bird',   'Cold',   ['Penguin']],
  ['Bird',   'Sand',   ['Ostrich']],
  ['Earth',  'Bird',   ['Chicken']],
  ['Fire',   'Chicken',['Roast Chicken']],
  ['Mammal', 'Mud',    ['Pig']],
  ['Pig',    'Fire',   ['Ham']],
  ['Pig',    'Smoke',  ['Bacon']],
  ['Mammal', 'Grass',  ['Cow']],
  ['Cow',    'Fire',   ['Steak']],
  ['Grass',  'Air',    ['Wheat']],
  ['Wheat',  'Stone',  ['Flour']],
  ['Flour',  'Water',  ['Dough']],
  ['Dough',  'Fire',   ['Bread']],
  ['Bread',  'Fire',   ['Toast']],
  ['Metal',  'Stone',  ['Blade']],
  ['Blade',  'Stick',  ['Knife']],
  ['Knife',  'Wood',   ['Shavings']],
  ['Water',  'Shavings', ['Wood Pulp']],
  ['Fire',   'Wood Pulp', ['Paper']],
  ['Cold',   'Water',  ['Ice']],
  ['Cold',   'Rain',   ['Snow']],
  ['Ocean',  'Life',   ['Fish']],
  ['Ocean',  'Mammal', ['Whale']],
  ['Mammal', 'Cloud',  ['Sheep']],
  ['Human',  'Axe',    ['Worker']],
  ['Worker', 'Metal',  ['Blacksmith']],
  ['Worker', 'Sheep',  ['Shepherd']],
  ['Worker', 'Wheat',  ['Farmer']],
  ['Metal',  'Electricity', ['Wire']],
  ['Wire',   'Wire',   ['Computer']],
  ['Human',  'Computer', ['Robot']],
  ['Computer', 'Computer', ['Network']],
  ['Network','Network',['Internet']],
  ['Human',  'Mammal', ['Pet']],
  ['Pet',    'Milk',   ['Cat']],
  ['Pet',    'Bone',   ['Dog']],
  ['Cat',    'Internet', ['Meme']],
  ['Human',  'Fire',   ['Corpse']],
  ['Corpse', 'Fire',   ['Bone', 'Ash']],
  ['Corpse', 'Life',   ['Zombie']],
  ['Planet', 'Life',   ['Alien']],
  ['Star',   'Rain',   ['Rainbow']],
  ['Rainbow','Mammal', ['Unicorn']],
  ['Fire', 'Fire', ['Bonfire']],
  ['Rain',   'Rain',   ['Storm']],
  ['Storm',  'Wind',   ['Hurricane']],
  ['Hurricane','Wind', ['Tornado']],
  ['Plant',  'Earth',  ['Potato']],
  ['Plant',  'Plant',  ['Fruit']],
  ['Fruit',  'Tree',   ['Apple']],
  ['Fruit',  'Water',  ['Watermelon']],
  ['Fruit',  'Egg',    ['Eggplant']],
  ['Fish',   'Earth',  ['Crab']],
  ['Cow',    'Water',  ['Milk']],
  ['Milk',   'Energy', ['Butter']],
  ['Tree',   'Tree',   ['Forest']],
  ['Forest', 'Monkey', ['Jungle']],
  ['Fruit',  'Monkey', ['Banana']],
  ['Metal',  'City',   ['Skyscraper']],
  ['Fish',   'Pet',    ['Goldfish']],
  ['Energy', 'Wood',   ['Wheel']]
  ['Wheel',  'Metal',  ['Car']],
  ['Paper',  'Paper',  ['Book']],
  ['Family', 'Love',   ['Children']],
  ['House',  'Children', ['School']]
]

// Get the outputs when two elements are combined
function getOutputs(e1, e2) {
  for(let r = 0; r < recipes.length; r++) {
    if((recipes[r][0] == e1 && recipes[r][1] == e2) || (recipes[r][0] == e2 && recipes[r][1] == e1)) {
      return recipes[r][2];
    }
  }
  return null;
}

// Get the color of a class
function getColor(clazz) {
  for(let c = 0; c < classes.length; c++) {
    if(classes[c][0] == clazz) {
      return [classes[c][1], classes[c][2], classes[c][3]];
    }
  }
}

// Get the class of an element
function getClass(element) {
  let clazz = classes[0][0];
  for(let e = 0; e < elements.length; e++) {
    if(elements[e][0] == element) {
      clazz = elements[e][1]
    }
  }
  return clazz;
}

// The help text shown when 'q' is pressed
let helpText =
'Click on an element to select it and then click' +
' on another one to combine them. Try to get all ' +
elements.length + '!' +
'\n \n' +
'A hint will select an element that you can combine' +
' with another element you have to create something' +
' you do not have.' +
'\n \n' +
'Sorting modes will sort your elements either by' +
' order added, alphabetically, by class, or randomly.' +
'\n \n' +
'Some elements can be combined with themselves. Some' +
' elements cannot be used in any combinations.' +
'\n' +
'\n    Q - View this help message' +
'\n    M - Change sorting mode' +
'\n    T - Show/hide time' +
'\n    H - Use a hint' +
'\n    Enter - Recalculate' +
'\n    Mouse Wheel - Scrolling' +
'\n    X - Clear savedata';
