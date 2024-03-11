import { postTasks, putTasks, delTasks, getTasks } from './../../api/apiFake.js'

export function saveDataAssign(ruta, contenido, assignmentId) {
  const frmRegistro = document.querySelector('#frmDataTask');
  document.querySelector('#btnGuardar').addEventListener("click", async (e) => {
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    const selectElements = frmRegistro.querySelectorAll('select');
    // let assetId = document.querySelector("#assetId").value;
    let dataAsset; 
    dataAsset = await getTasks(`assets/${datos.assetId}`);
    debugger
    if (dataAsset == undefined) {
      alert("No existe este activo")
      return
    }
    if (dataAsset.statuId !== "0") {
      const statusEmbed = await getTasks(`assets/${datos.assetId}?_embed=statu`);
      const nameStatus = statusEmbed.statu.name;
      alert(`Activo se encuentra en estado: ${nameStatus}, no es posible asignarlo`)
      return
    }
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
    datos['assignmentId'] = assignmentId;
    postTasks(datos, ruta);
    e.stopImmediatePropagation();
    e.preventDefault();
    alert("Datos guardados correctamente")
    mainContent.innerHTML = `<${contenido}></${contenido}>`;
  })
}

// const checkPersonaId = async (id) => {
//   let data = await getTasks(`personas/${id}`);
//   return data
// }

// export function editData(ruta, contenido) {
//   const frmRegistro = document.querySelector('#frmDataTask');
//   document.querySelector('#btnGuardar').addEventListener("click", (e) => {
//     const datos = Object.fromEntries(new FormData(frmRegistro).entries());
//     const selectElements = frmRegistro.querySelectorAll('select');
//     if (selectElements) {
//       selectElements.forEach(select => {
//         datos[select.name] = select.value;
//       });
//     }
//     const disabledInput = frmRegistro.querySelectorAll('input[disabled]');
//     if (disabledInput) {
//       disabledInput.forEach(disabled => {
//         datos[disabled.name] = disabled.value
//       })
//     }
//     putTasks(datos, ruta);
//     e.stopImmediatePropagation();
//     e.preventDefault();
//     alert("Datos modificados correctamente")
//     mainContent.innerHTML = `<${contenido}></${contenido}>`;
//   })
// }


// export function delData(ruta, contenido) {
//   document.querySelector('#button-addon2').addEventListener("click", (e) => {
//     delTasks(ruta);
//     e.stopImmediatePropagation();
//     e.preventDefault();
//     alert("Datos eliminados correctamente")
//     mainContent.innerHTML = `<${contenido}></${contenido}>`;
//   })
// }


