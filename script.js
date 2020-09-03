let dot1;
let dots = [];
let resetButton;
let speedSlider;
let sliderSpeed;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSB, 360, 100, 100);
  dot1 = new BouncyDot();
  
  for (let i = 0; i < 65; i++) {
    dots.push(new BouncyDot());
  }
  
  //noCursor();
  resetButton = createButton("RESET");
  resetButton.position(30, 20);
  resetButton.mouseClicked(reset);
  
  
  
  
  // add slider for speed
  speedSlider = createSlider();
  speedSlider.position(140, 40);
  sliderSpeed = 0;
   
  // if (mouseY < 100) {
  //   cursor(POINTER);
  // }
}

function draw() {
  

  background(220, 0, 80);
  
  for (let dot = 0; dot < dots.length; dot++) {
    dots[dot].float();
    dots[dot].display();
  }
  
  // draw slider
  fill(0);
  textStyle(BOLD);
  text("ADJUST SPEED", 150, 25);
  
  fill(0, 90, 10);
  ellipse(mouseX, mouseY, 50, 50);

  // draw hold on button
  fill('white');
  textStyle(NORMAL);
  text("HOLD", mouseX-17, mouseY-5);
  
  if (mouseIsPressed) {
    dots.push(new BouncyDot())
    
  }
  
}

function mousePressed() {
  // We'll use this for console log statements only.
  console.log(dot1.x);
}


function reset() {
  background(220, 0, 80);
  
  while (dots.length > 0) {
    dots.pop();
  }
}

function mouseDragged() {
  sliderSpeed = speedSlider.value();
  
  for (let dot = 0; dot < dots.length; dot++) {
    dots[dot].setVelocity(sliderSpeed/50);
  }
}

let minVelocity = 0.5;
let maxVelocity = 3;

let minRadius = 5;
let maxRadius = 12;

class BouncyDot {
  constructor() {
    // Randomly generate position
    this.x = random(width);
    this.y = random(100, height);
    // Randomly generate radius
    this.r = random(minRadius, maxRadius);
    // Randomly generate color
    this.color = random(360);
    // Randomly generate a master velocity (broken into components)...
    this.masterXvelocity = random(minVelocity, maxVelocity);
    this.masterYvelocity = random(minVelocity, maxVelocity);
    // ...and use those as starting velocities.
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;
  }

  float() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    // Standard bounce code - like the DVD logo, but for spheres.
    if (this.x + this.r > width) {
      this.xVelocity = -1 * this.masterXvelocity;
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.masterXvelocity;
    }
    if (this.y + this.r > height) {
      this.yVelocity = -1 * this.masterYvelocity;
    }
    if (this.y - this.r < 170) {
      this.yVelocity = this.masterYvelocity;
    }
  }

  display() {
    fill(this.color, 80, 70);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }
  

  setVelocity(val) {
    this.masterXvelocity = random(val, val);
    this.masterYvelocity = random(val, val);
    
  }
  
  
  // handle ball collision
  dotCollision() {
    
  }
}
