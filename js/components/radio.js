// =====================
// UI RADIO
// =====================
customElements.define(
  "ui-radio-item",
  class extends HTMLElement {
    connectedCallback() {
      const disabled = this.hasAttribute("disabled");

      this.input = document.createElement("input");
      this.input.type = "radio";
      this.input.name =
        this.closest("ui-radio")?.name ||
        `ui-radio-${Math.random().toString(36).substr(2, 5)}`;
      if (disabled) this.input.disabled = true;
      this.input.id =
        this.input.id || `ui-radio-${Math.random().toString(36).substr(2, 9)}`;

      const label = document.createElement("label");
      label.setAttribute("for", this.input.id);
      while (this.firstChild) label.appendChild(this.firstChild);

      this.input.checked = this.classList.contains("active");
      this.classList.toggle("active", this.input.checked);

      // Shadow DOM
      this.shadow = this.attachShadow({ mode: "open" });
      const container = document.createElement("div");
      container.append(this.input, label);
      this.shadow.appendChild(container);

      this.input.addEventListener("change", () => {
        if (this.input.checked) this.closest("ui-radio")?.updateActive(this);
      });
    }

    get checked() {
      return this.input.checked;
    }
    set checked(val) {
      this.input.checked = val;
      this.classList.toggle("active", val);
    }
  }
);

customElements.define(
  "ui-radio",
  class extends HTMLElement {
    connectedCallback() {
      this.setAttribute("role", "radiogroup");
      this.items = [...this.querySelectorAll("ui-radio-item")];
      this.name =
        this.getAttribute("name") ||
        `ui-radio-${Math.random().toString(36).substr(2, 5)}`;

      const onChangeAttr = this.getAttribute("onChange");
      if (onChangeAttr) this.onChange = eval(onChangeAttr);

      // Shadow DOM wrapper
      this.shadow = this.attachShadow({ mode: "open" });
      const container = document.createElement("div");
      container.className = "radio-wrap";
      this.items.forEach((i) => container.appendChild(i));
      this.shadow.appendChild(container);

      const firstActive = this.items.find((i) => i.checked) || this.items[0];
      firstActive.checked = true;
      this.updateActive(firstActive);
    }

    updateActive(activeItem) {
      this.items.forEach((i) => (i.checked = i === activeItem));
      this.onChange?.(activeItem);
    }
  }
);
