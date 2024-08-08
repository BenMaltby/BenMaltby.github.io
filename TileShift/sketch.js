class tile{
	constructor(x, y, s, c){
	  this.pos = createVector(x, y)
	  this.size = s
	  this.col = c
	  this.presetCol = c
	}
	
	static queryTile(){
	  let mVec = createVector(constrain(mouseX, 1, width-1),
				 constrain(mouseY,startHeight+1,height-startHeight-1))
	  let mouseTile = createVector(floor(mVec.x/tileSize),
								  floor((mVec.y-startHeight)/tileSize))
	  
	  for (let t of tileSlots){
		let tempTile = createVector(floor(t.pos.x/tileSize),
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
  let nTiles = 7;
  let startHeight = 0;
  let tileSlots = []
  let tileSelector;
  let curr;
  let mouseLifted = false;
  let tempTile;
  
  let Pallete = [
	["#8ecae6","#219ebc","#023047","#ffb703","#fb8500"],
	["#03045e","#0077b6","#00b4d8","#90e0ef","#caf0f8"],
	["#132a13","#31572c","#4f772d","#90a955","#ecf39e"]
  ]
  
  function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB)
	rectMode(CENTER)
	
	tileSelector = new selector()
	
	tempTile = new tile(-1000, -1000, 10, color(90))
	
	tileSize = width / nTiles;
	startHeight = (height - width) / 2
	
	let rIdx = floor(random(Pallete.length))
	for (let y = 0; y < nTiles; y++){
	  for (let x = 0; x < nTiles; x++){
		tileSlots.push(new tile(
		  x * tileSize + tileSize/2,
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
	  }
	  tileSelector.holdingTile = false
	}
  }