import { LitElement } from "lit";

export class ObtenerDatos extends LitElement {
  constructor() {
    super();
  }

  render() {
    this._obtenerDatos();
  }

  _obtenerDatos() {
    let url = "https://hp-api.onrender.com/api/characters";

    fetch(url, { method: "GET" })
      .then((response) => {
        if (response.ok) return response.json();
        return Promise.reject(response);
      })
      .then((data) => {
        this.dispatchEvent(
          new CustomEvent("datos", {
            detail: { data },
            bubbles: true,
            composed: true,
          })
        );
      })
      .catch((error) => {
        console.warn("error al consultar datos", error);
      });
  }
}

customElements.define("obtener-datos", ObtenerDatos);
