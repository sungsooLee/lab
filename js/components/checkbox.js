// ui-checkbox-item
customElements.define(
  "ui-checkbox-item",
  class extends HTMLElement {
    connectedCallback() {
      const disabled = this.hasAttribute("disabled");

      // input 생성
      this.input = document.createElement("input");
      this.input.type = "checkbox";
      if (disabled) this.input.disabled = true;

      // 고유 id 자동 생성
      if (!this.input.id) {
        this.input.id = `ui-checkbox-${Math.random()
          .toString(36)
          .substr(2, 9)}`;
      }

      // label 생성 및 for 연결
      const label = document.createElement("label");
      label.setAttribute("for", this.input.id);

      // 기존 텍스트/HTML 콘텐츠를 label 안으로 이동
      while (this.firstChild) {
        label.appendChild(this.firstChild);
      }

      this.input.checked = this.classList.contains("active");
      this.classList.toggle("active", this.input.checked);

      // 초기화 후 input + label 추가
      this.innerHTML = "";
      this.appendChild(this.input);
      this.appendChild(label);

      // 이벤트 연결
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

// ui-checkbox
customElements.define(
  "ui-checkbox",
  class extends HTMLElement {
    connectedCallback() {
      this.setAttribute("role", "group");

      if (this.hasAttribute("onChange")) {
        this.onChange = new Function("items", this.getAttribute("onChange"));
      }

      this.items = [...this.querySelectorAll("ui-checkbox-item")];
    }

    emitChange() {
      const activeItems = this.items.filter((item) => item.checked);
      this.onChange?.(activeItems);
    }
  }
);
