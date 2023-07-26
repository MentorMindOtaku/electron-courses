const { contextBridge, ipcRenderer } = require("electron");
const tasks = [];

contextBridge.exposeInMainWorld("app", {
  // Your code here
  openTaskForm: () => ipcRenderer.send("task:open"),
  createTask: (task) =>
    ipcRenderer.send("task:create", task),
  generateTask: () =>
    ipcRenderer.on("task:added", (event, task) => {
      // Select container tasks
      const container = document.querySelector(
        "#tasksContainer"
      );

      tasks.push(task);

      // Delete all elements
      container.innerHTML = "";

      for (const [index, task] of tasks.entries()) {
        const div = document.createElement("div");
        div.id = `task-${index}`;
        div.className =
          "flex justify-between gap-4 flex-wrap p-4  border border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700";

        div.innerHTML = `
          <p  class="mb-2 text-xl font-semibold tracking-tight text-white">
            ${task}
          </p>

          <div class="flex items-center gap-3">
    
            <button
              type="button"
              id="delete"
              class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-indigo-800"
              >
              <div class="flex items-center justify-center gap-3">
                <img src="./icons/trash.svg" alt="trash" />
                <p>Delete</p>
              </div>
            </button>
          </div>
          
          `;

        container.append(div);

        const deleteButton = div.querySelector("#delete");

        // Delete
        deleteButton.addEventListener("click", () => {
          document.getElementById(`task-${index}`).remove();
          tasks.splice(index, 1);
        });
      }

      document
        .querySelector("main")
        .insertAdjacentElement("afterend", container);
    }),
  deleteTask: () => {},
});
