export function RadioList({ items, onChange }) {
  const ul = document.createElement("ul");
  ul.setAttribute("role", "radiogroup");

  items.forEach((item, i) => {
    const li = document.createElement("li");
    if (item.disabled) li.classList.add("disabled");

    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "radio-list";
    input.disabled = !!item.disabled;
    if (i === 0) input.checked = true; // 첫 번째 선택
    label.append(input, document.createTextNode(item.label));

    input.addEventListener("change", () => onChange?.(item));

    li.appendChild(label);
    ul.appendChild(li);
  });

  return ul;
}
