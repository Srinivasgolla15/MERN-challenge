let userseq = [];
let gameseq = [];
let level = 0;
let started = false;

const buttons = ["red", "blue", "green", "yellow"];

document.addEventListener("keydown", function () {
    if (started == false) {
        started = true;
        console.log("Game Started");
        levelup();
    }

});

function levelup() {
    level++;
    console.log("Level Up");
    let leveltext = document.querySelector("#level-title");
    leveltext.innerText = `Level ${level}`;
    nextsequence();
}

function nextsequence() {

    acceptingInput = false;
    document.querySelector("h2").innerText = "Wait for the sequence";

    let ranadomIndex = Math.floor(Math.random() * 4);
    // console.log(ranadomIndex);
    let randomColor = buttons[ranadomIndex]
    // console.log(randomColor);
    gameseq.push(randomColor);
    console.log(gameseq);
    for (let i = 0; i < gameseq.length; i++) {
        let btn = document.querySelector(`.${gameseq[i]}`);
        setTimeout(() => {
            btn.classList.add("flash");
            // console.log("flash on", btn);
            setTimeout(() => {
                btn.classList.remove("flash");
                if (i == gameseq.length - 1) {
                    acceptingInput = true;
                    document.querySelector("h2").innerText = "Your Turn!";
                }
            }, 250);
        }, i * 500);

    }

    userseq = [];

}


function btnpress() {
    if (!acceptingInput) return;
    let btn = this;
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);

    userseq.push(btn.classList[0])
    console.log(userseq);
    checkUserInput(userseq.length-1);
}

function checkUserInput(indx) {
    if (userseq[indx] === gameseq[indx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(() => {
                levelup();
            }, 1000);
        }
    } else {
        document.querySelector("#level-title").innerText = `Game Over! your score was ${level-1} Press any key to restart`;
        document.querySelector("body").style.backgroundColor="red"
        setTimeout(()=>{document.querySelector("body").style.backgroundColor="white"},200) ;
        started = false;
        gameseq = [];
        userseq = [];
        level = 0;
    }


}

let btns = document.querySelectorAll(".btn");
for (let btn of btns) {
    btn.addEventListener("click", btnpress);

}

 



