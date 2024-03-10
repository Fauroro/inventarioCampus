import { postTasks, putTasks, delTasks, getTasks } from './../../api/apiFake.js'

export function saveData(ruta, contenido) {
  const frmRegistro = document.querySelector('#frmDataTask');

  document.querySelector('#btnGuardar').addEventListener("click", async (e) => {
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    if (frmRegistro[0].name === "personId") {
      let data = await getTasks(`persons/${frmRegistro[0].value}`);
      if (data == undefined) {
        alert("This Id doesn't match a registered person")
        return
      }
    }
    const selectElements = frmRegistro.querySelectorAll('select');
    if (selectElements) {
      selectElements.forEach(select => {
        datos[select.name] = select.value;
      });
    }
    postTasks(datos, ruta);
    e.stopImmediatePropagation();
    e.preventDefault();
    alert("Datos guardados correctamente")
    mainContent.innerHTML = `<${contenido}></${contenido}>`;
  })
}

// const checkPersonId = async (id) => {
//   let data = await getTasks(`persons/${id}`);
//   return data
// }

export function editData(ruta, contenido) {
  const frmRegistro = document.querySelector('#frmDataTask');
  document.querySelector('#btnGuardar').addEventListener("click", (e) => {
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    const selectElements = frmRegistro.querySelectorAll('select');
    if (selectElements) {
      selectElements.forEach(select => {
        datos[select.name] = select.value;
      });
    }
    const disabledInput = frmRegistro.querySelectorAll('input[disabled]');
    if (disabledInput) {
      disabledInput.forEach(disabled => {
        datos[disabled.name] = disabled.value
      })
    }
    putTasks(datos, ruta);
    e.stopImmediatePropagation();
    e.preventDefault();
    alert("Datos modificados correctamente")
    mainContent.innerHTML = `<${contenido}></${contenido}>`;
  })
}


export function delData(ruta, contenido) {
  document.querySelector('#button-addon2').addEventListener("click", (e) => {
    delTasks(ruta);
    e.stopImmediatePropagation();
    e.preventDefault();
    alert("Datos eliminados correctamente")
    mainContent.innerHTML = `<${contenido}></${contenido}>`;
  })
}


export function buscar(funcion, withStatus = false) {
  const sumbit = document.getElementsByClassName('submit');
  let selectorOptions = document.querySelector(".form-select");
  sumbit[0].addEventListener('click', async (e) => {
    const idValue = document.querySelector('.me-2').value;
    let data = await getTasks(`${selectorOptions.value}/${idValue}`);
    if (data === undefined) {
      alert('No se encuentran resultados con este codigo');
    } else {
      const id = document.querySelector('.id');
      const name = document.querySelector('.name');
      id.placeholder = `Id: ${data.id}`
      name.placeholder = `Nombre: ${data.name}`
      const status = document.querySelector('.status');
      if (withStatus) {
        let dataEmbed = await getTasks(`${selectorOptions.value}/${idValue}?_embed=statu`);
        status.placeholder = `Status: ${dataEmbed.statu.name}`
      } if (selectorOptions.value === 'person-phones') {
        name.placeholder = `phoneNumber: ${data.phoneNumber}`
      }
      if (funcion === 'crearModal') {
        crearModal(data);
      } else if (funcion === 'delData') {
        if (withStatus) {
          if (data.statuId === '2') {
            delData(`${selectorOptions.value}/${data.id}`, `delete-${selectorOptions.value}`);
          } else {
            alert('No es posible eliminar porque no se ha dado de baja')
          }
        } else {
          delData(`${selectorOptions.value}/${data.id}`, `delete-${selectorOptions.value}`);
        }
      }
    }
    e.stopImmediatePropagation();
    e.preventDefault();
  })
}


export async function crearModal(data) {
  const divModal = document.querySelector('.modal-body')
  divModal.innerHTML = '';
  const form = document.createElement('form')
  form.classList.add('form-modal-body');
  let dataEmbed = [];
  const id = document.querySelector('.me-2').value;

  for (const [clave, valor] of Object.entries(data)) {
    const div = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const selectorOptions = document.querySelector(".form-select");

    div.classList.add('mb-3');
    label.classList.add('col-form-label');
    label.htmlFor = 'message-text';
    label.textContent = clave;
    input.type = 'text';
    input.classList.add('form-control');
    input.id = 'recipient-name';
    input.disabled = true;
    input.placeholder = valor;
    if (clave.endsWith('Id') && clave !== 'Id') {
      if (selectorOptions.value === 'person-phones') {
        const response = await getTasks(`persons/${data.personId}`);
        dataEmbed[clave] = response;
        input.placeholder = dataEmbed[clave].id;
      } else {
        // debugger
        const response = await getTasks(`${selectorOptions.value}/${id}?_embed=${clave.slice(0, -2)}`);
        dataEmbed[clave] = response;
        input.placeholder = dataEmbed[clave][clave.slice(0, -2)].name;
      }
    } else {
      input.placeholder = valor;
    }
    div.appendChild(label);
    div.appendChild(input);
    form.appendChild(div);

  };
  divModal.appendChild(form);

}

export async function crearOpciones(endpoint, selector) {
  let select = document.querySelector(selector);
  const optionBrand = await getTasks(endpoint);
  optionBrand.forEach(opcion => {
    const newOption = document.createElement('option');
    newOption.value = opcion.id;
    newOption.text = opcion.name;
    select.appendChild(newOption);
  });
}

