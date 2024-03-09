import { getTasks } from '../api/apiFake.js'
import { postTasks } from '../api/apiFake.js'
import { editData, saveData, delData, buscar, crearModal } from './components/options.js';

export class AddStatus extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML = /*html*/ `
    <add-brands></add-brands>
    `;
    const cardHeader = this.querySelector('.card-header')
    cardHeader.textContent = 'Registrar Nuevo Status'
    const formLabel = this.querySelector('.form-label')
    formLabel.textContent = 'Nombre del Status'
  }
}
customElements.define("add-status", AddStatus);


export class EditStatus extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML = /*html*/`
    <edit-brands></edit-brands>
    `;
    const cardHeader = this.querySelector('.card-header')
    cardHeader.textContent = 'Editar Status'
    const formLabel = this.querySelector('.form-label')
    formLabel.textContent = 'Nombre del Status'
  }
}
customElements.define("edit-status", EditStatus);

export class DeleteStatus extends HTMLElement {
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
customElements.define("delete-status", DeleteStatus);


export class SearchStatus extends HTMLElement {
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
customElements.define("search-status", SearchStatus)