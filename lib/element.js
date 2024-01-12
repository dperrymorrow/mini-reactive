import Component from "./component.js";
import { isPrimitive, isTextNode, isComponent, isElement } from "./utils.js";
import { addHandlers } from "./event-handlers.js";

function element(node) {
  if (isTextNode(node)) return document.createTextNode(node);

  let $el;

  if (isComponent(node)) {
    console.log(node);
    const inst = new node.type(node.props);
    $el = inst.render();
  } else {
    $el = document.createElement(node.type);
  }

  if (node.props) {
    Object.entries(node.props).forEach(([key, val]) => {
      // indicate a dynamic property
      if (key.startsWith(":")) {
        $el.dataset.key = btoa(key);
        // for boolean things such as selected or checked...
      } else if (["selected", "checked"].includes(key)) {
        if (val) $el.setAttribute(key, val);
        // for evertyhing else, ensure primitve so not a handler.
      } else if (isPrimitive(val)) {
        $el.setAttribute(key, val);
      }
    });

    addHandlers($el, node);
  }

  node.children.map(element).forEach(($child) => $el.appendChild($child));
  return $el;
}

export default element;
