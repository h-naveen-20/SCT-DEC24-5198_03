let boxes = document.querySelectorAll(".box");
let turn = "X"; // Player starts first
let isGameOver = false;
let gameMode = "player-vs-player";  // Default game mode (Player vs Player)

// Listen for mode change
document.querySelector("#game-mode").addEventListener("change", (e) => {
    gameMode = e.target.value;
    resetGame();
});

boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            cheakWin();
            cheakDraw();
            changeTurn();
        }
    });
});

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "85px"; // Move indicator
        // If game mode is player vs computer and it's O's turn, trigger computer move
        if (gameMode === "player-vs-computer" && !isGameOver) {
            computerMove();  // Trigger computer's move after player X
        }
    } else {
        turn = "X";
        document.querySelector(".bg").style.left = "0"; // Move indicator
    }
}

function cheakWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " wins";
            document.querySelector("#play-again").style.display = "inline";

            for (let j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winConditions[i][j]].style.color = "#000";
            }
        }
    }
}

function cheakDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

function computerMove() {
    // Wait for a short period before computer makes a move
    setTimeout(() => {
        let emptyCells = [];
        boxes.forEach((box, index) => {
            if (box.innerHTML === "") emptyCells.push(index);
        });

        // If there are empty cells, randomly pick one for computer's move
        if (emptyCells.length > 0) {
            let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            boxes[randomIndex].innerHTML = "O";
            cheakWin();
            cheakDraw();
            changeTurn();
        }
    }, 500); // Simulate computer thinking delay
}

document.querySelector("#play-again").addEventListener("click", () => {
    resetGame();
});

function resetGame() {
    isGameOver = false;
    turn = "X"; // Player starts again
    document.querySelector(".bg").style.left = "0"; // Reset the turn indicator to "X"
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none"; // Hide the Play Again button

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff"; // Reset color
    });
}
