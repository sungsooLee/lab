// ui-radio-item
customElements.define(
  "ui-radio-item",
  class extends HTMLElement {
    connectedCallback() {
      const disabled = this.hasAttribute("disabled");

      // input 생성
      this.input = document.createElement("input");
      this.input.type = "radio";
      this.input.name =
        this.closest("ui-radio")?.name ||
        "ui-radio-" + Math.random().toString(36).substr(2, 5);
      if (disabled) this.input.disabled = true;

      // 고유 id 생성
      if (!this.input.id) {
        this.input.id = `ui-radio-${Math.random().toString(36).substr(2, 9)}`;
      }

      // label 생성 및 for 연결
      const label = document.createElement("label");
      label.setAttribute("for", this.input.id);

      // 기존 텍스트/HTML 콘텐츠를 label 안으로 이동
      while (this.firstChild) {
        label.appendChild(this.firstChild);
      }

      // 초기 선택
      if (this.classList.contains("active")) {
        this.input.checked = true;
      }
      this.classList.toggle("active", this.input.checked);

      // 초기화 후 input + label 추가
      this.innerHTML = "";
      this.appendChild(this.input);
      this.appendChild(label);

      // 이벤트
      this.input.addEventListener("change", () => {
        if (this.input.checked) {
          this.closest("ui-radio")?.updateActive(this);
        }
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

// ui-radio
customElements.define(
  "ui-radio",
  class extends HTMLElement {
    connectedCallback() {
      this.setAttribute("role", "radiogroup");
      this.items = [...this.querySelectorAll("ui-radio-item")];
      this.name =
        this.getAttribute("name") ||
        "ui-radio-" + Math.random().toString(36).substr(2, 5);

      if (this.hasAttribute("onChange")) {
        this.onChange = new Function("item", this.getAttribute("onChange"));
      }

      // 첫 번째 선택 상태 초기화
      const firstActive =
        this.items.find((item) => item.checked) || this.items[0];
      firstActive.checked = true;
      this.updateActive(firstActive);
    }

    updateActive(activeItem) {
      this.items.forEach((item) => {
        item.checked = item === activeItem;
      });
      this.onChange?.(activeItem);
    }
  }
);
