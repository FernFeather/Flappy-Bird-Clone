let player, floor, obstacles;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  //Create floor object
  floor = new Sprite(150, 580, 800, 40, "n");

  //Create player object
  Player = new Sprite(0, height / 2);

  //Create game obstacles group
  obstacles = new Group();
  obstacles.h = 400;
  obstacles.w = 80;
  obstacles.color = "orange";
  obstacles.collider = "s";
}

function draw() {
  noStroke();
}