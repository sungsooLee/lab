// =====================
// UI TABS
// =====================
customElements.define("ui-tab-panel", class extends HTMLElement {});

customElements.define(
  "ui-tabs",
  class extends HTMLElement {
    connectedCallback() {
      this.tabButtons = [...this.querySelectorAll(".tab_menu button")];
      this.tabPanels = [
        ...this.querySelectorAll(".tab_contents > ui-tab-panel"),
      ];

      const onChangeAttr = this.getAttribute("onChange");
      if (onChangeAttr) this.onChange = eval(onChangeAttr);

      // Shadow DOM
      this.shadow = this.attachShadow({ mode: "open" });
      const wrapper = document.createElement("div");
      wrapper.className = "tabs-wrap";

      this.tabButtons.forEach((btn) => wrapper.appendChild(btn));
      this.tabPanels.forEach((panel) => wrapper.appendChild(panel));

      this.shadow.appendChild(wrapper);

      this.init();
      this.activate(0);
    }

    init() {
      this.setAttribute("role", "tablist");

      this.tabButtons.forEach((tab, i) => {
        tab.setAttribute("role", "tab");
        tab.setAttribute("tabindex", "-1");

        this.tabPanels[i].setAttribute("role", "tabpanel");

        tab.addEventListener("click", () => this.activate(i));
        tab.addEventListener("keydown", (e) => this.onKeydown(e, i));
      });
    }

    activate(index) {
      this.tabButtons.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute("aria-selected", selected);
        tab.setAttribute("tabindex", selected ? "0" : "-1");
        this.tabPanels[i].hidden = !selected;
      });

      this.tabButtons[index].focus();
      this.onChange?.(this.tabPanels[index]);
    }

    onKeydown(e, index) {
      if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
      e.preventDefault();
      const next =
        e.key === "ArrowRight"
          ? (index + 1) % this.tabButtons.length
          : (index - 1 + this.tabButtons.length) % this.tabButtons.length;
      this.activate(next);
    }
  }
);
