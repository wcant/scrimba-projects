const genButton = document.querySelector('.generate button');
const passwordFields = document.querySelectorAll('.passwords p');

genButton.addEventListener('click', handleButtonClick);
passwordFields.addEventListener('click', handlePasswordClick);


function handleButtonClick(e) {
    e.preventDefault();
    console.log('button clicked');
}

function handlePasswordClick(e) {
    console.log('password clicked');
}