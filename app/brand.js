import {getTasks} from '../api/apiFake.js'
import {postTasks} from '../api/apiFake.js'
import { editData, saveData, delData } from './components/options.js';

export class AddBrands extends HTMLElement {
  constructor() {
    super();
    this.render();
    // this.saveData();
  }
  render() {
    this.innerHTML = /*html*/ `
      <div class="card mt-3">
        <div class="card-header">Registrar Marcas Nuevas</div>
        <div class="card-body">
          <form id="frmDataTask" class="was-validated">
            <div class="row">
              <div class="col">
                <label for="brand" class="form-label">Nombre de la marca *</label>
                <input type="text" class="form-control brand" id="brand" name="name" aria-describedby="" required>
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
customElements.define("add-brands",AddBrands);


export class EditBrands extends HTMLElement{
  constructor () {
    super();
    this.render();
    // this.editData();
  }

  render(){
    this.innerHTML = /*html*/`
    <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success submit" type="submit">Search</button>
      </form>
    <add-brands></add-brands>
    `;
    const sumbit = this.getElementsByClassName('submit');
    sumbit[0].addEventListener('click', async (e) =>{
      const id = this.querySelector('.me-2').value;
      let data = await getTasks(`brands/${id}`);
      if (data===undefined) {
        alert('No se encuentra ninguna marca con este codigo')
      } else {
        const text = this.getElementsByClassName('brand');
        text[0].value = `${data.name}`;
        let selectorOptions = document.querySelector(".form-select")
        editData(`${selectorOptions.value}/${id}`,`edit-${selectorOptions.value}`);
      }
      e.stopImmediatePropagation();
      e.preventDefault();    
    })
  }

}
customElements.define("edit-brands",EditBrands);

export class DeleteBrands extends HTMLElement{
  constructor() {
    super();
    this.render();
  }
  render(){
    this.innerHTML =  /*html*/`
    <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search Delete" aria-label="Search">
        <button class="btn btn-outline-success submit" type="submit">Search</button>
      </form>
    <div class="card mt-3">
      <div class="card-body">
        <div class="input-group mb-3">
          <input type="text" class="form-control id" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
          <input type="text" class="form-control name" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" disabled>
          <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class='bx bxs-trash'></i></button>
        </div>
      </div>
    </div>
    `;

    const sumbit = this.getElementsByClassName('submit');
    sumbit[0].addEventListener('click', async (e) =>{
      debugger
      const id = this.querySelector('.me-2').value;
      let data = await getTasks(`brands/${id}`);
      if (data===undefined) {
        alert('No se encuentra ninguna marca con este codigo')
      } else {
        const idBrand = this.querySelector('.id');
        const nameBrand = this.querySelector('.name');
        idBrand.placeholder = `Id: ${data.id}`
        nameBrand.placeholder = `Nombre: ${data.name}`
        let selectorOptions = document.querySelector(".form-select")
        delData(`${selectorOptions.value}/${data.id}`,`delete-${selectorOptions.value}`);
      }
      e.stopImmediatePropagation();
      e.preventDefault();    
    })

  }
}
customElements.define("delete-brands",DeleteBrands);