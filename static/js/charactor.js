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