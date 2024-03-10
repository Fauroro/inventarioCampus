import { getTasks } from '../api/apiFake.js'
import { postTasks } from '../api/apiFake.js'
import { editData, saveData, delData, buscar, crearModal } from './components/options.js';

export class AddPersonPhones extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML = /*html*/ `
      <div class="card mt-3">
          <div class="card-header">Register phone number</div>
          <div class="card-body">
              <form id="frmDataTask" class="was-validated">
                  <div class="row">
                      <div class="col">
                          <label for="brand" class="form-label">Person's Id number </label>
                          <input type="text" class="form-control brand" id="brand" name="personId" aria-describedby="" required>
                          <div class="invalid-feedback">* Requiered field.</div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col">
                          <label for="brand" class="form-label">Phone number </label>
                          <input type="text" class="form-control brand" id="brand" name="phoneNumber" aria-describedby="" required>
                          <div class="invalid-feedback">* Requiered field.</div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col">
                          <label for="brand" class="form-label">Location </label>
                          <input type="text" class="form-control brand" id="brand" name="location" aria-describedby="" required>
                          <div class="invalid-feedback">* Requiered field.</div>
                      </div>
                  <div class="row">
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
customElements.define("add-person-phones", AddPersonPhones);


export class EditPersonPhones extends HTMLElement {
  constructor() {
    super();
    this.render();
    // this.editData();
  }
  render() {
    this.innerHTML = /*html*/`
      <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Id number" aria-label="Search">
          <button class="btn btn-outline-success submit" type="submit">Search</button>
      </form>
      <div class="card mt-3">
          <div class="card-header">Register Person</div>
          <div class="card-body">
              <form id="frmDataTask" class="was-validated">
                  <div class="row">
                      <div class="col">
                          <label for="brand" class="form-label">Person's Phone Id </label>
                          <input type="text" class="form-control brand" id="brand" name="id" aria-describedby="" required>
                          <div class="invalid-feedback">* Requiered field.</div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col">
                          <label for="brand" class="form-label">Person Id </label>
                          <input type="text" class="form-control brand" id="brand" disabled name="personId" aria-describedby="" required>
                          <div class="invalid-feedback">* Requiered field.</div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col">
                          <label for="brand" class="form-label">Phone number </label>
                          <input type="text" class="form-control brand" id="brand" name="phoneNumber" aria-describedby="" required>
                          <div class="invalid-feedback">* Requiered field.</div>
                      </div>
                  <div class="row">
                  <div class="row">
                      <div class="col">
                          <label for="brand" class="form-label">Location </label>
                          <input type="text" class="form-control brand" id="brand" name="location" aria-describedby="" required>
                          <div class="invalid-feedback">* Requiered field.</div>
                      </div>
                  <div class="row">
                  <div class="col">
                      <div class="container mt-4 text-center">
                      <button type="button" class="btn btn-primary" id="btnGuardar" data-bs-toggle="button" disabled>Guardar Registro</button>
                  </div>
                  </div>
              </form>
          </div>
    </div>
    `;
    const cardHeader = this.querySelector('.card-header')
    cardHeader.textContent = 'Edit Person'
    const sumbit = this.getElementsByClassName('submit');
    let selectorOptions = document.querySelector(".form-select")
    sumbit[0].addEventListener('click', async (e) => {
      const id = this.querySelector('.me-2').value;
      let data = await getTasks(`${selectorOptions.value}/${id}`);
      if (data === undefined) {
        alert('There is no coincidence with this id')
      } else {
        const text = this.getElementsByClassName('brand');
        text[0].value = `${data.id}`;
        text[0].disabled = true;
        text[1].value = `${data.personId}`;
        text[2].value = `${data.phoneNumber}`;
        text[3].value = `${data.location}`;
        btnGuardar.removeAttribute("disabled");
        editData(`${selectorOptions.value}/${id}`, `edit-${selectorOptions.value}`);
      }
      e.stopImmediatePropagation();
      e.preventDefault();
    })
  }
}
customElements.define("edit-person-phones", EditPersonPhones);

export class DeletePersonPhones extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML =  /*html*/`
    <delete-brands></delete-brands>
    `;
  }
}
customElements.define("delete-person-phones", DeletePersonPhones);


export class SearchPersonPhones extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML =  /*html*/`
    <search-brands></search-brands>
    `;
  }
}
customElements.define("search-person-phones", SearchPersonPhones)