import { html } from "../lib/vdom.js";

export default function ({ remove, todo }) {
  function toggle() {
    todo.done = !todo.done;
  }

  return () =>
    html`<tr>
      <td>
        <input type="checkbox" role="switch" checked=${todo.done} onClick=${() => toggle()} />
      </td>

      <td style="opacity: ${todo.done ? 0.3 : 1}">${todo.done ? html`<s>${todo.title}</s>` : todo.title}</td>

      <td>
        <button class="outline" onClick=${() => remove()}>Delete</button>
      </td>
    </tr>`;
}
