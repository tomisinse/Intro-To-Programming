let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let cols = 4; // 4x4 grid
let rows = 4;
let cardSize = 100;

function setup() {
  createCanvas(cols * cardSize, rows * cardSize);
  textAlign(CENTER, CENTER);
  textSize(32);
  initializeCards();
}

function draw() {
  background(240);

  for (let i = 0; i < cards.length; i++) {
    cards[i].show();
  }

  if (matchedPairs === (cols * rows) / 2) {
    fill(0);
    textSize(40);
    text('You Win!', width / 2, height / 2);
    noLoop();
  }
}

function mousePressed() {
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].isClicked(mouseX, mouseY) && !cards[i].flipped) {
      cards[i].flip();
      flippedCards.push(cards[i]);

      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
      }
      break;
    }
  }
}

function initializeCards() {
  let values = [];
  for (let i = 0; i < (cols * rows) / 2; i++) {
    values.push(i);
    values.push(i); // Two of each value for pairs
  }

  values = shuffle(values);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let card = new Card(col * cardSize, row * cardSize, cardSize, values.pop());
      cards.push(card);
    }
  }
}

function checkMatch() {
  if (flippedCards[0].value === flippedCards[1].value) {
    flippedCards[0].matched = true;
    flippedCards[1].matched = true;
    matchedPairs++;
  } else {
    flippedCards[0].flip();
    flippedCards[1].flip();
  }
  flippedCards = [];
}

class Card {
  constructor(x, y, size, value) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.value = value;
    this.flipped = false;
    this.matched = false;
  }

  show() {
    fill(this.matched || this.flipped ? '#ffc107' : '#007bff');
    rect(this.x, this.y, this.size, this.size, 8);

    if (this.flipped || this.matched) {
      fill(0);
      text(this.value, this.x + this.size / 2, this.y + this.size / 2);
    }
  }

  flip() {
    this.flipped = !this.flipped;
  }

  isClicked(px, py) {
    return px > this.x && px < this.x + this.size && py > this.y && py < this.y + this.size;
  }
}
