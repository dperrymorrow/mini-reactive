const eventName = (event) => event.replace("on", "").toLowerCase();

function addHandlers($el, { props }) {
  if (!props) return;

  Object.entries(props)
    .filter(([key]) => key.startsWith("on"))
    .forEach(([event, func]) => {
      $el.addEventListener(eventName(event), func);
    });
}

export { addHandlers };
