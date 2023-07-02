import { saveState, getState } from "./localStorage";
import { enableDraggingManagement } from "./draggingModule.js";

const lists = document.querySelectorAll(".list");
const form = document.querySelectorAll(".form");
const btn = document.querySelectorAll(".add__btn");

let state = getState();

function renderTasks() {
  lists.forEach((list, index) => {
    list.innerHTML = "";

    state[index].tasks.forEach((task) => {
      const newItem = createTaskItem(task);
      list.appendChild(newItem);
    });

    enableDraggingManagement(state, lists);
  });
}

function createTaskItem(task) {
  const item = document.createElement("div");
  item.classList.add("list__item");
  item.classList.add("draggable");
  item.draggable = true;
  item.textContent = task;

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-times", "delete-icon");
  item.appendChild(deleteIcon);

  deleteIcon.addEventListener("click", () => {
    const taskIndex = state.findIndex((list) => list.tasks.includes(task));
    state[taskIndex].tasks = state[taskIndex].tasks.filter((t) => t !== task);
    saveState(state);
    item.remove();
  });

  return item;
}

function addTask(index) {
  const currentForm = form[index];
  const cancelBtn = currentForm.querySelector(".cancel__item-btn");
  const textarea = currentForm.querySelector(".textarea");
  const currentAddBtn = currentForm.querySelector(".add__item-btn");
  const currentBtn = currentForm.nextElementSibling;

  const clearForm = () => {
    textarea.value = "";
    currentForm.style.display = "none";
    currentBtn.style.display = "flex";
  };

  currentBtn.addEventListener("click", () => {
    currentForm.style.display = "block";
    currentBtn.style.display = "none";
    currentAddBtn.style.display = "none";
  });

  cancelBtn.addEventListener("click", clearForm);

  currentAddBtn.addEventListener("click", () => {
    const newItem = createTaskItem(textarea.value);
    lists[index].appendChild(newItem);
    enableDraggingManagement(state, lists);
    state[index].tasks.push(textarea.value);
    saveState(state);
    textarea.value = "";
    clearForm();
  });

  btn[index].addEventListener("click", () => {
    currentForm.style.display = "block";
    currentBtn.style.display = "none";
    currentAddBtn.style.display = "block";
    textarea.focus();
  });
}

function changeTitle() {
  const titles = document.querySelectorAll(".title");
  titles.forEach((title) => {
    title.addEventListener("click", (e) => (e.target.textContent = ""));
  });
}

function initializeState() {
  if (state.length === 0) {
    lists.forEach(() => {
      state.push({ tasks: [] });
    });
    saveState(state);
  } else {
    renderTasks();
  }
}

addTask(0);
addTask(1);
changeTitle();
initializeState();
