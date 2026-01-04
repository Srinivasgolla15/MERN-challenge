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
            }, 250);
        }, i * 500);
        if (i==gameseq.length-1){
            acceptingInput=true;
        }
    }

    userseq=[];

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
}

let btns = document.querySelectorAll(".btn");
for (let btn of btns) {
    btn.addEventListener("click", btnpress);

}

// function check(){
//     if ()
// }

