// components/MenuList.js
export function MenuList({ items, renderItem, onChange, toggle = false }) {
  const ul = document.createElement("ul");
  ul.className = "menu";
  ul.setAttribute("role", "menu");

  ul.innerHTML = items
    .map(
      (item, index) => `
      <li class="${item.disabled ? "disabled" : ""}" data-index="${index}">
        <a href="${item.href ?? "#"}" role="menuitem" ${
        item.disabled ? 'aria-disabled="true"' : ""
      }>
          ${renderItem(item, index)}
        </a>
      </li>
    `
    )
    .join("");

  // 초기 active: 첫 번째 활성 메뉴 (toggle=false일 경우)
  if (!toggle) {
    const firstActive = Array.from(ul.children).find(
      (li) => !li.classList.contains("disabled")
    );
    firstActive?.classList.add("active");
  }

  ul.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    const li = a.closest("li");
    if (li.classList.contains("disabled")) return;

    if (toggle) {
      li.classList.toggle("active");
      const activeItems = Array.from(ul.querySelectorAll("li.active")).map(
        (li) => items[li.dataset.index]
      );
      onChange?.(activeItems);
    } else {
      ul.querySelector(".active")?.classList.remove("active");
      li.classList.add("active");
      onChange?.(items[li.dataset.index]);
    }
  });

  // Enter/Space 키 지원
  ul.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.target.click();
    }
  });

  return ul;
}
