import htm from "https://unpkg.com/htm?module";
import Morphdom from "https://unpkg.com/morphdom@2.6.1/dist/morphdom-esm.js";
import OnChange from "https://unpkg.com/on-change@4.0.2/index.js";
import { addHandlers } from "./event-handlers.js";
import { isFunction, isPrimitive } from "./utils.js";

const h = (type, props, ...children) => ({ type, props, children: children.flat() });
const html = htm.bind(h);

function createComponent(node) {
  let $root;
  let proxy;
  let hasRendered = false;

  const renderFn = node.type.bind(this, node.props, {
    reRender,
    select: (selector) => $root.querySelector(selector),
    selectAll: (selector) => $root.querySelectorAll(selector),
    observe: (obj) => {
      if (!hasRendered && proxy) console.error("You can only call observe once per componet. Additional calls will return the existing proxy", node.type);
      else if (proxy) return proxy;

      if (isPrimitive(obj)) console.error("observe must be passed an Object or Array, was passed", obj, node.type);
      proxy = OnChange(obj, reRender);
      return proxy;
    },
  });

  function reRender() {
    Morphdom($root, createElement(renderFn()), {
      getNodeKey: (node) => node?.dataset?.key,
      onBeforeElUpdated: (fromEl, toEl) => {
        if (toEl.dataset.skip) return false;
        return !fromEl.isEqualNode(toEl);
      },
    });
  }

  const vNodes = renderFn();
  if (Array.isArray(vNodes)) console.error("Component is returning multiple nodes as root. Can only have one.", node.type);
  $root = createElement(vNodes);

  hasRendered = true;
  return $root;
}

function createElement(node) {
  if (!node?.type) return document.createTextNode(node);
  const $el = isFunction(node.type) ? createComponent(node) : document.createElement(node.type);

  if (node.props) {
    Object.entries(node.props).forEach(([key, val]) => {
      if (["selected", "checked"].includes(key)) {
        if (val) $el.setAttribute(key, val);
      } else if (isPrimitive(val)) $el.setAttribute(key, val);
    });
    addHandlers($el, node);
  }
  node.children.map(createElement).forEach(($child) => $el.appendChild($child));
  return $el;
}

export { html, createElement, createComponent };
