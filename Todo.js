import Component from "./lib/Component.js";
import { html } from "./lib/vdom.js";

export default class Todo extends Component {
  remove(ev) {
    ev.preventDefault();
    this.props.deleteTodo(this.props.index);
  }

  template() {
    return html`<tr>
      <td>
        <input type="checkbox" role="switch" checked=${this.props.todo.done} onClick="${() => (this.props.todo.done = !this.props.todo.done)}" />
      </td>

      <td>${this.props.todo.done ? html`<s>${this.props.todo.title}</s>` : this.props.todo.title}</td>

      <td>
        <a href="#" onClick=${(ev) => this.remove(ev)}>Delete</a>
      </td>
    </tr>`;
  }
}
