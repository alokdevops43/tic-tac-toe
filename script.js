/*==================================================
Animated Tic Tac Toe
JavaScript Part 1
Game Engine + Turn System + Winner Detection
==================================================*/

const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");

const status = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupText = document.getElementById("popupText");
const popupIcon = document.getElementById("popupIcon");
const playAgainBtn = document.getElementById("playAgainBtn");

const body = document.body;

/*==================================================
SCORE
==================================================*/

let xScore = 0;
let oScore = 0;
let drawScore = 0;

const xScoreElement = document.getElementById("xScore");
const oScoreElement = document.getElementById("oScore");
const drawScoreElement = document.getElementById("drawScore");

/*==================================================
GAME STATE
==================================================*/

let currentPlayer = "X";

let gameRunning = true;

let gameBoard = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];

/*==================================================
WINNING COMBINATIONS
==================================================*/

const winPatterns = [

    [0,1,2],

    [3,4,5],

    [6,7,8],

    [0,3,6],

    [1,4,7],

    [2,5,8],

    [0,4,8],

    [2,4,6]

];

/*==================================================
INITIALIZE
==================================================*/

init();

function init(){

    updateStatus();

    cells.forEach(cell=>{

        cell.addEventListener("click",handleCellClick);

    });

}

/*==================================================
CELL CLICK
==================================================*/

function handleCellClick(e){

    const cell = e.target;

    const index = Number(cell.dataset.index);

    if(!gameRunning) return;

    if(gameBoard[index] !== "") return;

    gameBoard[index] = currentPlayer;

    cell.textContent = currentPlayer;

    cell.classList.add(currentPlayer.toLowerCase());

    cell.animate(

        [

            {
                transform:"scale(.4)",
                opacity:.2
            },

            {
                transform:"scale(1.15)",
                opacity:1
            },

            {
                transform:"scale(1)"
            }

        ],

        {
            duration:250,
            easing:"ease-out"
        }

    );

    checkWinner();

}

/*==================================================
CHECK WINNER
==================================================*/

function checkWinner(){

    let roundWon = false;

    let winningPattern = [];

    for(const pattern of winPatterns){

        const a = pattern[0];
        const b = pattern[1];
        const c = pattern[2];

        if(
            gameBoard[a] === "" ||
            gameBoard[b] === "" ||
            gameBoard[c] === ""
        ){
            continue;
        }

        if(

            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]

        ){

            roundWon = true;

            winningPattern = pattern;

            break;

        }

    }

    if(roundWon){

        gameRunning = false;

        winningPattern.forEach(index=>{

            cells[index].classList.add("win");

        });

        if(currentPlayer === "X"){

            xScore++;

            xScoreElement.textContent = xScore;

        }
        else{

            oScore++;

            oScoreElement.textContent = oScore;

        }

        return;

    }

    if(!gameBoard.includes("")){

        drawScore++;

        drawScoreElement.textContent = drawScore;

        gameRunning = false;

        return;

    }

    changePlayer();

}

/*==================================================
CHANGE PLAYER
==================================================*/

function changePlayer(){

    currentPlayer =

        currentPlayer === "X"

        ? "O"

        : "X";

    updateStatus();

}

/*==================================================
STATUS
==================================================*/

function updateStatus(){

    status.innerHTML =

        `Player <span>${currentPlayer}</span>'s Turn`;

}

/*==================================================
RESTART BUTTON
==================================================*/

restartBtn.addEventListener(

    "click",

    ()=>{

        resetBoard();

    }

);

/*==================================================
RESET
==================================================*/

function resetBoard(){

    gameBoard = [

        "","","",

        "","","",

        "","",""

    ];

    currentPlayer = "X";

    gameRunning = true;

    body.className = "normal-theme";

    updateStatus();

    cells.forEach(cell=>{

        cell.textContent = "";

        cell.classList.remove(

            "x",

            "o",

            "win"

        );

    });

}

