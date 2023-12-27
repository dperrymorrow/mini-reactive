import htm from "https://unpkg.com/htm?module";
import Morphdom from "https://unpkg.com/morphdom@2.6.1/dist/morphdom-esm.js";
import { addHandlers } from "./event-handlers.js";
import { isFunction, isPrimitive } from "./utils.js";
import State from "./state.js";

function h(type, props, ...children) {
  return { type, props, children: children.flat() };
}

const html = htm.bind(h);

function createComponent(node) {
  let $root;
  let state = null;
  let vNodes;
  let hasRendered = false;

  const componentName = node.type.name;
  if (componentName === "default") console.error("you must name your function exports for a component", node.type);

  const renderFn = node.type.bind(this, node.props, {
    reRender,
    select: (selector) => $root.querySelector(selector),
    selectAll: (selector) => $root.querySelectorAll(selector),
    useState: (obj) => {
      if (!hasRendered && state)
        console.error("You can only call useState once per componet. Additional calls will return the existing proxy", componentName, node.type);
      else if (state) return state;

      if (isPrimitive(obj)) console.error("observe must be passed an Object or Array, was passed", obj, componentName, node.type);

      state = State(obj, reRender);
      return state;
    },
  });

  function reRender() {
    // const start = new Date().getMilliseconds();
    const nextVNodes = renderFn();

    Morphdom($root, createElement(nextVNodes), {
      getNodeKey: (node) => node?.dataset?.key,
      onBeforeElUpdated: (fromEl, toEl) => {
        return !fromEl.isEqualNode(toEl);
      },
    });

    // const end = new Date().getMilliseconds();
    // console.log(`rerender ${componentName}:`, end - start / 1000);
  }

  vNodes = renderFn();
  if (Array.isArray(vNodes)) console.error("Component is returning multiple nodes as root. Can only have one.", componentName, node.type);
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
