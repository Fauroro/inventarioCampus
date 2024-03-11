import { getTasks } from "../api/apiFake.js";
import { buscarAssign } from "./components/assingOptions.js";


export class ReturnAssets extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML =  /*html*/ `
    
    <div class="card mt-3">
        <div class="card-header">Return assingment</div>
            <div class="card-body">
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search registered person's Id" aria-label="Search">
                    <button class="btn btn-outline-success submit" type="submit">Search</button>
                </form>
            </div>
        </div>
    </div>
    <div class="card mt-3 historial" >
        <div class="card-header">Assigned assets</div>
            <div class="card-body">
                <button id=1 type="button" class="btn btn-primary historyButton" data-bs-toggle="modal" data-bs-target="#exampleModal">Boton de prueba modal</button>
                No hay registro de asignacion para esta persona
            </div>
        </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">History</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
                <div class="col">
                    <label for="brand" class="form-label">History Id </label>
                    <input type="text" class="form-control brand" id="id" name="id" aria-describedby="" disabled>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="brand" class="form-label">Asset Id </label>
                    <input type="text" class="form-control brand" id="asset" name="asset" aria-describedby="" disabled>
            </div>
            <div class="row">
                <div class="col">
                    <label for="brand" class="form-label">Date </label>
                    <input type="text" class="form-control brand" id="date" name="date" aria-describedby="" disabled>
            </div>
            <div class="row">
                <div class="col">
                    <label for="brand" class="form-label">Person assigned</label>
                    <input type="text" class="form-control brand" id="person" name="person" aria-describedby="" disabled>
            </div>
            <div class="row">
                <div class="col">
                    <label for="brand" class="form-label">Status</label>
                    <input type="text" class="form-control brand" id="status" name="status" aria-describedby="" disabled>
            </div>
        </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
        `;
    const historyButton = document.querySelector('.historyButton')
    historyButton.addEventListener('click', async ()=>{
        debugger
        let data = await getTasks(`assetHistory/${historyButton.id}`)
        const frmRegistro = document.querySelectorAll('.form-control');
        const inputs = Array.from(frmRegistro);
        inputs.forEach(input => {
            const value = input.id;
            input.placeholder = data[value];
        })
    })
  }
}
customElements.define("return-assets", ReturnAssets)