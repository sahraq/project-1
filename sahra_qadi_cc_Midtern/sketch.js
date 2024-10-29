
let sceneLength = 12000; // 12 seconds
let sinceLastScene = 0;//how long has passed since last scene
let isFirstScene = true; // start with scene 1
let shapeCount = 10; // number of shapes
let shapeSize = 50; // base size of shapes
let shapeArray = []; // hold shape instances
function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < shapeCount; i++) {
    shapeArray.push(new confusedShape(random(width), random(height), shapeSize));
  }
}

function draw(){
if (isFirstScene) {
    drawFirstScene();
  } else {
    drawSecondScene();
}
 if (millis() - sinceLastScene > sceneLength) {  // checks if 20 seconds have passed since last scene
    isFirstScene = !isFirstScene; 
    sinceLastScene = millis();  
  }
}

class confusedShape {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.angle = random(TWO_PI);
    this.speed = random(1, 3);
    this.wavyOffset = random(TWO_PI);
    this.eyeSize = size * 0.2; // initial eye size 

  }
  
  update() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    // wrap around the edges
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;

    // change angle randomly every 60 frames
    if (frameCount % 60 === 0) {
      this.angle += random(-PI / 4, PI / 4);
      this.eyeSize = this.size * random(0.1, 0.3); // randomly change eye size 
    }
  }
  
  display() {
    fill(random(255), random(255), random(255), 150);
    stroke(0);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < TWO_PI; i += PI / 6) {
      let xOffset = cos(i + this.angle + this.wavyOffset) * this.size;
      let yOffset = sin(i + this.angle + this.wavyOffset) * this.size;
      vertex(this.x + xOffset, this.y + yOffset);
    }
    endShape(CLOSE);
   
// Eyes
    fill(255);
    noStroke();

    // wonky moving eyes
   // left eye (wide oval)
let leftEyeWidth = this.eyeSize * 1.4;  // wider  horizontally
let leftEyeHeight = this.eyeSize * 2.8; // narrower vertically
ellipse(this.x - this.size / 4, this.y - this.size / 4, leftEyeWidth, leftEyeHeight); // left eye

// right eye (tall oval)
let rightEyeWidth = this.eyeSize * 2; // narrower horizontally
let rightEyeHeight = this.eyeSize * 4.4; // taller vertically
ellipse(this.x + this.size / 4, this.y - this.size / 4, rightEyeWidth, rightEyeHeight); // right eye


    // pupils
    fill(0);
    let pupilX = cos(frameCount * 0.41) * this.eyeSize * 0.6; // pupil movement
    let pupilY = sin(frameCount * 0.21) * this.eyeSize * 0.4; // pupil movement

    ellipse(this.x - this.size / 4 + pupilX, this.y - this.size / 4 + pupilY, leftEyeWidth * 0.4, leftEyeHeight * 0.4); // left pupil
    ellipse(this.x + this.size / 4 + pupilX, this.y - this.size / 4 + pupilY, rightEyeWidth* 0.4, rightEyeHeight * 0.4); // right pupil
  }
}


function drawFirstScene() {

  drawBackground();
  
  for (let shape of shapeArray) {
    shape.update();
    shape.display();
  }
}

// confusing background pattern
function drawBackground() {
  noStroke();
  for (let i = 0; i < 20; i++) {
    fill(random(255), random(255), random(255), 50);
    let x = random(width);
    let y = random(height);
    let w = random(100, 400); 
    let h = random(100, 400);
    ellipse(x, y, w, h);
  }
}

function drawSecondScene() {
  background(34, 139, 34);
  // road colors and sizes
  let roadWidth = 100;
  let lineColor = color(225,225,0);
  let roadColor = color(120);
  
  // draw intersecting vertical and horizontal roads
  fill(roadColor);
  noStroke();
  // horizontal road
  rect(0, height / 2 - roadWidth / 2, width, roadWidth);
  // vertical road
  rect(width / 2 - roadWidth / 2, 0, roadWidth, height);
  //dashed lines on the roads
  drawDashedLine(0, height / 2, width, height / 2, lineColor, roadWidth / 10); // horizontal dashed line
  drawDashedLine(width / 2, 0, width / 2, height, lineColor, roadWidth / 10); // vertial dashed line
  drawSigns()
}

function drawDashedLine(x1, y1, x2, y2, color, dashLength) {
  stroke(color);
  strokeWeight(4);
  let distance = dist(x1, y1, x2, y2);
  let dashes = distance / (dashLength * 2);
  for (let i = 0; i < dashes; i++) {
    let x = lerp(x1, x2, (i * 2) / dashes);
    let y = lerp(y1, y2, (i * 2) / dashes);
    let xEnd = lerp(x1, x2, ((i * 2) + 1) / dashes);
    let yEnd = lerp(y1, y2, ((i * 2) + 1) / dashes);
    line(x, y, xEnd, yEnd);
  }
}
function drawSigns() {
  let signPositions = [ //location for each road sign
    {x: 220, y: 200},
    {x: 470, y: 200},
    {x: 220, y: 400},
    {x: 470, y: 350}
  ];
  
  for (let pos of signPositions) { //add sign illustation for each location
    push();
    translate(pos.x, pos.y);
  rotate((frameCount * 0.10 ) % TWO_PI); //signs spin
   //  sign background
    fill(255);
    stroke(0);
    strokeWeight(3);
    rectMode(CENTER);
    rect(0, 0, 30, 15);
    
  // arrow 
    stroke(0);
    strokeWeight(2);
    line(-8, 0, 8, 0); // arrow line
    fill(255);
    stroke(5);
    triangle(8, 0, 4, -3, 4, 3); //  arrow head
    pop();
}
}
