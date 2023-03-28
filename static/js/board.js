class Board {
    constructor(posX=0, posY=0, section, url) {
        this.section = section;
        this.tileWidth = 16;
        this.tileHeight = 16;

        this.scale = 6 * cam.height * 0.001;

        this.x = posX * this.tileWidth * this.scale;
        this.y = posY * this.tileHeight * this.scale;

        this.frameSizeX = 8;
        this.frameSizeY = 6;

        this.imgObjBoard = new Image();
        this.imgObjBoard.src = imgObjBoard;

        this.lightOn = false;

        this.url = url;
    }

    draw() {
        if(this.imgObjBoard.complete){
            ctx.drawImage(
                this.imgObjBoard,
                this.tileWidth * this.frameSizeX * this.lightOn,
                0,
                this.tileWidth * this.frameSizeX,
                this.tileHeight * this.frameSizeY,
                this.x - cam.x,
                this.y - cam.y, 
                this.tileWidth * this.frameSizeX * this.scale,
                this.tileHeight * this.frameSizeY * this.scale, 
                );
        }
    }
}
