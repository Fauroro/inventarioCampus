import {postTasks, putTasks, delTasks} from './../../api/apiFake.js'

export function saveData (ruta,contenido) {
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

export function editData (ruta,contenido) {
    const frmRegistro = document.querySelector('#frmDataTask');
    document.querySelector('#btnGuardar').addEventListener("click", (e) => {
      const datos = Object.fromEntries(new FormData(frmRegistro).entries());
      putTasks(datos,ruta);
      e.stopImmediatePropagation();
      e.preventDefault();
      alert("Datos modificados correctamente")
      mainContent.innerHTML = `<${contenido}></${contenido}>`;
    })
  }

  
export function delData (ruta,contenido) {
  // const frmRegistro = document.querySelector('#frmDataTask');
  document.querySelector('#button-addon2').addEventListener("click", (e) => {
    debugger
    // const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    delTasks(ruta);
    e.stopImmediatePropagation();
    e.preventDefault();
    alert("Datos eliminados correctamente")
    mainContent.innerHTML = `<${contenido}></${contenido}>`;
  })
}





