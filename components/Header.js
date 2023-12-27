import { html } from "../lib/vdom.js";

export default function Header({ sort, onSort }) {
  console.log("rendered", sort);

  function sortBy(ev) {
    onSort({ ...sort, field: ev.target.value });
  }

  function sortDir(ev) {
    debugger;

    onSort({ ...sort, dir: ev.target.value });
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
        <th>Done</th>
        <th>Title</th>
        <th></th>
      </tr>
    </thead>
  `;
}
