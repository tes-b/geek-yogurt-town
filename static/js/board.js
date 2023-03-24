class Board {
    constructor(cam, posX=0, posY=0, tileSize=16) {
        this.cam = cam;
        this.tileWidth = 16;
        this.tileHeight = 16;

        this.scale = 6 * this.cam.height * 0.001;

        this.x = posX * this.tileWidth * this.scale;
        this.y = posY * this.tileHeight * this.scale;

        this.frameSizeX = 12;
        this.frameSizeY = 9;

        this.imgObjBoard = new Image();
        this.imgObjBoard.src = imgObjBoard;


    }

    draw() {
        if(this.imgObjBoard.complete){
            ctx.drawImage(
                this.imgObjBoard,
                0,
                0,
                this.tileWidth * this.frameSizeX,
                this.tileHeight * this.frameSizeY,
                this.x - this.cam.x,
                this.y - this.cam.y, 
                tileSize * this.frameSizeX * this.scale,
                tileSize * this.frameSizeY * this.scale, 
                );
        }
    }
}