// ui-menu-item
customElements.define(
  "ui-menu-item",
  class extends HTMLElement {
    connectedCallback() {
      if (this.hasAttribute("disabled")) {
        this.setAttribute("aria-disabled", "true");
      }
    }
  }
);

// ui-menu-list
customElements.define(
  "ui-menu-list",
  class extends HTMLElement {
    connectedCallback() {
      this.toggle = this.hasAttribute("toggle");

      // onChange: HTML 속성 → 함수, 혹은 JS 프로퍼티에서 가져오기
      if (this.hasAttribute("onChange")) {
        this.onChange = new Function("item", this.getAttribute("onChange"));
      }

      this.items = [...this.querySelectorAll("ui-menu-item")];
      this.init();
    }

    init() {
      this.setAttribute("role", "menu");

      this.items.forEach((item) => {
        item.setAttribute("role", "menuitem");
        item.setAttribute("tabindex", "-1");

        item.addEventListener("click", () => this.onSelect(item));
        item.addEventListener("keydown", (e) => this.onKeydown(e, item));
      });

      // 초기 활성화: toggle=false이면 첫 번째 활성화
      if (!this.toggle) {
        const firstActive = this.items.find((i) => !i.hasAttribute("disabled"));
        firstActive?.classList.add("active");
        firstActive?.setAttribute("tabindex", "0");
      }
    }

    onSelect(item) {
      if (item.hasAttribute("disabled")) return;

      if (this.toggle) {
        item.classList.toggle("active");
      } else {
        this.items.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");

        // tabindex 업데이트
        this.items.forEach((i) => i.setAttribute("tabindex", "-1"));
        item.setAttribute("tabindex", "0");
      }

      // onChange 호출
      if (this.onChange) {
        if (this.toggle) {
          const activeItems = this.items.filter((i) =>
            i.classList.contains("active")
          );
          this.onChange(activeItems);
        } else {
          this.onChange(item);
        }
      }
    }

    onKeydown(e, item) {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        const currentIndex = this.items.indexOf(item);
        let nextIndex;

        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          nextIndex = (currentIndex + 1) % this.items.length;
        } else {
          nextIndex =
            (currentIndex - 1 + this.items.length) % this.items.length;
        }

        this.items[nextIndex].focus();
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        item.click();
      }
    }
  }
);
