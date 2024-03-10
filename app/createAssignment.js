
export class CreateAssingment extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render() {
        this.innerHTML =  /*html*/ `
        <div class="card mt-3">
        <div class="card-header">New assignment</div>
        <div class="card-body">
          <form id="frmDataTask" class="was-validated">
            <div class="row">
              <div class="col">
                <label for="brand" class="form-label">Responsible's Id number</label>
                <input type="text" placeholder="Introduce a registered person's Id" class="form-control brand" id="brand" name="responsibleId" aria-describedby="" required>
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
        const currentDate = new Date();
        let inputDate = this.querySelector(".date");
        inputDate.value = currentDate;
    }
}
customElements.define("create-assingment", CreateAssingment)