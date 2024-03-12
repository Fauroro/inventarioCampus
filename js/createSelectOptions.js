let selectOptions = [
    "assets", "brands", "personas",
    "status", "person-phones",
    "asset-types"
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

export { createOptions }