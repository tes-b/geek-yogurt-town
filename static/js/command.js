class Command {
    constructor(posX = 0, posY = 0) {
        this.imgCommand = new Image();
        this.imgCommand.src = imgObjCommand;

        this.scale = this.scale = 6 * cam.height * 0.001;

        this.tileWidth = 16;
        this.tileHeight = 16;

        this.tileX = 8;
        this.tileY = 2;

        this.x = posX * tileSize * this.scale;
        this.y = posY * tileSize * this.scale;
    }

    draw() {
        if (this.imgCommand.complete) {
            ctx.drawImage(
                this.imgCommand,
                0,
                0,
                this.tileWidth * this.tileX,
                this.tileHeight * this.tileY,
                this.x,
                this.y - cam.y,
                this.tileWidth * this.tileX * this.scale,
                this.tileHeight * this.tileY * this.scale,
            );
            ctx.strokeRect(
                this.x,
                this.y - cam.y,
                this.tileWidth * this.tileX * this.scale,
                this.tileHeight * this.tileY * this.scale,
                );
        }
    }
}