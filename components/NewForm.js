import { html, Component } from "../lib/index.js";

export default class NewForm extends Component {
  title = "Placeholder";

  onInput({ target }) {
    this.props.addTodo();
    this.title = target.value;
    this.reRender();
  }

  created() {}

  template() {
    return html`<footer style="position:sticky; bottom: 0;">
      <div class="grid">
        <label :dataTitle=${this.title}>${this.title}</label>

        <input placeholder="Todo title" onInput=${this.onInput.bind(this)} type="text" />
        <button>Add</button>
      </div>
    </footer>`;
  }
}
