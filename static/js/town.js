var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight -100;

// var imgCharactor = new Image();
// // imgCharactor.src = imgCharactorSrc;
// imgCharactor.src = "img/charactor/DinoSprites_doux.gif"

class Charactor {
    constructor() {
        this.x = 25;
        this.y = 200;
        this.width = 50;
        this.height = 50;
        this.widthHalf = 25;
        this.heightHalf = 25;
        this.jumpPower = 4;        
        this.image = new Image();
        // this.image.src = imgCharactorSrc;
        this.image.src = imgCharactorSrc;
        // this.image.onload = () => {
        //     this.drawImage();
        // };
    }

    drawHitbox() {
        ctx.fillStyle = 'green';
        ctx.strokeRect(this.x - this.widthHalf,this.y - this.heightHalf, this.width,this.height);
    }
    drawImage() {
        if(this.image.complete){
            ctx.drawImage(this.image, this.x - this.widthHalf,this.y - this.heightHalf, this.width,this.height);
        }
    }
    draw(hitbox) {
        if (hitbox) {
            this.drawHitbox();
        }
        this.drawImage();
    }
}


class Cactus {
    
    constructor() {
        this.x = 500;
        this.y = 200;
        
        this.width = 50;
        this.height = 50;
        this.widthHalf = 25;
        this.heightHalf = 25;

        this.speed = 3;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - this.widthHalf,this.y - this.heightHalf, this.width,this.height);
        
    }
}
let lastTime = 0;
const targetFPS = 60;
const frameDuration = 1000 / targetFPS;

var cactusArr = [];
var cactusSpawnTime = 3000;

var floorHeight = 200;
var gravity = 3;

var animation;

var charactor = new Charactor();


function run() {
    animation = requestAnimationFrame(run);
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastTime;

    if (elapsedTime >= frameDuration) {

        ctx.clearRect(0,0, canvas.width, canvas.height);

        if (lastTime % cactusSpawnTime <= frameDuration) {
            var cactus = new Cactus();
            cactusArr.push(cactus);
        }
        
        cactusArr = cactusArr.filter((cactus) => {
            if (cactus.x >= -cactus.width) {
                cactus.x -= cactus.speed;

                if(collisionCheck(charactor, cactus)) {
                    cancelAnimationFrame(animation);
                }

                cactus.draw();
                return true;
            }
            return false;
        })

        if (isJumping) {
            charactor.y -= charactor.jumpPower;
            jumpTimer += elapsedTime;
        }

        if (charactor.y < floorHeight){
            charactor.y += gravity;
        }
        if (jumpTimer > jumpDuration) {
            isJumping = false;
            jumpTimer = 0;
        }

        charactor.draw(true);
        
        //===================================================
        lastTime = currentTime - (elapsedTime % frameDuration);
    }
}

run();

function collisionCheck(obj1, obj2) {
    var diffX = Math.abs(obj1.x - obj2.x);
    var diffY = Math.abs(obj1.y - obj2.y);

    if ((diffX < (obj1.widthHalf + obj2.widthHalf))
    && (diffY < (obj1.heightHalf + obj2.heightHalf))) {
        return true;
    }
    return false;
    // var diffR = (obj1.x + obj1.width) - obj2.x;
    // var diffL = (obj2.x + obj2.width) - obj1.x;
    // var diffT = (obj1.y + obj1.height) - obj2.x;
    // var diffB = (obj2.y + obj2.height) - obj1.x;

    // if (diffR > 0 && )
}

var isJumping = false;
var jumpTimer = 0;
var jumpDuration = 2000;

document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        if (!isJumping) {
            isJumping = true;
        }
    }
})