/*==================================================
Animated Tic Tac Toe
JavaScript Part 2
Popup • Themes • Restart • Confetti Trigger
==================================================*/

/*==================================================
SHOW WIN POPUP
==================================================*/

function showWinner(){

    body.classList.remove("normal-theme","draw-theme");
    body.classList.add("win-theme");

    popup.classList.remove("hidden");

    popupIcon.textContent="🏆";

    popupTitle.textContent=`Player ${currentPlayer} Wins!`;

    popupText.textContent=
    "Congratulations! Click below to play another round.";

}

/*==================================================
SHOW DRAW POPUP
==================================================*/

function showDraw(){

    body.classList.remove("normal-theme","win-theme");
    body.classList.add("draw-theme");

    popup.classList.remove("hidden");

    popupIcon.textContent="🤝";

    popupTitle.textContent="It's a Draw!";

    popupText.textContent=
    "Nobody wins this round. Try again!";

}

/*==================================================
UPDATE CHECK WINNER
Replace your old checkWinner()
with this one
==================================================*/

function checkWinner(){

    let roundWon=false;

    let winningPattern=[];

    for(const pattern of winPatterns){

        const[a,b,c]=pattern;

        if(
            gameBoard[a]===""||
            gameBoard[b]===""||
            gameBoard[c]===""
        ){
            continue;
        }

        if(
            gameBoard[a]===gameBoard[b]&&
            gameBoard[a]===gameBoard[c]
        ){

            roundWon=true;
            winningPattern=pattern;
            break;

        }

    }

    if(roundWon){

        gameRunning=false;

        winningPattern.forEach(index=>{

            cells[index].classList.add("win");

            cells[index].animate(

                [

                    {
                        transform:"scale(1)"
                    },

                    {
                        transform:"scale(1.18)"
                    },

                    {
                        transform:"scale(1)"
                    }

                ],

                {
                    duration:600,
                    iterations:2
                }

            );

        });

        if(currentPlayer==="X"){

            xScore++;
            xScoreElement.textContent=xScore;

        }else{

            oScore++;
            oScoreElement.textContent=oScore;

        }

        showWinner();

        createConfetti();

        return;

    }

    if(!gameBoard.includes("")){

        gameRunning=false;

        drawScore++;

        drawScoreElement.textContent=drawScore;

        showDraw();

        return;

    }

    changePlayer();

}

/*==================================================
PLAY AGAIN BUTTON
==================================================*/

playAgainBtn.addEventListener(

    "click",

    ()=>{

        popup.classList.add("hidden");

        resetBoard();

    }

);

/*==================================================
RESTART BUTTON
==================================================*/

restartBtn.addEventListener(

    "click",

    ()=>{

        popup.classList.add("hidden");

        resetBoard();

    }

);

/*==================================================
RESET BOARD
Replace previous resetBoard()
==================================================*/

function resetBoard(){

    gameBoard=[
        "","","",
        "","","",
        "","",""
    ];

    currentPlayer="X";

    gameRunning=true;

    body.classList.remove(
        "win-theme",
        "draw-theme"
    );

    body.classList.add(
        "normal-theme"
    );

    updateStatus();

    cells.forEach(cell=>{

        cell.textContent="";

        cell.classList.remove(
            "x",
            "o",
            "win"
        );

        cell.style.transform="scale(1)";

    });

}

/*==================================================
BOARD ENTRANCE ANIMATION
==================================================*/

function animateBoard(){

    cells.forEach((cell,index)=>{

        cell.animate(

            [

                {
                    opacity:0,
                    transform:"translateY(30px)"
                },

                {
                    opacity:1,
                    transform:"translateY(0)"
                }

            ],

            {

                duration:350,

                delay:index*70,

                fill:"forwards"

            }

        );

    });

}

animateBoard();

