class Gallery {
  constructor(gallery) {
    if (!gallery) {
      throw new Error("no gallery found");
    }
    this.gallery = gallery;
    this.cards = Array.from(this.gallery.querySelectorAll(".card"));
    this.modal = document.querySelector(".modal-outer");
    this.modalInner = this.modal.querySelector(".modal-inner");
    this.prevButton = this.modal.querySelector(".prev");
    this.nextButton = this.modal.querySelector(".next");
    this.currentCard = {};

    this.cards.forEach((card) => {
      card.addEventListener("click", this.handleImageClick);
    });
  }

  handleImageClick(e) {
    this.cardClicked = e.currentTarget;
    if (this.cardClicked) {
      this.currentCard.el = this.cardClicked;
      this.currentCard.image = this.cardClicked.querySelector("img").src;
      console.log(this.currentCard);
      this.currentCard.heading =
        this.cardClicked.querySelector("h2").textContent;
      this.currentCard.description =
        this.cardClicked.querySelector("p").textContent;
      this.showModal();
    } else console.log("OUTSIDE");
  }

  handleModalClick(e) {
    console.log(e.target);
    if (!e.target.closest(".modal-inner")) {
      this.closeModal();
    }
  }

  handleKeyUp(e) {
    if (e.key === "Escape") this.closeModal();
  }

  showImage() {
    this.modalInner.querySelector("img").src = this.currentCard.image;
    this.modalInner.querySelector("h2").textContent = this.currentCard.heading;
    this.modalInner.querySelector("figure p").textContent =
      this.currentCard.description;
  }

  showModal() {
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
  }

  closeModal() {
    this.modal.classList.remove("open");
    this.currentCard.el = null;
    this.currentCard.image = "";
    this.currentCard.heading = "";
    this.currentCard.description = "";
    this.prevButton.removeEventListener("click", this.showPrevImage);
    this.nextButton.removeEventListener("click", this.showNextImage);
    this.modal.removeEventListener("click", this.handleModalClick);
    window.removeEventListener("keyup", this.handleKeyUp);
  }

  showNextImage() {
    const nextCard = this.currentCard.el.nextElementSibling || this.cards[0];

    if (nextCard) {
      this.currentCard.el = nextCard;
      this.currentCard.image = nextCard.querySelector("img").src;
      this.currentCard.heading = nextCard.querySelector("h2").textContent;
      this.currentCard.description = nextCard.querySelector("p").textContent;
      this.showImage();
    }
  }

  showPrevImage() {
    const prevCard =
      this.currentCard.el.previousElementSibling ||
      this.cards[this.cards.length - 1];
    if (prevCard) {
      this.currentCard.el = prevCard;
      this.currentCard.image = prevCard.querySelector("img").src;
      this.currentCard.heading = prevCard.querySelector("h2").textContent;
      this.currentCard.description = prevCard.querySelector("p").textContent;
      this.showImage();
    }
  }
}

const galleryInstance1 = new Gallery(document.querySelector(".gallery1"));
const galleryInstance2 = new Gallery(document.querySelector(".gallery2"));

console.log(galleryInstance1, galleryInstance2);
