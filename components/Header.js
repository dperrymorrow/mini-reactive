import { html } from "../lib/vdom.js";

export default function ({ sort }) {
  function sortBy(ev) {
    const field = ev.target.value;
    sort.field = field;
  }

  function sortDir(ev) {
    const dir = ev.target.value;
    sort.dir = dir;
  }

  return html`
    <thead>
      <tr>
        <th colspan="3">
          <div class="grid">
            <label>
              Sort By
              <select onChange=${sortBy}>
                <option selected=${sort.field === "title"} value="title">Title</option>
                <option selected=${sort.field === "done"} value="done">Done</option>
              </select>
            </label>
            <label
              >Sort Dir
              <select onChange=${sortDir}>
                <option selected=${sort.dir === "ASC"} value="ASC">ASC</option>
                <option selected=${sort.dir === "DESC"} value="DESC">DESC</option>
              </select>
            </label>
          </div>
        </th>
      </tr>

      <tr>
        <th>
          <a href="#" onClick.prevent=${() => (sort.field = "done")}>Done? </a>
        </th>
        <th>
          <a href="#" onClick.prevent=${() => (sort.field = "title")}>Title</a>
        </th>
        <th></th>
      </tr>
    </thead>
  `;
}
