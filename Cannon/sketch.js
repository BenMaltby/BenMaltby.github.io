class smartBall{
	constructor(theta, startSpeed, isInBox=false){
	  this.isInBox = isInBox	
	  this.pos = createVector(random(100, width-100), random(100, ballZoneLine-100))
      this.col = color(random(360), 70, 100)
	  this.radius = 30;
	  if (!this.isInBox){
		this.pos = createVector(
			width/2 + cannonLength * cos(theta), 
			height-baseHeight + cannonLength * sin(theta)
		)
        this.col = color(90)
        this.radius = 20
	  }
	  this.vel = p5.Vector.fromAngle(theta, startSpeed)
	  this.acc = createVector()
	  this.maxSpeed = 100;
	  this.minSpeed = 5;
	  this.canCollide = false;
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
	  
	  if (this.pos.y + this.radius < ballZoneLine && !this.canCollide) {
		this.canCollide = true
	  }
	  
	  if (this.isInBox){
		if (!this.canCollide){return}
		
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
		if (this.pos.y + this.radius >= ballZoneLine){
			this.vel.y *= -1
			this.pos.y -= this.pos.y + this.radius - ballZoneLine
		}
	  }
	}
	
	show(){
	  strokeWeight(this.radius*2)
	  // this.col.setAlpha(0.6)
	  stroke(this.col)
	  point(this.pos.x, this.pos.y)
	}
}

let rawAng = 4;
let targetAng = 4;
let theta = 0;
let balls = []
let ballLimit = 10;
let cannonBalls = []
let cannonsToDelete = []

let firstShot = true
let shotQueued = false;
let mouseLifted = false;
let shotPos;

let cannonLength = 200;
let cannonWidth = 50;
let baseWidth = 160;
let baseHeight = 70;
let ballZoneLine;

let pSystem;
let cannonParticles;
let ballParticles;

function setup() {
	createCanvas(windowWidth + 5, windowHeight);
	colorMode(HSB)
	rectMode(CENTER)

	ballZoneLine = height * 0.75
  
    cannonParticles = {
      nParts: 30,
      shotSpeed: [2, 50],
      radius: [5,15],
      shotDir: 0,
      angleRange: [-PI/20, PI/20],
      gravity: 0.1,
      life: 40
    }
  
    ballParticles = {
      nParts: 30,
      shotSpeed: [10, 25],
      radius: [15,25],
      shotDir: 0,
      angleRange: [0, TAU],
      gravity: 0.5,
      life: 60
    }

	// cannon particle system
	pSystem = new particleSystem()

	for (let i = 0; i < ballLimit; i++){
		balls.push(new smartBall(random(TAU), random(3, 6), true))
	}
}

function draw() {
	background(0, 0, 10, 1);

	for (let b of balls){
		b.update()
		b.show()
	}

	for (let i = 0; i < cannonBalls.length; i++){
		let c = cannonBalls[i]
		c.update()

		if (c.pos.x<-100||c.pos.x>width+100||c.pos.y<-100||c.pos.y>height+100){
			cannonsToDelete.push(i)
		}

		for (let b of balls){

			let vBet = p5.Vector.sub(b.pos, c.pos)
			if (vBet.mag() < b.radius + c.radius){  // in collision

				let normBetween = p5.Vector.normalize(vBet);
				normBetween.mult(-1);
				let dotProduct = p5.Vector.dot(c.vel, normBetween);
				let normalDot = p5.Vector.mult(normBetween, 2*dotProduct)
                
                ballParticles.shotDir = atan2(c.vel.y, c.vel.x)
                pSystem.addExplosion(
                  b.pos.x+normBetween.x, 
                  b.pos.y+normBetween.y, 
                  ballParticles)                
                
				c.vel = p5.Vector.sub(c.vel, normalDot)
                b.vel = p5.Vector.sub(b.vel, p5.Vector.mult(normalDot, -1))
				
				vBet.setMag(b.radius+c.radius-vBet.mag())
                b.pos.add(vBet)
				vBet.mult(-1)
				c.pos.add(vBet)
              
			}
		}

		c.show()
	}

	drawCannon(rawAng)
	// drawAxis()

	if (mouseIsPressed){
		let cMouseY = constrain(mouseY, 0, ballZoneLine - baseHeight)
		shotPos = createVector(mouseX, cMouseY)
		targetAng = atan2(cMouseY - height + 70, mouseX - width/2) + TAU
		shotQueued = true;
		
		mouseLifted = true;
	}
	else{
		if (mouseLifted){  // on mouse lift
			let force = p5.Vector.dist(shotPos, cannonPos)/5
			cannonBalls.push(new smartBall(rawAng, 100))
          
            cannonParticles.shotDir = targetAng
			pSystem.addExplosion(cannonPos.x, cannonPos.y, cannonParticles)
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

function destroyParticles(ls, dl){
	for (let d of dl){
		ls.splice(d,1)
	}
	dl = []
}

function touchStarted(){
	return false;
}

function touchMoved(){
	return false;
}

function touchEnded(){
	return false;
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