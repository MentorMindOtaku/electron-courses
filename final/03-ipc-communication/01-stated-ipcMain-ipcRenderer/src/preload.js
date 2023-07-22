const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("app", {
  // Your code here
  channel: () =>
    ipcRenderer.on("channel1-response", (e, args) => {
      console.log(args);
    }),
  mailBox: () =>
    ipcRenderer.on("mailbox", (e, args) => {
      console.log(args);
    }),
  send: () =>
    ipcRenderer.sendSync(
      "sync-message",
      "Waiting for response"
    ),
});
