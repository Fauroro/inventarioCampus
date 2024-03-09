import {postTasks, putTasks, delTasks,getTasks} from './../../api/apiFake.js'

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
    // const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    delTasks(ruta);
    e.stopImmediatePropagation();
    e.preventDefault();
    alert("Datos eliminados correctamente")
    mainContent.innerHTML = `<${contenido}></${contenido}>`;
  })
}


export function buscar(funcion) {
  const sumbit = document.getElementsByClassName('submit');
  let selectorOptions = document.querySelector(".form-select")
  sumbit[0].addEventListener('click', async (e) => {
    const id = document.querySelector('.me-2').value;
    let data = await getTasks(`${selectorOptions.value}/${id}`);
    if (data === undefined) {
      alert('No se encuentran resultados con este codigo')
    } else {
      const idBrand = document.querySelector('.id');
      const nameBrand = document.querySelector('.name');
      idBrand.placeholder = `Id: ${data.id}`
      nameBrand.placeholder = `Nombre: ${data.name}`
      if (funcion === 'crearModal') {
        crearModal(data);
      } else if (funcion === 'delData') {
        delData(`${selectorOptions.value}/${data.id}`, `delete-${selectorOptions.value}`);
      }
    }
    e.stopImmediatePropagation();
    e.preventDefault();
  })
}


export function crearModal(data) {
  const divModal = document.querySelector('.modal-body')
  divModal.innerHTML = '';
  const form = document.createElement('form')
  form.classList.add('form-modal-body');
  Object.entries(data).forEach(function ([clave, valor]) {
    const div = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');

    div.classList.add('mb-3');
    label.classList.add('col-form-label');
    label.htmlFor = 'message-text';
    label.textContent = clave;
    input.type = 'text';
    input.classList.add('form-control');
    input.id = 'recipient-name';
    input.disabled = true;
    input.placeholder = valor;

    div.appendChild(label);
    div.appendChild(input);
    form.appendChild(div);

  });
  divModal.appendChild(form);

}



