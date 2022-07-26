export default function PlayerCard(props) {
  return `
        <div id='${props.player}' class='player-card'>
        <h3>${props.player} Score:
        <span id='${props.player}Scoreboard'>${props.score}</span>
        </h3>
        <div id='${props.player}Dice' class='dice${
    props.active ? " active" : ""
  }'></div>
        <span id='removePlayerBtn'>❌</span>
        </div>`;
}
