class Map {
    constructor(cam, tileSize=16) {
        this.cam = cam;

        this.TILE_NONE = [2,3];
        this.TILE_FLOOR1 = [11,5];
        this.TILE_FLOOR2 = [0,6];
        this.TILE_FLOOR3 = [1,6];
        this.TILE_GROUND1 = [1,0];
        this.TILE_GROUND2 = [2,0];
        this.TILE_GROUND3 = [3,0];
        this.TILE_GROUND4 = [4,0];
        this.TILE_GROUND5 = [5,0];

        this.tileAttArr = [
            this.TILE_NONE,      // 0
            this.TILE_FLOOR1,    // 1
            this.TILE_FLOOR2,    // 2
            this.TILE_FLOOR3,    // 3
            this.TILE_GROUND1,   // 4
            this.TILE_GROUND2,   // 5
            this.TILE_GROUND3,   // 6
            this.TILE_GROUND4,   // 7
            this.TILE_GROUND5,   // 8
        ];

        // this.mapSizeX = 100;
        // this.mapSizeY = 20;

        this.tileWidth = 48;
        this.tileHeight = 48;

        this.tileSize = 16;

        this.scale = 6 * this.cam.height * 0.001;
        this.offsetY = 9;
        this.map = [
                    [1,2,3,2,1,2,3,2,1,2,3,2,1,2],
                    [4,5,4,5,4,5,4,5,4,5,4,5,4,5],
                    [5,4,5,4,5,4,5,4,5,4,5,4,5,4],
                    [4,5,4,5,4,5,4,5,4,5,4,5,4,5],
                ];
                
        this.tilePattern = [
            [1,4,5,6],
            [2,7,8,9],
            [3,4,8,7],
        ]
        this.imgTile = new Image();
        this.imgTile.src = imgTileMedieval;
        
        this.sectionCount = 4;

        this.mapWidth = this.tileSize * this.map[0].length;


        console.log(Math.floor(this.cam.x/(this.mapWidth * this.scale)));
        console.log(Math.ceil(this.cam.width/(this.mapWidth * this.scale))+Math.floor(this.cam.x/(this.mapWidth * this.scale)));
        
        console.log(this.mapWidth);
    }

    drawRect(posX=0, posY=0) {
        ctx.strokeRect(
            posX * this.tileSize * this.scale - this.cam.x,
            posY * this.tileSize * this.scale - this.cam.y, 
            this.tileSize * this.scale,
            this.tileSize * this.scale, 
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
                posX * this.tileSize * this.scale - this.cam.x,
                posY * this.tileSize * this.scale - this.cam.y, 
                this.tileSize * this.scale,
                this.tileSize * this.scale, 
                );
        }
    }

    draw() {
        for(var index=Math.floor(this.cam.x/(this.mapWidth * this.scale)); 
        index<Math.ceil(this.cam.width/(this.mapWidth * this.scale))+Math.floor(this.cam.x/(this.mapWidth * this.scale)+1); 
        index++) {
            for (var y=0; y<this.map.length; y++) {;
                for (var x=0; x<this.map[y].length; x++){
                    this.drawFrame(
                        this.tileAttArr[this.map[y][x]][0],
                        this.tileAttArr[this.map[y][x]][1],
                        x + (index * this.map[y].length),
                        y + this.offsetY, 
                        );
                    this.drawRect(x,y + this.offsetY);
                }
            }
        }


        // for (var i=0; i<2; i++) {
        //     for (var y=0; y<this.map.length; y++) {;
        //         for (var x=0; x<this.map[y].length; x++){
        //             this.drawFrame(
        //                 this.tileAttArr[this.map[y][x]][0],
        //                 this.tileAttArr[this.map[y][x]][1],
        //                 x + (i * this.map[y].length),
        //                 y + this.offsetY, 
        //                 );
        //             this.drawRect(x,y + this.offsetY);
        //         }
        //     }
        // }

        
    }
}