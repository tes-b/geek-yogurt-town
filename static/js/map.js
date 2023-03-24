class Map {
    constructor(cam, tileSize=16) {
        this.cam = cam;

        this.TILE_NONE = [0,0];
        this.TILE_FLOOR = [4,1];
        this.TILE_GROUND1 = [4,3];
        this.TILE_GROUND2 = [4,8];

        this.tileAttArr = [
            this.TILE_NONE,      // 0
            this.TILE_FLOOR,     // 1
            this.TILE_GROUND1,   // 2
            this.TILE_GROUND2,   // 3
        ];

        // this.mapSizeX = 100;
        // this.mapSizeY = 20;

        this.tileWidth = 16;
        this.tileHeight = 16;

        this.scale = 6 * this.cam.height * 0.001;
        this.offsetY = 10;
        this.map = [
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3],
                    [3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2],
                    [2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3],];
        

        this.imgTile = new Image();
        this.imgTile.src = imgTileTerrain;
    }

    drawRect(posX=0, posY=0) {
        ctx.strokeRect(
            posX * tileSize * this.scale - this.cam.x,
            posY * tileSize * this.scale - this.cam.y, 
            tileSize * this.scale,
            tileSize * this.scale, 
            );
    }

    drawFrame(frameX, frameY, posX=0, posY=0) {
        if(this.imgTile.complete){
            ctx.drawImage(
                this.imgTile,
                this.tileWidth * frameX,
                this.tileHeight * frameY,
                this.tileWidth,
                this.tileHeight,
                posX * tileSize * this.scale - this.cam.x,
                posY * tileSize * this.scale - this.cam.y, 
                tileSize * this.scale,
                tileSize * this.scale, 
                );
        }
    }

    draw() {
        for (var y=0; y < this.map.length; y++) {
            for (var x=0; x<this.map[y].length; x++){
                this.drawFrame(
                    this.tileAttArr[this.map[y][x]][0],
                    this.tileAttArr[this.map[y][x]][1],
                    x,
                    y + this.offsetY, 
                    );
                this.drawRect(x,y + this.offsetY);
            }
        }
    }
}