import htm from "https://unpkg.com/htm?module";
import Morphdom from "https://unpkg.com/morphdom@2.6.1/dist/morphdom-esm.js";
import OnChange from "https://unpkg.com/on-change@4.0.2/index.js";
import { addHandlers } from "./event-handlers.js";
import { isFunction, isPrimitive } from "./utils.js";

const h = (type, props, ...children) => ({ type, props, children: children.flat() });
const html = htm.bind(h);

function createComponent(node) {
  let hasRendered = false;

  const renderFn = node.type(node.props, {
    reRender,
    observe: (obj) => {
      if (isPrimitive(obj)) console.error("observe must be passed an Object or Array, was passed", obj);
      return OnChange(obj, reRender);
    },
  });

  function reRender() {
    console.log("reRender");
    if (!hasRendered) console.error("You may be setting an observable in a render fn triggering re-render before the initial.");
    Morphdom($root, createElement(renderFn()), {
      getNodeKey(node) {
        return node?.dataset?.key;
      },
      onBeforeElUpdated: (fromEl, toEl) => {
        if (toEl.dataset.skip) return false;
        return !fromEl.isEqualNode(toEl);
      },
    });
  }

  const vNodes = renderFn();
  if (Array.isArray(vNodes)) console.error("Component is returning multiple nodes as root. Can only have one.", node.type);
  const $root = createElement(vNodes);
  hasRendered = true;
  return $root;
}

function createElement(node) {
  if (!node?.type) return document.createTextNode(node);
  const $el = isFunction(node.type) ? createComponent(node) : document.createElement(node.type);

  if (node.props) {
    Object.entries(node.props).forEach(([key, val]) => {
      if (key === "checked") {
        if (val) $el.setAttribute(key, val);
      } else if (isPrimitive(val)) $el.setAttribute(key, val);
    });
    addHandlers($el, node);
  }
  node.children.map(createElement).forEach(($child) => $el.appendChild($child));
  return $el;
}

export { html, createElement, createComponent };
