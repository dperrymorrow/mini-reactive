import { html } from "../lib/vdom.js";

export default function ({ add }, { observe, select }) {
  const state = observe({
    title: "",
  });

  function create() {
    add(state.title);
    select("input").focus();
  }

  return html`<footer style="position:sticky; bottom: 0;">
    <div class="grid">
      <input onInput=${(ev) => (state.title = ev.target.value)} value=${state.title} placeholder="Todo title" type="text" />
      <button onClick=${create}>Add</button>
    </div>
  </footer>`;
}
