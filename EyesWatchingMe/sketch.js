let layer1 = [
	[-165, -2, -142, -14, -113, -15, -71, -57, 24, -68, 90, -46, 122, -15, 
  149, -13, 164, -1, 138, 7, 113, 10, 73, 53, 4, 69, -67, 56, -111, 19, -150, 12],
  [-163, 9, -154, -12, -117, -10, -68, -67, 38, -68, 98, -42, 116, -9, 
  162, 6, 123, 12, 96, 41, 36, 67, -52, 63, -108, 23],
  [-165, 5, -115, -11, -91, -44, -33, -67, 53, -62, 92, -45, 113, -13, 
  164, 5, 155, 14, 122, 11, 96, 35, 53, 61, -39, 65, -95, 38, -116, 19, -159, 16],
  [-165, -21, -117, -7, -72, -55, -9, -70, 89, -47, 115, -10, 156, -20, 
  163, -9, 143, 4, 118, 6, 94, 43, 42, 64, -38, 67, -94, 42, -112, 20, -153, 4, 
  -163, -5],
	
	[-166, -17, -130, -16, -104, -30, -44, -65, 64, -60, 113, -16, 139, -11, 
	165, 6, 114, 10, 80, 48, 10, 69, -56, 59, -110, 18, -135, 6, -157, -2],
	[-165, -11, -118, -17, -49, -63, 44, -65, 109, -24, 163, -12, 156, 14, 
	113, 19, 52, 61, -18, 67, -102, 35, -121, 10, -153, 8]
  ]
  
  let layer2 = [
	[-79, 26, -81, -27, -36, -61, 34, -61, 77, -28, 68, 37, 26, 62, -43, 53],
	[-43, 58, -86, 5, -55, -51, 16, -63, 70, -43, 84, 19, 38, 58],
	[-78, -30, -17, -66, 71, -48, 88, -14, 64, 31, 36, 63, -50, 67, -96, 9],
	[-80, -1, -54, -46, 4, -69, 60, -52, 84, -30, 79, 22, 41, 57, -39, 59, 
	-85, 25],
	[69, 34, 80, -21, 42, -56, -11, -65, -71, -60, -89, -13, -74, 39, -33, 60, 
	40,  60],
	[31, 61, 72, 29, 75, -33, 27, -63, -42, -57, -78, -21, -74, 36, -30, 61]
  ]
  
  let layer3 = [
	[27, 41, -32, 45, -49, 7, -43, -32, 4, -49, 32, -34, 45, -1],
	[34, 32, 7, 47, -39, 26, -46, -21, -10, -44, 34, -41, 46, 2],
	[-48, 14, -44, -17, 0, -52, 36, -33, 49, 7, 29, 36, -13, 48],
	[18, -48, 49, -16, 37, 33, 0, 52, -46, 19, -39, -32],
	[-20, -40, 27, -44, 47, -4, 42, 34, -1, 47, -42, 36, -49, 11, -45, -30],
	[-6, 51, -43, 26, -47, -7, -16, -43, 22, -45, 49, -20, 43, 14, 25, 38]
  ]
  
  let redundant = [
	[-21, -5, -2, -25, 16, -17, 23, 7, 15, 21, -17, 25, -23, 15],
	[-23, -2, 0, -20, 13, -19, 22, 1, 15, 18, -15, 17],
	[-26, 4, -18, -16, 1, -23, 21, -9, 19, 9, 11, 20, -15, 19],
	[-23, 0, -11, -22, 15, -14, 20, 2, 13, 17, -12, 20]
  ]
  
  let layer4 = [
	[31, 2, 7, -1, -1, -21, 8, -37, 35, -41, 40, -14],
	[43, -7, 8, 2, -3, -30, 25, -49, 43, -29],
	[-42, -27, -22, -41, -5, -35, 0, -12, -10, 4, -31, 4, -40, -12],
	[0, -33, -7, -13, 9, 2, 38, -3, 39, -32, 20, -38],
	[40, -10, 17, 1, -4, -12, 6, -39, 34, -40],
	[-9, 7, -38, 1, -44, -10, -30, -32, -8, -36, 3, -29, 7, -17, 2, -3]
  ]
  
  let colourPallete = [
	['#4dc3ff', '#4d79ff', '#3399ff', '#264780', '#b3d5ff'],
	["#ffb627","#e2711d","#ff9505","#cc5803","#ffc971"],
	["#e87bff","#a663cc","#b8d0eb","#6f2dbd","#b9faf8"],
	['#ffb3c6', '#fb6f92', '#ff8fab', '#a04e62', '#ffe5ec'],
	["#588157", "#3a5a40", "#4f744d", "#19271b", "#dad7cd"],
	["#ad2831","#640d14","#800e13","#250902","#ad2831"]
  ] 
  
  //["#6f2dbd","#a663cc","#b298dc","#b8d0eb","#b9faf8"] purples
  //["#250902","#38040e","#640d14","#800e13","#ad2831"] red
  //["#496d5b", "#3a5a40", "#588157", "#a3b18a", "#dad7cd"] green
  // ['#fb6f92', '#ff8fab', '#ffb3c6', '#a04e62', '#ffe5ec'] pink
  
  let cIdx = 0;
  let colour = []
  let followPoint = 0;
  let t = 0;
  
  let start = true;
  
  function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB)
	rectMode(CENTER)
	
	cIdx = 3
	colour = colourPallete[cIdx]
	
	followPoint = createVector(width/2, height/2)
  }
  
  function draw() {
	if (start) {
	background(90);
	
	for (let i = 0; i < 6; i++){
	  
	  colour = colourPallete[i % colourPallete.length]
	  
	  let x = (i % 2) * width/2 + width/4
	  let y = floor(i / 2) * height/3 + height/6
	  
	  
	  let vBet = p5.Vector.sub(followPoint, createVector(x,y))
	  let vDist = p5.Vector.mag(vBet)
	  let short = constrain(vDist, 0, 150)
	  let lookVec = p5.Vector.setMag(vBet, (short <= 0) ? 0 : short)
	  
	  let mappedDist = map(p5.Vector.mag(lookVec), 0, 150, 0, 20)
	  let mappedVec = p5.Vector.setMag(vBet, mappedDist)
	  
	  noStroke()
	  
	  fill(colour[0])
	  rect(x, y, width/2, height/3)
	  
	  // stroke(0)
	  // strokeWeight(5)
	  fill(colour[1])
	  drawShape(x, y, layer1[i % layer1.length])
  
	  fill(colour[2])
	  drawShape(x + mappedVec.x, y + mappedVec.y, layer2[i % layer2.length])
  
	  fill(colour[3])
	  let l3V = mappedVec.mult(2)
	  drawShape(x + l3V.x, y + l3V.y, layer3[i % layer3.length])
  
	  fill(colour[4])
	  drawShape(x + l3V.x, y + l3V.y, layer4[i % layer4.length])
	  
	  // stroke(0)
	  // strokeWeight(2)
	  // line(x, y, lookVec.x + x, lookVec.y + y)
	}
	
	// Figure triple 8
	// followPoint = createVector(
	//   200 * sin(t*3) + height/2,
	//   200 * cos(t) + width/2,
	// )
	
	// ellipse
	// followPoint = createVector(
	//   200 * cos(t) + width/2,
	//   350 * sin(t) + height/2,
	// )
	 
	// mouse position
	if (mouseIsPressed){
	  let mVec = createVector(mouseX, mouseY)
	  let d = p5.Vector.sub(mVec, followPoint)
	  if (d.mag() > 20){
		followPoint.add(p5.Vector.limit(d, 40))
	  }else{
		followPoint = createVector(mouseX, mouseY)
	  }
	}
	
	// stroke(100)
	// strokeWeight(10)
	// point(followPoint.x, followPoint.y)
	// followPoint = createVector(mouseX, mouseY)
	
	t += 0.02
	  
	}else{
	  background(90)
	  text("CLICK THE SCREEN", 300, 300)
	}
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
  
  function drawShape(x, y, ps){
	push()
	translate(x, y)
	beginShape()
	for (let i = 0; i < ps.length; i+=2){
	  vertex(ps[i], ps[i+1])
	}
	endShape(CLOSE)
	pop()
  }
  
  function mouseClicked(){
	start = true;
  }