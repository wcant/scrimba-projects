function Gallery(gallery) {
  const cards = Array.from(gallery.querySelectorAll(".card"));
  const modal = document.querySelector(".modal-outer");
  const modalInner = modal.querySelector(".modal-inner");
  const prevButton = modal.querySelector(".prev");
  const nextButton = modal.querySelector(".next");

  if (!gallery) {
  }

  cards.forEach((card) => {
    card.addEventListener("click", handleImageClick);
  });

  let currentCard = {};

  function handleImageClick(e) {
    const cardClicked = e.currentTarget;
    console.log(cardClicked);
    if (cardClicked) {
      currentCard.el = cardClicked;
      currentCard.image = cardClicked.querySelector("img").src;
      currentCard.heading = cardClicked.querySelector("h2").textContent;
      currentCard.description = cardClicked.querySelector("p").textContent;
      showModal();
    } else console.log("OUTSIDE");
  }

  function handleModalClick(e) {
    console.log(e.target);
    if (!e.target.closest(".modal-inner")) {
      closeModal();
    }
  }

  function handleKeyUp(e) {
    if (e.key === "Escape") closeModal();
  }

  function showImage() {
    modalInner.querySelector("img").src = currentCard.image;
    modalInner.querySelector("h2").textContent = currentCard.heading;
    modalInner.querySelector("figure p").textContent = currentCard.description;
  }

  function showModal() {
    console.info("opening modal");
    if (modal.matches(".open")) {
      console.info("Modal already open");
      return;
    }

    showImage();

    prevButton.addEventListener("click", showPrevImage);
    nextButton.addEventListener("click", showNextImage);
    modal.addEventListener("click", handleModalClick);
    window.addEventListener("keyup", handleKeyUp);

    // show modal
    modal.classList.add("open");
  }

  function closeModal() {
    modal.classList.remove("open");
    currentCard.el = null;
    currentCard.image = "";
    currentCard.heading = "";
    currentCard.description = "";
    prevButton.removeEventListener("click", showPrevImage);
    nextButton.removeEventListener("click", showNextImage);
    modal.removeEventListener("click", handleModalClick);
    window.removeEventListener("keyup", handleKeyUp);
  }

  function showNextImage() {
    const nextCard = currentCard.el.nextElementSibling || cards[0];

    if (nextCard) {
      currentCard.el = nextCard;
      currentCard.image = nextCard.querySelector("img").src;
      currentCard.heading = nextCard.querySelector("h2").textContent;
      currentCard.description = nextCard.querySelector("p").textContent;
      showImage();
    }
  }

  function showPrevImage() {
    const prevCard =
      currentCard.el.previousElementSibling || cards[cards.length - 1];
    if (prevCard) {
      currentCard.el = prevCard;
      currentCard.image = prevCard.querySelector("img").src;
      currentCard.heading = prevCard.querySelector("h2").textContent;
      currentCard.description = prevCard.querySelector("p").textContent;
      showImage();
    }
  }
}

const galleries = document.querySelectorAll(".gallery");
const gallery1 = galleries[0];
const gallery2 = galleries[1];

const galleryInstance1 = Gallery(gallery1);
const galleryInstance2 = Gallery(gallery2);
