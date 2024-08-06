class smartBall{
	constructor(pos, theta, startSpeed, col, radius, isInBox=false){
	  this.isInBox = isInBox
	  this.pos = pos
      this.col = col
	  this.radius = radius;
	  this.vel = p5.Vector.fromAngle(theta, startSpeed)
	  this.acc = createVector()
	  this.maxSpeed = 50;
	  this.minSpeed = 5;
	}

	updateInBox(){
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
	
	update(){
		let deccelerate = (this.isInBox) ? -0.5 : -0.25
		this.acc = p5.Vector.setMag(this.vel, deccelerate)

		if (p5.Vector.mag(this.vel) - p5.Vector.mag(this.acc) > 0){
			this.vel.add(this.acc)
		}
		else{
			this.vel.setMag(this.minSpeed)
		}
		this.vel.setMag(constrain(p5.Vector.mag(this.vel), this.minSpeed, this.maxSpeed))
		this.pos.add(this.vel)
	}
	
	show(){
		strokeWeight(this.radius*2)
		// this.col.setAlpha(0.6)
		stroke(this.col)
		point(this.pos.x, this.pos.y)

		strokeWeight(this.radius*1.5)
		stroke(10)
		point(this.pos.x, this.pos.y)
	}
}