let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#resetBtn");
let newGame = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0;

const winPattern = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]
];

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;   
    }
};

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("box was clicked");]
        if (turnO) {
            //playerO
            box.innerText = "O";
            turnO = false;
        }
        else {
            //playerX
            box.innerText = "X";
            turnO= true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const showWinner = (winner) => {
    msg.innerHTML = `<b>🎉 CONGRATULATIONS! 🎉<br> Winner is ${winner} 🎊</b>`;
    msg.style.fontSize = "80px";
    msgContainer.classList.remove("hide");
    disableBoxes();
    // Play win sound
    winSound.play();
    // Trigger confetti effect
    confettiEffect();
    triggerFireworks();
};

// Confetti function
const confettiEffect = () => {
    let end = Date.now() + 3000; // Confetti lasts 3 seconds
    (function burst() {
        confetti({
            particleCount: 50,
            spread: 80,
            startVelocity: 45,
            gravity: 0.5,
            ticks: 120,
            scalar: 1.2,
            origin: { x: Math.random(), y: Math.random() * 0.5 } // Confetti starts from upper half
        });
        if (Date.now() < end) requestAnimationFrame(burst);
    })();
};

const stopEffects = () => {
    confetti.reset(); // Stop confetti animation
    winSound.pause(); // Stop win sound
    winSound.currentTime = 0; // Reset sound to start
};

// Load sound files
const winSound = new Audio("applause-sound-effect-240470.mp3");
const clickSound = new Audio("mouse-click-sound-233951.mp3");

// Function to play click sound when a box is clicked
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clickSound.play(); // Play click sound
        if (box.innerText === "") {
            checkWinner();
        }
    });
});

const playClickSound = () => {
    clickSound.currentTime = 0; // Reset sound if already playing
    clickSound.play();
};

// Add click sound to New Game & Reset buttons
newGame.addEventListener("click", () => {
    stopEffects();
    playClickSound();
    resetGame();
});

reset.addEventListener("click", () => {
    stopEffects();
    playClickSound();
    resetGame();
});

const checkWinner = () => {
    for (let pattern of winPattern) {

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        } 
    }
};

const fireworks = new Fireworks({
    intensity: 3,
    speed: 4,
    opacity: 0.7,
    explosion: 5
});

const triggerFireworks = () => {
    fireworks.start();
    setTimeout(() => fireworks.stop(), 3000); // Stop after 3 seconds
};

// newGame.addEventListener("click", resetGame);
// reset.addEventListener("click", resetGame);