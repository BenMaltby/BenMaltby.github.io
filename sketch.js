// I found this quite difficult

let middleFinger = [
  -80, 155, -81, 83, -110, 54, -120, 43, -122, 31, -123, -59, -119, -70, 
  -112, -78, -101, -83, -81, -83, -77, -99, -67, -107, -61, -110, -52, -112, 
  -39, -112, -24, -111, -25, -60, -24, -219, -19, -230, -15, -233, -6, -237, 
  4, -236, 11, -232, 16, -225, 18, -218, 19, -60, 18, -110, 40, -112, 50, 
  -111, 59, -108, 67, -103, 71, -97, 75, -88, 75, -83, 90, -84, 98, -82, 107, 
  -76, 113, -68, 116, -61, 117, -56, 117, -45, 117, 23, 116, 33, 115, 39, 
  109, 49, 101, 56, 98, 60, 74, 83, 74, 156, -80, 155
]

let waveEmoji = [
  -29, 154, -61, 142, -86, 125, -102, 102, -112, 84, -117, 64, -116, 39, 
  -116, 23, -171, -125, -173, -138, -168, -149, -157, -153, -146, -152, -137, 
  -147, -131, -136, -94, -49, -91, -45, -85, -45, -79, -50, -78, -58, -96, 
  -186, -94, -197, -86, -206, -74, -209, -62, -205, -56, -197, -34, -70, -29, 
  -62, -24, -62, -20, -67, -19, -72, -18, -207, -15, -213, -5, -223, 7, -223, 
  17, -219, 23, -210, 25, -197, 24, -69, 28, -63, 33, -63, 38, -64, 41, -71, 
  67, -182, 80, -194, 94, -195, 103, -188, 108, -178, 107, -166, 73, 5, 75, 
  12, 80, 15, 89, 17, 99, 7, 134, -23, 147, -26, 159, -25, 170, -19, 175, -13, 
  178, -3, 178, 5, 176, 16, 167, 26, 57, 131, 44, 140, 33, 146, 21, 151, 1, 
  156, -14, 156, -29, 154
]

// let sLetter = [
//   39, -246, 16, -244, -39, -232, -86, -212, -127, -182, -145, -148, -149, 
//   -116, -146, -87, -114, -61, -62, -42, -15, -24, 10, -5, 15, 11, 9, 27, 
//   -1, 42, -15, 59, -58, 86, -84, 99, -103, 114, -109, 124, -111, 131, -88, 
//   144, -70, 148, -51, 146, -26, 133, 11, 117, 40, 93, 60, 62, 66, 16, 62, 
//   -21, 53, -46, 20, -66, -20, -77, -54, -92, -79, -111, -87, -131, -76, 
//   -157, -38, -173, -15, -181, 19, -193, 40, -202, 50, -211, 52, -223, 52, 
//   -232, 50, -237, 47, -243, 39, -246
// ]

let heartEmoji = [
  -1, 164, -5, 148, -12, 132, -20, 114, -33, 94, -48, 73, -56, 59, -70, 
  41, -83, 25, -96, 4, -110, -14, -127, -42, -134, -67, -134, -83, -130, 
  -104, -122, -116, -108, -128, -95, -136, -78, -142, -66, -142, -53, -138, 
  -39, -133, -25, -124, -15, -112, -9, -101, -3, -91, 0, -82, 6, -96, 12, 
  -107, 20, -118, 31, -129, 44, -137, 59, -140, 70, -141, 79, -140, 93, 
  -137, 105, -130, 114, -122, 123, -111, 130, -100, 132, -88, 133, -76, 130, 
  -59, 126, -45, 118, -28, 110, -10, 74, 36, 54, 62, 38, 84, 23, 109, 12, 
  131, 6, 146, -1, 164
]

let starEmoji = [
  -118, 163, -76, 26, -190, -62, -49, -63, 0, -197, 47, -62, 189, -60, 76, 26, 
  116, 163, 0, 81, -118, 163
]

let tickEmoji = [
  -185, 5, -144, -36, -52, 54, 152, -148, 194, -106, -52, 140, -185, 5
]

