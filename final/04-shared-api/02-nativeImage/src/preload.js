const {
  contextBridge,
  ipcRenderer,
  nativeImage,
} = require("electron");

const splash = nativeImage.createFromPath("./splash.png");

const saveToDesktop = async (data, ext) => {
  let desktopPath = await ipcRenderer.invoke("app:path");
  ipcRenderer.send("app:writeFile", { desktopPath, ext });
};

contextBridge.exposeInMainWorld("app", {
  // Your code here

  toTag: () => {
    let size = splash.getSize();

    let splashURL = splash
      .resize({
        width: Math.round(size.width / 4),
        height: Math.round(size.height / 4),
      })
      .toDataURL();
    console.log(splash.toDataURL());
    document.getElementById("preview").src = splashURL;
  },

  toPng: () => {
    let pngSplash = splash.toPNG();
    saveToDesktop(pngSplash, "png");
  },

  toJpg: () => {
    let jpgSplash = splash.toJPEG(100);
    saveToDesktop(jpgSplash, "jpg");
  },
});
