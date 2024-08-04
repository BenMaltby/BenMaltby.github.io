let points = [];
let r = 100;

function setup(){
	createCanvas(windowWidth+10, windowHeight)
	colorMode(HSB)

	// drawingContext.shadowBlur = 32;
	
	for (let i = 0; i < 20; i++){
		let h = random(360)
		points.push({
			pos: createVector(random(r,width-r), random(r,height-r)),
			vel: p5.Vector.fromAngle(random(TAU), 4),
			col: color(h, 100, 100, 0.6),
			shadowCol: color(h, 100, 100, 1)
		})
	}
}

function draw(){
	background(0, 0, 10, 1)

	for (let p of points){

		p.pos.add(p.vel)
		if (p.pos.x-r<0||p.pos.x+r>width){p.vel.x *= -1}
		if (p.pos.y-r<0||p.pos.y+r>height){p.vel.y *= -1}

		// drawingContext.shadowColor = p.shadowCol
		stroke(p.col)
		strokeWeight(r*2)
		point(p.pos.x, p.pos.y)
	}
}