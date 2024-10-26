let shapeCount = 10; // number of shapes
let shapeSize = 50; // base size of shapes
let shapeArray = []; // hold shape instances

class ConfusionShape {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.angle = random(TWO_PI);
    this.speed = random(1, 3);
    this.wavyOffset = random(TWO_PI);
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
  }
}

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < shapeCount; i++) {
    shapeArray.push(new ConfusionShape(random(width), random(height), shapeSize));
  }
}

function draw() {
  // background with shapes for a confusing effect
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
