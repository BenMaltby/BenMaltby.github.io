let points = [];
let r = 100;

function setup(){
	createCanvas(windowWidth, windowHeight)
	colorMode(HSB)
	
	for (let i = 0; i < 20; i++){
		points.push({
			pos: createVector(random(r,width-r), random(r,height-r)),
			vel: p5.Vector.fromAngle(random(TAU), 4),
			col: color(random(360), 70, 100, 0.6)
		})
	}
}

function draw(){
	background(10)

	for (let p of points){

		p.pos.add(p.vel)
		if (p.pos.x-r<0||p.pos.x+r>width){p.vel.x *= -1}
		if (p.pos.y-r<0||p.pos.y+r>height){p.vel.y *= -1}

		stroke(p.col)
		strokeWeight(r*2)
		point(p.pos.x, p.pos.y)
	}
}