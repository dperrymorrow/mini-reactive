import element from "./element.js";
import { dynamicKey } from "./utils.js";
import { findNeedsRendered, findDynamic } from "./vdom.js";

export default class Component {
  $root;
  props;
  debug = false;
  #dynamicVNodes;

  constructor(props = {}) {
    this.props = props;
  }

  // to be overrode...
  template() {
    console.error("Render function is not defined. ");
  }

  // to be overrode...
  created() {}

  render() {
    // call the hook
    this.created();
    const vNodes = this.template();
    if (Array.isArray(vNodes)) console.error("Component is returning multiple nodes as root. Can only have one.");

    console.log(vNodes);
    // create actual DOM nodes
    this.$root = element(vNodes);
    // must be done after creating the element as its destructive
    this.#dynamicVNodes = findDynamic(vNodes);
    return this.$root;
  }

  reRender() {
    const newDynamicVNodes = findDynamic(this.template());
    const needsPatched = findNeedsRendered(this.#dynamicVNodes, newDynamicVNodes);

    if (this.debug) {
      console.groupCollapsed("ReRender");

      console.groupCollapsed("old Dynamic VNodes");
      console.log(this.#dynamicVNodes);
      console.groupEnd();

      console.groupCollapsed("new Dynamic VNodes");
      console.log(newDynamicVNodes);
      console.groupEnd();

      console.groupCollapsed("Needs Patched");
      console.log(needsPatched);
      console.groupEnd();

      console.groupEnd();
    }

    needsPatched.forEach((vNode) => {
      const key = dynamicKey(vNode);
      const $node = element(vNode);
      const $existing = this.$root.querySelector(`*[data-key="${btoa(key)}"]`);
      $existing.replaceWith($node);
    });

    this.#dynamicVNodes = newDynamicVNodes;
  }
}
