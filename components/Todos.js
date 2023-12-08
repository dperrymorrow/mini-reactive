import { html } from "../lib/vdom.js";
import Todo from "./Todo.js";
import Header from "./Header.js";
import NewForm from "./NewForm.js";
import { faker } from "https://cdn.skypack.dev/@faker-js/faker";

export default function (props, { observe }) {
  const state = observe({
    sort: {
      field: "title",
      dir: "ASC",
    },
    todos: [...Array(50)].map(() => {
      return {
        id: faker.string.uuid(),
        done: false,
        title: faker.lorem.sentence(),
      };
    }),
  });

  function deleteTodo(todoId) {
    const index = state.todos.findIndex(({ id }) => id === todoId);
    state.todos.splice(index, 1);
  }

  function addTodo(title) {
    state.todos.push({
      title,
      done: false,
      id: faker.string.uuid(),
    });
  }

  const { dir, field } = state.sort;

  const sorted = [...state.todos].sort((a, b) => {
    if (field === "done") return a.done - b.done;
    if (field === "title") return a.title.localeCompare(b.title);
  });

  if (dir === "DESC") sorted.reverse();

  return html`<article>
    <header>
      <hgroup>
        <h1>ToDo List</h1>
        <h2>An example of a mini reactive component, make changes and watch the DOM update.</h2>
      </hgroup>
    </header>

    <table role="grid">
      <${Header} sort=${state.sort} />
      <tbody>
        ${sorted.map((todo) => html`<${Todo} todo="${todo}" remove=${() => deleteTodo(todo.id)} data-key=${todo.id} />`)}
      </tbody>
    </table>
     <${NewForm} add=${addTodo} //>
  </article>`;
}
