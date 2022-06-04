const sendBtn = document.getElementById('#send-btn');
const services = document.querySelector('.services');

const availableServices = {
    washCar: '$10',
    mowLawn: '$20',
    pullWeeds: '$30',
}

createServiceButtons();

services.addEventListener('click', handleServicesClick);

function handleServicesClick(e) {
    const service = e.target.ariaLabel;
    console.log(e.target.ariaLabel);
    services.querySelector()
}

function createServiceButtons() {
    for (let service of Object.keys(availableServices)) {
        console.log(service);
        const button = document.createElement('button');
        button.classList.add('service-btn');
        button.setAttribute('aria-label', service);
        button.textContent = parseServiceName(service) + `${availableServices[service]}`;
        services.append(button);
    }
}

function parseServiceName(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (i === 0) {
            result += str[i].toUpperCase();
        } else if (str[i] === str[i].toUpperCase()) {
            result += ` ${str[i]}`;
        } else if (i === str.length-1) {
            result += `${str[i]}: `;
        } else {
            result += str[i];
        }
    }
    return result;
}