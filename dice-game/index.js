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
let player1Score = 0;
let player2Score = 0;
let player1Turn = true;

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById('player1Dice');
const player2Dice = document.getElementById('player2Dice');
const player1Scoreboard = document.getElementById('player1Scoreboard');
const player2Scoreboard = document.getElementById('player2Scoreboard');


const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');


/* Hook up a click event listener to the Roll Dice Button. */

// resetBtn.addEventListener('click', function(){
//     reset();
// })


modal.addEventListener('click', function (e) {
    if (e.target.id === 'modalReplayBtn') {
        reset();
    }

    if (e.target.value === 'players-set') {

    }
});

function reset() {
    player1Score = 0;
    player2Score = 0;
    player1Turn = true;
    player1Scoreboard.textContent = 0;
    player2Scoreboard.textContent = 0;
    message.textContent = 'Player 1 Turn';
    rollBtn.style.display = 'block';
    player2Dice.classList.remove('active');
    player1Dice.classList.add('active');
    overlay.style.display = 'none';
}

function showWinnerModal(player) {
    overlay.style.display = 'flex';
    modal.classList.add('winner-modal');
    modal.style.backgroundImage = `url('images/confetti-700-compressed.gif')`;
    modal.innerHTML = `
        <h2>🥇</h2>
        <h2>Player ${player} is the winner!!!<h2>
        <button id='modalReplayBtn' class='btn'>Play Again</button>`;
}

function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const PlayerCard = function(options) {
    this.elem = document.querySelector(options.selector);
    this.data = options.data;
    this.template = options.template;
};

PlayerCard.prototype.render = function () {
    this.elem.insertAdjacentHTML('beforeend', this.template(this.data));
}






function Modal(props) {

}


