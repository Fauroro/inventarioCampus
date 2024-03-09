let selectOptions =  [
    "assets","brands", "person",
    "status","person-types","assetMovTypes", 
    "assetTypes","assignedPeople"
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