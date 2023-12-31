const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");

let mainWindow, tray;

const trayMenu = Menu.buildFromTemplate([
  { label: "Item 1" },
  { role: "quit" },
]);
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

function createTray() {
  tray = new Tray("trayTemplate@2x.png");
  tray.setToolTip("Tray details");

  tray.on("click", (e) => {
    if (e.shiftKey) {
      app.quit();
    } else {
      mainWindow.isVisible()
        ? mainWindow.hide()
        : mainWindow.show();
    }
  });

  tray.setContextMenu(trayMenu);
}

const createWindow = () => {
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
  
  // Reassign null value to mainWindow when window closed
  mainWindow.on("closed", () => (mainWindow = null));
  
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    createTray(); // Create tray icon after the window is ready
  });
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