function GameBoard() {
    const state = {
        nPlayers: null,
        whoseTurn: 1,
        winner: null,
        message: "Let's Play Dice!!",
        players: {}
    }

    init();

    async function init() {
        await chooseNumPlayers();
        createPlayers();
        render();
        // await chooseFirstPlayer();
    }

    const gameBoard = document.getElementById('gameBoard');
    const message = document.getElementById('message');
    const playerContainer = document.getElementById('playerContainer');
    const rollBtn = document.getElementById('rollBtn');
    const addPlayerBtn = document.getElementById('addPlayerBtn');

    // Add default message to DOM
    message.textContent = state.message;

    rollBtn.addEventListener('click', doPlayerTurn);
    // addPlayerBtn.addEventListener('click', addPlayer);

    function chooseNumPlayers() {
        return new Promise((resolve) => {
            // show the modal
            overlay.style.display = 'flex';
            // create form for choosing player number
            modal.insertAdjacentHTML(
                'afterbegin',
                `<h2>Select the Number of Players</h2>`
            );

            const numPlayerForm = document.createElement('form');
            numPlayerForm.id = 'playerNumForm';
            numPlayerForm.insertAdjacentHTML('afterbegin',
                `
                <legend>
                    <div class='btn-container'>
                        <div style='display:flex'>
                            <label for='2players' tabindex='0' class='label-btn checked'>2</label>
                            <input type='radio' name='numplayers' id='2players' value='2' checked required>
                        </div>
                        <div>
                            <label for='3players' tabindex='0' class='label-btn'>3</label>
                            <input type='radio' name='numplayers' id='3players' value='3'>
                        </div>
                        <div>
                            <label for='4players' tabindex='0' class='label-btn'>4</label>
                            <input type='radio' name='numplayers' id='4players' value='4'>
                        </div>
                        <div>
                            <label for='5players' tabindex='0' class='label-btn'>5</label>
                            <input type='radio' name='numplayers' id='5players' value='5'>
                        </div>
                        <div>
                            <label for='6players' tabindex='0' class='label-btn'>6</label>
                            <input type='radio' name='numplayers' id='6players' value='6'>
                        </div>
                    </div>
                    <div class='btn-container'>
                        <button type='submit' class='btn btn-red' tabindex='0' id='playersSetBtn'>Go!!!</button>
                    </div>
                </legend>
                `);

            // Highlights the selected label
            numPlayerForm.addEventListener('click', handleNumPlayersFormClick);
            // submits form and sets state.nPlayers
            numPlayerForm.addEventListener('submit',(e) => handleNumPlayersSubmit(e,resolve));
            // add modal to DOM
            modal.append(numPlayerForm);
        });
    }

    function chooseFirstPlayer() {
        return new Promise((resolve) => {
            // render choose player modal
            state.whoseTurn = null;
            message.textContent = 'Roll to choose first player';
            for (const player in state.players) {
                console.log(player);
            }
        });
    }

    function createPlayers() {
        for (const player in state.players) {
            const options = {
                selector: '#playerContainer',
                data: {
                    player,
                    score: 0,
                    active: false
                },
                template: function (props) {
                    console.log(props);
                    return `
                        <div id='${props.player}'>
                            <span id='removePlayerBtn'>❌</span>
                            <h2>${props.player} Score:
                                <span id='${props.player}Scoreboard'>${props.score}</span>
                            </h2>
                            <div id='${props.player}Dice' class='dice${props.active ? ' active' : ''}'></div>
                        </div>`;
                }
            };
            state.players[player].instance = new PlayerCard(options);
        }
    }

    function rollDice() {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        return randomNumber;
    }

    function updateActivePlayer() {
        const playersDice = playerContainer.querySelectorAll('.dice');
        const activePlayer = state.whoseTurn;
        const activeDie = playerContainer.querySelector(`#player${activePlayer}Dice`)
        console.log(`updating active player to player${activePlayer}`);
        // wouldn't having access to the DOM nodes of each
        // player card and updating the content be better?  Not sure
        for (const die of playersDice) {
            console.log(die);
            die.classList.remove('active');
        }
        activeDie.classList.add('active');
        message.textContent = `Player ${activePlayer}'s Turn`
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
                player1Dice.classList.remove('active');
                player2Dice.classList.add('active');
                message.textContent = 'Player 2 Turn';
            } else {
                player2Score += randomNumber;
                player2Scoreboard.textContent = player2Score;
                player2Dice.style.background = `url('images/Alea_${randomNumber}.png')`;
                player2Dice.classList.remove('active');
                player1Dice.classList.add('active');
                message.textContent = 'Player 1 Turn';
            }

            if (player1Score >= 20) {
                message.textContent = '🥇 Player 1 Won 👏';
                showWinnerModal('1');
                showResetButton();
            }  else if (player2Score >= 20) {
                message.textContent = '🏆 Player 2 Won 🎉';
                showWinnerModal('2');
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
        message.textContent = 'Player 1 Turn';
        rollBtn.style.display = 'block';
        player2Dice.classList.remove('active');
        player1Dice.classList.add('active');
        overlay.style.display = 'none';
    }

    function handleNumPlayersSubmit(e, resolve) {
        e.preventDefault();

        // Since I have a default value selected I didn't account for
        // there not being an input selected here.
        state.nPlayers = e.target.numplayers.value;
        // add players to state.players object
        for (let i=1; i<=state.nPlayers; i++) {
            state.players[`player${i}`] = {};
        }
        // Hide modal and clean up
        overlay.style.display = 'none';
        modal.innerHTML = '';

        resolve();
    }

    function handleNumPlayersFormClick(e) {
        if (e.target.name === 'numplayers') {
            const radioContainer = e.target.closest('.btn-container');
            const clickedLabel = radioContainer.querySelector(`label[for='${e.target.id}']`);
            const radioLabels = radioContainer.querySelectorAll('label');

            // clear all labels first
            radioLabels.forEach((label) => {
                label.classList.remove('checked');
            });
            clickedLabel.classList.add('checked');
        }
    }

    function render() {

        const activePlayer = state.whoseTurn;
        const players = state.players;

        // Update Message
        message.textContent = `Player ${activePlayer}'s Turn`;

        // Render players
        for (const player in players) {
            players[player].instance.render();
        }

        updateActivePlayer();

    };

    return { state };
}

function LeaderBoard() {

    const state = {
        names: [],
        wins: []
    };

    const template = function() {
        return `
            <h2>Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td>Player</td>
                        <td># Wins</td>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>`;
    };
}

const myGameBoard = new GameBoard(document.getElementById('gameBoard'));
const myLeaderboard = new LeaderBoard(document.getElementById('leaderboard'));


export {  };