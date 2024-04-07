let player, floor, obstacles, loss;

function setup() {
  createCanvas(windowWidth, windowHeight); // Adjust canvas size to fit the whole window
  world.autoStep = false;

  // Create floor object
  floor = new Sprite(width / 2, height - 20, width * 2, 40, "n"); // Adjust floor position and width

  // Create player object
  player = new Sprite(width / 4, height / 2); // Adjust player initial position

  // Create game obstacles group
  obstacles = new Group();
  obstacles.h = 600;
  obstacles.w = 80;
  obstacles.color = "orange";
  obstacles.collider = "s";

  // Set the camera location
  camera.x = width / 2; // Adjust camera position
  loss = true;
  restartPossible = true;
}

function draw() {
  // Starts the game with a mouse pressed or space bar
  if (mouseIsPressed || keyIsDown(32)) {
    player.vel.y = -9;

    if (restartPossible) {
      newGame();
    }
  }

  // If the game isn't over run the code
  if (!loss) {
    // Rotate player
    player.rotation = player.direction * 0.8;

    // Prevent player from going above top of screen
    if (player.y < 0) {
      player.y = 0;
    }

    // if the player hits the floor or pipe, it dies
    if (player.y > height - 20 || player.collides(obstacles)) { // Adjust floor collision check
      die();
    }

    // Create new obstacles every 60 frames (1 second)
    if (frameCount % 60 == 0) {
      let pos = random(0, 150);

      // Create a bottom pipe
      let bottomPipe = new obstacles.Sprite();
      bottomPipe.x = width + player.x;
      bottomPipe.y = floor.y - pos;

      // Create a top pipe
      let topPipe = new obstacles.Sprite();
      topPipe.x = bottomPipe.x;
      topPipe.y = floor.y - pos - 810 - random(0, 80);
      topPipe.mirror.y = -1;
    }

    // Get rid of obstacles when they reach the left side of screen
    for (let pipe of obstacles) {
      if (pipe.x < player.x - width / 2) {
        pipe.remove();
      }
    }

    // Wrap floor 
    if (camera.x > floor.x + width / 2) {
      floor.x += width;
    }
  }

  // The camera follows the player's x-axis movement
  camera.x = player.x + width / 4; // Adjust camera follow

  camera.off();
  background(135, 206, 235);
  camera.on();

  if (!loss) {
    camera.x = player.x + width / 4; // Adjust camera follow
    world.step();
  }

  allSprites.debug = keyIsDown(68); // Adjust debug key
}

/* FUNCTIONS */
function die() {
  loss = true;
  restartPossible = true;
}

function newGame() {
  obstacles.removeAll();
  loss = false;
  restartPossible = false;
  player.x = width * 0.7;
  player.y = height / 2;
  player.vel.x = 4;
  player.vel.y = 0;
  floor.x = width / 2;
  world.gravity.y = 24;
}
