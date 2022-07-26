export default function LeaderBoard(leaderboard) {
  const state = {
    names: [],
    wins: [],
  };

  function render() {
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
  }

  return {
    render,
  };
}
