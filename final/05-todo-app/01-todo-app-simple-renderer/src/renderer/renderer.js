const tasksContainer = document.querySelector(
  "#tasksContainer"
);
const addTaskBtn = document.getElementById("addTask");

addTaskBtn.addEventListener("click", () => {
  window.app.openTaskForm();
});

window.addEventListener("load", () =>
  window.app.generateTask()
);
