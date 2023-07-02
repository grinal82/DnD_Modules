const lists = document.querySelectorAll(".list");

export function saveState(state) {
  localStorage.setItem("listState", JSON.stringify(state));
}

export function getState() {
  const storedState = localStorage.getItem("listState");
  return storedState ? JSON.parse(storedState) : [];
}

export function updateState(state) {
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
