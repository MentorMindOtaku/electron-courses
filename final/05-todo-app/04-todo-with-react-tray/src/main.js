const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
} = require("electron");
const Store = require("electron-store");

const store = new Store({ tasks: [] });

let mainWindow, tray;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

function createTray() {
  tray = new Tray("trayTemplate@2x.png");
  tray.setToolTip("Toggle Todo App");

  tray.on("click", (event, bounds) => {
    const { x, y } = bounds;

    // Window width and height
    const { width, height } = mainWindow.getBounds();

    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      const yPosition =
        process.platform === "darwin" ? y : y - height;

      mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height,
        width,
      });
      mainWindow.show();
    }
  });
}

const createWindow = () => {
  // Create Tray
  createTray();

  app.dock.hide();
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    resizable: false,
    show: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Reassign null value to mainWindow when window closed
  mainWindow.on("closed", () => (mainWindow = null));

  mainWindow.on("blur", () => mainWindow.hide());
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// ============= Get all storage =============
ipcMain.handle("tasks:get", (error, key) => {
  // get all localStorage in web
  // const allItems = { ...localStorage };

  return store.get(key);
});

// ============= Add a task into storage =============
ipcMain.on("tasks:add", (error, { key, value }) => {
  const allTasks = store.get(key);
  store.set(key, [...allTasks, value]);
  console.log(store.get(key));
});

// ============= Edit a task =============
ipcMain.on("tasks:edit", (error, { index, key, value }) => {
  const allTasks = store.get(key);
  allTasks[index] = value;

  store.set(key, allTasks);
});

// ============= Delete a Task =============
ipcMain.on("tasks:delete", (error, { key, index }) => {
  const allTasks = store.get(key);

  const filter = allTasks.filter(
    (_, indexFilter) => indexFilter !== index
  );

  store.set(key, filter);
});

ipcMain.handle("tasks:clear", (error, key) =>
  store.set(key, [])
);
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
