const { app, BrowserWindow } = require("electron");
const path = require("path");
let mainWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      show: false,
    },
  });

  // and load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.loadURL(path.join("https://www.google.com/"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
/*
? La fonction mainWindow.once("ready-to-show", mainWindow.show) 
? permet de gérer cet événement de "prêt à être affiché" de la fenêtre principale. 
? Lorsque l'événement "ready-to-show" se produit, la fonction mainWindow.show() 
? est appelée pour afficher la fenêtre principale à l'utilisateur.

Voici une explication étape par étape de cette fonctionnalité :

mainWindow.once() : Cette fonction permet d'écouter un événement spécifique 
de la fenêtre principale. Dans ce cas, l'événement est "ready-to-show", 
qui se déclenche lorsque la fenêtre est prête à être affichée.

"ready-to-show" : C'est le nom de l'événement que nous écoutons. 
Lorsque cet événement est émis par la fenêtre principale, notre code sera exécuté.

mainWindow.show : C'est une référence à la méthode show() de l'objet mainWindow. 
La méthode show() est responsable d'afficher la fenêtre principale à l'utilisateur.
*/
  mainWindow.once("ready-to-show", mainWindow.show);

  // Listen for window being closed
  mainWindow.on("closed", () => (mainWindow = null));
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
