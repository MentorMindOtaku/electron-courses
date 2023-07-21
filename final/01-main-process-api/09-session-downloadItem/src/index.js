const { app, BrowserWindow, session } = require("electron");
const path = require("path");

let mainWindow;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const ses = session.defaultSession;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  ses.on(
    "will-download",
    (e, downloadItem, webContents) => {
      const fileName = downloadItem.getFilename();
      const fileSize = downloadItem.getTotalBytes();

      console.log("Starting download");
      console.log(fileName);
      console.log(fileSize);

      // save to desktop
      downloadItem.setSavePath(
        app.getPath("desktop") + `/${fileName}`
      );

      downloadItem.on("updated", (e, state) => {
        const received = downloadItem.getReceivedBytes();

        if (state === "progressing" && received) {
          let progress = Math.round(
            (received / fileSize) * 100
          );
          console.log(progress);

          webContents.executeJavaScript(
            `window.progress.value = ${progress}`
          );
        }
      });
    }
  );
  // Reassign null value to mainWindow when window closed
  mainWindow.on("closed", () => (mainWindow = null));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
