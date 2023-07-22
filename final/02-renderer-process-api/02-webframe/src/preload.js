const { contextBridge, webFrame } = require("electron");

contextBridge.exposeInMainWorld("app", {
  // Your code here
  zoomUp: () => {
    webFrame.setZoomLevel(webFrame.getZoomLevel() + 1);
  },
  zoomDown: () => {
    webFrame.setZoomLevel(webFrame.getZoomLevel() - 1);
  },
  zoomReset: () => {
    webFrame.setZoomLevel(1);
  },
});
