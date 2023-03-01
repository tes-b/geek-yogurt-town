document.addEventListener("DOMContentLoaded", () => {
    createSquares();
    
    let guessedWords = [[]] // 시도한 단어
    let availableSpace = 1; // 현재 글자가 들어갈 자리

    let word = getNewWord(); // 단어 가져오기
    let guessedWordCount = 0;

    const keys = document.querySelectorAll(".keyboard-row button") // 키보드 버튼

    function getNewWord(){
        // 데이터베이스에 있는 단어들을 가져오는 방식으로 수정해야함
        // 이 과정에서 각 단어의 정답률, 평균 시도 횟수 등을 통계처리 할 수 있을 듯
        const wordArr = ['seven', 'world', 'about', 'again','heart', 'pizza', 'water', 'happy', 'sixty', 'board', 'month', 'angel', 'death', 'green', 'music', 'fifty', 'three', 'party', 'piano', 'kelly', 'mouth'];
        const randomWord = wordArr[Math.floor(Math.random() * wordArr.length)];
        console.log(randomWord)
        return randomWord;
    }

    function getCurrentWordArr() {
        const numberOfGuessedWords = guessedWords.length
        return guessedWords[numberOfGuessedWords - 1]
    }

    function updateGuessedWords(letter) {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr && currentWordArr.length < 5) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;

            availableSpaceEl.textContent = letter;
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);

        if (!isCorrectLetter) {
            return "rgb(58, 58, 60)";
        };

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if (isCorrectPosition) {
            return "rgb(83, 141, 78)";
        }

        return "rgb(181, 159, 59)";
    }


    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length !==5) {
            window.alert("5글자 단어를 제출하세요거트~");
        } 

        const currentWord = currentWordArr.join('')

        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index);

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`
            }, interval * index);
        });

        guessedWordCount += 1;

        // if (currentWord === word) {
        //     window.alert("정답입니다람쥐~")
        // }
        // else {
        //     window.alert("틀렸네용가리치킨너겟~")
        // }

        if (guessedWords.length === 6) {
            window.alert(`더이상 기회가 없습니당나귀... 정답은 ${word} 입니다.`)
        }

        guessedWords.push([])
    }

    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();

        guessedWords[guessedWords.length-1] = currentWordArr;

        const lastLetterEl = document.getElementById(String(availableSpace - 1))

        lastLetterEl.textContent = '';
        availableSpace = availableSpace - 1;
    }
    
    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
        }
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");
            
            if (letter === 'enter') {
                handleSubmitWord()
                return;
            }

            if (letter === 'del') {
                if (availableSpace > 1) {
                    handleDeleteLetter();
                }
                return;
            }

            console.log(letter);
            updateGuessedWords(letter);
        }
    }
});