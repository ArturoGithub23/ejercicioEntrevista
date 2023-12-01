import { LitElement, html, css } from "lit";
import "./components/obtener-datos";

const logo = new URL("../assets/open-wc-logo.svg", import.meta.url).href;

class EjercicioEntrevista extends LitElement {
  static styles = css`
    *,
    *::after,
    *::before {
      box-sizing: border-box;
    }

    :host {
      display: block;
    }

    h1 {
      text-align: center;
    }

    span {
      font-weight: bold;
    }

    .buscador {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #6c6c6c;
    }
    label,
    input {
      margin-right: 10px;
    }

    .personajes {
      display: flex;
      flex-flow: row wrap;
      width: 900px;
      height: 100%;
      margin: auto;
    }

    .personaje {
      width: 30%;
      margin: 10px 10px;
      background-color: #e5e5e5;
      border-radius: 5px;
    }

    .imagen-personaje {
      width: 100%;
      height: 250px;
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 376px;
    }

    .informacion-personaje {
      padding: 5px 10px;
    }
  `;

  static properties = {
    header: { type: String },
    datos: { type: Array },
    filtro: { type: Array },
  };

  constructor() {
    super();
    this.datos = [];
    this.filtro = [];
  }

  render() {
    return html`
      <obtener-datos @datos="${this._obtenerDatos}"></obtener-datos>

      <header>
        <h1>Personajes Harry Potter</h1>
      </header>
      <main>
        <nav class="buscador">
          <form>
            <label>Buscar personaje:</label>
            <input type="text" />
            <input type="button" value="Buscar" @click="${this._filtro}" />
            <select>
              <option value="#">Seleccione una opción</option>
              <option value="Gryffindor" @click="${this._opcion}">
                Gryffindor
              </option>
              <option value="Hufflepuff" @click="${this._opcion}">
                Hufflepuff
              </option>
              <option value="Ravenclaw" @click="${this._opcion}">
                Ravenclaw
              </option>
              <option value="Slytherin" @click="${this._opcion}">
                Slytherin
              </option>
              <option value="todos" @click="${this._opcion}">
                Mostrar todos
              </option>
            </select>
          </form>
        </nav>
        <section class="personajes">
          ${this.filtro.length > 0
            ? this.filtro.map((personaje) => {
                return html` <section class="personaje">
                  <section class="imagen-persona">
                    <img
                      src="${personaje.image === ""
                        ? "../assets/img/desconocido.jpg"
                        : personaje.image}"
                    />
                  </section>
                  <section class="informacion-personaje">
                    <p><span>Personaje:</span> ${personaje.name}</p>
                    <p>
                      <span>Estado: </span> ${personaje.alive === true
                        ? "Vivo"
                        : "Muerto"}
                    </p>
                    ${personaje.house === ""
                      ? null
                      : html`<p><span>Casa:</span> ${personaje.house}</p>`}
                    <p><span>Especie:</span> ${personaje.species}</p>
                    <p><span>Actor:</span> ${personaje.actor}</p>
                  </section>
                </section>`;
              })
            : this.datos.map((personaje) => {
                return html` <section class="personaje">
                  <section class="imagen-persona">
                    <img
                      src="${personaje.image === ""
                        ? "../assets/img/desconocido.jpg"
                        : personaje.image}"
                    />
                  </section>
                  <section class="informacion-personaje">
                    <p><span>Personaje:</span> ${personaje.name}</p>
                    <p>
                      <span>Estado: </span> ${personaje.alive === true
                        ? "Vivo"
                        : "Muerto"}
                    </p>
                    ${personaje.house === ""
                      ? null
                      : html`<p><span>Casa:</span> ${personaje.house}</p>`}
                    <p><span>Especie:</span> ${personaje.species}</p>
                    <p><span>Actor:</span> ${personaje.actor}</p>
                  </section>
                </section>`;
              })};
        </section>
      </main>
    `;
  }

  _obtenerDatos(e) {
    this.datos = [...e.detail.data];
  }

  _filtro(e) {
    let entrada;
    if (entrada === "") {
      this.filtro = [];
      return;
    }

    if (
      e.target.previousElementSibling.value === "Vivo" ||
      e.target.previousElementSibling.value === "vivo"
    ) {
      entrada = true;
    } else if (
      e.target.previousElementSibling.value === "Muerto" ||
      e.target.previousElementSibling.value === "muerto"
    ) {
      entrada = false;
    } else {
      entrada = e.target.previousElementSibling.value;
    }

    this.datos.forEach((personaje) => {
      if (personaje.name.includes(entrada)) {
        this.filtro.push(personaje);
        return;
      }

      if (personaje.actor.includes(entrada)) {
        this.filtro.push(personaje);
        return;
      }

      if (personaje.species.includes(entrada)) {
        this.filtro.push(personaje);
        return;
      }
      if (personaje.alive === entrada) {
        this.filtro.push(personaje);
        return;
      }
    });

    e.target.previousElementSibling.value = "";

    this.filtro = [...this.filtro];
  }

  _opcion(e) {
    this.filtro = [];
    let opcion = e.target.value;

    if (opcion === "todos") {
      this.filtro = [...this.datos];
      return;
    }

    this.datos.forEach((personaje) => {
      if (personaje.house.includes(opcion)) {
        this.filtro.push(personaje);
        return;
      }
    });

    this.filtro = [...this.filtro];
  }
}

customElements.define("ejercicio-entrevista", EjercicioEntrevista);
