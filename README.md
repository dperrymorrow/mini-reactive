# mini-reactive

a reactive component lib in under 80 lines of JS!

- [Working example here](https://dperrymorrow.github.io/mini-reactive/)
- [Example component](https://github.com/dperrymorrow/mini-reactive/blob/main/Todos.js)

## Example Component

```javascript
import Component from "./lib/Component.js";

export default class MyComponent extends Component {
  constructor() {
    super(...arguments);
    this.state = this.useState({
      name: "Dave",
    });
  }

  updateTitle(ev) {
    this.state.title = ev.target.value;
  }

  render() {
    return `<h1>${this.state.title}</h1>
      <input
        type="text"
        value="${this.state.title}"
        data-on="input->updateTitle"
      />`;
  }
}
```

## Example Usage

```html
<div id="app"></div>

<script type="module">
  import App from "./MyComponent.js";

  const $root = document.getElementById("app");
  $root.innerHTML = new App($root).render();
</script>
```

## To run the example here

1. clone this repo
1. cd into directory
1. `npm install`
1. `npm run dev`
1. go to localhost:8000 in your browser

