import observer from "./observer.js";
import { createElement } from "./vdom.js";
import Morphdom from "https://unpkg.com/morphdom@2.6.1/dist/morphdom-esm.js";

export default class Component {
  static isComponent = true;
  $root;
  observable;

  constructor(props = {}) {
    this.props = props;
  }

  observe(value) {
    return observer(value, this.updateDom.bind(this));
  }

  updateDom() {
    Morphdom(this.$root, createElement(this.template(this)), {
      onBeforeElUpdated: (fromEl, toEl) => !fromEl.isEqualNode(toEl),
    });
  }

  template() {
    console.error("template function must be overrode in your component.");
  }

  render() {
    // need to warn if more than one root element
    this.$root = createElement(this.template(this));
    return this.$root;
  }
}
