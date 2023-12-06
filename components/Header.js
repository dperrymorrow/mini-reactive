import { html } from "../lib/vdom.js";

export default function ({ sort }) {
  const toggleDir = () => (sort.dir = sort.dir === "ASC" ? "DESC" : "ASC");

  function sortBy(ev, field) {
    ev.preventDefault();
    sort.field === field ? toggleDir() : "ASC";
    sort.field = field;
  }

  return () => {
    return html`
      <thead>
        <tr>
          <th>
            <a href="#" onClick=${(ev) => sortBy(ev, "done")}>Done?</a>
          </th>
          <th>
            <a href="#" onClick=${(ev) => sortBy(ev, "title")}>Title</a>
          </th>
          <th>
            <b>${sort.field} | ${sort.dir}</b>
          </th>
        </tr>
      </thead>
    `;
  };
}
