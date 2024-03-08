import {postTasks} from './../../api/apiFake.js'

export function saveData (ruta,contenido) {
    debugger
    const frmRegistro = document.querySelector('#frmDataTask');
    document.querySelector('#btnGuardar').addEventListener("click", (e) => {
      const datos = Object.fromEntries(new FormData(frmRegistro).entries());
      postTasks(datos,ruta);
      e.stopImmediatePropagation();
      e.preventDefault();
      alert("Datos guardados correctamente")
      mainContent.innerHTML = `<${contenido}></${contenido}>`;
    })
  }

