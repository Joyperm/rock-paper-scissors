const handImages = {
  rock: "rock.jpeg",
  paper: "paper.jpeg",
  scissors: "scissors.jpeg",
};

const playerHand = document.getElementById("playerHand");
const computerHand = document.getElementById("computerHand");
const resultText = document.getElementById("result");
const resetBtn = document.getElementById("reset");

const audio1 = document.getElementById("audio1");
const audio2 = document.getElementById("audio2");
const audio3 = document.getElementById("audio3");
const audioWin = document.getElementById("audioWin");
const audioLose = document.getElementById("audioLose");
const audioTie = document.getElementById("audioTie");

const choices = ["rock", "paper", "scissors"];

function resetGame() {
  playerHand.src = "rock.jpeg";
  computerHand.src = "rock.jpeg";
  resultText.textContent = "";
}

function play(playerChoice) {
  //start floating animation
  playerHand.classList.add("bounce");
  computerHand.classList.add("bounce");

  //Initial state
  playerHand.src = "rock.jpeg";
  computerHand.src = "rock.jpeg";

  // --- Countdown timer ---
  let count = 3;
  resultText.textContent = count;
  const countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      resultText.textContent = count;
      // Play corresponding sound
      if (count === 2) audio2.play();
      if (count === 1) audio3.play();
    } else {
      resultText.textContent = "Go!";
      clearInterval(countdownInterval);
    }
  }, 800); 

  // Play first sound immediately
  audio1.play();

  //   Play sounds
//   document.getElementById("audio1").play();
//   setTimeout(() => {
//     document.getElementById("audio2").play();
//   }, 800);
//   setTimeout(() => {
//     document.getElementById("audio3").play();
//   }, 1600);

  // --- Swapping hands rapidly ---
  const swapInterval = setInterval(() => {
    playerHand.src = handImages[choices[Math.floor(Math.random() * 3)]];
    playerHand.classList.add("grayscale-effect");

    computerHand.src = handImages[choices[Math.floor(Math.random() * 3)]];
    computerHand.classList.add("grayscale-effect");
  }, 100); // swap every 100ms

  // Wait to show result
  setTimeout(() => {
    // stop swapping
    clearInterval(swapInterval);
    clearInterval(countdownInterval);

    // remove prepare animation and gray scal
    playerHand.classList.remove("grayscale-effect");
    playerHand.classList.remove("bounce");
    computerHand.classList.remove("bounce");
    computerHand.classList.remove("grayscale-effect");

    // User's choice
    playerHand.src = handImages[playerChoice];

    // Random computer choice
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    computerHand.src = handImages[computerChoice];

    // Calculate result
    let result = "";
    if (playerChoice === computerChoice) {
      result = "Tie 😐";
      audioTie.play();
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      result = "You Win! 🎉";
      audioWin.play();
    } else {
      result = "You Loose 😭";
      audioLose.play();
    }

    resultText.textContent = result;
  }, 1900);
}
