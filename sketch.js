class smartBall{
  constructor(theta, startSpeed){
    this.pos = createVector(
      width/2 + cannonLength * cos(theta), 
      height-baseHeight + cannonLength * sin(theta)
    )
    this.vel = p5.Vector.fromAngle(theta, startSpeed)
    this.acc = createVector()
    this.maxSpeed = 100;
    this.minSpeed = 2;
    this.col = color(90)
    this.radius = 20;
  }
  
  update(){
    this.acc = p5.Vector.setMag(this.vel, -2)
    if (p5.Vector.mag(this.vel) - p5.Vector.mag(this.acc) > 0){
      this.vel.add(this.acc)
    }
    else{
      this.vel.setMag(this.minSpeed)
    }
    this.vel.setMag(constrain(p5.Vector.mag(this.vel), this.minSpeed, this.maxSpeed))
    this.pos.add(this.vel)
    
    if (this.pos.y - this.radius <= 0){
      this.vel.y *= -1
      this.pos.y -= this.pos.y - this.radius
      return;
    }
    if (this.pos.x - this.radius <= 0){
      this.vel.x *= -1
      this.pos.x -= this.pos.x - this.radius
      return;
    }
    if (this.pos.x + this.radius >= width){
      this.vel.x *= -1
      this.pos.x -= this.pos.x + this.radius - width
      return;
    }
    if (this.pos.y + this.radius >= height){
      this.vel.y *= -1
      this.pos.y -= this.pos.y + this.radius - height
    }
  }
  
  show(){
    strokeWeight(this.radius*2)
    stroke(this.col)
    point(this.pos.x, this.pos.y)
  }
}

let rawAng = 4;
let targetAng = 4;
let theta = 0;
let balls = []
let firstShot = true
let shotQueued = false;
let mouseLifted = false;
let shotPos;

let cannonLength = 200;
let cannonWidth = 50;
let baseWidth = 160;
let baseHeight = 70;

let pSystem;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB)
  rectMode(CENTER)
  
  // cannon particle system
  pSystem = new particleSystem()
}

function draw() {
  background(0, 0, 10, 1);
  
  for (let b of balls){
    b.update()
    b.show()
  }
  
  drawCannon(rawAng)
  // drawAxis()
  
  if (mouseIsPressed){
    let cMouseY = constrain(mouseY, 0, height - baseHeight - 20)
    shotPos = createVector(mouseX, cMouseY)
    targetAng = atan2(cMouseY - height + 70, mouseX - width/2) + TAU
    shotQueued = true;
    
    mouseLifted = true;
  }
  else{
    if (mouseLifted){  // on mouse lift
      let force = p5.Vector.dist(shotPos, cannonPos)/5
      balls.push(new smartBall(rawAng, 100))
      pSystem.addExplosion(cannonPos.x, cannonPos.y, targetAng)
      shotQueued = false
      mouseLifted = false;
    }
  }
  
  if (shotQueued){
    shotGuide()
  }
  
  let diff = targetAng - rawAng
  if (abs(diff) < 0.01){
    rawAng = targetAng
  }else{
    firstShot = true;
    rawAng += diff / 6
  }
  
  pSystem.process()
}

function shotGuide(){
  cannonPos = createVector(
      width/2 + cannonLength * cos(rawAng), 
      height - baseHeight + cannonLength * sin(rawAng))
  stroke(0, 70, 100)
  strokeWeight(3)
  line(cannonPos.x, cannonPos.y, shotPos.x, shotPos.y)
  
  strokeWeight(10)
  line(shotPos.x, shotPos.y,
      shotPos.x + 20 * cos(targetAng - PI * 0.75),
      shotPos.y + 20 * sin(targetAng - PI * 0.75))
  
  line(shotPos.x, shotPos.y,
      shotPos.x + 20 * cos(targetAng + PI * 0.75),
      shotPos.y + 20 * sin(targetAng + PI * 0.75))
}

function drawCannon(theta){  
  push()
  rectMode(CORNER)
  noStroke()
  fill(30)
  translate(width/2, height - baseHeight)
  rotate(theta)
  rect(0, -cannonWidth/2, cannonLength, cannonWidth, 0, 5, 5, 0)
  stroke(30)
  strokeWeight(cannonWidth)
  point(0, 0)
  pop()

  fill(50)
  noStroke()
  rect(width/2, height, baseWidth, baseHeight*2, 20, 20)
}

function drawAxis(){
  stroke(0)
  strokeWeight(2)
  line(width/2, 0, width/2, height)
  line(0, height/2, width, height/2)
}
