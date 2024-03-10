import { getTasks } from '../api/apiFake.js'
import { postTasks } from '../api/apiFake.js'
import { editData, saveData, delData, buscar, crearModal } from './components/options.js';
import { crearOpciones } from './components/options.js';

export class AddAssets extends HTMLElement {
	constructor() {
		super();
		this.render();
	}
	render() {
		this.innerHTML = /*html*/ `
      <div class="card mt-3">
        <div class="card-header">Registrar Nuevo Activo</div>
        <div class="card-body">
          <form id="frmDataTask" class="was-validated">
						<div class="row mb-3">
							<label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Nombre del activo: </label>
							<div class="col-sm-10">
								<input type="text" class="form-control form-control-sm name" id="colFormLabelSm" name="name" required>
							</div>
						</div>
						<div class="row mb-3">
							<label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Codigo Transacción: </label>
							<div class="col-sm-10">
								<input type="text" class="form-control form-control-sm codTransaccion" id="colFormLabelSm" name="codTransaccion" required>
							</div>
						</div>
						<div class="row mb-3">
							<label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Numero de Formulario: </label>
							<div class="col-sm-10">
								<input type="text" class="form-control form-control-sm formNumber" id="colFormLabelSm" name="formNumber" required>
							</div>
						</div>
						<div class="row mb-3">
                <label for="brand" class="col-sm-2 col-form-label col-form-label-sm">Nombre de la marca:</label>
				        <div class="col-sm-10">
                  <select class="form-select is-invalid form-select-sm brand" id="validationServer04" aria-describedby="validationServer04Feedback" required name="brandId">
                    <option selected disabled value="">Choose...</option>
                  </select>
							    <div class="invalid-feedback">* Campo requerido.</div>
                </div>
              </div>
            <div class="col">
						<div class="row mb-3">
                <label for="brand" class="col-sm-2 col-form-label col-form-label-sm">Nombre de la Categoria:</label>
				        <div class="col-sm-10">
                  <select class="form-select is-invalid form-select-sm category" id="validationServer04" aria-describedby="validationServer04Feedback" required name="categoryId">
                    <option selected disabled value="">Choose...</option>
                  </select>
							    <div class="invalid-feedback">* Campo requerido.</div>
                </div>
              </div>
						<div class="row mb-3">
                <label for="brand" class="col-sm-2 col-form-label col-form-label-sm">Tipo de Activo:</label>
				        <div class="col-sm-10">
                  <select class="form-select is-invalid form-select-sm assetType" id="validationServer04" aria-describedby="validationServer04Feedback" required name="asset-typeId">
                    <option selected disabled value="">Choose...</option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
							<label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Valor Unitario: </label>
							<div class="col-sm-10">
              <input type="text" class="form-control form-control-sm unitValue" id="colFormLabelSm" name="unitValue" required>
							</div>
              </div>
              <div class="row mb-3">
                  <label for="brand" class="col-sm-2 col-form-label col-form-label-sm">Nombre del Proveedor:</label>
                  <div class="col-sm-10">
                    <select class="form-select is-invalid form-select-sm supplier" id="validationServer04" aria-describedby="validationServer04Feedback" required name="supplierId">
                      <option selected disabled value="">Choose...</option>
                    </select>
                    <div class="invalid-feedback">* Campo requerido.</div>
                  </div>
                </div>
              <div class="row mb-3">
							<label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Serial: </label>
							<div class="col-sm-10">
              <input type="text" class="form-control form-control-sm serial" id="colFormLabelSm" name="serial" required>
							</div>
              </div>
              <div class="row mb-3">
              <label for="brand" class="col-sm-2 col-form-label col-form-label-sm">Empresa responsable:</label>
              <div class="col-sm-10">
                <select class="form-select is-invalid form-select-sm accountable" id="validationServer04" aria-describedby="validationServer04Feedback" required name="accountableId">
                  <option selected disabled value="">Choose...</option>
                </select>
                <div class="invalid-feedback">* Campo requerido.</div>
              </div>
            </div>
              <div class="row mb-3">
              <label for="brand" class="col-sm-2 col-form-label col-form-label-sm">Estatus del activo:</label>
              <div class="col-sm-10">
                <select class="form-select is-invalid form-select-sm status" id="validationServer04" aria-describedby="validationServer04Feedback" required name="statuId">
                  <option selected disabled value="">Choose...</option>
                </select>
                <div class="invalid-feedback">* Campo requerido.</div>
              </div>
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
		crearOpciones('brands', '.brand');
		crearOpciones('categories', '.category');
		crearOpciones('asset-types', '.assetType');
		crearOpciones('suppliers', '.supplier');
		crearOpciones('accountables', '.accountable');
		crearOpciones('status', '.status');
		const frmRegistro = document.querySelector('#frmDataTask');
		const btnGuardar = document.querySelector('#btnGuardar');

		const formInputs = frmRegistro.querySelectorAll('input, select');
		formInputs.forEach(input => {
			input.addEventListener('input', () => {
				const llenos = Array.from(formInputs).every(input => input.value.trim() !== '');
				btnGuardar.disabled = !llenos
			});
		});
	}

}
customElements.define("add-assets", AddAssets);


export class EditAssets extends HTMLElement {
  constructor() {
    super();
    this.render();
    // this.editData();
  }

  render() {
    this.innerHTML = /*html*/`
    <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success submit" type="submit">Search</button>
      </form>
    <add-assets></add-assets>
    `;
    const cardHeader = this.querySelector('.card-header')
    cardHeader.textContent = 'Editar Activos'
    const sumbit = this.getElementsByClassName('submit');
    let selectorOptions = document.querySelector(".form-select")
    sumbit[0].addEventListener('click', async (e) => {
      const id = this.querySelector('.me-2').value;
      let data = await getTasks(`${selectorOptions.value}/${id}`);
      if (data === undefined) {
        alert('No se encuentra ninguna marca con este codigo')
      } else {
        const name = this.querySelector('.name');
        name.value = `${data.name}`;
        const codTransaccion = this.querySelector('.codTransaccion');
        codTransaccion.value = `${data.codTransaccion}`;
        const formNumber = this.querySelector('.formNumber');
        formNumber.value = `${data.formNumber}`;
        const unitValue = this.querySelector('.unitValue');
        unitValue.value = `${data.unitValue}`;
        const serial = this.querySelector('.serial');
        serial.value = `${data.serial}`;
        const brandId = document.querySelector('.brand');
        brandId.value = data.brandId;
        const categoryId = document.querySelector('.category');
        categoryId.value = data.categoryId;
        const assetTypeId = document.querySelector('.assetType');
        assetTypeId.value = data['asset-typeId'];
        const supplierId = document.querySelector('.supplier');
        supplierId.value = data.supplierId;
        const accountableId = document.querySelector('.accountable');
        accountableId.value = data.accountableId;
        const statuId = document.querySelector('.status');
        statuId.value = data.statuId;

        const btnGuardar = document.getElementById("btnGuardar");
        btnGuardar.removeAttribute("disabled");

        editData(`${selectorOptions.value}/${id}`, `edit-${selectorOptions.value}`);
      }
      e.stopImmediatePropagation();
      e.preventDefault();
    })
  }
}
customElements.define("edit-assets", EditAssets);

export class SearchAssets extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML =  /*html*/`
    <form class="d-flex" role="search">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success submit" type="submit">Search</button>
    </form>
    <div class="card mt-3">
      <div class="card-body">
        <div class="input-group mb-3">
          <input type="text" class="form-control id" placeholder="Id:" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
          <input type="text" class="form-control name" placeholder="Nombre:" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
          <input type="text" class="form-control status" placeholder="Status:" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        </div>
      </div>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Description</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `;
    buscar('crearModal',true);

  }
}
customElements.define("search-assets", SearchAssets)


export class DeleteAssets extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML =  /*html*/`
    <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search Delete" aria-label="Search">
        <button class="btn btn-outline-success submit" type="submit">Search</button>
      </form>
    <div class="card mt-3">
      <div class="card-body">
        <div class="input-group mb-3">
          <input type="text" class="form-control id" placeholder="Id:" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
          <input type="text" class="form-control name" placeholder="Nombre:" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
          <input type="text" class="form-control status" placeholder="Status:" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
          <button class="btn btn-outline-danger" type="button" id="button-addon2"><i class='bx bxs-trash'></i></button>
        </div>
      </div>
    </div>
    `;
    buscar('delData',true);
  }
}
customElements.define("delete-assets", DeleteAssets);

