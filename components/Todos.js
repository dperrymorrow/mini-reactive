import { Component, html, randomId } from "../lib/index.js";
import NewForm from "./NewForm.js";

export default class Todos extends Component {
  debug = true;

  data = {
    sort: {
      field: "title",
      dir: "ASC",
    },
    todos: [...Array(10)].map((num, index) => {
      const id = randomId();
      return {
        id,
        done: false,
        title: `thing todo #${id}`,
      };
    }),
  };

  template() {
    function addTodo() {
      console.log("boom");
    }

    const { sort } = this.data;

    return html`<article>
      <header>
        <hgroup>
          <h1 :sortField=${sort.field}>${sort.field}</h1>
          <h2 :sortDir=${sort.dir}>${sort.dir}</h2>
        </hgroup>
      </header>

      <input type="text" value=${sort.field} onInput=${(ev) => (this.data.sort.field = ev.target.value)} />
      <input type="text" value=${sort.dir} onInput=${(ev) => (this.data.sort.dir = ev.target.value)} />

      <button onClick=${this.reRender.bind(this)}>Re-Render</button>

      <table role="grid" :todos=${this.data.todos.length}>
        <tbody></tbody>
      </table>

      <${NewForm} todos=${this.data.todos} onClick=${addTodo}//>
    </article>`;
  }
}
