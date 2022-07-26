export default function Modal() {
  const modalOuter = document.querySelector(".modal-outer");
  const modalInner = document.querySelector(".modal-inner");

  modalOuter.addEventListener("click", function (e) {
    // if (e.target.id === "modalReplayBtn") {
    //   reset();
    // }

    // if (e.target.value === "players-set") {
    // }
    if (e.target === e.currentTarget) {
      closeModal();
    }
  });

  function closeModal() {
    modalOuter.style.opacity = 0;
    modalOuter.style.pointerEvents = "none";
    modalInner.innerHTML = "";
  }

  function render(props) {
    modalOuter.style.opacity = 1;
    modalOuter.style.pointerEvents = "all";
    modalInner.append(props.template);
  }

  return {
    render,
    closeModal,
  };
}
