let boxes = document.querySelectorAll(".box");
let gameModeSelect = document.querySelector("#game-mode");
let turn = "X";
let isGameOver = false;

boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            cheakWin();
            cheakDraw();
            changeTurn();

            if (gameModeSelect.value === "pvc" && turn === "O" && !isGameOver) {
                computerMove();
            }
        }
    });
});

function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    document.querySelector(".bg").style.left = turn === "X" ? "0" : "85px";
}

function cheakWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (boxes[a].innerHTML && boxes[a].innerHTML === boxes[b].innerHTML && boxes[a].innerHTML === boxes[c].innerHTML) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = `${turn} wins!`;
            document.querySelector("#play-again").style.display = "inline";
            condition.forEach(index => {
                boxes[index].style.backgroundColor = "#08D9D6";
                boxes[index].style.color = "#000";
            });
        }
    }
}

function cheakDraw() {
    if (!isGameOver) {
        if ([...boxes].every(box => box.innerHTML)) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "It's a draw!";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

function computerMove() {
    setTimeout(() => {
        let emptyBoxes = [...boxes].filter(box => !box.innerHTML);
        if (emptyBoxes.length) {
            let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
            randomBox.innerHTML = "O";
            cheakWin();
            cheakDraw();
            changeTurn();
        }
    }, 500);
}

document.querySelector("#play-again").addEventListener("click", () => {
    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.backgroundColor = "";
        box.style.color = "#fff";
    });
    turn = "X";
    isGameOver = false;
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";
});
