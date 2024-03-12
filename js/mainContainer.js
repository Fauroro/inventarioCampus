import '../app/brand.js'
import '../app/personPhones.js'
import '../app/status.js'
import '../app/assetType.js'
import '../app/person.js'
import '../app/assets.js'
import '../app/createAssignment.js'
import '../app/assignAssets.js'
import '../app/returnAsset.js'
import { saveData } from '../app/components/options.js';
import { editData } from '../app/components/options.js';
import { saveDataAssign } from '../app/components/assingOptions.js'

let selectorOptions = document.querySelector(".form-select")


document.querySelectorAll('.nav-link').forEach((val) => {
  val.addEventListener('click', (e) => {
    let data = JSON.parse(e.target.dataset.verocultar);
    let mainContent = document.querySelector('#mainContent');
    mainContent.innerHTML = '';
    switch (data[0]) {
      case 'a':
        mainContent.innerHTML = `<add-${selectorOptions.value}></add-${selectorOptions.value}>`;
        saveData(`${selectorOptions.value}`, `add-${selectorOptions.value}`);
        break;
      case 'b':
        mainContent.innerHTML = `<edit-${selectorOptions.value}></edit-${selectorOptions.value}>`;
        break;
      case 'c':
        mainContent.innerHTML = `<delete-${selectorOptions.value}></delete-${selectorOptions.value}>`;
        break;
      case 'd':
        mainContent.innerHTML = `<search-${selectorOptions.value}></search-${selectorOptions.value}>`;
        break;
      case 'e':
        mainContent.innerHTML = `<create-assingment></create-assingment>`;
        saveData(`assignments`, `create-assingment`);
        break;
      case 'f':
        mainContent.innerHTML = `<assing-assets></assing-assets>`;
        saveDataAssign(`assignments`, `create-assingment`);
        break;
      case 'g':
        mainContent.innerHTML = `<return-assets></return-assets>`;
        break;
      case 'z':
        mainContent.innerHTML = /* html */`
          <div class="container-fluid">
            <div class="card mt-3">
              <img
                src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTFzOHNvNHM0dW5lanN5dHFzMG5kdXBscjZtcXo1ZnczMmV6OHU5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YP258EkezKv5RSPGRI/giphy.gif"
                class="img-fluid" alt="..." style="opacity: 0.9;">
            </div>
          </div>`
        break;
    }
  })
});
