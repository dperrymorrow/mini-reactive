function eventName(str) {
  return str.replace("on", "").split(".")[0].toLowerCase();
}

function modifiers(str) {
  const [trigger, ...mods] = str.split(".");
  return mods;
}

function addHandlers($el, { props }) {
  if (!props) return;

  Object.entries(props)
    .filter(([key]) => key.startsWith("on"))
    .forEach(([event, func]) => {
      const mods = modifiers(event);
      $el.addEventListener(eventName(event), (ev) => {
        mods.forEach((mod) => {
          if (mod === "prevent") ev.preventDefault();
          if (mod === "stop") ev.stopPropagation();
        });
        func(ev);
      });
    });
}

export { addHandlers };
