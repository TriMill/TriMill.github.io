let expectedFPS = 60;
let prevFPS = expectedFPS;
let currentFPS = prevFPS;
let updateRate = 2;
let updateFunction = null;

function setExpectedFPS(fps) {
  frameRate(fps);
  expectedFPS = fps;
}

function setFPSUpdateRate(timesPerSecond) {
  updateRate = timesPerSecond
}

function updateFPS() {
  prevFPS = (prevFPS + frameRate())/2;
  if(frameCount % (expectedFPS/updateRate) == 0) {
    currentFPS = prevFPS;
    if(updateFunction != null) {
      updateFunction();
    }
  }
}

function getFPS() {
  return currentFPS;
}

function getRoundedFPS(sigFigs) {
  let factor = pow(10, sigFigs);
  return round(currentFPS * factor)/factor;
}

function setUpdateFunction(funct) {
  updateFunction = funct;
}
