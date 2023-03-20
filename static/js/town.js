var canvas = document.getElementById('canvas');

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // 이미지 부드럽게 처리하지 않음

class Tile {
    constructor() {
        this.attr = none;
        this.sizeX = 16;
        this.sizeY = 16;
    }
}

class Map {
    constructor() {

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

        this.mapSizeX = 100;
        this.mapSizeY = 20;

        this.tileWidth = 16;
        this.tileHeight = 16;

        this.scale = 4;
        this.offsetY = 10;
        this.map = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3],
                    [3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2],
                    [2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3,2,3],];
        
        this.imgSizeX = 18;
        this.imgSizeY = 13;

        this.imgTile = new Image();
        this.imgTile.src = imgTileTerrain;
    }

    drawFrame(frameX, frameY, posX=0, posY=0) {
        if(this.imgTile.complete){
            ctx.drawImage(
                this.imgTile,
                this.tileWidth * frameX,
                this.tileHeight * frameY,
                this.tileWidth,
                this.tileHeight,
                posX * this.tileWidth * this.scale,
                posY * this.tileHeight * this.scale, 
                this.tileWidth * this.scale,
                this.tileHeight * this.scale, 
                );
        }
    }

    draw() {
        for (var y=0; y < this.map.length; y++) {
            for (var x=0; x<this.map[y].length; x++){
                this.drawFrame(this.tileAttArr[this.map[y][x]][0],
                                this.tileAttArr[this.map[y][x]][1],
                                x,y+this.offsetY);
                
            }
        }
        // for (var tiles in this.map) {
        //     for (var tile in tiles) {
        //         this.drawFrame(4,2);
        //     }
        // }
    }
}

class Board {
    constructor() {
        this.tileWidth = 16;
        this.tileHeight = 16;

        this.scale = 6;

        this.imgObjBoard = new Image();
        this.imgObjBoard.src = imgObjBoard;


    }

    draw(posX=0, posY=0) {
        if(this.imgObjBoard.complete){
            ctx.drawImage(
                this.imgObjBoard,
                0,
                0,
                this.tileWidth * 7,
                this.tileHeight * 5,
                posX * this.tileWidth * this.scale,
                posY * this.tileHeight * this.scale, 
                this.tileWidth * 7 * this.scale,
                this.tileHeight * 5 * this.scale, 
                );
        }
    }
}



class Cactus {
    
    constructor() {
        this.x = 500;
        this.y = 200;
        
        this.width = 50;
        this.height = 50;
        this.widthHalf = 25;
        this.heightHalf = 25;

        this.speed = 3;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - this.widthHalf,this.y - this.heightHalf, this.width,this.height);
        
    }
}

var bg = new Background(canvas, ctx);

let lastTime = 0;
const targetFPS = 60;
const frameDuration = 1000 / targetFPS;

var cactusArr = [];
var cactusSpawnTime = 3000;

var floorHeight = 200;
var gravity = 3;

var animation;

var charactor = new Charactor();
var map = new Map();
var board = new Board();

function keyInput() {
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Enter') {
            if (charactor.state === "idle") {
                charactor.changeState("running");
            } else {
                charactor.changeState("idle");
            }
            
        }
        if (e.code === 'Space') {
            // if (!charactor.isJumping) {
            //     charactor.isJumping = true;
            // }
        }
        if (e.code === 'ArrowLeft') {
            charactor.isMovingLeft = true;
        }
        if (e.code === 'ArrowRight') {
            charactor.isMovingRight = true;
        }
        if (e.code === 'ArrowUp') {
            charactor.isMovingUp = true;   
        }
        if (e.code === 'ArrowDown') {
            charactor.isMovingDown = true;
        }
    })    

    document.addEventListener('keyup', function(e) {
        if (e.code === 'ArrowLeft') {
            charactor.isMovingLeft = false;
        }
        if (e.code === 'ArrowRight') {
            charactor.isMovingRight = false;
        }
        if (e.code === 'ArrowUp') {
            charactor.isMovingUp = false;   
        }
        if (e.code === 'ArrowDown') {
            charactor.isMovingDown = false;
        }
    })
}

keyInput();


function run() {
    animation = requestAnimationFrame(run);
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastTime;

    if (elapsedTime >= frameDuration) {

        ctx.clearRect(0,0, canvas.width, canvas.height);

        bg.draw();
        map.draw();
        board.draw(5,3);

        // if (lastTime % cactusSpawnTime <= frameDuration) {
        //     var cactus = new Cactus();
        //     cactusArr.push(cactus);
        // }
        
        cactusArr = cactusArr.filter((cactus) => {
            if (cactus.x >= -cactus.width) {
                cactus.x -= cactus.speed;

                if(collisionCheck(charactor, cactus)) {
                    // cancelAnimationFrame(animation);
                }

                cactus.draw();
                return true;
            }
            return false;
        })

        // if (charactor.isJumping) {
        //     charactor.y -= charactor.jumpPower;
        //     jumpTimer += elapsedTime;
        // }

        // if (charactor.y < floorHeight){
        //     charactor.y += gravity;
        // }
        // if (jumpTimer > jumpDuration) {
        //     charactor.isJumping = false;
        //     jumpTimer = 0;
        // }
        
        charactor.move(elapsedTime);
        charactor.draw(true);
        
        //===================================================
        lastTime = currentTime - (elapsedTime % frameDuration);
    }
}

run();

function collisionCheck(obj1, obj2) {
    var diffX = Math.abs(obj1.x - obj2.x);
    var diffY = Math.abs(obj1.y - obj2.y);

    if ((diffX < (obj1.widthHalf + obj2.widthHalf))
    && (diffY < (obj1.heightHalf + obj2.heightHalf))) {
        return true;
    }
    return false;
    // var diffR = (obj1.x + obj1.width) - obj2.x;
    // var diffL = (obj2.x + obj2.width) - obj1.x;
    // var diffT = (obj1.y + obj1.height) - obj2.x;
    // var diffB = (obj2.y + obj2.height) - obj1.x;

    // if (diffR > 0 && )
}



