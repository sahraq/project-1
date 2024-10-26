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