// array to hold services requested
// buttons to add service to array
// place to display data from array - updated everytime the array changes
// don't charge > once for same service
// total cost stays updated
// button to "send invoice" (reset)
// remove items after adding

const sendBtn = document.getElementById('#send-btn');
const services = document.querySelector('.services');
const tableBody = document.querySelector('tbody');
const tableFoot = document.querySelector('tfoot');
const totalEl = document.querySelector('#invoice-total');
const alertContainer = document.querySelector('alert-container');

const availableServices = {
    "Wash Car": '$10',
    "Mow Lawn": '$20',
    "Pull Weeds": '$30',
};

const invoiceState = {
    services: [],
    total: 0,
    rows: {}
}

createServiceButtons();

services.addEventListener('click', handleServicesClick);

function handleServicesClick(e) {
    const service = e.target.value;

    // check if service already exists on invoice
    if (invoiceState.services.find(val => val === service)) {
        showAlert('Service already added to invoice.');
        // alert('Service already added to invoice.');
    } else {
        addService(service);
    }
}

function addService(service) {
    const row = document.createElement('tr');
    const col1 = document.createElement('td');
    const col2 = document.createElement('td');
    const removeBtn = document.createElement('button');

    // update total in state
    const price = parseInt(availableServices[service].slice(1));
    invoiceState.total += price;

    // create service name and price columns
    col1.innerHTML = service;

    removeBtn.textContent = 'Remove';
    removeBtn.id = 'remove-btn';
    removeBtn.value = service;
    removeBtn.addEventListener('click', removeService);
    col1.append(removeBtn);

    col2.innerHTML = `$${price}`;

    row.append(col1,col2);
    tableBody.append(row);

    // append row element to state container object
    invoiceState.rows[service] = row;
    // add the service to the state services array
    invoiceState.services.push(service);
    updateTotal();
}

function removeService(e) {
    const service = e.target.value;
    const rowToRemove = invoiceState.rows[service];
    // update total in state
    invoiceState.total -= parseInt(availableServices[service].slice(1));
    // remove row from DOM and delete from the state object
    rowToRemove.remove()
    delete rowToRemove;
    invoiceState.services = invoiceState.services.filter((val) => val !== service);
    updateTotal();
}

function updateTotal() {
    totalEl.innerHTML = `$${invoiceState.total}`;
}

function createServiceButtons() {
    for (let service of Object.keys(availableServices)) {
        const button = document.createElement('button');
        button.classList.add('service-btn');
        button.setAttribute('value', service);
        button.textContent = service + `${availableServices[service]}`;
        services.append(button);
    }
}

function showAlert(message){
    const el = document.createElement("div");
    el.innerHTML = message;
    el.classList.add('alert', 'alert-danger', 'open');
    setTimeout(function(){
    el.parentNode.removeChild(el);
    },2000);
    document.body.appendChild(el);
}

// $(document).ready(function() {
//     $('#box').click(function() {
//         $(this).find(".hidden").toggleClass('open');
//     });
// });