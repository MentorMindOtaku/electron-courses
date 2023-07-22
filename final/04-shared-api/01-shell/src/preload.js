const { contextBridge } = require("electron");
const splashPath = `${__dirname}/splash.png`;

contextBridge.exposeInMainWorld("app", {
  // Your code here
  showSite: (e) => {
    shell.openExternal("https://electronjs.org");
  },

  openSplash: (e) => {
    shell.openPath(splashPath);
  },

  showSplashFile: (e) => {
    shell.showItemInFolder(splashPath);
  },

  deleteSplashFile: (e) => {
    shell.moveItemToTrash(splashPath);
  },
});
