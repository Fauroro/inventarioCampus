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
        <div class="card mt-3">
        <div class="card-header">New assignment</div>
        <div class="card-body">
          <form id="frmDataTask" class="was-validated">
            <div class="row">
              <div class="col">
                <label for="brand" class="form-label">Responsible's Id number</label>
                <input type="text" placeholder="Introduce a registered person's Id" class="form-control brand" id="brand" name="personaId" aria-describedby="" required>
                <div class="invalid-feedback">* Required field.</div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="brand" class="form-label">Date</label>
                <input type="text" disabled placeholder="Introduce a registered person's Id" class="form-control brand date" id="brand" name="date" aria-describedby="" >
                <div class="invalid-feedback">* Required field.</div>
              </div>
            </div>
            <div class="col">
              <div class="container mt-4 text-center">
                <button type="button" class="btn btn-primary" id="btnGuardar" data-bs-toggle="button">Create assignment</button>
              </div>
            </div>
          </form>
        </div>
      </div>
        `;

    buscarAssign();

    let inputDate = this.querySelector(".date");
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
  }
}
customElements.define("assing-assets", AssingAssets)