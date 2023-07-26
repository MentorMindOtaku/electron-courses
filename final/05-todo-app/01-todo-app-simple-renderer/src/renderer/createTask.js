const input = document.getElementById("task");
const button = document.getElementById("submit");
const form = document.getElementById("create-task");

input.addEventListener("input", (event) => {
  // Récupérer la valeur saisie dans l'input
  const value = event.target.value;

  if (value) {
    button.disabled = false;
    button.classList.remove("cursor-not-allowed");
  } else {
    button.disabled = true;
    button.classList.add("cursor-not-allowed");
  }
});

form.addEventListener("submit", () => {
  window.app.createTask(input.value);
});
