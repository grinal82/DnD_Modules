import { saveState } from "./localStorage";

function enableDraggingManagement(state, lists) {
  const draggables = document.querySelectorAll(".draggable");
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
      updateState(state, lists);
    });
  });

  lists.forEach((list) => {
    list.addEventListener("dragover", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(list, e.clientY);
      const draggable = document.querySelector(".dragging");
      if (afterElement == null) {
        list.appendChild(draggable);
      } else {
        list.insertBefore(draggable, afterElement);
      }
    });
  });
}

function getDragAfterElement(list, y) {
  const draggableElements = [
    ...list.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function updateState(state, lists) {
  const updatedState = [];

  lists.forEach((list) => {
    const tasks = Array.from(list.querySelectorAll(".list__item")).map(
      (item) => item.textContent
    );
    updatedState.push({ tasks });
  });

  state = updatedState;
  saveState(state);
}

export { enableDraggingManagement };
