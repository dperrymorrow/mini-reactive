import { html } from "../lib/vdom.js";
import Todo from "./Todo.js";
import Header from "./Header.js";
import NewForm from "./NewForm.js";
import { faker } from "https://cdn.skypack.dev/@faker-js/faker";

export default function Todos(props, { useState }) {
  const [getState, setState] = useState({
    sort: {
      field: "title",
      dir: "ASC",
    },
    todos: [...Array(100)].map(() => {
      return {
        id: faker.string.uuid(),
        done: false,
        title: faker.lorem.sentence(),
      };
    }),
  });

  const state = getState();

  function remove(todoId) {
    const index = state.todos.findIndex(({ id }) => id === todoId);
    state.todos.splice(index, 1);
    setState(state);
  }

  function toggle(todoId) {
    const todo = state.todos.find(({ id }) => id === todoId);
    todo.done = !todo.done;
    setState(state);
  }

  function addTodo(title) {
    state.todos.push({
      title,
      done: false,
      id: faker.string.uuid(),
    });
    setState(state);
  }

  const { dir, field } = state.sort;

  const sorted = state.todos.sort((a, b) => {
    if (field === "done") return a.done - b.done;
    if (field === "title") return a.title.localeCompare(b.title);
  });

  if (dir === "DESC") sorted.reverse();

  function onSort(sort) {
    setState({ ...state, sort });
  }

  return html`<article>
    <header>
      <hgroup>
        <h1>ToDo List</h1>
        <h2>An example of a mini reactive component, make changes and watch the DOM update.</h2>
      </hgroup>
    </header>

    <pre>${JSON.stringify(state.sort, null, 2)}</pre>

    <table role="grid">
      <${Header} sort=${state.sort} onSort=${onSort} />
      <tbody>
        ${sorted.map((todo) => html`<${Todo} todo=${todo} remove=${remove} toggle=${toggle} data-key=${todo.id} />`)}
      </tbody>
    </table>
     <${NewForm} add=${addTodo} //>
  </article>`;
}
