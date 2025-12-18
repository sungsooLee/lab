const components = {
  "layout-header": () => import("./layout/header.js"),
  "ui-tabs": () => import("./components/tab.js"),
  "ui-checkbox": () => import("./components/checkbox.js"),
  "ui-radio": () => import("./components/radio.js"),
  "ui-menu": () => import("./components/menu-list.js"),
};

Object.entries(components).forEach(([tag, loader]) => {
  if (document.querySelector(tag)) {
    loader();
  }
});
