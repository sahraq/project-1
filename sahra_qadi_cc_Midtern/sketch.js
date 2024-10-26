//confusing background
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
function display() {
    // characters
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
