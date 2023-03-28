class Charactor {
    constructor(tileX=0, tileY=0) {
        this.section = currentSection.section;
        // this.nextSection = currentSection;
        this.scale = 6 * cam.height * 0.001;            

        this.tileSize = 16;

        this.tileX = tileX;
        this.tileY = tileY;

        this.x = tileX * this.tileSize * this.scale;
        this.y = tileY * this.tileSize * this.scale;

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
        this.moveSpeed = 0.8;

        this.STATE_IDLE = "idle";
        this.STATE_WALK = "walk";
        this.STATE_RUN = "run";
        this.state = "idle";

        this.imgDict = {};

        this.imgIdle = new Image();
        this.imgIdle.src = imgCharactorIdle;
        this.imgRun = new Image();
        this.imgRun.src = imgCharactorRun;
        this.imgWalk = new Image();
        this.imgWalk.src = imgCharactorWalk;

        this.imgDict[this.STATE_IDLE] = {"obj":this.imgIdle, "frameX":4, "frameY":1 ,"frameWidth":16, "frameHeight":16, "frameRate":50};
        this.imgDict[this.STATE_RUN] = {"obj":this.imgRun, "frameX":8, "frameY":1 ,"frameWidth":16, "frameHeight":16, "frameRate":5};
        this.imgDict[this.STATE_WALK] = {"obj":this.imgWalk, "frameX":6, "frameY":1 ,"frameWidth":16, "frameHeight":16, "frameRate":10};

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
            this.x - cam.x,
            this.y - cam.y, 
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
                this.x - cam.x,
                this.y - cam.y, 
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
        this.animateImage();
    }

    changeSection(section) {
        // this.nextSection = section;
    }

    update(elapsedTime) {
        this.tileX = Math.floor(this.x / (tileSize * this.scale));
        this.tileY = Math.floor(this.y / (tileSize * this.scale));

        if (currentSection.section < this.section) {
            this.isMovingLeft=true;    
            charactor.changeState(this.STATE_RUN);
        }
        else if (currentSection.section > this.section) {
            this.isMovingRight=true;
            charactor.changeState(this.STATE_RUN);
        }
        else if (currentSection.section == this.section) {
            // this.isMovingLeft=false;    
            // this.isMovingRight=false;    
            // charactor.changeState("idle");
        }
        listBoard
        this.move(elapsedTime);
    }

    move(elapsedTime) {
        // console.log("move");
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