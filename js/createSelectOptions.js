let selectOptions =  [
    "assets","categories","brands","personTypes",
    "assetMovTypes", "assetHistory","suppliers", "status",
    "personPhones", "assignments", "assetTypes",
    "assignedPeople", "movsDetails"
]

function createOptions() {
    let optionSelector = document.querySelector(".form-select");
    
    selectOptions.forEach(option => {
    let optionTag = document.createElement('option');    
    optionTag.innerText = option;
    optionTag.value = option;
    optionSelector.appendChild(optionTag);
});
}

export {createOptions}