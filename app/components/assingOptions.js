import { postTasks, putTasks, delTasks, getTasks } from './../../api/apiFake.js'
export function saveDataAssign(ruta, contenido, personaId, assignmentId) {
  const frmRegistro = document.querySelector('#frmDataTask');
  document.querySelector('#btnGuardar').addEventListener("click", async (e) => {
    const datos = Object.fromEntries(new FormData(frmRegistro).entries());
    const selectElements = frmRegistro.querySelectorAll('select');
    let dataAsset;
    dataAsset = await getTasks(`assets/${datos.assetId}`);
    if (dataAsset == undefined) {
      alert("No existe este activo")
      return
    }
    const statusEmbed = await getTasks(`assets/${datos.assetId}?_embed=statu`);
    if (dataAsset.statuId !== "0") {
      const nameStatus = statusEmbed.statu.name;
      alert(`Activo se encuentra en estado: ${nameStatus}, no es posible asignarlo`)
      return
    } else {
      dataAsset.statuId = '1';
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
    const nuevoId = await postTasks(datos, ruta);
    putTasks(dataAsset, `assets/${datos.assetId}`);
    alert(`Datos guardados correctamente.\n ID generado: ` + nuevoId);
    e.stopImmediatePropagation();
    e.preventDefault();
    let datosHistory = {};
    datosHistory['id'] = nuevoId;
    datosHistory['assetId'] = datos.assetId;
    datosHistory['dateMov'] = datos.dateMov;
    datosHistory['personaId'] = personaId;
    datosHistory['statuId'] = dataAsset.statuId
    console.log(datosHistory);
    let history = {};
    history[`${datos.assetId}`] = datosHistory;
    console.log(history);
    const nuevoId2 = await postTasks(history, `assetHistory`);
    e.stopImmediatePropagation();
    e.preventDefault();
    alert(`Historial de movimiento guardado con ID generado: ` + nuevoId2);
    mainContent.innerHTML = `<${contenido}></${contenido}>`;
  })
}

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
        const assignmentId = dataAssign.find(item => item.personaId === idValue).id;

        assetId.addEventListener('input', () => {
          if (assetId !== "") {
            btnGuardar.disabled = false;
          }
        })

        const contentExist = document.querySelector('.existente')
        contentExist.innerHTML = /* html */`
          <div class="card-header">Assignments</div>
          `
        const dataMovDetails = await getTasks(`mov-details`)
        let idAssign = dataAssign.filter(objeto => objeto.personaId === idValue).map(objeto => objeto.id)
        console.log(idAssign);
        for (const valor of idAssign) {
          let dataMov = dataMovDetails.filter(objeto => objeto.assignmentId === valor)
          console.log(dataMov);
          for (const [clave, valor] of Object.entries(dataMov)) {
            contentExist.innerHTML += /* html */`
                <div class="card mt-3">
                  <div class="card-body">
                    <div class="input-group mb-3">
                      <input type="text" class="form-control id" id="id${clave}" placeholder="Id:" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
                      <input type="text" class="form-control name" id="name${clave}" placeholder="Nombre:" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
                      <input type="text" class="form-control dateMov" id="dateMov${clave}" placeholder="Fecha Asignacion:" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
                      <button class="btn btn-outline-danger" type="button" id="button-addon2" style="display:none"><i class='bx bxs-trash'></i></button>
                    </div>
                  </div>
                </div>
        `;
            let id = document.getElementById(`id${clave}`);
            let name = document.getElementById(`name${clave}`);
            let fechaMov = document.getElementById(`dateMov${clave}`);            
            let dataAsset = await getTasks(`assets/${valor.assetId}`);
            fechaMov.placeholder = `Fecha Asignacion: ${valor.dateMov}`;
            id.placeholder = `Id: ${valor.assetId}`;
            name.placeholder = `Name: ${dataAsset.name}`;
          }


        }
        saveDataAssign(`mov-details`, `assing-assets`, idValue, assignmentId)
      }
    }
    e.stopImmediatePropagation();
    e.preventDefault();
  })
}

export function buscarAssignModal() {
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
        const assignmentId = dataAssign.find(item => item.personaId === idValue).id;
        const contentExist = document.querySelector('.existente')
        contentExist.innerHTML = /* html */`
          <div class="card-header">Assignments</div>
          `
        const dataMovDetails = await getTasks(`mov-details`)
        let idAssign = dataAssign.filter(objeto => objeto.personaId === idValue).map(objeto => objeto.id)
        console.log(idAssign);
        for (const valor of idAssign) {
          let dataMov = dataMovDetails.filter(objeto => objeto.assignmentId === valor)
          console.log(dataMov);
          for (const [clave, valor] of Object.entries(dataMov)) {
            contentExist.innerHTML += /* html */`
                <div class="card mt-3">
                  <div class="card-body">
                    <div class="input-group mb-3">
                      <input type="text" class="form-control id" id="id${clave}" placeholder="Id:" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
                      <input type="text" class="form-control name" id="name${clave}" placeholder="Nombre:" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
                      <input type="text" class="form-control dateMov" id="dateMov${clave}" placeholder="Fecha Asignacion:" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
                    <button id="${valor.assetId}" type="button" class="btn btn-primary historyButton" data-bs-toggle="modal" data-bs-target="#exampleModal">Boton de prueba modal</button>
                    </div>
                  </div>
                </div>
        `;
            let id = document.getElementById(`id${clave}`);
            let name = document.getElementById(`name${clave}`);
            let fechaMov = document.getElementById(`dateMov${clave}`);            
            let dataAsset = await getTasks(`assets/${valor.assetId}`);
            fechaMov.placeholder = `Fecha Asignacion: ${valor.dateMov}`;
            id.placeholder = `Id: ${valor.assetId}`;
            name.placeholder = `Name: ${dataAsset.name}`;
          }
        }
      }
    }
    e.stopImmediatePropagation();
    e.preventDefault();
  })
}
