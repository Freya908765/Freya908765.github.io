class Bird {
    #size;
    #x;
    #y;
    #velocity;
    #gravity;
    #lift;
    #score;
    constructor(size, x, y){
        this.#size = size;
        this.#x = x;
        this.#y = y;
        this.#velocity = 0;
        this.#gravity = 1;
        this.#lift = -100;
        this.#score = 0
    }
    up() {
        this.#y -= 50;
        this.#velocity *= -1 
    }
    update() {
        this.#velocity += this.#gravity;
        this.#velocity *= 0.9;
        this.#y += this.#velocity;

        if(this.#y > height) {
            this.#y = height;
            this.#velocity = 0;
        }

        if(this.#y < 0) {
            this.#y = 0;
            this.#velocity = 0;
        }
    }
    show() {
        image(jImg, this.#x, this.#y, this.#size, this.#size);
    }
    getX() {
        return this.#x;
    }
    getY() {
        return this.#y;
    }
    score() {
        this.#score += 1
        console.log(this.#score)
    }
}