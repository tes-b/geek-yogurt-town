class Button {
    constructor(imgSrc, tileHor, tileVer, posX = 0, posY = 0) {
        this.imgCommand = new Image();
        this.imgCommand.src = imgSrc;

        this.scale = objectScale;

        this.tileHor = tileHor;
        this.tileVer = tileVer;

        this.x = posX * tileSize * this.scale;
        this.y = posY * tileSize * this.scale;

        this.STATE_NONE = 0;
        this.STATE_CURSOR_ON = 1;
        this.STATE_PRESS = 2;

        this.state = this.STATE_NONE;
    }

    draw() {
        if (this.imgCommand.complete) {
            ctx.drawImage(
                this.imgCommand,
                0,
                tileSize * this.tileVer * this.state,
                tileSize * this.tileHor,
                tileSize * this.tileVer,
                this.x,
                this.y - cam.y,
                tileSize * this.tileHor * this.scale,
                tileSize * this.tileVer * this.scale,
            );
            // ctx.strokeRect(
            //     this.x,
            //     this.y - cam.y,
            //     this.tileWidth * this.tileX * this.scale,
            //     this.tileHeight * this.tileY * this.scale,
            //     );
        }
    }
}