let pallete = [
  ['#ff85a1', '#a4133c', '#ff477e'],
  ['#48cae4', '#023e8a', '#0077b6'],
  ['#e01e37', '#641220', '#a11d33'],
  ['#ffaa00', '#ff8800', '#ffdd00'],
  ['#70e000', '#006400', '#16c60c']
]

class ball{
  constructor(){
    this.pos = createVector(mouseX, mouseY)
    this.rad = 30
    this.vel = createVector()
    this.prevPos = createVector()
  }
  
  collision(points){
    for (let i = 0; i < points.length; i++){
      let c = points[i].pos
      let vBet = p5.Vector.sub(c, p5.Vector.sub(this.pos, createVector(width/2, height/2)))
      let m = p5.Vector.mag(vBet)
      if (m < this.rad + pointRad/2){
        c.add(p5.Vector.sub(p5.Vector.setMag(vBet, this.rad + pointRad/2), vBet))
        points[i].vel = p5.Vector.mult(this.vel, 1.2)
      }
    }
  }
  
  process(points){
    
    this.pos = createVector(mouseX, mouseY)
    this.vel = p5.Vector.sub(this.pos, this.prevPos)
    
    // strokeWeight(2)
    // noFill()
    // circle(this.pos.x, this.pos.y, this.rad*2)
    
    this.collision(points)
    
    this.prevPos = this.pos.copy()
  }
}

class smartPoint{
  constructor(pos){
    this.pos = pos.copy()
    this.target = pos.copy()
    this.rad = pointRad
    this.vel = createVector(0, 0)
    this.desiredVel = createVector(0, 0)
    this.steering = 0.1
    this.speedLimit = 10
    this.easingValue = -0.55 // between -1 and -0.46
  }
  
  static process(ps){
    
    // console.log(this.pos, this.target)
    // noLoop()
    
    let slowThreshold = 5;
    
    for (let p = 0; p < ps.length; p++){
      let c = ps[p]
      
      c.desiredVel = p5.Vector.limit(p5.Vector.sub(c.target, c.pos), c.speedLimit)
      c.vel.limit(c.speedLimit)
      let left = p5.Vector.mult(c.vel, 1-c.steering)
      let right = p5.Vector.mult(c.desiredVel, c.steering)
      let steer = p5.Vector.add(left, right)
      c.vel = p5.Vector.limit(p5.Vector.add(c.vel, steer), this.speedlimit)
      
      // slow the bitch down
      let distB = p5.Vector.mag(p5.Vector.sub(c.target, c.pos))
      c.vel.add(p5.Vector.mult(c.vel, c.easingValue))
      // if (distB < slowThreshold){
      //   c.pos = c.target.copy()
      //   c.vel.mult(0)
      // }
      
      c.pos.add(c.vel)
      
      // point(c.pos.x + width/2, c.pos.y + height/2)
    }

  }
}

let fingerPoints = []
let wavePoints = []
let sLetterPoints = []
let heartPoints = []
let starPoints = []
let tickPoints = []
let shapePallete = []

let n = 400;
let pointRad = 10
let wreckingBall;
let pointSet1 = []
let shapeToUse;
let shapeIDX = 0;

function setup() {
  createCanvas(700, 700);
  colorMode(HSB)
  
  fingerPoints = generateDotPath(middleFinger, n)
  wavePoints = generateDotPath(waveEmoji, n)
  // sLetterPoints = generateDotPath(sLetter, n)
  heartPoints = generateDotPath(heartEmoji, n)
  starPoints = generateDotPath(starEmoji, n)
  tickPoints = generateDotPath(tickEmoji, n)
  shapePallete = [heartPoints, wavePoints, fingerPoints, starPoints, tickPoints]
  
  wreckingBall = new ball()
  
  shapeToUse = shapePallete[shapeIDX]
  
  for (let i = 0; i < shapeToUse.length; i++){
    pointSet1.push(new smartPoint(shapeToUse[i]))
  }
  
  
  for (let c of pallete){
    c[0] = color(c[0])
    c[0].setAlpha(0.3)
  }
  
}

let swapIDX = 0;
let shouldSwap = false;

let slideSpeed = 300;
let prevFrameCount = 0;


let startProgram = false;

