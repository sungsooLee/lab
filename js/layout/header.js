customElements.define(
  "layout-header",
  class extends HTMLElement {
    connectedCallback() {
      const title = this.getAttribute("title") ?? "";

      this.innerHTML = `
        <header class="header_wrap">
          <h1>${title}</h1>
        </header>
      `;
    }
  }
);
