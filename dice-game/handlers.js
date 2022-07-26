import Modal from "./components/Modal.js";

export function handleNumPlayersSubmit(e, resolve) {
  e.preventDefault();
  // Since I have a default value selected I didn't account for
  // there not being an input selected here.
  state.nPlayers = e.target.numplayers.value;
  debugger;
  // add players to state.players object
  for (let i = 1; i <= state.nPlayers; i++) {
    state.players[`player${i}`] = {};
  }
  // Hide modal and clean up
  Modal.closeModal();

  resolve();
}

export function handleNumPlayersFormClick(e) {
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
