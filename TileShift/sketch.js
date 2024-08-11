class tile{
	constructor(x, y, s, c){
	  this.pos = createVector(x, y)
	  this.size = s
	  this.col = c
	  this.presetCol = c
	}
	
	static queryTile(){
	  let mVec = createVector(constrain(mouseX, startHorizontal+1, width-startHorizontal-1),
				 constrain(mouseY,startHeight+1,height-startHeight-1))
	  let mouseTile = createVector(floor((mVec.x-startHorizontal)/tileSize),
								  floor((mVec.y-startHeight)/tileSize))
	  
	  for (let t of tileSlots){
		let tempTile = createVector(floor((t.pos.x - startHorizontal)/tileSize),
								   floor((t.pos.y-startHeight)/tileSize))
		if (mouseTile.x == tempTile.x && mouseTile.y == tempTile.y){
		  return t
		}
	  }
	}
	
	static drawTiles(){
	  for (let t of tileSlots){
		fill(t.col)
		noStroke()
		rect(t.pos.x, t.pos.y, t.size+2)
	  }
	}
  }
  
  class selector{
	constructor(){
	  this.holdingTile = false;
	  this.currTile = {};
	  this.mouseOff = createVector()
	}
	
	passTile(t){
	  if (!this.holdingTile){
		this.currTile = t
		this.mouseOff = p5.Vector.sub(createVector(mouseX,mouseY),
									  this.currTile.pos)
		this.currTile.col = color(10)
	  }else{
		noFill()
		stroke(90)
		strokeWeight(4)
		rect(t.pos.x, t.pos.y, tileSize)
		
		noStroke()
		fill(this.currTile.presetCol)
		rect(mouseX + tileSize,
			mouseY - tileSize,
			tileSize * 1.25)
	  }
	}
  }
  
  let tileSize = 0;
  let nTiles = 9;
  let startHeight = 0;
  let startHorizontal = 0;
  let tileSlots = []
  let tileSelector;
  let curr;
  let mouseLifted = false;
  let tempTile;
  let pSystem;
  
  let Pallete = [
	["#8ecae6","#219ebc","#023047","#ffb703","#fb8500"],
	["#03045e","#0077b6","#00b4d8","#90e0ef","#caf0f8"],
	["#132a13","#31572c","#4f772d","#90a955","#ecf39e"],
	["#da2c38","#226f54","#87c38f","#f4f0bb","#43291f"],
	["#44355b","#31263e","#221e22","#eca72c","#ee5622"],
	["#780116","#f7b538","#db7c26","#d8572a","#c32f27"],
	["#f94144","#f3722c","#f8961e","#f9844a","#f9c74f","#90be6d","#43aa8b","#4d908e","#577590","#277da1"],
	["#004733","#2b6a4d","#568d66","#a5c1ae","#f3f4f6","#dcdfe5","#df8080","#cb0b0a","#ad080f","#8e0413"],
	["#00193a","#002b53","#023f73","#034780","#7a0213","#a10220","#bf0a26","#cd0c2b","#131313","#262626"],
	["#39d05c","#35e95f","#35d475","#35ac7a","#347f83","#2e518a","#40288f","#5702a1","#6500a3","#8127b9"]
  ]
  
  function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB)
	rectMode(CENTER)
	
	tileSelector = new selector()
	pSystem = new particleSystem()

	placementParticles = {
		nParts: 40,
		shotSpeed: [2, 20],
		radius: [50, 85],
		shotDir: 0,
		angleRange: [0, TAU],
		gravity: 0.1,
		life: 40,
		col: color(90)
	  }
	
	tempTile = new tile(-1000, -1000, 10, color(90))
	
	if (width < height){  // portrait
		tileSize = width / nTiles;
		startHeight = (height - width) / 2
	}else{  // landscape
		tileSize = height / nTiles;
		startHorizontal = (width - height) / 2
	}
	
	let rIdx = floor(random(Pallete.length))
	for (let y = 0; y < nTiles; y++){
	  for (let x = 0; x < nTiles; x++){
		tileSlots.push(new tile(
		  x * tileSize + tileSize/2 + startHorizontal,
		  y * tileSize + tileSize/2 + startHeight,
		  tileSize,
		  color(random(Pallete[rIdx]))
		))
	  }
	}
  }
  
  function draw() {
	background(10);
	
	tile.drawTiles()
	
	if (mouseIsPressed){  
	  curr = tile.queryTile()
	  tileSelector.passTile(curr)
	  tileSelector.holdingTile = true
	  
	  mouseLifted = true;
	  
	}else{
	  if (mouseLifted){  // on mouse lift
		let sel = tileSelector.currTile
		// temp store because pointers
		tempTile.presetCol = curr.presetCol
		tempTile.col = curr.col
		
		curr.col = sel.presetCol
		curr.presetCol = sel.presetCol
		
		sel.col = tempTile.presetCol
		sel.presetCol = tempTile.presetCol
		
		mouseLifted = false
		placementParticles.col = color(hue(sel.col), saturation(sel.col), brightness(sel.col))
		pSystem.addExplosion(curr.pos.x, curr.pos.y, placementParticles)
	  }
	  tileSelector.holdingTile = false
	}

	pSystem.process()
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