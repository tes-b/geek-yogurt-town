class BackgroundImg {
    constructor(img, cam, tileSize = 16, frameWidth, frameHeight, scale = 1) {
        this.img = new Image();
        this.img.src = img;
        this.cam = cam;

        this.x = 0;
        this.y = 0;
        this.tileSize = tileSize;
        this.frameWidth = frameWidth * this.tileSize;
        this.frameHeight = frameHeight * this.tileSize;

        this.scale = 4;
    }

    draw(hitbox = false) {
        if (this.img.complete) {
            ctx.drawImage(
                this.img,
                0,
                0,
                this.frameWidth,
                this.frameHeight,
                this.x - this.cam.x,
                this.y - this.cam.y,
                this.frameWidth * this.scale,
                this.frameHeight * this.scale,
            );
        }
        if (hitbox) {
            this.drawRect();
        }
    }

    drawRect() {
        ctx.strokeRect(
            this.x - this.cam.x,
            this.y - this.cam.y,
            this.frameWidth * this.scale,
            this.frameHeight * this.scale,
        );
    }
}

class Background {
    constructor(cam, ctx, tileSize = 16) {
        tileSize = 32;
        this.cam = cam
        this.scale = 6 * this.cam.height * 0.001;

        this.imgBackgroundNight1 = new BackgroundImg(imgBackgroundNight1, this.cam, tileSize, 18, 10, this.scale);
        this.imgBackgroundNight2 = new BackgroundImg(imgBackgroundNight2, this.cam, tileSize, 18, 10, this.scale);
        this.imgBackgroundNight3 = new BackgroundImg(imgBackgroundNight3, this.cam, tileSize, 18, 10, this.scale);
        this.imgBackgroundNight4 = new BackgroundImg(imgBackgroundNight4, this.cam, tileSize, 18, 10, this.scale);
        this.imgBackgroundNight5 = new BackgroundImg(imgBackgroundNight5, this.cam, tileSize, 18, 10, this.scale);

        
        this.frameCount = 0;
        this.currentFrameX = 0;
        this.frameRate = 30;
        this.switchBg = true;   
        this.imgFrameCount = 0;
    }   

    draw(hitbox = false) {  

        this.imgBackgroundNight1.draw(hitbox);
        this.imgBackgroundNight2.draw(hitbox);
        this.imgBackgroundNight3.draw(hitbox);
        this.imgBackgroundNight4.draw(hitbox);
        this.imgBackgroundNight5.draw(hitbox);
    }

    animateBg(hitbox) {
        this.frameCount++;
        if (this.frameCount >= this.frameRate) {
            // if (this.switchBg) { this.switchBg = false; }
            // else { this.switchBg = true; }
            this.imgFrameCount += 1;
            if (this.imgFrameCount >= 5) { 
                this.imgFrameCount = 0;
            }
            this.frameCount = 0;
        }

        if (this.imgFrameCount == 0) {
            // this.imgBgWater1.draw(hitbox);
            this.imgBackgroundNewYork0.draw(hitbox);
        }
        else if (this.imgFrameCount == 1) {
            this.imgBackgroundNewYork1.draw(hitbox);
        }
        else if (this.imgFrameCount == 2) {
            this.imgBackgroundNewYork2.draw(hitbox);
        }
        else if (this.imgFrameCount == 3) {
            this.imgBackgroundNewYork3.draw(hitbox);
        }
        else if (this.imgFrameCount == 4) {
            this.imgBackgroundNewYork4.draw(hitbox);
        }
        
    }

}