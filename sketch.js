function setup() { 
  createCanvas(windowWidth, windowHeight);
} 

function draw() { 
  background(220);
  rectMode(CENTER);
  rect(width / 2, height / 2, 200, 100);
}

/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling
 * the page.
 */
function touchStarted(){
  return false;
}

function touchMoved(){
  return false;
}

function touchEnded(){
  return false;
}
