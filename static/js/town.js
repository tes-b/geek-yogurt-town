var canvas = document.getElementById('canvas');

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // 이미지 부드럽게 처리하지 않음



let lastTime = 0;
const targetFPS = 60;
const frameDuration = 1000 / targetFPS;

var tileSize = 16;
var objectScale = 6 * canvas.height * 0.001;

var onOverlay = false;


var cam = new Camera(canvas);
var bg = new Background();
var map = new Map();
var command_prev = new Command(0,9);
// var button_prev = new Button(imgBtnPrev,2,2,0,3);


// 빌보드 초기화 ==============================

// const SECTION_INTRO = 0;
const SECTION_RESUME = 0;
const SECTION_WORDLE = 1;
const SECTION_YOUTUBE = 2;
const SECTION_GITHUB = 3;

var currentSection = {"section": SECTION_RESUME};

// var board_intro = new Board(6, 3, imgObjBoard, SECTION_INTRO, "");
var board_resume = new Board(6, 3, imgObjBoardResume, SECTION_RESUME, "https://geekyougurt.notion.site/543c421751904604ad36dd98d8bc47d2");
var board_wordle = new Board(20, 3, imgObjBoardWordle, SECTION_WORDLE, "/wordle/");
var board_youtube = new Board(34, 3, imgObjBoardYoutube, SECTION_YOUTUBE, "https://youtube.com/playlist?list=PL2QNFtrDTeb68f6i1MfZrjDSH9rzKrFlk");
var board_github = new Board(48, 3, imgObjBoardGithub, SECTION_GITHUB, "https://github.com/tes-b");

var listBoard = [
    // board_intro,
    board_resume,
    board_wordle,
    board_youtube,
    board_github,
];

const SECTION_MAX = listBoard.length;

// 캐릭터 =================================
var charactor = new Charactor(3, 7);
var info = new Info(charactor, currentSection);

cam.followObj = charactor;

var drawInfo = true;

// RUN FUNCTIONS ============;
keyInput();
changeSection(currentSection.section);
run();


// DECLARE FUNCTIONS=========

function nextSection(prev=false) {
    var section = currentSection.section;
    if (prev){
        if (section-1 < 0) {return;} 
        section -= 1;
    } else {
        if (section+1 >= SECTION_MAX) {return;}
        section += 1;
    }
    changeSection(section)
}

function changeSection(section) {
    currentSection.section = section;
    listBoard.forEach((board) => {
        board.lightOn = false;
    });
    listBoard[section].lightOn = true;
    charactor.changeSection(currentSection.section);
}

function keyInput() {
    document.addEventListener('keydown', function(e) {
        console.log(e);
        if (e.code === 'Enter') {
            // location.href = listBoard[currentSection.section].url;
            window.open(listBoard[currentSection.section].url);
        }
        if (e.code === 'Space') {
            // location.href = listBoard[currentSection.section].url;
            window.open(listBoard[currentSection.section].url);
        }
        if (e.code === 'ArrowLeft') {
            nextSection(prev=true);
        }
        if (e.code === 'ArrowRight') {
            nextSection();
        }
        if (e.code === 'ArrowUp') {  
            // location.href = listBoard[currentSection.section].url;
            window.open(listBoard[currentSection.section].url);
        }
        if (e.code === 'ArrowDown') {
            
        }
    })    

    document.addEventListener('keyup', function(e) {
        if (e.code === 'ArrowLeft') {
        }
        if (e.code === 'ArrowRight') {
        }
        if (e.code === 'ArrowUp') {
        }
        if (e.code === 'ArrowDown') {
        }
    })
}


function run() {

    animation = requestAnimationFrame(run);
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastTime;

    if (elapsedTime >= frameDuration) {

        ctx.clearRect(0,0, canvas.width, canvas.height);

        charactor.update(elapsedTime);
        cam.update(elapsedTime);

        if (!onOverlay) {
            bg.draw();
            map.draw();
            listBoard.forEach((board) => {
                board.draw();
            });
            command_prev.draw();
            // button_prev.draw();
        }
        charactor.draw(hitbox=false);

        if (drawInfo) {
            info.draw();
        }
        

        // if (lastTime % cactusSpawnTime <= frameDuration) {
        //     var cactus = new Cactus();
        //     cactusArr.push(cactus);
        // }
        
        
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
}



