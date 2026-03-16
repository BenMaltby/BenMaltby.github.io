class paddle
{
  constructor(x, y, w, h){
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.col = color(0, 0, 100);
    this.vel = createVector();
    this.maxSpeed = 8;
  }
  
	isCollided(ball){
		let nextPos = p5.Vector.add(ball.pos, ball.vel);
		let cPoint = createVector(
			constrain(nextPos.x, this.pos.x, this.pos.x + this.w),
			constrain(nextPos.y, this.pos.y, this.pos.y + this.h)
		)
		if (ball.pos.x >= this.pos.x && ball.pos.x <= this.pos.x + this.w){
			GameOver = true;

			// Update score
			if (cpuScore + playerScore == round){
				if (this instanceof player){
					cpuScore++;
				} else {
					playerScore++;
				}
			}
			round++;

			// Reset ball and paddles
			ball.pos = createVector(width/2, height/2);
			ball.vel = createVector(-ball.speed, 0);
			playerPaddle.pos.y = height/2 - playerPaddle.h/2;
			CPUpaddle.pos.y = height/2 - CPUpaddle.h/2;
			GameOver = false;
		}

		let d = nextPos.dist(cPoint);
		if (d <= ball.rad){  // Collision!
			ball.vel = p5.Vector.sub(ball.pos, cPoint)
			ball.vel.setMag(ball.speed);
			ball.vel.add(this.vel);

			// Collision particles
			collisionParticles.shotDir = ball.vel.heading();
			collisionParticles.shotSpeed = [ball.speed*0.25, ball.speed*0.75];
			pSystem.addExplosion(nextPos.x, nextPos.y, collisionParticles)

			ball.speed = constrain(ball.speed + 0.25, 0, ball.maxSpeed);  // acc rate of ball
			return true;
		}
		return false;
  	}
  
	show(){
		noStroke();
		fill(this.col);
		rect(this.pos.x, this.pos.y, this.w, this.h);
	}
}

class player extends paddle
{
  constructor(x, y, w, h){
    super(x, y, w, h)
  }
  
  process(){
    // Allow keyboard input
    if (keyIsDown(UP_ARROW) === true && GameOver == false){
      this.vel.y -= this.maxSpeed;
    }
    if (keyIsDown(DOWN_ARROW) === true && GameOver == false){
      this.vel.y += this.maxSpeed;
    }
    if ((keyIsDown(UP_ARROW) === false && keyIsDown(DOWN_ARROW) === false) || GameOver == true){
      this.vel.y = 0
    }
    
    //Allow touchscreen input
    if (mouseIsPressed && GameOver == false){
      if (mouseY < resolution/2){
        this.vel.y -= this.maxSpeed;
      }
      if (mouseY >= resolution/2){
        this.vel.y += this.maxSpeed;
      }
    }
    
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.pos.y = constrain(this.pos.y, 0, height - this.h)
    
    this.show();
  }
}

class computer extends paddle
{
  constructor(x, y, w, h){
    super(x, y, w, h)
  }

  process(ball){
    // this.pos.y = constrain(ball.pos.y - (this.h/2), 0, height - this.h);
	if (GameOver == false){
		this.vel.y = ball.pos.y - (this.pos.y + this.h/2);
		this.vel.limit(this.maxSpeed*1);  // CPU is slightly slower than player
		this.pos.add(this.vel);
		this.pos.y = constrain(this.pos.y, 0, height - this.h)
	}

    this.show();
  }
}

class pongBall
{
  constructor(x, y, r){
    this.pos = createVector(x, y);
    this.rad = r;
    this.col = color(0, 80, 100);
	this.maxSpeed = 20;
    this.speed = 4;
    this.vel = createVector(-this.speed, 0)
  }
  
  show(){
    // noStroke();
	strokeWeight(2);
	stroke(0, 0, 80);
    fill(this.col);
    circle(this.pos.x, this.pos.y, this.rad*2);
  }
  
  process(paddles){
    // Ceiling bounds
    if (this.pos.y - this.rad < 0){this.vel.y *= -1}
    if (this.pos.y + this.rad > height){this.vel.y *= -1}
    
    // Paddle collision
    for (let p of paddles){
      p.isCollided(this);
    }
    
    // Update position
    if (GameOver == false){
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel); 
    }
    this.show();
  }
}

let playerPaddle;
let CPUpaddle;
let ball;
let GameOver = false;
let resolution;
let pSystem;
let collisionParticles;

let pw = 30;
let ph = 120;
let playerScore = 0;
let cpuScore = 0;
let round = 0;

function setup() {
	// Check if playing on phone
	resolution = (windowHeight > windowWidth) ? windowWidth : windowHeight;
	let cnv = createCanvas(resolution, resolution)
	cnv.position(windowWidth/2 - resolution/2, windowHeight/2 - resolution/2);
	colorMode(HSB)

	// Particle system for ball explosion
	pSystem = new particleSystem()
	// Collision Parameters
	collisionParticles = {
		nParts: 50,
		shotSpeed: [0, 2],
		radius: [3, 7],
		shotDir: 0,
		angleRange: [-1, 1],
		gravity: 0.1,
		life: 50,
		col: color(0, 40, 100)
	}

	playerPaddle = new player(50, resolution/2 - ph/2, pw, ph);
	CPUpaddle = new computer(resolution - pw - 50, resolution/2 - ph/2, pw, ph);
	ball = new pongBall(resolution/2, resolution/2, 20);
}

function draw() {
	background(0, 0, 20);	
	drawCenterLine();
	drawRedZones();
	drawBorder();
	displayPlayerScore();
	displayCPUScore();

	playerPaddle.process()
	CPUpaddle.process(ball);
	ball.process([playerPaddle, CPUpaddle]);

	pSystem.process()  // Handle particles
}

function displayPlayerScore(){
	textSize(150);
	fill(0, 0, 30);
	stroke(0, 0, 30);
	textAlign(CENTER, TOP);
	text(playerScore, width/4, 70);
}

function displayCPUScore(){
	textSize(150);
	fill(0, 0, 30);
	stroke(0, 0, 30);
	textAlign(CENTER, TOP);
	text(cpuScore, width*3/4, 70);
}

function drawCenterLine(){
	stroke(0, 0, 100);
	strokeWeight(4);
	for (let i = 0; i < height; i+=20){
		line(width/2, i, width/2, i+10);
	}
}

function drawBorder(){
	stroke(0, 0, 100);
	strokeWeight(10);
	line(0, 0, width, 0);
	line(0, height, width, height);
	line(0, 0, 0, height);
	line(width, 0, width, height);
}

function drawRedZones(){
	noStroke();
	fill(0, 80, 100, 0.25);
	rect(0, 0, pw + 50, height);
	rect(width - pw - 50, 0, pw + 50, height);
}