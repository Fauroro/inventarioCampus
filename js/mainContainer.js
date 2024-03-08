import '../app/brand.js'
import '../app/category.js'
import '../app/suppliers.js'
import { saveData } from '../app/components/options.js';
import { editData } from '../app/components/options.js';

let selectorOptions = document.querySelector(".form-select")


document.querySelectorAll('.nav-link').forEach((val) => {
    val.addEventListener('click', (e) => {
      let data = JSON.parse(e.target.dataset.verocultar);
      let mainContent = document.querySelector('#mainContent');
      mainContent.innerHTML = '';
      switch (data[0]) {
        case 'a':
          mainContent.innerHTML = `<add-${selectorOptions.value}></add-${selectorOptions.value}>`;
          saveData(`${selectorOptions.value}`,`<add-${selectorOptions.value}>`);
          break;
          case 'b':
            mainContent.innerHTML = `<edit-${selectorOptions.value}></edit-${selectorOptions.value}>`;
          break;
        case 'c':
          mainContent.innerHTML = `<delete-${selectorOptions.value}></delete-${selectorOptions.value}>`;
          break;
        case 'd':
          mainContent.innerHTML = '<delete-brands></delete-brands>'
          break;
        case 'e':
          mainContent.innerHTML = '<task-trash></task-trash>'
          break;
      }
    })
  });
