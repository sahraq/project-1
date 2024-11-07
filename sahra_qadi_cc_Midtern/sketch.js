let sceneLength = 20000; // 20 seconds
let sinceLastScene = 0; // how long has passed since last scene
let isFirstScene = true; // start with scene 1
let shapeCount = 10; // number of shapes
let shapeSize = 50; // base size of shapes
let shapeArray = []; // hold shape instances
let startMoving = false; // controls shape movement
let currentScene = 1; // Start with scene 1 (first scene)
function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < shapeCount; i++) {
    shapeArray.push(new confusedShape(random(width), random(height), shapeSize));
  }
}

function draw() {


  // Handle scene transitions
  if (millis() - sinceLastScene > sceneLength) { // Check if 20 seconds have passed
    currentScene = (currentScene % 3) + 1; // Switch between scenes (1 to 3)
    sinceLastScene = millis();
    startMoving = false; // Reset movement for next scene transition
  }
    if (currentScene === 1) {
    drawFirstScene();
  } else if (currentScene === 2) {
    drawSecondScene();
  } else if (currentScene === 3) {
    drawThirdScene();
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
  if (startMoving) {
    fill(random(255), random(255), random(255), 150); // shapes are rainbow once they start moving
  } else {
    fill(255); // shapes are white before movement
  }
  stroke(0);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < TWO_PI; i += PI / 6) {
    let xOffset = cos(i + this.angle + this.wavyOffset) * this.size;
    let yOffset = sin(i + this.angle + this.wavyOffset) * this.size;
    vertex(this.x + xOffset, this.y + yOffset);
  }
  endShape(CLOSE);

  // eyes
  fill(255);
  stroke(2);
  // left eye
  let leftEyeWidth = this.eyeSize * 1.4;
  let leftEyeHeight = this.eyeSize * 2.8;
  ellipse(this.x - this.size / 4, this.y - this.size / 4, leftEyeWidth, leftEyeHeight);

  // right eye
  let rightEyeWidth = this.eyeSize * 2;
  let rightEyeHeight = this.eyeSize * 4.4;
  ellipse(this.x + this.size / 4, this.y - this.size / 4, rightEyeWidth, rightEyeHeight);

  // pupils
  fill(0);
  let pupilX = 0;
  let pupilY = 0;
  
  if (startMoving) {
      // pupils  move when shapes start moving
      pupilX = cos(frameCount * 0.41) * this.eyeSize * 0.6;
      pupilY = sin(frameCount * 0.21) * this.eyeSize * 0.4;
  }
  
  //  pupils dont move if shapes are still
  ellipse(this.x - this.size / 4 + pupilX, this.y - this.size / 4 + pupilY, leftEyeWidth * 0.4, leftEyeHeight * 0.4);
  ellipse(this.x + this.size / 4 + pupilX, this.y - this.size / 4 + pupilY, rightEyeWidth * 0.4, rightEyeHeight * 0.4);

  // Mouth
  stroke(0);
  strokeWeight(3);
  line(this.x - this.size * 0.2, this.y + this.size * 0.5, this.x + this.size * 0.2, this.y + this.size * 0.5);
}
}

function drawFirstScene() {
  if (millis() - sinceLastScene < 5000) { // 5 seconds with black background
    background(0);
    for (let shape of shapeArray) {
      shape.display(); // show shapes without moving
    }
  } else if (millis() - sinceLastScene < 5500) { // .5 second rainbow flash
    drawRainbowFlash();
  } else {
    startMoving = true; //  shapes start moving after  flash
    drawBackground();
    for (let shape of shapeArray) {
      if (startMoving) shape.update(); // update shapes to move
      shape.display();
    }
  }
}

