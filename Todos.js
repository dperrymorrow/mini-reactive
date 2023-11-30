import Component from "./lib/Component.js";
import { html } from "./lib/vdom.js";
import Todo from "./Todo.js";

export default class Todos extends Component {
  data = this.observe({
    newTodo: "",
    title: "Things Todo",
    todos: [
      {
        done: true,
        title: "Walk the Dog",
      },
      {
        done: false,
        title: "Grocery Shop",
      },
      {
        done: false,
        title: "X-Mas Shop",
      },
    ],
  });

  deleteTodo(index) {
    this.data.todos.splice(index, 1);
  }

  addTodo() {
    this.data.todos.push({
      title: this.data.newTodo,
      done: false,
    });

    this.data.newTodo = "";
  }

  template() {
    return html`<article>
      <header>
        <hgroup>
          <h1>${this.data.title}</h1>
          <h2>An example of a mini reactive component, make changes and watch the DOM update.</h2>
        </hgroup>
      </header>

      <input type="text" value="${this.data.title}" onInput=${({ target }) => (this.data.title = target.value)} autofocus />

      <table role="grid">
        <tbody>
          ${this.data.todos.map((todo, index) => html`<${Todo} todo="${todo}" index=${index} deleteTodo=${this.deleteTodo.bind(this)} />`)}
        </tbody>
      </table>

      <footer>
        <div class="grid">
          <input onInput=${(ev) => (this.data.newTodo = ev.target.value)} value=${this.data.newTodo} placeholder="Todo title" type="text" />
          <button onClick=${() => this.addTodo()}>Add</button>
        </div>
      </footer>
    </article>`;
  }
}
