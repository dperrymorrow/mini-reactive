import Component from "./lib/Component.js";
import { html } from "./lib/vdom.js";

export default class Todo extends Component {
  remove(ev) {
    ev.preventDefault();
    this.props.deleteTodo(this.props.index);
  }

  template({ props: { todo } }) {
    return html`<tr>
      <td>
        <input type="checkbox" role="switch" checked=${todo.done} onClick="${() => (todo.done = !todo.done)}" />
      </td>

      <td>${todo.done ? html`<s>${todo.title}</s>` : todo.title}</td>

      <td>
        <a href="#" onClick=${(ev) => this.remove(ev)}>Delete</a>
      </td>
    </tr>`;
  }
}
