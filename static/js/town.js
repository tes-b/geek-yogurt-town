var canvas = document.getElementById('canvas');

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // 이미지 부드럽게 처리하지 않음



let lastTime = 0;
const targetFPS = 60;
const frameDuration = 1000 / targetFPS;

var cactusArr = [];
var cactusSpawnTime = 3000;

var floorHeight = 200;
var gravity = 3;

var tileSize = 16;

var onOverlay = false;

const SECTION_INTRO = 0;
const SECTION_RESUME = 1;
const SECTION_WORDLE = 2;
const SECTION_YOUTUBE = 3;
const SECTION_MAX = 4;



var currentSection = {"section" : SECTION_INTRO,
                      "url" : "/wordle/"};

var cam = new Camera(canvas);
var bg = new Background(cam, ctx, tileSize);
var map = new Map(cam, tileSize);
var board_intro = new Board(cam, 6, 3, SECTION_INTRO);
var board_resume = new Board(cam, 20, 3, SECTION_RESUME);
var board_wordle = new Board(cam, 34, 3, SECTION_WORDLE);
var board_youtube = new Board(cam, 50, 3, SECTION_YOUTUBE);
var charactor = new Charactor(cam, 3, 7, tileSize);
var info = new Info(cam, currentSection);

cam.followObj = charactor;

var listBoard = [board_intro,
                board_resume,
                board_wordle,
                board_youtube];


// RUN FUNCTIONS ============
keyInput();
changeSection(SECTION_INTRO);
run();


// DECLARE FUNCTIONS=========

function nextSection(prev=false) {
    var section = currentSection.section;
    if (prev){
        if (section-1 < 0) {return;} 
        section = section-1;
    } else {
        if (section+1 >= SECTION_MAX) {return;}
        section = section+1;
    }
    changeSection(section)
}

function changeSection(section) {
    currentSection.section = section;
    listBoard.forEach((board) => {
        board.lightOn = false;
    });
    listBoard[section].lightOn = true;
}

function keyInput() {
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Enter') {

            // var wordleFrame = document.getElementById("wordle");
            // if (onOverlay) {
            //     wordleFrame.style.display = "none";
            //     onOverlay = false;
            // } else {
            //     wordleFrame.style.display = "block";
            //     wordleFrame.contentWindow.focus(); // Focus the iframe
            //     onOverlay = true;
            // }
            
            
            // cancelAnimationFrame(animation);
            // if (charactor.state === "idle") {
            //     charactor.changeState("walk");
            // } else if (charactor.state === "walk") {
            //     charactor.changeState("run");
            // } else {
            //     charactor.changeState("idle");
            // }


            // const section1 = document.getElementById("section1");
            
            location.href = currentSection.url;
        }
        if (e.code === 'Space') {
            // if (!charactor.isJumping) {
            //     charactor.isJumping = true;
            // }
        }
        if (e.code === 'ArrowLeft') {
            charactor.isMovingLeft = true;
            charactor.changeState("run");
        }
        if (e.code === 'ArrowRight') {
            charactor.isMovingRight = true;
            charactor.changeState("run");
        }
        if (e.code === 'ArrowUp') {
            // charactor.isMovingUp = true;   
            nextSection();
        }
        if (e.code === 'ArrowDown') {
            // charactor.isMovingDown = true;
            nextSection(prev=true);
        }
    })    

    document.addEventListener('keyup', function(e) {
        if (e.code === 'ArrowLeft') {
            charactor.isMovingLeft = false;
            charactor.changeState("idle");
        }
        if (e.code === 'ArrowRight') {
            charactor.isMovingRight = false;
            charactor.changeState("idle");
        }
        if (e.code === 'ArrowUp') {
            // charactor.isMovingUp = false;   
            
        }
        if (e.code === 'ArrowDown') {
            // charactor.isMovingDown = false;
            
        }
    })
}




function run() {
    animation = requestAnimationFrame(run);
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastTime;

    if (elapsedTime >= frameDuration) {

        ctx.clearRect(0,0, canvas.width, canvas.height);

        charactor.move(elapsedTime);
        cam.update(elapsedTime);

        if (!onOverlay) {
            bg.draw();
            map.draw();
            listBoard.forEach((board) => {
                board.draw();
            });
        }
        charactor.draw(hitbox=true);
        info.draw(show=true, charactor);

        // if (lastTime % cactusSpawnTime <= frameDuration) {
        //     var cactus = new Cactus();
        //     cactusArr.push(cactus);
        // }
        
        // cactusArr = cactusArr.filter((cactus) => {
        //     if (cactus.x >= -cactus.width) {
        //         cactus.x -= cactus.speed;

        //         if(collisionCheck(charactor, cactus)) {
        //             // cancelAnimationFrame(animation);
        //         }

        //         cactus.draw();
        //         return true;
        //     }
        //     return false;
        // })

        
        //===================================================
        lastTime = currentTime - (elapsedTime % frameDuration);
    }
}



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



