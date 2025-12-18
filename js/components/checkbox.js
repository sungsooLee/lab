// =====================
// UI CHECKBOX
// =====================
customElements.define(
  "ui-checkbox-item",
  class extends HTMLElement {
    connectedCallback() {
      const disabled = this.hasAttribute("disabled");

      this.input = document.createElement("input");
      this.input.type = "checkbox";
      if (disabled) this.input.disabled = true;
      this.input.id =
        this.input.id ||
        `ui-checkbox-${Math.random().toString(36).substr(2, 9)}`;

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
        this.classList.toggle("active", this.input.checked);
        this.closest("ui-checkbox")?.emitChange();
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
  "ui-checkbox",
  class extends HTMLElement {
    connectedCallback() {
      this.setAttribute("role", "group");
      this.items = [...this.querySelectorAll("ui-checkbox-item")];

      const onChangeAttr = this.getAttribute("onChange");
      if (onChangeAttr) this.onChange = eval(onChangeAttr);

      // Shadow DOM wrapper
      this.shadow = this.attachShadow({ mode: "open" });
      const container = document.createElement("div");
      container.className = "checkbox-wrap";
      this.items.forEach((i) => container.appendChild(i));
      this.shadow.appendChild(container);
    }

    emitChange() {
      const activeItems = this.items.filter((i) => i.checked);
      this.onChange?.(activeItems);
    }
  }
);