// rainbow flash 
function drawRainbowFlash() {
  for (let i = 0; i < 8; i++) {
    fill(random(255), random(255), random(255), 225); // rainbow colors
    noStroke();
    ellipse(random(width), random(height), random(200, 400));
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
drawLostCharacter(width / 2, height / 2, frameCount);
}function drawLostCharacter(centerX, centerY, frameCount) {
  push();
  let moveDist = 5; //how far
  let shakeX = sin(frameCount * 0.6) * 2; // small shake on x-axis
  let shakeY = cos(frameCount * 0.6) * 2; // small shake on y-axis
  translate(centerX + shakeX, centerY + shakeY);

  let steps = 90;       // steps in each direction
  let pauseSteps = 90;  // frames to pause and rotate
  let returnSteps = steps; // frames for returning to center
  let street = Math.floor(frameCount /(steps + pauseSteps+ returnSteps)) % 4; // each street is walked down
  let stepDownStreet = frameCount % (steps + pauseSteps+ returnSteps); //  // how many steps down each street


  // movement directions based on phase
  let dx = 0, dy = 0;
  if (stepDownStreet < pauseSteps) {
    // during pause, rotate in place
    let rotationAngle = map(stepDownStreet, 0, pauseSteps, 0, PI / 2);
    rotate(rotationAngle);
  } else if (stepDownStreet< pauseSteps + steps) {
    // move away from center after pause
    let moveStep = stepDownStreet - pauseSteps;
    if (street === 0) dy = -moveDist;       // move up
    else if (street === 1) dy = moveDist;    // move down
    else if (street === 2) dx = -moveDist;   // move left
    else if (street === 3) dx = moveDist;    // move right
    translate(dx * moveStep, dy * moveStep);
  } else {
    // return to center after reaching end of street
    let returnStep = stepDownStreet - (pauseSteps + steps);
    if (street === 0) dy = moveDist;         // return from up
    else if (street === 1) dy = -moveDist;    // return from down
    else if (street === 2) dx = moveDist;     // return from left
    else if (street === 3) dx = -moveDist;    // return from right
    translate(dx * (steps - returnStep), dy * (steps - returnStep));
  }

  // display character with wavy shape
  fill(random(255), random(255), random(255), 150);
  stroke(0);
  strokeWeight(1);
  beginShape();
  for (let i = 0; i < TWO_PI; i += PI / 6) {
    let xOffset = cos(i) * 20;
    let yOffset = sin(i) * 20;
    vertex(xOffset, yOffset);
  }
  endShape(CLOSE);

  // eyes
  fill(255);
  ellipse(-4, -5, 6, 10); // left eye
  ellipse(4, -5, 6, 7);   // right eye
  
  // draw mouth
  strokeWeight(1); // adjust thickness for the mouth line
  line(-5, 8, 5, 8); // horizontal line for the mouth 
  pop();
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
  let signPositions = [
    { x: 330, y: 250 },
    { x: 470, y: 250 },
    { x: 330, y: 350 },
    { x: 470, y: 350 }
  ];

  for (let i = 0; i < signPositions.length; i++) {
    let pos = signPositions[i];
    push();
    translate(pos.x, pos.y);

    fill(0, 51, 0); // sign background
    stroke(255);    
    strokeWeight(3);
    rectMode(CENTER);
    rect(0, 0, 80, 40);

   // change arrow direction based on frame
let flip1 = (frameCount % 60) < 16; // frames 0 to 15
let flip2 = (frameCount % 60) >= 16 && (frameCount % 60) < 31; // frames 16 to 30
let flip3 = (frameCount % 60) >= 31 && (frameCount % 60) < 46; //  frames 31 to 45
let flip4 = (frameCount % 60) >= 46; //  frames 46 to 59

   //change arrow so it points in each direction
fill(255);
if (flip1) {
  push();
  triangle(10, 0, 6, -4, 6, 4); // arrow head pointing right
  stroke(255);         // white arrow color
  strokeWeight(3);
  line(-10, 0, 10, 0); // arrow line
  pop();
} else if (flip2) {
  push();
  triangle(-10, 0, -6, -4, -6, 4); // arrow head pointing left
  stroke(255);         // white arrow color
  strokeWeight(3);
  line(-10, 0, 10, 0); // arrow line
  pop();
} else if (flip3) {
  push();
  triangle(0, -10, -4, -6, 4, -6); // arrow head pointing up
  stroke(255);         // white arrow color
  strokeWeight(3);
  line(0, -10, 0, 10); // arrow line
  pop();
} else {
  push();
  triangle(0, 10, -4, 6, 4, 6); // arrow head pointing down
  stroke(255);         // white arrow color
  strokeWeight(3);
  line(0, -10, 0, 10); // arrow line
  pop();
}

    

    pop(); // end arrow transformation
  }
}


function drawThirdScene() {
  background(173, 216, 230, 150);
 cursor('none'); // hide the default cursor
  // add the book cursor 
  drawBook(mouseX, mouseY);

  let cols = 5;  // num of columns
  let rows = 5;  // num of rows
  let circleDiameter = 40;  // diameter of each character
  let spacingX = (width - (circleDiameter * cols)) / (cols + 1);  // horizontal spacing
  let spacingY = (height - (circleDiameter * rows)) / (rows + 1); // vertical spacing
  let count = 0; // counter for alternating shapes
  
  // outer loop for rows
  for (let i = 0; i < rows; i++) {
    // inner loop for columns
    for (let j = 0; j < cols; j++) {
      // calculate the index 
      let index = i * cols + j;
      
      // alternate between skipping every 2nd and 3rd shape
      if (count % 2 === 0) { // every 2nd shape
        if (index % 2 !== 0) {
          continue; // skip this shape
        }
      } else { // every 3rd shape
        if (index % 3 !== 0) {
          continue; // skip this shape
        }
      }

      // character
      fill(random(255), random(255), random(255), 150);
      stroke(0);
      strokeWeight(1);
      
      // characters shifting position
      let offsetX = sin(frameCount * 0.1 + i * 0.5) * 20;
      let offsetY = cos(frameCount * 0.1 + j * 0.5) * 20;

      // character rotation 
      let rotationAngle = sin(frameCount * 0.05 + (i + j) * 0.1) * 0.2;  

      // character grow and shrink
      let scaleFactor = 1 + 0.2 * sin(frameCount * 0.1 + i * j); 
      
      // translate/ rotate/ scale transformations
      push();
      translate(spacingX + j * (circleDiameter + spacingX) + offsetX, 
                spacingY + i * (circleDiameter + spacingY) + offsetY);
      rotate(rotationAngle);
      scale(scaleFactor);  //grow and shrink shapes

      
      beginShape();
      for (let angle = 0; angle < TWO_PI; angle += PI / 6) {
        let xOffset = cos(angle) * circleDiameter / 2;
        let yOffset = sin(angle) * circleDiameter / 2;
        vertex(xOffset, yOffset);
      }
      endShape(CLOSE);

      // draw eyes 
      fill(255);
      ellipse(-4, -5, 6, 10); // left eye
      ellipse(4, -5, 6, 7);   // right eye

      // calculate direction from character center to mouse position
      let leftEyeCenterX = -4;
      let leftEyeCenterY = -5;
      let rightEyeCenterX = 4;
      let rightEyeCenterY = -5;

      // calculate angle to cursor for each eye
      let leftAngle = atan2(mouseY - (spacingY + i * (circleDiameter + spacingY) + offsetY + leftEyeCenterY), 
                            mouseX - (spacingX + j * (circleDiameter + spacingX) + offsetX + leftEyeCenterX));
      let rightAngle = atan2(mouseY - (spacingY + i * (circleDiameter + spacingY) + offsetY + rightEyeCenterY), 
                             mouseX - (spacingX + j * (circleDiameter + spacingX) + offsetX + rightEyeCenterX));

      // maximum distance pupils move
      let maxPupilDistance = 2;

      // left pupil position
      let leftPupilX = leftEyeCenterX + cos(leftAngle) * maxPupilDistance;
      let leftPupilY = leftEyeCenterY + sin(leftAngle) * maxPupilDistance;

      // right pupil position
      let rightPupilX = rightEyeCenterX + cos(rightAngle) * maxPupilDistance;
      let rightPupilY = rightEyeCenterY + sin(rightAngle) * maxPupilDistance;

      // pupils
      fill(0); 
      ellipse(leftPupilX, leftPupilY, 3, 5);  // left pupil
      ellipse(rightPupilX, rightPupilY, 3, 5); // right pupil

      // Draw mouth (static, not affected by cursor)
      strokeWeight(1);
      line(-5, 8, 5, 8); // horizontal line for the mouth

     
      pop();
    }
  }

  // alternate between skipping every 2nd and 3rd shape
  count++;
  
  
}

function drawBook(x, y) {

  fill(255);  // white pages
  stroke(0);           // black outline
  strokeWeight(4);   
  // pages
  rect(x - 30, y - 20, 60, 40, 10); 
  fill(139, 69, 19);  // brown book cover
  stroke(0);           // black outline
  strokeWeight(3);     
  
  //book cover
  rect(x - 30, y - 20, 57, 33, 10);  
  stroke(255, 215, 0);  // golden color
  strokeWeight(2);      
  
  //golden lines on book
  line(x - 5, y - 10, x - 5, y + 3); 
  
  // Right vertical golden line
  line(x + 10, y - 15, x + 10, y + 7);  
  
}
