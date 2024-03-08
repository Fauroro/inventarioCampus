import '../app/brand.js'
import '../app/category.js'
import '../app/suppliers.js'
import { saveData } from '../app/components/options.js';

let selectorOptions = document.querySelector(".form-select")


document.querySelectorAll('.nav-link').forEach((val) => {
    val.addEventListener('click', (e) => {
      let data = JSON.parse(e.target.dataset.verocultar);
      let mainContent = document.querySelector('#mainContent');
      mainContent.innerHTML = '';
      switch (data[0]) {
        case 'a':
          mainContent.innerHTML = `<add-${selectorOptions.value}>  </add-${selectorOptions.value}>`;
          saveData(`${selectorOptions.value}`,`<add-${selectorOptions.value}>`);
          break;
        case 'b':
          mainContent.innerHTML = '<task-to-do></task-to-do>'
          break;
        case 'c':
          mainContent.innerHTML = '<task-done></task-done>'
          break;
        case 'd':
          mainContent.innerHTML = '<task-fail></task-fail>'
          break;
        case 'e':
          mainContent.innerHTML = '<task-trash></task-trash>'
          break;
      }
    })
  });
