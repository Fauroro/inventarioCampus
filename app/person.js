import { getTasks } from '../api/apiFake.js'
import { postTasks } from '../api/apiFake.js'
import { editData, saveData, delData, buscar, crearModal } from './components/options.js';
import { DeleteBrands } from './brand.js';

export class AddPersonas extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render() {
        this.innerHTML = /*html*/ `
        <div class="card mt-3">
            <div class="card-header">Register Person</div>
            <div class="card-body">
                <form id="frmDataTask" class="was-validated">
                    <div class="row">
                        <div class="col">
                            <label for="brand" class="form-label">Id number </label>
                            <input type="text" class="form-control brand" id="brand" name="id" aria-describedby="" required>
                            <div class="invalid-feedback">* Requiered field.</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="brand" class="form-label">Name </label>
                            <input type="text" class="form-control brand" id="brand" name="name" aria-describedby="" required>
                            <div class="invalid-feedback">* Requiered field.</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="brand" class="form-label">Email </label>
                            <input type="text" class="form-control brand" id="brand" name="email" aria-describedby="" required>
                            <div class="invalid-feedback">* Requiered field.</div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="brand" class="form-label">Person type </label>
                        </div>
                    </div>
                    <select name=personType class="form-select-personType" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option>Natural</option>
                        <option>Jurídica</option>
                    </select>
                    <div class="row">
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

        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                const llenos = Array.from(formInputs).every(input => input.value.trim() !== '');
                btnGuardar.disabled = !llenos
            });
        });
    }
}
customElements.define("add-personas", AddPersonas);


export class EditPerson extends HTMLElement {
    constructor() {
        super();
        this.render();
        // this.editData();
    }
    render() {
        this.innerHTML = /*html*/`
        <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Id number" aria-label="Search">
            <button class="btn btn-outline-success submit" type="submit">Search</button>
        </form>
        <add-personas></add-personas>
    `;
        const cardHeader = this.querySelector('.card-header')
        cardHeader.textContent = 'Edit Person'
        const sumbit = this.getElementsByClassName('submit');
        let selectorOptions = document.querySelector(".form-select")
        sumbit[0].addEventListener('click', async (e) => {
            const id = this.querySelector('.me-2').value;
            let data = await getTasks(`${selectorOptions.value}/${id}`);
            if (data === undefined) {
                alert('There is no coincidence with this id')
            } else {
                const text = this.getElementsByClassName('brand');
                let selectPersonType = this.querySelector('.form-select-personType');
                text[0].value = `${data.id}`;
                text[0].disabled = true;
                text[1].value = `${data.name}`;
                text[2].value = `${data.email}`;
                selectPersonType.value = `${data.personType}`;
                btnGuardar.removeAttribute("disabled");
                editData(`${selectorOptions.value}/${id}`, `edit-${selectorOptions.value}`);
            }
            e.stopImmediatePropagation();
            e.preventDefault();
        })
    }
}
customElements.define("edit-personas", EditPerson);

export class DeletePersonas extends HTMLElement {
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
customElements.define("delete-personas", DeletePersonas);


export class SearchPersonas extends HTMLElement {
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
customElements.define("search-personas", SearchPersonas)