class Board {
    constructor(tileX=0, tileY=0, img, section, url) {
        this.section = section;
        this.tileWidth = 16;
        this.tileHeight = 16;

        this.scale = objectScale;
        
        this.tileX = tileX;
        this.tileY = tileY;

        this.x = this.tileX * this.tileWidth * this.scale;
        this.y = this.tileY * this.tileHeight * this.scale;

        this.frameSizeX = 8;
        this.frameSizeY = 6;

        this.imgObjBoard = new Image();
        this.imgObjBoard.src = img;

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
