import { getTasks } from '../api/apiFake.js'
import { postTasks } from '../api/apiFake.js'
import { editData, saveData, delData, buscar, crearModal } from './components/options.js';

export class AddPersonTypes extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML = /*html*/ `
    <add-brands></add-brands>
    `;
    const cardHeader = this.querySelector('.card-header')
    cardHeader.textContent = 'Registrar Nuevo tipo de persona'
    const formLabel = this.querySelector('.form-label')
    formLabel.textContent = 'Nombre del tipo de persona'
  }
}
customElements.define("add-person-types", AddPersonTypes);


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