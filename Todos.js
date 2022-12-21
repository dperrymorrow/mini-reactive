import Component from "./lib/Component.js";

export default class Todos extends Component {
  constructor() {
    super(...arguments);

    this.state = this.useState({
      title: "Things Todo",
      todos: [
        {
          done: true,
          title: "Walk the Dog",
        },
        {
          done: false,
          title: "Grocery Shop",
        },
        {
          done: false,
          title: "X-Mas Shop",
        },
      ],
    });
  }

  toggle({ target }, index) {
    this.state.todos[index].done = target.checked;
  }

  updateTitle({ target }) {
    this.state.title = target.value;
  }

  deleteTodo(ev, index) {
    ev.preventDefault();
    this.state.todos.splice(index, 1);
  }

  addTodo() {
    const $titleInput = this.$refs.newTodo;

    this.state.todos.push({
      title: $titleInput.value,
      done: false,
    });

    $titleInput.value = "";
    $titleInput.focus();
  }

  render() {
    return /*html*/ `<article>
      <header>
        <hgroup>
          <h1>${this.state.title}</h1>
          <h2>
            An example of a mini reactive component, make changes and watch the
            DOM update.
          </h2>
        </hgroup>
      </header>

      <input
        type="text"
        value="${this.state.title}"
        data-on="input->updateTitle"
        data-args="title"
        autofocus
      />

      <table role="grid">
        <thead>
          <tr>
            <th>Done</th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${this.state.todos
            .map(
              (todo, index) => /*html*/ `<tr>
                <td>
                  <input
                    type="checkbox"
                    data-on="click->toggle"
                    data-args="${index}"
                    ${todo.done ? "checked" : null}
                  />
                </td>

                <td>${todo.done ? `<s>${todo.title}</s>` : todo.title}</td>

                <td>
                  <a href="#" data-on="click->deleteTodo" data-args="${index}">
                    Delete
                  </a>
                </td>
              </tr>`
            )
            .join("")}
        </tbody>
      </table>

      <footer>
        <div class="grid">
          <input data-ref="newTodo" placeholder="Todo title" type="text" />
          <button data-on="click->addTodo">Add</button>
        </div>
      </footer>
    </article>`;
  }
}
