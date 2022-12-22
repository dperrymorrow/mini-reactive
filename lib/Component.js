import Morphdom from "https://unpkg.com/morphdom@2.6.1/dist/morphdom-esm.js";
import observer from "./observer.js";

export default class Component {
  handlers = ["click", "input"];
  observable;

  constructor($root) {
    this.$root = $root;
    this.handlers.forEach((type) =>
      this.$root.addEventListener(type, this.#handleEvent.bind(this))
    );
  }

  useState(value) {
    return observer(value, this.updateDom.bind(this));
  }

  #handleEvent(ev) {
    const { type, target } = ev;
    const on = target.dataset.on;

    if (!on) return;

    const args = target.dataset.args ? target.dataset.args.split(",") : [];
    const [eventType, method] = on.split("->");

    if (eventType !== type) return;

    if (!this[method]) {
      console.error(
        `${method} does not exist in component ${this.constructor.name}`,
        ev.target
      );
    } else this[method].call(this, ev, ...args);
  }

  updateDom() {
    Morphdom(this.$root.firstChild, this.render(), {
      onBeforeElUpdated: (fromEl, toEl) => !fromEl.isEqualNode(toEl),
    });
  }

  render() {
    console.error(`${this.constructor.name} must provide a render function!`);
  }
}
