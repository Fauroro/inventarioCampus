import './../app/brands/brand.js'
import { saveData } from './../app/brands/brand.js';



document.querySelectorAll('.nav-link').forEach((val, id) => {
    val.addEventListener('click', (e) => {
      let data = JSON.parse(e.target.dataset.verocultar);
      let mainContent = document.querySelector('#mainContent');
      mainContent.innerHTML = '';
      switch (data[0]) {
        case 'a':
          mainContent.innerHTML = "<add-brand></add-brand>";
          saveData('brands','<add-brand>');
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
