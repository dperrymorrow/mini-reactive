import { html } from "../lib/vdom.js";

export default function NewForm({ add }, { useState, select }) {
  const [getState, setState] = useState({ title: "" });
  const state = getState();

  function create() {
    // const $input = select("input");
    // add(state.title);
    // $input.value = "";
    // $input.focus();
  }

  console.log("reRender");

  return html`<footer style="position:sticky; bottom: 0;">
    <div class="grid">
      <input placeholder="Todo title" value=${state.title} onInput=${(ev) => setState({ title: ev.target.value })} type="text" />
      <button onClick=${create}>Add</button>
    </div>
  </footer>`;
}
