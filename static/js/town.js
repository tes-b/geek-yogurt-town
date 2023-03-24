var canvas = document.getElementById('canvas');

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // 이미지 부드럽게 처리하지 않음


class Camera {
    constructor(canvas) {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.offsetX = 0;
        this.offsetY = canvas.height * 0.6;
        this.speed = 1;
        this.isMovingRight = false;
        this.isMovingLeft = false;
        this.isMovingUp = false;
        this.isMovingDown = false;
    }

    update(elapsedTime, followObj) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.follow(followObj);
        this.move(elapsedTime)
    }

    follow(obj) {
        this.x = obj.x;
        this.y = obj.y - this.offsetY;
    }

    move(elapsedTime) {
        if (this.isMovingRight) {
            this.x += this.speed * elapsedTime;
        } else if (this.isMovingLeft) {
            this.x -= this.speed * elapsedTime;
        }
        if (this.isMovingUp) {
            this.y -= this.speed * elapsedTime;
        } else if (this.isMovingDown) {
            this.y += this.speed * elapsedTime;
        }
    }
}

class Info {
    draw(show=true, charactor) {
        if(show) {
            const charactorPosEl = document.getElementById("charactor-pos");
            if (charactorPosEl) {
                charactorPosEl.innerText = `Charactor : ${Math.floor(charactor.x)} , ${Math.floor(charactor.y)}`;
            }
        }
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
var tileSize = 16;

var cam = new Camera(canvas);
var bg = new Background(cam, ctx, tileSize);
var map = new Map(cam, tileSize);
var board = new Board(cam, 0, 0, tileSize=tileSize);
var charactor = new Charactor(cam, 0, 9, tileSize);
var info = new Info();

function keyInput() {
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Enter') {
            if (charactor.state === "idle") {
                charactor.changeState("walk");
            } else if (charactor.state === "walk") {
                charactor.changeState("run");
            } else {
                charactor.changeState("idle");
            }
            
        }
        if (e.code === 'Space') {
            // if (!charactor.isJumping) {
            //     charactor.isJumping = true;
            // }
        }
        if (e.code === 'ArrowLeft') {
            charactor.isMovingLeft = true;
        }
        if (e.code === 'ArrowRight') {
            charactor.isMovingRight = true;
        }
        if (e.code === 'ArrowUp') {
            charactor.isMovingUp = true;   
        }
        if (e.code === 'ArrowDown') {
            charactor.isMovingDown = true;
        }
    })    

    document.addEventListener('keyup', function(e) {
        if (e.code === 'ArrowLeft') {
            charactor.isMovingLeft = false;
            cam.isMovingLeft = false;
        }
        if (e.code === 'ArrowRight') {
            charactor.isMovingRight = false;
            cam.isMovingRight = false;
        }
        if (e.code === 'ArrowUp') {
            charactor.isMovingUp = false;   
            cam.isMovingUp = false;
        }
        if (e.code === 'ArrowDown') {
            charactor.isMovingDown = false;
            cam.isMovingDown = false;
        }
    })
}

keyInput();


function run() {
    animation = requestAnimationFrame(run);
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastTime;

    if (elapsedTime >= frameDuration) {

        ctx.clearRect(0,0, canvas.width, canvas.height);

        charactor.move(elapsedTime);
        cam.update(elapsedTime, followObj=charactor)
        // cam.follow(charactor);

        bg.draw(hitbox=true);
        map.draw(cam);
        board.draw(cam);
        charactor.draw(cam, hitbox=true);
        info.draw(show=true, charactor);

        // if (lastTime % cactusSpawnTime <= frameDuration) {
        //     var cactus = new Cactus();
        //     cactusArr.push(cactus);
        // }
        
        // cactusArr = cactusArr.filter((cactus) => {
        //     if (cactus.x >= -cactus.width) {
        //         cactus.x -= cactus.speed;

        //         if(collisionCheck(charactor, cactus)) {
        //             // cancelAnimationFrame(animation);
        //         }

        //         cactus.draw();
        //         return true;
        //     }
        //     return false;
        // })

        // if (charactor.isJumping) {
        //     charactor.y -= charactor.jumpPower;
        //     jumpTimer += elapsedTime;
        // }

        // if (charactor.y < floorHeight){
        //     charactor.y += gravity;
        // }
        // if (jumpTimer > jumpDuration) {
        //     charactor.isJumping = false;
        //     jumpTimer = 0;
        // }
        
        
        
        
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



