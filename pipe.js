class Pipe {
    #top;
    #bottom;
    #x;
    #w;
    #speed;
    constructor() {
        this.#top = random(height/2);
        this.#bottom = random(height/2);
        this.#x = width;
        this.#w = 100;
        this.#speed = 5;
    }
 
    show() {
        fill(255);
        if(this.#top < 30) {
            this.#top += 200
        }
        else if(this.#top >= (height/2 - 30)) {
            this.#top -= 30
        }
        if(this.#bottom < 100) {
            this.#bottom += 100
        }
        else if(this.#bottom >= (height/2 - 30)) {
            this.#bottom -= 30
        }
        image(pImg2, this.#x, 0, this.#w, this.#top);
        image(pImg, this.#x, height - this.#bottom, this.#w, this.#bottom);
    }
    update() {
        this.#x -= this.#speed;
    }
    offscreen() {
        if(this.#x < 0) {
            return true;
        }
        else {
            return false;
        }
    }
    hits(bird) {
        console.log(bird.getX())
        if(bird.getY() < this.#top || bird.getY() > height - this.#bottom) {
            if(bird.getX() > this.#x && bird.getX() < this.#x + this.#w) {
                return true;
            }
        }
        return false;
    }
}