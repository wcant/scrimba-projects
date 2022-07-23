function Gallery(gallery) {
  if (!gallery) {
    throw new Error("no gallery found");
  }

  this.gallery = gallery;

  this.cards = Array.from(gallery.querySelectorAll(".card"));
  this.modal = document.querySelector(".modal-outer");
  this.modalInner = this.modal.querySelector(".modal-inner");
  this.prevButton = this.modal.querySelector(".prev");
  this.nextButton = this.modal.querySelector(".next");
  this.currentCard = {
    el: null,
  };

  this.cards.forEach((card) => {
    card.addEventListener("click", this.handleImageClick);
  });
}

Gallery.prototype.handleImageClick = function (e) {
  this.cardClicked = e.currentTarget;
  if (this.cardClicked) {
    this.currentCard.el = this.cardClicked;
    this.currentCard.image = this.cardClicked.querySelector("img").src;
    this.currentCard.heading = this.cardClicked.querySelector("h2").textContent;
    this.currentCard.description =
      this.cardClicked.querySelector("p").textContent;
    this.showModal();
  } else console.log("OUTSIDE");
};

Gallery.prototype.handleModalClick = function (e) {
  console.log(e.target);
  if (!e.target.closest(".modal-inner")) {
    this.closeModal();
  }
};

Gallery.prototype.handleKeyUp = function (e) {
  if (e.key === "Escape") this.closeModal();
};

Gallery.prototype.showImage = function () {
  this.modalInner.querySelector("img").src = this.currentCard.image;
  this.modalInner.querySelector("h2").textContent = this.currentCard.heading;
  this.modalInner.querySelector("figure p").textContent =
    this.currentCard.description;
};

Gallery.prototype.showModal = function () {
  console.info("opening modal");
  if (this.modal.matches(".open")) {
    console.info("Modal already open");
    return;
  }

  this.showImage();

  this.prevButton.addEventListener("click", this.showPrevImage);
  this.nextButton.addEventListener("click", this.showNextImage);
  this.modal.addEventListener("click", this.handleModalClick);
  window.addEventListener("keyup", this.handleKeyUp);

  // show modal
  this.modal.classList.add("open");
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove("open");
  this.currentCard.el = null;
  this.currentCard.image = "";
  this.currentCard.heading = "";
  this.currentCard.description = "";
  this.prevButton.removeEventListener("click", this.showPrevImage);
  this.nextButton.removeEventListener("click", this.showNextImage);
  this.modal.removeEventListener("click", this.handleModalClick);
  window.removeEventListener("keyup", this.handleKeyUp);
};

Gallery.prototype.showNextImage = function () {
  this.nextCard = this.currentCard.el.nextElementSibling || this.cards[0];

  if (nextCard) {
    this.currentCard.el = this.nextCard;
    this.currentCard.image = this.nextCard.querySelector("img").src;
    this.currentCard.heading = this.nextCard.querySelector("h2").textContent;
    this.currentCard.description = this.nextCard.querySelector("p").textContent;
    this.showImage();
  }
};

Gallery.prototype.showPrevImage = function () {
  this.prevCard =
    this.currentCard.el.previousElementSibling ||
    this.cards[this.cards.length - 1];
  if (prevCard) {
    this.currentCard.el = this.prevCard;
    this.currentCard.image = this.prevCard.querySelector("img").src;
    this.currentCard.heading = this.prevCard.querySelector("h2").textContent;
    this.currentCard.description = this.prevCard.querySelector("p").textContent;
    this.showImage();
  }
};

const galleryInstance1 = new Gallery(document.querySelector(".gallery1"));
const galleryInstance2 = new Gallery(document.querySelector(".gallery2"));

console.log(galleryInstance1, galleryInstance2);
