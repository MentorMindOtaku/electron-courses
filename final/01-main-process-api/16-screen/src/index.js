const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

let mainWindow;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  let displays = screen.getAllDisplays();

  let primaryDisplay = screen.getPrimaryDisplay();

  // console.log(`${displays[0].size.width} x ${displays[0].size.height}`)
  // console.log(`${displays[0].bounds.x}, ${displays[0].bounds.y}`)
  // console.log(`${displays[1].size.width} x ${displays[1].size.height}`)
  // console.log(`${displays[1].bounds.x}, ${displays[1].bounds.y}`)
  //
  // screen.on( 'display-metrics-changed', (e, display, metricsChanged) => {
  //   console.log(metricsChanged)
  // })
  //
  // setInterval( () => {
  //   console.log( screen.getCursorScreenPoint() )
  // }, 100)

  mainWindow = new BrowserWindow({
    x: primaryDisplay.bounds.x,
    y: primaryDisplay.bounds.y,
    width: primaryDisplay.size.width / 2,
    height: primaryDisplay.size.height,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

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
