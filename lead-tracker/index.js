let myLeads = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const clearBtn = document.getElementById('clear-btn');
const tabBtn = document.getElementById('tab-btn');
const ulEl = document.getElementById('ul-el');

// populate the list with existing leads
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

inputBtn.addEventListener('click', updateLeads);
tabBtn.addEventListener('click', saveTab);
clearBtn.addEventListener('click', clearLeads);

function render(leads) {
    let listItems = '';
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

function updateLeads() {
    if (isValidHttpUrl(inputEl.value)) {
        myLeads.push(inputEl.value);
        localStorage.setItem('myLeads', JSON.stringify(myLeads));
        render(myLeads);
    } else alert('Input not a valid URL.');
    inputEl.value = '';
}

function saveTab() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
      });
    //console.log(activeTab);
}

function clearLeads() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
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




// Feature ideas
// 1. Check for duplicates before adding and alert the user
// 2. Automatically populate the input with the current URL
// (done) 3. Check that the input is actually a valid URL
// (done) 4. Prompt user when attempts to add empty string (irrelevant if #3 is implemented)
// 5. Exportable or add entire list to clipboard


// Refactoring
// 1. make renderLeads() render any array passed as an arguement