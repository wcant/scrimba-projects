// Features To Add
// What if image fails to load?
// Separate the filling in of the modal content and the showModal functionality
//    - content should be added first then shown (also, account for image load failure)


const galleries = document.querySelectorAll('.gallery');
const gallery1 = galleries[0];
const gallery2 = galleries[1];
const modal = document.querySelector('.modal-outer');
const modalInner = modal.querySelector('.modal-inner');

function Gallery(gallery) {

    gallery.addEventListener('click', handleGalleryClick);

    const currentCard = {
        image: '',
        heading: '',
        description: ''
    }

    function handleGalleryClick(e) {
        const cardClicked = e.target.closest('.card');
        if (cardClicked) {
            currentCard.image = cardClicked.querySelector('img').src;
            currentCard.heading = cardClicked.querySelector('h2').textContent;
            currentCard.description = cardClicked.querySelector('p').textContent;
            showModal();
        } else console.log('OUTSIDE');
    }

    function handleModalClick(e) {
        console.log(e.target);
        if (!e.target.closest('.modal-inner')) {
            closeModal();
        }
    }

    function showModal() {
        console.log(currentCard.image)
        modalInner.querySelector('img').src = currentCard.image;
        modalInner.querySelector('h2').textContent = currentCard.heading;
        modalInner.querySelector('figure p').textContent = currentCard.description;

        // set display to show modal
        modal.style.display = 'block';
    }

    function closeModal() {
        // add "hidden" class on modalOuter
        modal.style.display = 'none';
        currentCard.image = '';
        currentCard.heading = '';
        currentCard.description = '';
        modalInner.innerHTML = '';
    }

    function showNextImage() {

    }

    function showPrevImage() {

    }


    modal.addEventListener('click', handleModalClick);
    window.addEventListener('keyup', function(e) {
        if (e.key === 'Escape') closeModal();
    });


}


const galleryInstance1 =  Gallery(gallery1);
const galleryInstance2 =  Gallery(gallery2);