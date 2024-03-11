import { buscarAssign } from "./components/assingOptions.js";


export class AssingAssets extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML =  /*html*/ `
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search registered person's Id" aria-label="Search">
        <button class="btn btn-outline-success submit" type="submit">Search</button>
      </form>
      <div class="card mt-3 formulario" style="display:none">

    </div>
      <div class="card mt-3 existente">
        <div class="card-header">Assignments</div>
        <div class="card-body existAssign">No se tienen asignaciones previas</div>
      </div>
        `;
        
        buscarAssign();


  }
}
customElements.define("assing-assets", AssingAssets)