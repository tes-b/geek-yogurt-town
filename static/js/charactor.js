class Charactor {
    constructor(cam, posX=0, posY=0, tilesize=16) {
        this.cam = cam
        this.scale = 6 * this.cam.height * 0.001;            

        this.x = posX * tileSize * this.scale;
        this.y = posY * tileSize * this.scale;

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
        this.moveSpeed = 0.3;

        this.state = "idle"

        this.imgDict = {};

        this.imgIdle = new Image();
        this.imgIdle.src = imgCharactorIdle;
        this.imgRun = new Image();
        this.imgRun.src = imgCharactorRun;
        this.imgWalk = new Image();
        this.imgWalk.src = imgCharactorWalk;

        this.imgDict["idle"] = {"obj":this.imgIdle, "frameX":4, "frameY":1 ,"frameWidth":16, "frameHeight":16, "frameRate":50};
        this.imgDict["run"] = {"obj":this.imgRun, "frameX":8, "frameY":1 ,"frameWidth":16, "frameHeight":16, "frameRate":5};
        this.imgDict["walk"] = {"obj":this.imgWalk, "frameX":6, "frameY":1 ,"frameWidth":16, "frameHeight":16, "frameRate":10};

        this.imgCurrent = this.imgDict[this.state];

        this.imgFrameWidth = 32;
        this.imgFrameHeight = 32;

        this.frameSizeX = 2;
        this.frameSizeY = 2;

        this.currentFrameX = 0;
        this.currentFrameY = 0;

        this.frameCount = 0;
        
        
    }

    changeState(state) {
        if (this.state == state) { return; }
        this.state = state;
        this.currentFrameX = 0;
        this.currentFrameY = 0;
        this.frameCount = 0;
        this.imgCurrent = this.imgDict[this.state];
    }

    drawHitbox() {
        ctx.strokeRect(
            this.x - this.cam.x,
            this.y - this.cam.y, 
            this.imgCurrent["frameWidth"] * this.frameSizeX * this.scale,
            this.imgCurrent["frameHeight"] * this.frameSizeY * this.scale,
            );
    }

    drawFrame(frameX, frameY) {
        if(this.imgCurrent["obj"].complete){
            ctx.drawImage(
                this.imgCurrent["obj"],
                frameX * this.imgCurrent["frameWidth"] * this.frameSizeX,
                frameY * this.imgCurrent["frameHeight"] * this.frameSizeY,
                this.imgCurrent["frameWidth"] * this.frameSizeX,
                this.imgCurrent["frameHeight"] * this.frameSizeY,
                this.x - this.cam.x,
                this.y - this.cam.y, 
                this.imgCurrent["frameWidth"] * this.frameSizeX * this.scale,
                this.imgCurrent["frameHeight"] * this.frameSizeY * this.scale,
                );
        }
    }

    // drawImage() {
    //     if(this.imgCurrent["obj"].complete){
    //         ctx.drawImage(
    //             this.imgCurrent["obj"], 
    //             0,
    //             0,
    //             this.imgCurrent["frameWidth"],
    //             this.imgCurrent["frameHeight"],
    //             this.x,
    //             this.y, 
    //             this.width * this.scale,
    //             this.height * this.scale, 
    //             );
    //     }
    // }

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

    draw(hitbox=false) {
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
            this.x -= this.moveSpeed * elapsedTime;
        }
        else if (this.isMovingRight) {
            this.x += this.moveSpeed * elapsedTime;
        }
        if (this.isMovingUp) {
            this.y -= this.moveSpeed * elapsedTime;
        }
        else if (this.isMovingDown) {
            this.y += this.moveSpeed * elapsedTime;
        }
    }
}