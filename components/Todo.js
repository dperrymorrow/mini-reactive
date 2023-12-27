import { html } from "../lib/vdom.js";

export default function Todo({ remove, toggle, todo }) {
  return html`<tr>
    <td>
      <input type="checkbox" role="switch" checked=${todo.done} onClick=${() => toggle(todo.id)} />
    </td>

    <td style="opacity: ${todo.done ? 0.3 : 1}">${todo.done ? html`<s>${todo.title}</s>` : todo.title}</td>

    <td>
      <a class="contrast" href="#" onClick.prevent=${() => remove(todo.id)}>
        <span class="material-symbols-outlined"> delete </span>
      </a>
    </td>
  </tr>`;
}
