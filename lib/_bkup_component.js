import State from "./state.js";
import Morphdom from "https://unpkg.com/morphdom@2.6.1/dist/morphdom-esm.js";
import { isPrimitive } from "./utils.js";
import Element from "./element.js";

export default function (node) {
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
    const start = new Date().getMilliseconds();

    const nextVNodes = renderFn();

    Morphdom($root, Element(nextVNodes), {
      getNodeKey: (node) => node?.dataset?.key,
      onBeforeElUpdated: (fromEl, toEl) => {
        return !fromEl.isEqualNode(toEl);
      },
    });

    const end = new Date().getMilliseconds();
    console.log(`rerender ${componentName}:`, end - start / 1000);
  }

  vNodes = renderFn();

  console.log(vNodes);

  if (Array.isArray(vNodes)) console.error("Component is returning multiple nodes as root. Can only have one.", componentName, node.type);
  $root = Element(vNodes);

  hasRendered = true;
  return $root;
}
