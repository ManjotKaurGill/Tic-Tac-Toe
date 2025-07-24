document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");
  const resetButton = document.querySelector("#reset");
  const infoDisplay = document.querySelector(".info");
  const music = new Audio("./images/audio.mp3");
  const winMusic = new Audio("./images/Woohoo.mp3");

  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];

  let currentPlayer = "X";
  let moveCount = 0;
  let gameActive = true;

  const playMusic = (audio) => {
    audio.currentTime = 0;
    audio.play().catch(error => console.log("Auto-play is blocked", error));
  };

  const displayMessage = (message) => {
    infoDisplay.innerText = message;
  };

  const checkWinner = () => {
    return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
        displayMessage(`${boxes[a].innerText} Won!`);
        playMusic(winMusic);
        gameActive = false;
        return true;
      }
      return false;
    });
  };

  const handleMove = (box) => {
    if (box.innerText || !gameActive) return;
    box.innerText = currentPlayer;
    playMusic(music);
    moveCount++;

    if (checkWinner()) return;
    if (moveCount === 9) {
      displayMessage("It's a draw!");
      gameActive = false;
      return;
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    displayMessage(`${currentPlayer}'s Turn`);
  };

  const resetGame = () => {
    boxes.forEach(box => box.innerText = "");
    currentPlayer = "X";
    moveCount = 0;
    gameActive = true;
    displayMessage("X's Turn");
  };

  boxes.forEach(box => box.addEventListener("click", () => handleMove(box)));
  resetButton.addEventListener("click", resetGame);
});
