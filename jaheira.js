let jaheira;
let jImg;
let bImg;
let pImg;
let pipes = [];

function setup() {
    createCanvas(1637, 920)
    jaheira = new Bird(50, 100, 100);
    pipes.push(new Pipe());
}

function draw() {
    clear();
    image(bImg, 0, 0, width, height);

    jaheira.show();
    jaheira.update();

    if(frameCount % 100 == 0) {
        pipes.push(new Pipe());
    }

    for(let i=0; i<pipes.length; i++) {
        pipes[i].show();
        pipes[i].update();

        if(pipes[i].offscreen()) {
            pipes.splice(i, 1);
            jaheira.score();
        }
        if(pipes[i].hits(jaheira)) {
            console.log("Hit");
            noLoop();
        }
    }
}

function keyPressed() {
    if(keyCode === 32) {
        jaheira.up();
    }
}

function preload() {
    jImg = loadImage('jaheira.jpg')
    bImg = loadImage('background.jpg')
    pImg = loadImage('pillar.png')
    pImg2 = loadImage('pillar2.png')
}