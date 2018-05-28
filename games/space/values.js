
var diffs = [
  // food, superfood, spikes, bullets
  // lower number is more
  [4,   300, 200, 450],
  [5,   400, 150, 350],
  [6,   600, 120, 300],
  [5,   400, 150, 350],
  [8,   800, 100, 240],
  [6,   600, 120, 300],
  [10, 1000,  80, 260],
  [8,   800, 100, 240],
  [20, 1800,  60, 220],
  [10, 1000,  80, 260],
  [30, 2700,  50, 190],
  [40, 3000,  40, 150]

]

var objects = {
  food: {
    speed: 3,
    points: "p10",
    show: (x, y)=>{
      fill(255);
      noStroke();
      ellipse(x, y, 5);
    },
    col: ()=>{}
  },
  superfood: {
    speed: 6,
    points: "p90",
    show: (x, y)=>{
      fill(0, 180, 0);
      noStroke();
      ellipse(x, y, 20);
    },
    col: ()=>{col = lerpColor(col, color(0, 180, 0), 0.2);}
  },
  spike: {
    speed: 8,
    points: "p-30",
    show: (x, y)=>{
      stroke(255, 120, 0);
      strokeWeight(3);
      line(x-8, y-16, x, y);
      line(x+8, y-16, x, y);
    },
    col: ()=>{col = lerpColor(col, color(255, 120, 0), 0.2);}
  },
  bullet: {
    speed: 14,
    points: "l-1",
    show: (x, y)=>{
      stroke(240, 0, 0);
      strokeWeight(3);
      line(x-8, y-8, x, y);
      line(x-8, y-16, x-8, y-8);
      line(x+8, y-8, x, y);
      line(x+8, y-16, x+8, y-8);
    },
    col: ()=>{col = lerpColor(col, color(240, 0, 0), 0.8);}
  }
}
