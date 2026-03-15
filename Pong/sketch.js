class paddle
{
  constructor(x, y, w, h){
    this.pos = createVector(x, y);
    this.w = w;
    this.h = h;
    this.col = color(0, 0, 100);
    this.vel = createVector();
    this.maxSpeed = 3;
  }
  
  isCollided(ball){
    let cPoint = createVector(
      constrain(ball.pos.x, this.pos.x, this.pos.x + this.w),
      constrain(ball.pos.y, this.pos.y, this.pos.y + this.h)
    )
    if (ball.pos.x >= this.pos.x && ball.pos.x <= this.pos.x + this.w){
      GameOver = true;
    }
    let d = ball.pos.dist(cPoint);
    if (d <= ball.rad){
      ball.vel = p5.Vector.sub(ball.pos, cPoint)
      ball.vel.setMag(ball.maxSpeed);
      ball.vel.add(this.vel);
      
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
    if (keyIsDown(UP_ARROW) === true && GameOver == false){
      this.vel.y -= this.maxSpeed;
    }
    if (keyIsDown(DOWN_ARROW) === true && GameOver == false){
      this.vel.y += this.maxSpeed;
    }
    if ((keyIsDown(UP_ARROW) === false && keyIsDown(DOWN_ARROW) === false) || GameOver == true){
      this.vel.y = 0
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
    this.pos.y = constrain(ball.pos.y - (this.h/2), 0, height - this.h);
    
    this.show();
  }
}

class pongBall
{
  constructor(x, y, r){
    this.pos = createVector(x, y);
    this.rad = r;
    this.col = color(0, 0, 100);
    this.maxSpeed = 4;
    this.vel = createVector(-this.maxSpeed, 0)
  }
  
  show(){
    noStroke();
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

function setup() {
  createCanvas(500, 500);
  colorMode(HSB)
  
  playerPaddle = new player(30, 200, 20, 70);
  CPUpaddle = new computer(450, 200, 20, 70);
  ball = new pongBall(250, 250, 10);
}

function draw() {
  background(50);
  
  playerPaddle.process()
  CPUpaddle.process(ball);
  ball.process([playerPaddle, CPUpaddle]);
}