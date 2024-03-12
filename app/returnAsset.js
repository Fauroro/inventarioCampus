import { getTasks } from "../api/apiFake.js";
import { AssingAssets } from "./assignAssets.js";
import { buscarAssign, buscarAssignModal } from "./components/assingOptions.js";
AssingAssets

export class ReturnAssets extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    // <div class="card mt-3 historial" >
    //     <div class="card-header">Assigned assets</div>
    //         <div class="card-body">
    //             <button id=1 type="button" class="btn btn-primary historyButton" data-bs-toggle="modal" data-bs-target="#exampleModal">Boton de prueba modal</button>
    //             No hay registro de asignacion para esta persona
    //         </div>
    //     </div>
    // </div>
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
    
    

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">History</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            
          </div>
          <div class="modal-footer">
          <button type="button" id="retornar" class="btn btn-outline-success" data-bs-dismiss="modal">Return Asset</button>
          <button type="button" id="garantia" class="btn btn-outline-warning" data-bs-dismiss="modal">Enviar a Garantia</button>
          <button type="button" id="baja" class="btn btn-outline-danger" data-bs-dismiss="modal">Dar de baja</button>
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
          
            </div>
        </div>
      </div>
    </div>
        `;
    buscarAssignModal();
    const sumbit = document.getElementsByClassName('submit');
    sumbit[0].addEventListener('click', async (e) => {
      debugger
      const historyButton = document.querySelectorAll('.historyButton');
      const modalBody = content.querySelector(".modal-body");
      console.log(historyButton);
      historyButton.forEach(button => {
        button.addEventListener('click', handleClick);
      });

      async function handleClick(event) {

        const clickedButton = event.target;

        const buttonId = clickedButton.id;
        const buttonText = clickedButton.textContent;
        let dataAsset = await getTasks(`assets/${buttonId}`);
        const dataBrand = await getTasks(`assets/${buttonId}?_embed=brand`);
        const dataCategory = await getTasks(`assets/${buttonId}?_embed=category`);
        const dataType = await getTasks(`assets/${buttonId}?_embed=asset-type`);
        const dataSupplier = await getTasks(`assets/${buttonId}?_embed=supplier`);
        modalBody.innerHTML = /* html */`
        <div class="row">
        <div class="col">
          <label for="brand" class="form-label">Asset Id </label>
          <input placeholder="${dataAsset.id}" type="text" class="form-control id" name="id" aria-describedby=""
            disabled>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="brand" class="form-label">Asset Id </label>
          <input placeholder="${dataAsset.name}" type="text" class="form-control id" name="id" aria-describedby=""
            disabled>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="brand" class="form-label">Brand </label>
          <input placeholder="${dataBrand.brand.name}" type="text" class="form-control id" name="id" aria-describedby=""
            disabled>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="brand" class="form-label">Category </label>
          <input placeholder="${dataCategory.category.name}" type="text" class="form-control id" name="id"
            aria-describedby="" disabled>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="brand" class="form-label">Asset Type </label>
          <input placeholder="${dataType['asset-type'].name}" type="text" class="form-control id" name="id"
            aria-describedby="" disabled>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="brand" class="form-label">Supplier</label>
          <input placeholder="${dataSupplier.supplier.name}" type="text" class="form-control id" name="id"
            aria-describedby="" disabled>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="brand" class="form-label">Unit Value </label>
          <input placeholder="${dataAsset.unitValue} $" type="text" class="form-control id" name="id"
            aria-describedby="" disabled>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label for="brand" class="form-label">Serial number </label>
          <input placeholder="${dataAsset.serial}" type="text" class="form-control id" name="id" aria-describedby=""
            disabled>
        </div>
      </div>

        `;
      }
      const retornar = document.getElementById('retornar');
      retornar.addEventListener('click', async (e) => {
        alert("holi")
      });
      const garantia = document.getElementById('garantia');
      retornar.addEventListener('click', async (e) => {
        alert("holi")
      });
      const baja = document.getElementById('baja');
      retornar.addEventListener('click', async (e) => {
        alert("holi")
      });
    });
  }
}
customElements.define("return-assets", ReturnAssets)