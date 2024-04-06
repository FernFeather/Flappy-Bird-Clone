let player, floor, obstacles, loss;

function setup() {
  createCanvas(400, 600);
  world.autoStep = false;

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

  //Set the camera location
  camera.x = 150;
  loss = true;
  canStartNewGame = true;
}

function draw() {
  noStroke();
}