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
    <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Person Id" aria-label="Search">
        <button class="btn btn-outline-success submit" type="submit">Search</button>
    </form>
    <add-brand></add-brand>
    `;

    // const cardHeader = this.querySelector('.card-header')
    // cardHeader.textContent = 'Register new phone number'
    // const formLabel = this.querySelector('.form-label')
    // formLabel.textContent = 'Nombre del tipo de persona'
  }
}
customElements.define("add-person-phones", AddPersonPhones);


export class EditPersonTypes extends HTMLElement {
  constructor() {
    super();
    this.render();
    // this.editData();
  }
  render() {
    this.innerHTML = /*html*/`
    <edit-brands></edit-brands>
    `;
    const formLabel = this.querySelector('.form-label')
    formLabel.textContent = 'Nombre del tipo de persona'
    const cardHeader = this.querySelector('.card-header')
    cardHeader.textContent = 'Editar Tipo de Persona'
  }
}
customElements.define("edit-person-types", EditPersonTypes);

export class DeletePersonTypes extends HTMLElement {
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
customElements.define("delete-person-types", DeletePersonTypes);


export class SearchPersonTypes extends HTMLElement {
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
customElements.define("search-person-types", SearchPersonTypes)