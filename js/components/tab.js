customElements.define(
  "ui-tabs",
  class extends HTMLElement {
    connectedCallback() {
      this.tabs = [...this.querySelectorAll(".tab_menu button")];
      this.panels = [...this.querySelectorAll(".tab_contents > div")];

      this.init();
      this.activate(0);
    }

    init() {
      this.setAttribute("role", "tablist");

      this.tabs.forEach((tab, i) => {
        tab.setAttribute("role", "tab");
        tab.setAttribute("tabindex", "-1");

        this.panels[i].setAttribute("role", "tabpanel");

        tab.addEventListener("click", () => this.activate(i));
        tab.addEventListener("keydown", (e) => this.onKeydown(e, i));
      });
    }

    activate(index) {
      this.tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute("aria-selected", selected);
        tab.setAttribute("tabindex", selected ? "0" : "-1");
        this.panels[i].hidden = !selected;
      });

      this.tabs[index].focus();
    }

    onKeydown(e, index) {
      if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;

      e.preventDefault();
      const next =
        e.key === "ArrowRight"
          ? (index + 1) % this.tabs.length
          : (index - 1 + this.tabs.length) % this.tabs.length;

      this.activate(next);
    }
  }
);