function draw() {
  if (startProgram){
  background(pallete[shapeIDX][0]);
  
  if ((frameCount - prevFrameCount) % slideSpeed <= 0){
    mouseClicked()
    slideSpeed = constrain(slideSpeed-5, 300, 300)
    prevFrameCount = frameCount
  }
  
  for (let i = 0; i < 2; i++){
    if (shouldSwap){
      shapeToUse = shapePallete[shapeIDX]
      pointSet1[swapIDX].vel = p5.Vector.fromAngle(random(TAU), 10)
      
      pointSet1[swapIDX].target = shapeToUse[swapIDX]
      swapIDX++;

      if (swapIDX == pointSet1.length){
        shouldSwap = false;
        // shapeIDX = (shapeIDX + 1) % shapePallete.length
        swapIDX = 0
      }
    }  
  }
  
  fill(pallete[shapeIDX][2])
  
  if (p5.Vector.dist(pointSet1[n-1].pos, shapeToUse[swapIDX]) <= 10){
    noStroke()
    drawShape(width/2, height/2, pointSet1)
  }
  
  stroke(pallete[shapeIDX][1])
  strokeWeight(pointRad)
  drawDotPath(width/2, height/2, pointSet1, "POINTS")
  
  smartPoint.process(pointSet1)
  // wreckingBall.process(pointSet1)
    
  }else{
    background(90)
    fill(10)
    textSize(40)
    text("Press the \"d\" key to start.", 100, 300)
    if (key == 'd'){
      startProgram = true
      background(10)
      prevFrameCount = frameCount
      mouseClicked()
    }
  }
}

function mouseClicked(){
  shapeIDX = (shapeIDX + 1) % shapePallete.length
  shouldSwap = true
  
  // shapeToUse = shapePallete[shapeIDX]
  // for (let i = 0; i < pointSet1.length; i++){
  //   pointSet1[i].vel = p5.Vector.fromAngle(random(TAU), 0)
  //   // pointSet1[i].vel = p5.Vector.setMag(p5.Vector.sub(pointSet1[i].pos, createVector(0, 0)), 80)
  //   pointSet1[i].target = shapeToUse[i]
  // }
}

function drawShape(x, y, ps){
  push()
  translate(x, y)
  beginShape()
  for (let i = 0; i < ps.length; i++){
    vertex(ps[i].pos.x, ps[i].pos.y)
  }
  endShape()
  pop()
}

function drawDotPath(x, y, ps, type="POINTS"){
  push()
  translate(x, y)
  if (type == "POINTS"){
    for (let p = 0; p < ps.length; p++){
      let c = ps[p].pos
      point(c.x, c.y)
    }
  }
  else if (type == "LINES"){
    for (let p = 0; p < ps.length-1; p++){
      line(ps[p].pos.x, ps[p].pos.y, ps[p+1].pos.x, ps[p+1].pos.y)
    }
    let l = ps.length-1
    line(ps[l].pos.x, ps[l].pos.y, ps[0].pos.x, ps[0].pos.y)
  }
  pop()
}

// da best
function generateDotPath(rawShape, n){
  let vecShape = []
  let spacing = 0;
  let prevMag = 0;
  let final = []
  
  // convert raw points into createVector's
  for (let i = 0; i < rawShape.length; i+=2){
    vecShape.push(createVector(rawShape[i], rawShape[i+1]))
  }
  
  // calculate spacing between points
  let totalLength = 0;
  for (let i = 0; i < vecShape.length-1; i++){
    totalLength += p5.Vector.mag(p5.Vector.sub(vecShape[i+1], vecShape[i]))
  }
  spacing = totalLength / n;
  
  let percentage = 0
  let currLength = 0;
  
  for (let i = 0; i < 1; i+=spacing/totalLength){
    percentage = i
    currLength = 0

    for (let i = 0; i < vecShape.length - 1; i++){
      let vBet = p5.Vector.sub(vecShape[i+1], vecShape[i])
      let m = p5.Vector.mag(vBet)
      currLength += m

      if (currLength / totalLength >= percentage){
        let prevLength = currLength - m
        let distance = (percentage * totalLength - prevLength) / (currLength - prevLength)

        let scaled = p5.Vector.setMag(vBet, distance * m)
        final.push(p5.Vector.add(vecShape[i], scaled))
        break;
      }

    }
  }
  
  return final
}