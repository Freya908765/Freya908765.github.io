let ball;
let bricks;
let paddle;
let cols,rows;
cols = 19;
rows = 6;
let lives = 3;

function preload() {
    pieces = 'piece.png'
    ballImg = 'ball.png'
    barImg = 'bar.png'
    bgImg = loadImage('bg.png')
}

function setup() {
    createCanvas(640, 400, 'pixelated');
    //background(45);
    bricks = new Group();
    bricks.w = 34;
    bricks.h = 16;
    bricks.collider = 's';
    bricks.image = pieces
    //Create a nested for loop to draw bricks
    for(let i=1; i<cols; i++) {
        for(let j=1; j<rows; j++) {
            new bricks.Sprite(i*bricks.w, j*bricks.w)
        }
    }
    ball = new Sprite();
    ball.collider = 'd';
    ball.diameter = 19;
    ball.vel.x = 3;
    ball.vel.y = 2;
    ball.rotationLock = true
    ball.img = ballImg
    ball.overlaps(bricks, destroy);

    paddle = new Sprite(width/2, height - 30, 50, 10);
    paddle.collider = 'k';
    paddle.img = barImg
}

function draw() {
    clear();
    background(bgImg);
    //fill(0);
    textSize(32);
    text(lives, 50, 300)
    ball.speed = 5;
    if(kb.pressing('a')) {
        paddle.x -= 10;
    }
    if(kb.pressing('d')) {
        paddle.x += 10;
    }
    if(ball.y > height || ball.y < 0) {
        ball.vel.y *= -1;
    }
    else if(ball.x > width || ball.x < 0) {
        ball.vel.x *= -1
    }

    if(ball.y > height ) {
        lives -= 1;
        ball.x = paddle.x
        ball.y = paddle.y
    }
    if(lives <= 0) {
        noLoop();
    }
}

function destroy(b, brick) {
    brick.remove();
    ball.direction = -ball.angleTo(brick);
}