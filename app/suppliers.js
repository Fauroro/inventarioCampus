import {getTasks} from '../api/apiFake.js'
import {postTasks} from '../api/apiFake.js'

export class AddSuppliers extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.saveData();
  }
  render() {
    this.innerHTML = /*html*/ `
      <div class="card mt-3">
        <div class="card-header">Registrar Nuevos Proveedores</div>
        <div class="card-body">
          <form id="frmDataTask" class="was-validated">
            <div class="row">
              <div class="col">
                <label for="brand" class="form-label">Nombre del proveedor *</label>
                <input type="text" class="form-control" id="brand" name="name" aria-describedby="" required>
                <div class="invalid-feedback">* Campo requerido.</div>
                </div>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email del proveedor</label>
              <input type="email" class="form-control" id="email" placeholder="name@example.com" name="email" required>
              <div class="invalid-feedback">* Campo requerido.</div>
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

    formInputs.forEach(input =>{
      input.addEventListener('input', () =>{
        const llenos = Array.from(formInputs).every(input =>input.value.trim()!=='');
        btnGuardar.disabled = !llenos
      });
    });
  }
  
}
customElements.define("add-suppliers",AddSuppliers);


