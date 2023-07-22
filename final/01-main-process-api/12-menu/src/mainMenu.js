module.exports = [
  {
    label: "Electron",
    submenu: [
      { label: "Item 1" },
      {
        label: "Item 2",
        submenu: [{ label: "Submenu 1" }],
      },
      {
        label: "Item 3",
        enable: false,
      },
      {
        label: "Edit",
        submenu: [
          { role: "undo" },
          { role: "redo" },
          { role: "copy" },
          { role: "paste" },
        ],
      },
    ],
  },
  {
    label: "Action",
    submenu: [
      { label: "Devtools", role: "toggleDevTools" },
      { role: "toggleFullScreen" },
      {
        label: "Great",
        accelerator: "Shift+Alt+G",
        click: () => console.log("Hello from Main Menu"),
      },
    ],
  },
];
