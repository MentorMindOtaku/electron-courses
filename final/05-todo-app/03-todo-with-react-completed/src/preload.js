const { contextBridge, ipcRenderer } = require("electron");
const key = "tasks";
contextBridge.exposeInMainWorld("app", {
  // Your code here
  getLocationStorage: () => {
    return ipcRenderer
      .invoke("tasks:get", key)
      .then((value) => {
        console.log(value);
        return value;
      });
  },
  createTask: (task) =>
    ipcRenderer.send("tasks:add", {
      key,
      value: task,
    }),

  editTask: (index, task) =>
    ipcRenderer.send("tasks:edit", {
      index,
      key,
      value: task,
    }),

  deleteTask: (index) => {
    ipcRenderer.send("tasks:delete", { key, index });
  },
  deleteAllTasks: () =>
    ipcRenderer
      .invoke("tasks:clear", key)
      .then((result) => result),
});
