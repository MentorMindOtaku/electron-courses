const { app, BrowserWindow, session } = require("electron");
const path = require("path");

let mainWindow;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const ses = session.defaultSession;

  // const getCookies = () => {
  //   ses.cookies
  //     .get({})
  //     .then((cookies) => console.log(cookies))
  //     .catch((err) => console.error(err));
  // };

  const getCookies = (cookieName) => {
    ses.cookies
      .get({ name: cookieName })
      .then((cookies) => console.log(cookies))
      .catch((err) => console.error(err));
  };
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  // mainWindow.loadURL("https://github.com");
  mainWindow.loadFile(path.join(__dirname, "index.html"));
  // const cookie = {
  //   url: "https://myappdomain.com",
  //   name: "cookie1",
  //   value: "electron",
  // };

  const cookie = {
    url: "https://myappdomain.com",
    name: "cookie1",
    value: "electron",
    expirationDate: 1622818789,
  };

  ses.cookies.set(cookie).then(() => {
    getCookies("cookie1");
    console.log("cookie set");
  });

  // mainWindow.webContents.on("did-finish-load", () => {
  //   getCookies();
  // });

  ses.cookies
    .remove("https://myappdomain.com", "cookie1")
    .then(() => getCookies("cookie1"));

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