/*==================================================
BUTTON HOVER ANIMATION
==================================================*/

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.animate(

            [

                {
                    transform:"scale(1)"
                },

                {
                    transform:"scale(1.05)"
                }

            ],

            {

                duration:180,

                fill:"forwards"

            }

        );

    });

});

/*==================================================
Animated Tic Tac Toe
JavaScript Part 3
Confetti • Local Storage • Ripple Effect • Sound Hooks
==================================================*/

const confettiContainer = document.getElementById("confetti");

/*==================================================
CONFETTI ENGINE
==================================================*/

function createConfetti() {

    const colors = [
        "#22c55e",
        "#3b82f6",
        "#facc15",
        "#fb7185",
        "#a855f7",
        "#ffffff"
    ];

    for (let i = 0; i < 180; i++) {

        const piece = document.createElement("div");

        piece.className = "confetti";

        piece.style.left = Math.random() * 100 + "%";

        piece.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.animationDuration =
            (Math.random() * 3 + 2) + "s";

        piece.style.opacity = Math.random();

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        confettiContainer.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 5000);

    }

}

/*==================================================
SAVE SCORE
==================================================*/

function saveScores(){

    localStorage.setItem("tic-x-score",xScore);

    localStorage.setItem("tic-o-score",oScore);

    localStorage.setItem("tic-draw-score",drawScore);

}

/*==================================================
LOAD SCORE
==================================================*/

function loadScores(){

    xScore =
        Number(localStorage.getItem("tic-x-score")) || 0;

    oScore =
        Number(localStorage.getItem("tic-o-score")) || 0;

    drawScore =
        Number(localStorage.getItem("tic-draw-score")) || 0;

    xScoreElement.textContent = xScore;

    oScoreElement.textContent = oScore;

    drawScoreElement.textContent = drawScore;

}

loadScores();

/*==================================================
SAVE AFTER EVERY GAME
==================================================*/

const originalShowWinner = showWinner;

showWinner = function(){

    originalShowWinner();

    saveScores();

}

const originalShowDraw = showDraw;

showDraw = function(){

    originalShowDraw();

    saveScores();

}

/*==================================================
RIPPLE EFFECT
==================================================*/

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",(e)=>{

        const ripple =
            document.createElement("span");

        ripple.className = "ripple";

        const rect =
            button.getBoundingClientRect();

        const size =
            Math.max(rect.width,rect.height);

        ripple.style.width =
            ripple.style.height =
            size + "px";

        ripple.style.left =
            e.clientX - rect.left - size/2 + "px";

        ripple.style.top =
            e.clientY - rect.top - size/2 + "px";

        button.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});

/*==================================================
SOUND HOOKS
==================================================*/

// Uncomment after adding audio files

/*
const clickSound=document.getElementById("clickSound");
const winSound=document.getElementById("winSound");
const drawSound=document.getElementById("drawSound");

function playClick(){

    clickSound.currentTime=0;

    clickSound.play();

}

function playWin(){

    winSound.currentTime=0;

    winSound.play();

}

function playDraw(){

    drawSound.currentTime=0;

    drawSound.play();

}
*/

/*==================================================
KEYBOARD SHORTCUTS
==================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="r"||e.key==="R"){

        popup.classList.add("hidden");

        resetBoard();

    }

});

/*==================================================
DOUBLE CLICK TO RESET SCORE
==================================================*/

document.querySelector(".scoreboard")
.addEventListener("dblclick",()=>{

    if(confirm("Reset all scores?")){

        xScore=0;
        oScore=0;
        drawScore=0;

        xScoreElement.textContent=0;
        oScoreElement.textContent=0;
        drawScoreElement.textContent=0;

        saveScores();

    }

});



window.addEventListener("load",()=>{

    console.log("%c🎮 Animated Tic Tac Toe",
    "font-size:22px;font-weight:bold;color:#22c55e;");

    console.log("%cBuilt with HTML • CSS • Vanilla JavaScript",
    "color:#60a5fa;");

});


console.log("Game Ready 🚀");