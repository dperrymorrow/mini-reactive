function isFunction(item) {
  return item instanceof Function;
}

function isPrimitive(item) {
  return !isFunction(item) && typeof item !== "object";
}

export { isFunction, isPrimitive };
