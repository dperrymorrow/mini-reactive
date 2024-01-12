import htm from "https://unpkg.com/htm?module";
import hyperx from "https://unpkg.com/hyperx@3.0.1/index.js";
import { dynamicKey } from "./utils.js";

const h = (type, props, ...children) => ({ type, props, children: children });

// const html = htm.bind(h);
const html = hyperx.bind(h);

function findDynamic(vNode, list = []) {
  if (dynamicKey(vNode)) list.push(vNode);
  if (vNode.children) vNode.children.forEach((child) => findDynamic(child, list));
  return list;
}

function findNeedsRendered(oldNodes, newNodes) {
  const toRender = [];

  newNodes.forEach((node) => {
    const key = dynamicKey(node);
    const match = oldNodes.find((node) => Object.keys(node.props).includes(key));
    if (match && match.props[key] !== node.props[key]) toRender.push(node);
  });

  return toRender;
}

export { html, findDynamic, findNeedsRendered };
