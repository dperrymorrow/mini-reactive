export default function (props, observe) {
  const data = observe({
    newTodo: "",
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

  //  ${data.todos.map((todo, index) => html`<${Todo} todo=${todo} index=${index} deleteTodo=${deleteTodo.bind(this)} />`)}

  return html`<article>
    <header>
      <hgroup>
        <h1>${data.title}</h1>
        <h2>An example of a mini reactive component, make changes and watch the DOM update.</h2>
      </hgroup>
    </header>

    <input type="text" value="${data.title}" onInput=${({ target }) => (data.title = target.value)} autofocus />

    <table role="grid">
      <tbody></tbody>
    </table>

    <footer>
      <div class="grid">
        <input onInput=${(ev) => (data.newTodo = ev.target.value)} value=${data.newTodo} placeholder="Todo title" type="text" />
        <button onClick=${() => addTodo()}>Add</button>
      </div>
    </footer>
  </article>`;
}
