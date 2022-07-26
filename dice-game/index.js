// 1. Initial screen player 1 and 2 must roll to decide who goes first, then load the game
// 2. Double or nothing button
// 3. dice roll animation?
// 6. win streak? show winner of last 10 rounds?
// 7. edit max score to trigger win
//  can't add players after game has started
//  if you add a player then the player that goes first needs to be reconsidered

// confetti gif is free from https://acegif.com/confetti/
// dice faces are free from https://commons.wikimedia.org/wiki/Category:Dice_faces

// 1. maximum of 6 players
// 2. first player to X (20 by default) score wins

// Create variables for the game state

import Modal from "./components/Modal.js";
import Leaderboard from "./components/Leaderboard.js";
import PlayerCard from "./components/PlayerCard.js";
import PlayerNumForm from "./components/PlayerNumForm.js";

const modal = Modal();
const theGameBoard = GameBoard(document.getElementById("gameBoard"));
const theLeaderboard = Leaderboard(document.getElementById("leaderboard"));

function GameBoard(gameBoard) {
  if (!gameBoard) {
    throw new Error("No game board found.");
  }
  const state = {
    nPlayers: null,
    whoseTurn: 1,
    inProgress: false,
    winner: null,
    message: "Let's Play Dice!!",
    players: {},
  };

  init();

  async function init() {
    await chooseNumPlayers();

    try {
      await chooseFirstPlayer();
    } catch (error) {
      console.error(error);
    }
  }

  function chooseNumPlayers() {
    return new Promise((resolve) => {
      const playerNumForm = PlayerNumForm();
      // Highlights the selected label
      playerNumForm.addEventListener("click", handleNumPlayersFormClick);
      // submits form and sets player's state and renders player cards
      playerNumForm.addEventListener("submit", (e) =>
        handleNumPlayersSubmit(e, resolve)
      );
      // add modal to DOM
      modal.render({
        template: playerNumForm,
      });
    });
  }

  function chooseFirstPlayer() {
    return new Promise((resolve) => {
      // render choose player modal
      state.whoseTurn = null;
      state.message = "Roll to choose first player";
      debugger;
      for (const player in state.players) {
        console.log(player);
      }
    });
  }

  function gameButton(props) {
    return `
      <button id="gameButton" class="btn btn-primary" onclick=${props.clickHandler}>${props.buttonText}</div>
      `;
  }

  function doPlayerTurn() {}

  function rollDice() {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    return randomNumber;
  }

  function handleNumPlayersSubmit(e, resolve) {
    e.preventDefault();
    state.nPlayers = e.target.numplayers.value;
    // add players to state.players object
    for (let i = 1; i <= state.nPlayers; i++) {
      state.players[`player${i}`] = {
        score: 0,
        active: false,
      };
    }
    // and render the player cards
    render();
    gameBoard.classList.remove("visuallyhidden");
    // Hide modal and clean up
    modal.closeModal();

    resolve();
  }

  function handleNumPlayersFormClick(e) {
    if (e.target.name === "numplayers") {
      const radioContainer = e.target.closest(".btn-container");
      const clickedLabel = radioContainer.querySelector(
        `label[for='${e.target.id}']`
      );
      const radioLabels = radioContainer.querySelectorAll("label");

      // clear all labels first
      radioLabels.forEach((label) => {
        label.classList.remove("checked");
      });
      clickedLabel.classList.add("checked");
    }
  }

  function handleBtnClick() {
    console.log("I'm working");
  }

  function render() {
    const activePlayer = state.whoseTurn;
    const players = state.players;

    let playerCards = "";
    // Render players
    for (const player in players) {
      const options = {
        player,
        score: players[player].score,
        active: players[player].active,
      };
      playerCards += `${PlayerCard(options)}`;
    }

    // set gameButton options
    const gameBtnOptions = {
      clickHandler: handleBtnClick,
      buttonText: "click me",
    };
    // updateActivePlayer();

    // pull templates from what?
    // (message) current message that displays some information about the status of the game
    // 1. Choose first player - each player rolls dice once (if tie need to handle)
    // 2. Ready to Start
    // 3. Player #'s Turn
    // PlayerCards generated based on the number of players in state
    // gameButton
    // Message   1          2           3
    // states -> Roll Dice, Start Game, Roll Dice
    console.log(playerCards);
    const result = `
        <h1 id="message">${state.message}</h1>
        <div id="playerContainer">
            ${playerCards}
        </div>
        ${gameButton(gameBtnOptions)}
        `;

    gameBoard.innerHTML = result;
  }

  return {
    state,
  };
}
