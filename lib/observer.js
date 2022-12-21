function buildProxy(poj, callback) {
  return new Proxy(poj, {
    get() {
      const value = Reflect.get(...arguments);

      return value &&
        typeof value === "object" &&
        ["Array", "Object"].includes(value.constructor.name)
        ? buildProxy(value, callback)
        : value;
    },

    set() {
      const ret = Reflect.set(...arguments);
      callback();
      return ret;
    },

    deleteProperty() {
      const ret = Reflect.deleteProperty(...arguments);
      callback();
      return ret;
    },
  });
}

export default buildProxy;
