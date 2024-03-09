import { getTasks } from '../api/apiFake.js'
import { postTasks } from '../api/apiFake.js'
import { editData, saveData, delData, buscar, crearModal } from './components/options.js';

export class AddBrands extends HTMLElement {
  constructor() {
    super();
    this.render();
    // this.saveData();
  }
  render() {
    this.innerHTML = /*html*/ `
      <div class="card mt-3">
        <div class="card-header">Registrar Marcas Nuevas</div>
        <div class="card-body">
          <form id="frmDataTask" class="was-validated">
            <div class="row">
              <div class="col">
                <label for="brand" class="form-label">Nombre de la marca *</label>
                <input type="text" class="form-control brand" id="brand" name="name" aria-describedby="" required>
                <div class="invalid-feedback">* Campo requerido.</div>
              </div>
            </div>
            <div class="col">
              <div class="container mt-4 text-center">
                <button type="button" class="btn btn-primary" id="btnGuardar" data-bs-toggle="button" disabled>Guardar Registro</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `;

    const frmRegistro = document.querySelector('#frmDataTask');
    const btnGuardar = document.querySelector('#btnGuardar');

    const formInputs = frmRegistro.querySelectorAll('input');

    formInputs.forEach(input => {
      input.addEventListener('input', () => {
        const llenos = Array.from(formInputs).every(input => input.value.trim() !== '');
        btnGuardar.disabled = !llenos
      });
    });
  }

}
customElements.define("add-brands", AddBrands);


export class EditBrands extends HTMLElement {
  constructor() {
    super();
    this.render();
    // this.editData();
  }

  render() {
    this.innerHTML = /*html*/`
    <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success submit" type="submit">Search</button>
      </form>
    <add-brands></add-brands>
    `;
    const cardHeader = this.querySelector('.card-header')
    cardHeader.textContent = 'Editar Marcas'
    const sumbit = this.getElementsByClassName('submit');
    let selectorOptions = document.querySelector(".form-select")
    sumbit[0].addEventListener('click', async (e) => {
      const id = this.querySelector('.me-2').value;
      let data = await getTasks(`${selectorOptions.value}/${id}`);
      if (data === undefined) {
        alert('No se encuentra ninguna marca con este codigo')
      } else {
        const text = this.getElementsByClassName('brand');
        text[0].value = `${data.name}`;
        editData(`${selectorOptions.value}/${id}`, `edit-${selectorOptions.value}`);
      }
      e.stopImmediatePropagation();
      e.preventDefault();
    })
  }

}
customElements.define("edit-brands", EditBrands);

export class DeleteBrands extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML =  /*html*/`
    <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search Delete" aria-label="Search">
        <button class="btn btn-outline-success submit" type="submit">Search</button>
      </form>
    <div class="card mt-3">
      <div class="card-body">
        <div class="input-group mb-3">
          <input type="text" class="form-control id" placeholder="Id:" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
          <input type="text" class="form-control name" placeholder="Nombre:" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
          <button class="btn btn-outline-danger" type="button" id="button-addon2"><i class='bx bxs-trash'></i></button>
        </div>
      </div>
    </div>
    `;
    buscar('delData');
  }
}
customElements.define("delete-brands", DeleteBrands);

export class SearchBrands extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML =  /*html*/`
    <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success submit" type="submit">Search</button>
    </form>
    <div class="card mt-3">
      <div class="card-body">
        <div class="input-group mb-3">
          <input type="text" class="form-control id" placeholder="Id:" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
          <input type="text" class="form-control name" placeholder="Nombre:" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        </div>
      </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Description</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `;
    buscar('crearModal');
  }
}
customElements.define("search-brands", SearchBrands)