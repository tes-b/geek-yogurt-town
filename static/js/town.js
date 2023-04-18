var canvas = document.getElementById('canvas');

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false; // 이미지 부드럽게 처리하지 않음

var mouseX = 0;
var mouseY = 0;

var clientX = 0;
var clientY = 0;
var rectLeft = 0;
var rectTop = 0;

let lastTime = 0;
const targetFPS = 60;
const frameDuration = 1000 / targetFPS;

var tileSize = 16;
var objectScale = 6 * canvas.height * 0.001;

var onOverlay = false;


var cam = new Camera(canvas);
var bg = new Background();
var map = new Map();

var button_prev = new Button(imgBtnPrev,prevSection, 2, 2, 0, 9);
var button_next = new Button(imgBtnNext,nextSection, 2, 2, 2, 9);
var button_select = new Button(imgBtnSelect,selectSection, 3, 2, 4, 9);

var listButtons = [
    button_prev,
    button_next,
    button_select,
];

// 빌보드 초기화 ==============================

// const SECTION_INTRO = 0;
const SECTION_RESUME = 0;
const SECTION_WORDLE = 1;
const SECTION_YOUTUBE = 2;
const SECTION_GITHUB = 3;
const SECTION_BLOG = 4;

var currentSection = { "section": SECTION_RESUME };

// var board_intro = new Board(6, 3, imgObjBoard, SECTION_INTRO, "");
var board_resume = new Board(6, 3, imgObjBoardResume, SECTION_RESUME, "https://geekyougurt.notion.site/09aa2b7a2ea844bbb8b28572ea51b235");
var board_wordle = new Board(18, 3, imgObjBoardWordle, SECTION_WORDLE, "/wordle/");
var board_youtube = new Board(30, 3, imgObjBoardYoutube, SECTION_YOUTUBE, "https://youtube.com/playlist?list=PL2QNFtrDTeb68f6i1MfZrjDSH9rzKrFlk");
var board_github = new Board(42, 3, imgObjBoardGithub, SECTION_GITHUB, "https://github.com/tes-b");
var board_blog = new Board(54, 3, imgObjBoardBlog, SECTION_BLOG, "https://tes-b.github.io/");

var listBoard = [
    // board_intro,
    board_resume,
    board_wordle,
    board_youtube,
    board_github,
    board_blog,
];

const SECTION_MAX = listBoard.length;

// 캐릭터 =================================
var charactor = new Charactor(5, 7);
var info = new Info(charactor, currentSection);

cam.followObj = charactor;

var updateCharactor = false;
var drawInfo = false;

// RUN FUNCTIONS ============;
keyInput();
mouseInput();
changeSection(currentSection.section);
run();
setUpdateCharactor(true);


// DECLARE FUNCTIONS=========

function setUpdateCharactor(update) {
    updateCharactor = update;
}

function nextSection() {
    var section = currentSection.section;
    if (section + 1 >= SECTION_MAX) { return; }
    section += 1;
    changeSection(section);
}

function prevSection() {
    var section = currentSection.section;
    if (section - 1 < 0) { return; }
    section -= 1;
    changeSection(section);
}

function selectSection(newTab=true) {
    charactor.move("stop"); // 캐릭터 멈추기

    if (newTab) {
        window.open(listBoard[currentSection.section].url);
    }
    else {
        location.href = listBoard[currentSection.section].url;
    }
    
}

function changeSection(section) {
    currentSection.section = section;
    listBoard.forEach((board) => {
        board.lightOn = false;
    });
    listBoard[section].lightOn = true;
    charactor.changeSection(currentSection.section);
}

function mouseInput() {
    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();

        clientX = event.clientX;
        clientY = event.clientY;
        rectLeft = rect.left;
        rectTop = rect.top;
        
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
    });

    canvas.addEventListener('mousedown', (event) => {
        listButtons.forEach((button) => {
            button.press();
        });
    });

    canvas.addEventListener('mouseup', (event) => {
        listButtons.forEach((button) => {
            button.up();
        });
    });
}

function keyInput() {
    document.addEventListener('keydown', function (e) {
        console.log(e);
        if (e.code === 'Enter') {
            selectSection();
        }
        if (e.code === 'Space') {
            selectSection();
        }
        if (e.code === 'ArrowLeft') {
            prevSection();
        }
        if (e.code === 'ArrowRight') {
            nextSection();
        }
        if (e.code === 'ArrowUp') {
            selectSection();
        }
        if (e.code === 'ArrowDown') {

        }
    });

    document.addEventListener('keyup', function (e) {
        if (e.code === 'ArrowLeft') {
        }
        if (e.code === 'ArrowRight') {
        }
        if (e.code === 'ArrowUp') {
        }
        if (e.code === 'ArrowDown') {
        }
    });
}


function run() {

    animation = requestAnimationFrame(run);
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastTime;

    if (elapsedTime >= frameDuration) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (updateCharactor) {
            charactor.update(elapsedTime);
        }
        cam.update(elapsedTime);
        listButtons.forEach((button) => {
            button.update();
        });
        
        if (!onOverlay) {
            bg.draw();
            map.draw();
            listBoard.forEach((board) => {
                board.draw();
            });

            listButtons.forEach((button) => {
                button.draw();
            });
        }
        charactor.draw(hitbox = false);

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



