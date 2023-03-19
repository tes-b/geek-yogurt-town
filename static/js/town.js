var canvas = document.getElementById('canvas');

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // 이미지 부드럽게 처리하지 않음


class Charactor {
    constructor() {
        this.x = 25;
        this.y = 200;
        this.width = 50;
        this.height = 50;
        this.widthHalf = 25;
        this.heightHalf = 25;
        this.jumpPower = 4;        
        this.isJumping = false;
        this.jumpDuration = 2000;
        this.jumpTimer = 0;
        this.isMovingLeft = false;
        this.isMovingRight = false;
        this.isMovingUp = false;
        this.isMovingDown = false;
        this.moveSpeed = 5;

        this.state = "idle"

        this.imgDict = {};

        this.imgIdle = new Image();
        this.imgIdle.src = imgCharactorIdle;
        this.imgRunning = new Image();
        this.imgRunning.src = imgCharactorRunning;

        this.imgDict["idle"] = {"obj":this.imgIdle, "frameX":2, "frameY":1 ,"frameWidth":32, "frameHeight":32, "frameRate":30};
        this.imgDict["running"] = {"obj":this.imgRunning, "frameX":3, "frameY":1 ,"frameWidth":32, "frameHeight":32, "frameRate":10};

        this.imgCurrent = this.imgDict[this.state];

        this.imgFrameWidth = 32;
        this.imgFrameHeight = 32;

        this.currentFrameX = 0;
        this.currentFrameY = 0;

        this.frameCount = 0;
        
        this.scale = 4;        
    }

    changeState(state) {
        this.state = state;
        this.currentFrameX = 0;
        this.currentFrameY = 0;
        this.frameCount = 0;
        this.imgCurrent = this.imgDict[this.state];
    }

    drawHitbox() {
        // ctx.fillStyle = 'green';
        ctx.strokeRect(this.x - this.widthHalf,this.y - this.heightHalf, this.width * this.scale,this.height * this.scale);
    }

    drawFrame(frameX, frameY) {
        if(this.imgCurrent["obj"].complete){
            ctx.drawImage(
                this.imgCurrent["obj"],
                frameX * this.imgCurrent["frameWidth"],
                frameY * this.imgCurrent["frameHeight"],
                this.imgCurrent["frameWidth"],
                this.imgCurrent["frameHeight"],
                this.x - this.widthHalf,
                this.y - this.heightHalf, 
                this.width * this.scale,
                this.height * this.scale, 
                );
        }
    }

    drawImage() {
        if(this.imgCurrent["obj"].complete){
            ctx.drawImage(
                this.imgCurrent["obj"], 
                0,
                0,
                this.imgCurrent["frameWidth"],
                this.imgCurrent["frameHeight"],
                this.x - this.widthHalf,
                this.y - this.heightHalf, 
                this.width * this.scale,
                this.height * this.scale, 
                );
        }
    }

    animateImage() {
        this.drawFrame(this.currentFrameX,this.currentFrameY);
        this.frameCount++;
        
        if (this.frameCount >= this.imgCurrent["frameRate"]){
            this.currentFrameX++;
            if (this.currentFrameX >= this.imgCurrent["frameX"]) {
                this.currentFrameX = 0;
            }
            this.frameCount = 0;
        }
    }

    draw(hitbox) {
        if (hitbox) {
            this.drawHitbox();
        }
        // this.drawImage();
        // this.drawFrame(this.currentFrameX,this.currentFrameY);
        this.animateImage();
    }

    move(elapsedTime) {
        if (this.isJumping) {
            this.y -= this.jumpPower;
            this.jumpTimer += elapsedTime;
        }

        // gravity
        // if (this.y < floorHeight){
        //     this.y += gravity;
        // }
        // jump
        if (this.jumpTimer > this.jumpDuration) {
            this.isJumping = false;
            this.jumpTimer = 0;
        }
        // move
        if (this.isMovingLeft) {
            this.x -= this.moveSpeed;
        }
        else if (this.isMovingRight) {
            this.x += this.moveSpeed;
        }
        if (this.isMovingUp) {
            this.y -= this.moveSpeed;
        }
        else if (this.isMovingDown) {
            this.y += this.moveSpeed;
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

var charactor = new Charactor();

function keyInput() {
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Enter') {
            if (charactor.state === "idle") {
                charactor.changeState("running");
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
        }
        if (e.code === 'ArrowRight') {
            charactor.isMovingRight = false;
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

        if (lastTime % cactusSpawnTime <= frameDuration) {
            var cactus = new Cactus();
            cactusArr.push(cactus);
        }
        
        cactusArr = cactusArr.filter((cactus) => {
            if (cactus.x >= -cactus.width) {
                cactus.x -= cactus.speed;

                if(collisionCheck(charactor, cactus)) {
                    // cancelAnimationFrame(animation);
                }

                cactus.draw();
                return true;
            }
            return false;
        })

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
        
        charactor.move(elapsedTime);
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



