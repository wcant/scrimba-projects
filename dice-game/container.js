function updateActivePlayer() {
  const playersDice = playerContainer.querySelectorAll(".dice");
  const activePlayer = state.whoseTurn;
  const activeDie = playerContainer.querySelector(`#player${activePlayer}Dice`);
  console.log(`updating active player to player${activePlayer}`);
  // wouldn't having access to the DOM nodes of each
  // player card and updating the content be better?  Not sure
  for (const die of playersDice) {
    console.log(die);
    die.classList.remove("active");
  }
  activeDie.classList.add("active");
  message.textContent = `Player ${activePlayer}'s Turn`;
}

function doPlayerTurn() {
  // This function advances the game and checks for a winning score

  const player = state.whoseTurn;
  debugger;
  const roll = rollDice();

  if (player1Turn) {
    player1Score += randomNumber;
    player1Scoreboard.textContent = player1Score;
    player1Dice.style.background = `url('images/Alea_${randomNumber}.png')`;
    player1Dice.classList.remove("active");
    player2Dice.classList.add("active");
    message.textContent = "Player 2 Turn";
  } else {
    player2Score += randomNumber;
    player2Scoreboard.textContent = player2Score;
    player2Dice.style.background = `url('images/Alea_${randomNumber}.png')`;
    player2Dice.classList.remove("active");
    player1Dice.classList.add("active");
    message.textContent = "Player 1 Turn";
  }

  if (player1Score >= 20) {
    message.textContent = "🥇 Player 1 Won 👏";
    showWinnerModal("1");
    showResetButton();
  } else if (player2Score >= 20) {
    message.textContent = "🏆 Player 2 Won 🎉";
    showWinnerModal("2");
    showResetButton();
  }
  player1Turn = !player1Turn;
}

// play again = same settings,
function resetBoard() {
  // set turn to null
  state.turn = null;
  player1Score = 0;
  player2Score = 0;
  player1Turn = true;
  player1Scoreboard.textContent = 0;
  player2Scoreboard.textContent = 0;
  message.textContent = "Player 1 Turn";
  rollBtn.style.display = "block";
  player2Dice.classList.remove("active");
  player1Dice.classList.add("active");
  overlay.style.display = "none";
}

function showWinnerModal(player) {
  overlay.style.display = "flex";
  modal.classList.add("winner-modal");
  modal.style.backgroundImage = `url('images/confetti-700-compressed.gif')`;
  modal.innerHTML = `
          <h2>🥇</h2>
          <h2>Player ${player} is the winner!!!<h2>
          <button id='modalReplayBtn' class='btn'>Play Again</button>`;
}

function createPlayers() {
  for (const player in state.players) {
    const options = {
      selector: "#playerContainer",
      data: {
        player,
        score: 0,
        active: false,
      },
      template: function (props) {
        console.log(props);
        return `
                        <div id='${props.player}'>
                            <span id='removePlayerBtn'>❌</span>
                            <h2>${props.player} Score:
                                <span id='${props.player}Scoreboard'>${
          props.score
        }</span>
                            </h2>
                            <div id='${props.player}Dice' class='dice${
          props.active ? " active" : ""
        }'></div>
                        </div>`;
      },
    };
    state.players[player].instance = new PlayerCard(options);
  }
}

const PlayerCard = function (options) {
  this.elem = document.querySelector(options.selector);
  this.data = options.data;
  this.template = options.template;
};

PlayerCard.prototype.render = function () {
  this.elem.insertAdjacentHTML("beforeend", this.template(this.data));
};
