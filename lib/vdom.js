import htm from "https://unpkg.com/htm?module";
import { addHandlers } from "./event-handlers.js";

const h = (type, props, ...children) => ({ type, props, children: children.flat() });
const html = htm.bind(h);

function createComponent(node) {}

function createElement(node) {
  if (typeof node !== "object") return document.createTextNode(node);
  if (node.type.isComponent) return new node.type(node.props).render();

  const $el = document.createElement(node.type);

  if (node.props) {
    Object.entries(node.props).forEach(([key, val]) => {
      if (key === "checked") {
        if (val) $el.setAttribute(key, val);
      } else if (!key.startsWith("on")) $el.setAttribute(key, val);
    });
    addHandlers($el, node);
  }
  node.children.map(createElement).forEach(($child) => $el.appendChild($child));
  return $el;
}

export { html, createElement };