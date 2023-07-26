const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('app', {
  // Your code here
});
