function isFunction(item) {
  return item instanceof Function;
}

function isPrimitive(item) {
  return !isFunction(item) && typeof item !== "object";
}

function randomId(length = 16) {
  return Math.random().toString(length).substring(2) + Date.now().toString(length);
}

const isElement = (vNode) => vNode?.type && !isFunction(vNode?.type);
const isTextNode = (vNode) => !vNode?.type;
const isComponent = (vNode) => isFunction(vNode?.type);
const dynamicKey = (vNode) => vNode.props && Object.keys(vNode.props).find((key) => key.startsWith(":"));

export { isFunction, isPrimitive, randomId, isElement, isTextNode, isComponent, dynamicKey };
