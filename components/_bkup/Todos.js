import { html, randomId } from "../lib/index.js";
import Todo from "./Todo.js";
import Header from "./Header.js";
import NewForm from "./NewForm.js";

export default function Todos(props, inst) {
  const state = (inst.initialState = {
    sort: {
      field: "title",
      dir: "ASC",
    },
    todos: [...Array(100)].map((num, index) => {
      const id = randomId();
      return {
        id,
        done: false,
        title: `thing todo #${id}`,
      };
    }),
  });

  function remove(todoId) {
    const index = state.todos.findIndex(({ id }) => id === todoId);
    state.todos.splice(index, 1);
    inst.state = state;
  }

  function toggle(todoId) {
    const todo = state.todos.find(({ id }) => id === todoId);
    todo.done = !todo.done;

    console.log("toggled it");
    inst.state = state;
  }

  function addTodo(title) {
    state.todos.push({
      title,
      done: false,
      id: randomId(),
    });

    inst.state = state;
  }

  const { dir, field } = state.sort;

  const sorted = state.todos.sort((a, b) => {
    if (field === "done") return a.done - b.done;
    if (field === "title") return a.title.localeCompare(b.title);
  });

  if (dir === "DESC") sorted.reverse();

  function onSort(sort) {
    inst.state = { ...state, sort };
  }

  return html`<article>
    <header>
      <hgroup>
        <h1>ToDo List</h1>
        <h2>An example of a mini reactive component, make changes and watch the DOM update.</h2>
      </hgroup>
    </header>

    <table role="grid" :key="fred">
      <${Header} sort=${inst.state.sort} onSort=${onSort} />
      <tbody>
        ${sorted.map((todo) => html`<${Todo} todo=${todo} remove=${remove} toggle=${toggle} data-key=${todo.id} />`)}
      </tbody>
    </table>
     <${NewForm} add=${addTodo} //>
  </article>`;
}
