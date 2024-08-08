let rawAng = 4;
let targetAng = 4;
let theta = 0;
let balls = []
let ballLimit = 10;
let cannonBalls = []
let cannonsToDelete = new Set()

let totalScore = 0;
let prevTotalMark = 0;
let highestMult = 1;

let firstShot = true
let mouseLifted = false;
let shotPos;

let cannonPos;
let cannonLength = 200;
let cannonWidth = 50;
let baseWidth = 160;
let baseHeight = 70;
let ballZoneLine;

let pSystem;
let cannonParticles;
let ballParticles;

// let font;
// function preload(){
// 	font = loadFont("Super-Squad-Italic.ttf")
// }

function setup() {
	createCanvas(windowWidth + 5, windowHeight);
	colorMode(HSB)
	rectMode(CENTER)
	// textFont(font)

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
      nParts: 50,
      shotSpeed: [5, 25],
      radius: [15,30],
      shotDir: 0,
      angleRange: [0, TAU],
      gravity: 0.1,
      life: 80
    }

	// cannon particle system
	pSystem = new particleSystem()

	for (let i = 0; i < ballLimit; i++){
		let ballStartPos = createVector(random(100, width-100), random(100, ballZoneLine-100))
      	let ballRandomColour = color(random(360), 70, 100)
		balls.push(new smartBall(ballStartPos, random(TAU), 5, ballRandomColour, 30, true))
	}
}

function draw() {
	background(0, 0, 10, 1);

	if (floor(totalScore / 25000) > prevTotalMark) {
		for (let i = 0; i < 2; i++){
			let ballStartPos = createVector(random(100, width-100), random(100, ballZoneLine-100))
			let ballRandomColour = color(random(360), 70, 100)
			balls.push(new smartBall(ballStartPos, random(TAU), 5, ballRandomColour, 30, true))
		}
		prevTotalMark = floor(totalScore / 25000)
	}

	for (let c of cannonBalls){
		c.update()
		c.show()
	}

	for (let b of balls){
		b.update()
		b.updateInBox()
		b.show()

		for (let i = 0; i < cannonBalls.length; i++){
			let c = cannonBalls[i]

			if (c.pos.x<-100||c.pos.x>width+100||c.pos.y<-100||c.pos.y>height+100){
				cannonsToDelete.add(i)
			}


			let vBet = p5.Vector.sub(b.pos, c.pos)
			if (vBet.mag() < b.radius + c.radius){  // in collision
				
				c.collisionCount ++;
				
				let hitScore = c.collisionCount * 50 * 1.3685
				totalScore += hitScore
				// superText.addText(`${hitScore.toFixed(2)}`, c.pos.x, c.pos.y, c.collisionCount)
				if (c.collisionCount > 1){
					superText.addText(`x${c.collisionCount}`, c.pos.x - 80, c.pos.y - 80, c.collisionCount)
					highestMult = (c.collisionCount > highestMult) ? c.collisionCount : highestMult
				}

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
	}

	drawCannon(rawAng)
	
	destroyCannonBalls()
	// drawAxis()

	if (mouseIsPressed){  // mouse is down
		let cMouseY = constrain(mouseY, 0, ballZoneLine - baseHeight)
		shotPos = createVector(mouseX, cMouseY)
		targetAng = atan2(cMouseY - height + 70, mouseX - width/2) + TAU
		shotGuide()
		
		mouseLifted = true;
	}
	else{
		if (mouseLifted){  // on mouse lift
			// let force = p5.Vector.dist(shotPos, cannonPos)/5
			cannonBalls.push(new smartBall(cannonPos, rawAng, 30, color(90), 50))
          
            cannonParticles.shotDir = targetAng
			pSystem.addExplosion(cannonPos.x, cannonPos.y, cannonParticles)
			shotQueued = false
			mouseLifted = false;
		}
	}

	let diff = targetAng - rawAng
	if (abs(diff) < 0.01){
		rawAng = targetAng
	}else{
		firstShot = true;
		rawAng += diff / 6
	}

	pSystem.process()

	superText.processText()

	textSize(60)
	noStroke()
	fill(90)
	let printScore = numberWithCommas(totalScore.toFixed(2))
	text(`${printScore}`, 200, 100)

	text(`x${highestMult} MULTI`, width - 400, 100)
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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

function destroyCannonBalls(){
	for (let d of cannonsToDelete){
		cannonBalls.splice(d, 1)
	}
	cannonsToDelete = new Set()
}

function shotGuide(){
	cannonPos = createVector(
		width/2 + cannonLength * cos(rawAng), 
		height - baseHeight + cannonLength * sin(rawAng))
	stroke(0, 70, 100)
	strokeWeight(3)
	let dl = p5.Vector.add(p5.Vector.setMag(p5.Vector.sub(shotPos,cannonPos), 200), cannonPos)
	line(cannonPos.x, cannonPos.y, dl.x, dl.y)

	let tempAng = atan2(dl.y-cannonPos.y, dl.x-cannonPos.x)
	strokeWeight(10)
	line(dl.x, dl.y,
		dl.x + 20 * cos(tempAng - PI * 0.75),
		dl.y + 20 * sin(tempAng - PI * 0.75))

	line(dl.x, dl.y,
		dl.x + 20 * cos(tempAng + PI * 0.75),
		dl.y + 20 * sin(tempAng + PI * 0.75))
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