import { getTasks } from '../api/apiFake.js'
import { postTasks } from '../api/apiFake.js'
import { editData, saveData, delData, buscar, crearModal } from './components/options.js';

export class AddAssetTypes extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML = /*html*/ `
    <add-brands></add-brands>
    `;
    const cardHeader = this.querySelector('.card-header');
    cardHeader.textContent = 'Registrar Nuevo Tipo de Activo';
    const formLabel = this.querySelector('.form-label');
    formLabel.textContent = 'Nombre del Tipo de Activo';
  }
}
customElements.define("add-asset-types", AddAssetTypes);


export class EditAssetTypes extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML = /*html*/`
    <edit-brands></edit-brands>
    `;
    const cardHeader = this.querySelector('.card-header');
    cardHeader.textContent = 'Editar Tipo de Activo';
    const formLabel = this.querySelector('.form-label');
    formLabel.textContent = 'Nombre del Tipo de Activo';
  }
}
customElements.define("edit-asset-types", EditAssetTypes);

export class DeleteAssetTypes extends HTMLElement {
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
customElements.define("delete-asset-types", DeleteAssetTypes);


export class SearchAssetTypes extends HTMLElement {
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
customElements.define("search-asset-types", SearchAssetTypes)