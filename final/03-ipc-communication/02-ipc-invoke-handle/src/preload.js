const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("app", {
  // Your code here

  askFruit: () =>
    ipcRenderer.invoke("fruit:answer").then((answer) => {
      console.log(answer);
    }),
});
