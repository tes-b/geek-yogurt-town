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

        this.scale = scale;
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
        this.cam = cam
        this.scale = 6 * this.cam.height * 0.001;

        this.imgBgWater1 = new BackgroundImg(imgBackgroundWater1, this.cam, tileSize, 18, 13, this.scale);
        this.imgBgWater2 = new BackgroundImg(imgBackgroundWater2, this.cam, tileSize, 18, 13, this.scale);
        this.imgBgCloud1 = new BackgroundImg(imgBackgroundCloud1, this.cam, tileSize, 18, 13, this.scale);
        this.imgBgCloud2 = new BackgroundImg(imgBackgroundCloud2, this.cam, tileSize, 18, 13, this.scale);
        this.imgBgSky = new BackgroundImg(imgBackgroundSky, this.cam, tileSize, 18, 13, this.scale);

        this.frameCount = 0;
        this.currentFrameX = 0;
        this.frameRate = 30;
        this.switchBg = true;
    }

    draw(hitbox = false) {
        this.imgBgSky.draw(hitbox);
        this.imgBgCloud2.draw(hitbox);
        this.imgBgCloud1.draw(hitbox);
        this.animateBg(hitbox);
    }

    animateBg(hitbox) {
        this.frameCount++;
        if (this.frameCount >= this.frameRate) {
            if (this.switchBg) { this.switchBg = false; }
            else { this.switchBg = true; }
            this.frameCount = 0;
        }

        if (this.switchBg) {
            this.imgBgWater1.draw(hitbox);
        }
        else {
            this.imgBgWater2.draw(hitbox);
        }
    }

}