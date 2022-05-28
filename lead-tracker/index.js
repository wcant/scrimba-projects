const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const clearBtn = document.getElementById('clear-btn');
const ulEl = document.getElementById('ul-el');

let myLeads;

// autofill current URL on load and select it on click(for easy deletion)
inputEl.value = window.location.href;
inputEl.addEventListener('click', function () {
    this.setSelectionRange(0, this.value.length);
}, {
    once: true
});

// populate the list with existing leads
myLeads = JSON.parse(localStorage.getItem('myLeads'));
if (myLeads) {
    renderLeads();
}

inputBtn.addEventListener('click', updateLeads);
clearBtn.addEventListener('click', clearLeads);

function renderLeads() {
    let listItems = '';
    myLeads = JSON.parse(localStorage.getItem('myLeads'));
    if (myLeads) {
        for (let i = 0; i < myLeads.length; i++) {
            listItems += `
                <li>
                    <a target='_blank' href='${myLeads[i]}'>
                        ${myLeads[i]}
                    </a>
                </li>
            `;
        }
    } else ulEl.innerHTML = '';
    ulEl.innerHTML = listItems;
}

function updateLeads() {
    if (isValidHttpUrl(inputEl.value)) {
        let currentLeads = localStorage.getItem('myLeads');
        // if leads already exist in LS, then append to the existing array
        if (currentLeads) {
            currentLeads = JSON.parse(currentLeads);
            currentLeads.push(inputEl.value);
            localStorage.setItem('myLeads', JSON.stringify(currentLeads));
        // if not, then start a new array
        } else {
            myLeads = JSON.stringify([inputEl.value]);
            localStorage.setItem('myLeads', myLeads);
        }
        renderLeads();
    } else alert('Input not a valid URL.');
    inputEl.value = '';
}

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return true;
}

function clearLeads() {
    localStorage.clear();
    renderLeads();
}



// Feature ideas
// 1. Check for duplicates before adding and alert the user
// 2. Automatically populate the input with the current URL
// (done) 3. Check that the input is actually a valid URL
// (done) 4. Prompt user when attempts to add empty string (irrelevant if #3 is implemented)
// 5. Exportable or add entire list to clipboard