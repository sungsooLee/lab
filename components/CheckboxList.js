export function CheckboxList({ items, onChange }) {
  const ul = document.createElement("ul");
  ul.setAttribute("role", "group");

  items.forEach((item) => {
    const li = document.createElement("li");
    if (item.disabled) li.classList.add("disabled");

    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.disabled = !!item.disabled;
    label.append(input, document.createTextNode(item.label));

    input.addEventListener("change", () => {
      const activeItems = Array.from(ul.querySelectorAll("input:checked")).map(
        (i) => items[Array.from(ul.children).indexOf(i.closest("li"))]
      );
      onChange?.(activeItems);
    });

    li.appendChild(label);
    ul.appendChild(li);
  });

  return ul;
}