export function buscarAssign() {
  const sumbit = document.getElementsByClassName('submit');
  sumbit[0].addEventListener('click', async (e) => {
    const idValue = document.querySelector('.me-2').value;
    const data = await getTasks(`personas/${idValue}`);
    const dataAssign = await getTasks(`assignments`);
    const dataMov = await getTasks(`mov-details`);
    if (data == undefined) {
      alert("This Id doesn't match a registered person")
      return
    }
    let condition;
    if (condition = dataAssign.some(item => item.personaId === idValue)) {
      if (condition = dataMov.some(item => item.personaId === idValue)) {
        alert('No hay asignaciones libres para la persona')
      } else {
        const content = document.querySelector('.formulario')
        content.innerHTML = /* html */`
        <div class="card-header">New assignment</div>
        <div class="card-body">
          <form id="frmDataTask" class="was-validated">
            <div class="row">
              <div class="col">
                <label for="brand" class="form-label">Date</label>
                <input type="text" disabled placeholder="Introduce a registered person's Id"
                  class="form-control brand date" id="brand" name="dateMov" aria-describedby="">
                <div class="invalid-feedback">* Required field.</div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="brand" class="form-label">Asset Id</label>
                <input type="text" required placeholder="Introduce a Asset Id"
                  class="form-control brand date" id="assetId" name="assetId" aria-describedby="">
                <div class="invalid-feedback">* Required field.</div>
              </div>
            </div>
            <div class="row" style="height: 15px"></div>
            <div class="row">
              <div class="col">
                <div class="form-floating">
                  <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2"
                    style="height: 100px" name="comment"></textarea>
                  <label for="floatingTextarea2">Comments</label>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="container mt-4 text-center">
                <button type="button" class="btn btn-primary" id="btnGuardar" data-bs-toggle="button" disabled>Create
                  assignment</button>
              </div>
            </div>
          </form>
        </div>
        `;
        let inputDate = document.querySelector(".date");
        let assetId = document.querySelector("#assetId");
        let btnGuardar = document.querySelector("#btnGuardar");
        const date = new Date();
        const agregarCero = (valor) => (valor < 10 ? '0' + valor : valor);

        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        const año = date.getFullYear();
        const hora = agregarCero(date.getHours());
        const minutos = agregarCero(date.getMinutes());
        const segundos = agregarCero(date.getSeconds());

        const currentDate = `${dia}/${mes}/${año} ${hora}:${minutos}:${segundos}`;

        inputDate.value = currentDate;
        content.style.display = 'block';

        assetId.addEventListener('input', () => {
          if (assetId !== "") {
            btnGuardar.disabled = false;
          }
        })
        saveDataAssign(`mov-details`, `assing-assets`, idValue)
      }
    }
    // }
    // let data = await getTasks(`${selectorOptions.value}/${idValue}`);
    // if (data === undefined) {
    //   alert('No se encuentran resultados con este codigo');
    // } else {
    //   const id = document.querySelector('.id');
    //   const name = document.querySelector('.name');
    //   id.placeholder = `Id: ${data.id}`
    //   name.placeholder = `Nombre: ${data.name}`
    //   const status = document.querySelector('.status');
    //   if (withStatus) {
    //     let dataEmbed = await getTasks(`${selectorOptions.value}/${idValue}?_embed=statu`);
    //     status.placeholder = `Status: ${dataEmbed.statu.name}`
    //   } if (selectorOptions.value === 'person-phones') {
    //     name.placeholder = `phoneNumber: ${data.phoneNumber}`
    //   }
    //   if (funcion === 'crearModal') {
    //     crearModal(data);
    //   } else if (funcion === 'delData') {
    //     if (withStatus) {
    //       if (data.statuId === '2') {
    //         delData(`${selectorOptions.value}/${data.id}`, `delete-${selectorOptions.value}`);
    //       } else {
    //         alert('No es posible eliminar porque no se ha dado de baja')
    //       }
    //     } else {
    //       delData(`${selectorOptions.value}/${data.id}`, `delete-${selectorOptions.value}`);
    //     }
    //   }
    e.stopImmediatePropagation();
    e.preventDefault();
  })
}



// export async function crearModal(data) {
//   const divModal = document.querySelector('.modal-body')
//   divModal.innerHTML = '';
//   const form = document.createElement('form')
//   form.classList.add('form-modal-body');
//   let dataEmbed = [];
//   const id = document.querySelector('.me-2').value;

//   for (const [clave, valor] of Object.entries(data)) {
//     const div = document.createElement('div');
//     const label = document.createElement('label');
//     const input = document.createElement('input');
//     const selectorOptions = document.querySelector(".form-select");

//     div.classList.add('mb-3');
//     label.classList.add('col-form-label');
//     label.htmlFor = 'message-text';
//     label.textContent = clave;
//     input.type = 'text';
//     input.classList.add('form-control');
//     input.id = 'recipient-name';
//     input.disabled = true;
//     input.placeholder = valor;
//     if (clave.endsWith('Id') && clave !== 'Id') {
//       if (selectorOptions.value === 'person-phones') {
//         const response = await getTasks(`personas/${data.personaId}`);
//         dataEmbed[clave] = response;
//         input.placeholder = dataEmbed[clave].id;
//       } else {
//         // debugger
//         const response = await getTasks(`${selectorOptions.value}/${id}?_embed=${clave.slice(0, -2)}`);
//         dataEmbed[clave] = response;
//         input.placeholder = dataEmbed[clave][clave.slice(0, -2)].name;
//       }
//     } else {
//       input.placeholder = valor;
//     }
//     div.appendChild(label);
//     div.appendChild(input);
//     form.appendChild(div);

//   };
//   divModal.appendChild(form);

// }

// export async function crearOpciones(endpoint, selector) {
//   let select = document.querySelector(selector);
//   const optionBrand = await getTasks(endpoint);
//   optionBrand.forEach(opcion => {
//     const newOption = document.createElement('option');
//     newOption.value = opcion.id;
//     newOption.text = opcion.name;
//     select.appendChild(newOption);
//   });
// }

