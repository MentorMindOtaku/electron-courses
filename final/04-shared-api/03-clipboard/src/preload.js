const { contextBridge, clipboard } = require("electron");

contextBridge.exposeInMainWorld("app", {
  // Your code here
  showImage: () => {
    let image = clipboard.readImage();
    document.getElementById("cbImage").src =
      image.toDataURL();
  },

  makeUpper: () => {
    let cbText = clipboard.readText();
    clipboard.writeText(cbText.toUpperCase());
  },
});
