// =====================
// UI MENU
// =====================
customElements.define("ui-menu-item", class extends HTMLElement {});

customElements.define(
  "ui-menu",
  class extends HTMLElement {
    connectedCallback() {
      this.toggle = this.hasAttribute("toggle");
      this.items = [...this.querySelectorAll("ui-menu-item")];

      const onChangeAttr = this.getAttribute("onChange");
      if (onChangeAttr) this.onChange = eval(onChangeAttr);

      // Shadow DOM 생성
      this.shadow = this.attachShadow({ mode: "open" });
      const container = document.createElement("div");
      container.className = "menu-wrap";

      this.items.forEach((item) => container.appendChild(item));
      this.shadow.appendChild(container);

      this.items.forEach((item) =>
        item.addEventListener("click", () => this.activate(item))
      );

      if (!this.toggle) {
        const firstActive = this.items.find(
          (i) => !i.classList.contains("disabled")
        );
        firstActive?.classList.add("active");
      }
    }

    activate(item) {
      if (item.classList.contains("disabled")) return;

      if (this.toggle) item.classList.toggle("active");
      else {
        this.items.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
      }

      this.onChange?.(
        this.toggle
          ? this.items.filter((i) => i.classList.contains("active"))
          : item
      );
    }
  }
);
