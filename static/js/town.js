var canvas = document.getElementById('canvas');

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // 이미지 부드럽게 처리하지 않음

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

var tileSize = 16;

var onOverlay = false;

const SECTION_INTRO = 0;
const SECTION_RESUME = 1;
const SECTION_WORDLE = 2;
const SECTION_YOUTUBE = 3;

var section = SECTION_INTRO;

var cam = new Camera(canvas);
var bg = new Background(cam, ctx, tileSize);
var map = new Map(cam, tileSize);
var board = new Board(cam, 5, 5, tileSize=tileSize);
var charactor = new Charactor(cam, 2, 9, tileSize);
var info = new Info();

cam.followObj = charactor;


function keyInput() {
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Enter') {

            var wordleFrame = document.getElementById("wordle");
            if (onOverlay) {
                wordleFrame.style.display = "none";
                onOverlay = false;
            } else {
                wordleFrame.style.display = "block";
                wordleFrame.contentWindow.focus(); // Focus the iframe
                onOverlay = true;
            }
            
            
            // cancelAnimationFrame(animation);
            // if (charactor.state === "idle") {
            //     charactor.changeState("walk");
            // } else if (charactor.state === "walk") {
            //     charactor.changeState("run");
            // } else {
            //     charactor.changeState("idle");
            // }


            // const section1 = document.getElementById("section1");
            
            // location.href = "http://127.0.0.1:8000/wordle/"
        }
        if (e.code === 'Space') {
            // if (!charactor.isJumping) {
            //     charactor.isJumping = true;
            // }
        }
        if (e.code === 'ArrowLeft') {
            charactor.isMovingLeft = true;
            charactor.changeState("run");
        }
        if (e.code === 'ArrowRight') {
            charactor.isMovingRight = true;
            charactor.changeState("run");
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
            charactor.changeState("idle");
        }
        if (e.code === 'ArrowRight') {
            charactor.isMovingRight = false;
            charactor.changeState("idle");
        }
        if (e.code === 'ArrowUp') {
            charactor.isMovingUp = false;   
        }
        if (e.code === 'ArrowDown') {
            charactor.isMovingDown = false;
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
        cam.update(elapsedTime);
        // cam.follow(charactor);
        if (!onOverlay) {
            bg.draw(hitbox=true);
            map.draw(cam);
            board.draw(cam);
        }
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



