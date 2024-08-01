class explosion{
  constructor(x, y, shotAngle, t){
    this.pos = createVector(x, y)
    this.particles = []  // list of vectors
    this.hPoint = 10000
    this.life = 40;
    this.startingLife = this.life
    this.gravity = 0.6;
    this.nParts = 100;
    this.shotAngle = shotAngle
    this.onCreate(t)
  }
  
  onCreate(t){
    
    for (let i = 0; i < this.nParts; i++){
      
      var shotSpeed = random(2, 50)
      var rad = random(5, 15)
      // var angle = p5.Vector.fromAngle(random(0, TAU), random(3, 5))
      
      var angle = p5.Vector.fromAngle(this.shotAngle + random(-PI/20, PI/20), shotSpeed)
      
      var particulate = {
        pos: this.pos.copy(), 
        initPos: this.pos.copy(),
        vel: angle,
        initVel: angle,
        rad: rad,
        col: color(t%360, map(shotSpeed, 2, 50, 100, 0), 100)
      };
      
      this.particles.push(particulate);
    }
  }
  
  verticalDisplacement(u, t){
    var v = u + this.gravity * t;
    var s = 0.5 * (u + v) * t;
    return [s, v];
  }
  
  triangleRot(position, velocity, colour, length=15, offAngle=1, rearDist=10){
    // Draws triangle at position pointing with velocity
    let n1 = p5.Vector.setMag(velocity, length);
    let degreeOffset = offAngle  // radians 0-PI
    let initAngle = atan2(n1.y, n1.x) + PI  // range 0 - TAU
    let n2Angle = initAngle - degreeOffset
    let n3Angle = initAngle + degreeOffset
    let pDist = rearDist;
    let n2 = createVector(pDist * cos(n2Angle), pDist * sin(n2Angle))
    let n3 = createVector(pDist * cos(n3Angle), pDist * sin(n3Angle))

    noStroke()
    fill(colour)
    triangle(position.x+n1.x, position.y+n1.y,
            position.x+n2.x, position.y+n2.y,
            position.x+n3.x, position.y+n3.y)
  }
  
  process(){
    this.hPoint = 10000
    this.life --;
    // Allow particles to fade away
    var fade = map(this.life, 0, this.startingLife, 0, 1)
    
    for (let p of this.particles){
      p.vel.y += this.gravity;
      p.pos.x += p.vel.x
      p.pos.y += p.vel.y
      
      
      // Draw Trail
      var trailLength = 0;  // set to 0 to disable trail
      var trailScale = 1;
      for (let i = 1; i < trailLength; i++){
        
        var yCalc = p.pos.y - (i*trailScale)/2 * (2*p.vel.y + ((i*trailScale)-1)*-this.gravity)
        var prev = createVector(p.pos.x - p.vel.x*(i*trailScale), yCalc)
        var prevVel = createVector(p.vel.x, p.vel.y - this.gravity*(i*trailScale))
        
        if (i * trailScale < this.startingLife - this.life){
          
          let trailCol = p.col
          trailCol.setAlpha(fade-(i*1)/trailLength)
          // this.triangleRot(prev, prevVel, trailCol, 15, 0.3, 3)
          strokeWeight(p.rad - (p.rad/trailLength * i))
          point(prev.x, prev.y)
          
        }
      }
      
      // Track highest point in explosion
      this.hPoint = (p.pos.y < this.hPoint) ? p.pos.y : this.hPoint

      // this.triangleRot(p.pos, p.vel, p.col, 20, 0.3, 3)
      // fill(p.col)
      
      p.col.setAlpha(fade)      
      stroke(p.col)
      strokeWeight(p.rad)
      point(p.pos.x, p.pos.y)
    } 
  }
}

class particleSystem{
  constructor(){
    this.explosions = []
    this.toDelete = []  // list of indexes of explosions to remove from list
    this.time = 0;
  }
  
  addExplosion(x, y, shotAngle){
    this.explosions.push(new explosion(x, y, shotAngle, this.time))
  }
  
  process(){
    for (let i = 0; i < this.explosions.length; i++){
      let c = this.explosions[i]
      c.process()

      if (c.hPoint > height * 1.25 || c.life < 1){
        this.toDelete.push(i)
      }
    }

    this.removeExplosions();
    this.time++;
  }
  
  removeExplosions(){
    for (let d of this.toDelete){
      this.explosions.splice(d, 1);
    }
    this.toDelete = []
  }
}