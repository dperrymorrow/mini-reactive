import { isPrimitive } from "./utils.js";

export default function (data, cb) {
  if (isPrimitive(data)) console.error("observe must be passed an Object or Array, was passed", data);
  let store = data;
  return [
    () => store,
    (val) => {
      store = val;
      cb();
    },
  ];
}
