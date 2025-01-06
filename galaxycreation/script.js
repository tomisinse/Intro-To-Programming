let stars = [];
let starSize = 5;
let density = 50;
let bgColor = [0, 0, 0];

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  noStroke();
}

function draw() {
  // Background color transitions
  bgColor[0] = (bgColor[0] + 0.1) % 255;
  bgColor[1] = (bgColor[1] + 0.05) % 255;
  bgColor[2] = (bgColor[2] + 0.07) % 255;
  background(bgColor);

  // Draw stars
  stars.forEach(star => star.show());
}

function mouseDragged() {
  for (let i = 0; i < density / 10; i++) {
    stars.push(new Star(mouseX + random(-10, 10), mouseY + random(-10, 10), random(starSize - 2, starSize + 2)));
  }
}

function mousePressed() {
  for (let i = 0; i < density; i++) {
    stars.push(new Star(mouseX + random(-50, 50), mouseY + random(-50, 50), random(starSize - 2, starSize + 2)));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Star Class
class Star {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = [random(100, 255), random(100, 255), random(100, 255)];
    this.alpha = 255;
  }

  show() {
    fill(this.color[0], this.color[1], this.color[2], this.alpha);
    ellipse(this.x, this.y, this.size);
    this.alpha -= 2; // Fades over time
  }
}

// Controls
document.getElementById('star-size').addEventListener('input', (e) => {
  starSize = e.target.value;
});

document.getElementById('density').addEventListener('input', (e) => {
  density = e.target.value;
});
