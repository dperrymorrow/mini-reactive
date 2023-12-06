import { html } from "../lib/vdom.js";
import Todo from "./Todo.js";
import Header from "./Header.js";
import { faker } from "https://cdn.skypack.dev/@faker-js/faker";

export default function (props, { observe }) {
  const state = observe({
    title: "fred",
    sort: {
      field: "title",
      dir: "ASC",
    },
    newTodo: "a new item to do",
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

  function addTodo() {
    state.todos.push({
      title: state.newTodo,
      done: false,
      id: faker.string.uuid(),
    });

    state.newTodo = "";
  }

  return () => {
    const { dir, field } = state.sort;

    const sorted = [...state.todos].sort((a, b) => {
      if (field === "done") return a.done - b.done;
      if (field === "title") return a.title.localeCompare(b.title);
    });

    if (dir === "DESC") sorted.reverse();

    return html`<article>
      <header>
        <hgroup>
          <h1>${state.title}</h1>
          <h2>An example of a mini reactive component, make changes and watch the DOM update.</h2>
        </hgroup>
      </header>

      <input type="text" value="${state.title}" onInput=${({ target }) => (state.title = target.value)} autofocus />

      <table role="grid">
        <${Header} sort=${state.sort} />
        <tbody>
          ${sorted.map((todo) => html`<${Todo} todo="${todo}" remove=${() => deleteTodo(todo.id)} data-key=${todo.id} />`)}
        </tbody>
      </table>

      <footer style="position:sticky; bottom: 0;">
        <div class="grid">
          <input onInput=${(ev) => (state.newTodo = ev.target.value)} value=${state.newTodo} placeholder="Todo title" type="text" />
          <button onClick=${() => addTodo()}>Add</button>
        </div>
      </footer>
    </article>`;
  };
}
