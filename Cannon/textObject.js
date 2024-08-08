let displayText = []
let destroyText = []

class superText{
	constructor(msg, x, y, sc){
		this.msg = msg
		this.x = x
		this.y = y
		this.scale = sc
		this.offSet = p5.Vector.fromAngle(random(TAU), 5)
		this.life = constrain(10 + ((this.scale - 1) * (this.scale - 1)) * 0.25, 0, 30)
		this.time = 0
	}

	update(){
		let fade = map(this.time, 0, this.life, 1, 0)
		let c = color(map(this.time, 0, this.life, 0, 360), 100, 100, fade)
		fill(c)
		noStroke()
		// strokeWeight(2)
		// stroke(0, 0, 0, fade)
		textSize(25 + (10 * this.scale) + sin(this.time) * 10)
		text(this.msg, this.x + this.offSet.x, this.y + this.offSet.y)
		this.time += 0.1
	}

	static addText(m, px, py, sc){
		displayText.push(new superText(m, px, py, sc))
	}

	static destroySuperText(){
		for (let d of destroyText){
			displayText.splice(d,1)
		}
		destroyText = []
	}

	static processText(){
		for (let i = 0; i < displayText.length; i++){
			let t = displayText[i]
			t.update()

			if (t.time > t.life){
				destroyText.push(i)
			}
		}
		superText.destroySuperText()
	}
}