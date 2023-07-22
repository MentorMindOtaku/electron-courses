const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("app", {
  // Your code here
  makeCapture: () => ipcRenderer.send("capture:create"),
  receivePathCapture: () =>
    ipcRenderer.on("capture:path", (event, path) => {
      document.getElementById("screenshot").src = path
    }),
});
