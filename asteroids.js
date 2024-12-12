var ship;
var asteroids = [];
var lasers = [];
let score = 0;
let game = true;
let bg = 0;
let bgr = 0;
let bgg = 0;
let bgb = 0;
let bgRan;
let lives = 3;
let chance = 0;
let threshold = 1;
let immunity = 180;

function setup() {
  createCanvas(1850, 870);
  background(0);
  ship = new Ship();
  for(i=0; i<20; i++){
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(score);
  //background(bgr, bgg, bgb);
  textSize(32);
  fill(255);
  text(score, 50, 50);
  text("Lives: " + lives, 300, 50);
  text("Immunity: " + Math.floor(immunity/60), 300, 100);
  if(immunity > 0) {
    immunity -= 1
    console.log(immunity)
  }
  
  if(game) {
    for (var i = 0; i < asteroids.length; i++) {
      if (ship.hits(asteroids[i])) {
        console.log('ooops!');
        game = false;    
      }
      asteroids[i].render();
      asteroids[i].update();
      asteroids[i].edges();
    }

    for (var i = lasers.length - 1; i >= 0; i--) {
      lasers[i].render();
      lasers[i].update();
      if (lasers[i].offscreen()) {
        lasers.splice(i, 1);
      } 
      else {
        for (var j = asteroids.length - 1; j >= 0; j--) {
          if (lasers[i].hits(asteroids[j])) {
            if (asteroids[j].r > 10) {
              var newAsteroids = asteroids[j].breakup();
              asteroids = asteroids.concat(newAsteroids);
            }
            asteroids.splice(j, 1);
            lasers.splice(i, 1);
            score += 1;
            bg += 1;
            //bgr = random(0,255);
            //bgg = random(0,255);
            //bgb = random(0,255);
            break;
          }
        }
      }
    }
    if(score == 50) {
      threshold = 2;
    }
    if(score == 100) {
      threshold = 4;
    }
    if(score == 150) {
      threshold = 6;
    }
    if(score == 200) {
      threshold = 8;
    }
    if(score == 250) {
      threshold = 10;
    }
    chance = floor(random(0, 200))
    if(chance <= threshold) {
      asteroids.push(new Asteroid());
    }

  console.log(lasers.length);

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
    
  }
  else {
    if(immunity == 0) {
      asteroids.length = 0;
      lives -= 1;
      immunity = 180;
    }
      if(lives > 0) {
        game = true;
      }
      if(lives <= 0) {
        background('red');
        game = false;
    }
  }

  if(score == 255){
    background('green');
    game = false;
  }

  if(asteroids.length == 0) {
    for(i=0; i<20; i++){
      asteroids.push(new Asteroid());
    }
  }
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  }
  if (keyCode == 68) {
    ship.setRotation(0.1);
  }
  if (keyCode == 65) {
    ship.setRotation(-0.1);
  }
  if (keyCode == 87) {
    ship.boosting(true);
  }
  if (key == 'q') {
    score += 50;
  }
}
