const { app, BrowserWindow } = require("electron");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/dist/oes/index.html`);
  // hides the dock icon for our app which allows our windows to join other
  // apps' spaces. without this our windows open on the nearest "desktop" space
  // app.dock.hide();
  // "floating" + 1 is higher than all regular windows, but still behind things
  // like spotlight or the screen saver
  win.setAlwaysOnTop(true, "floating", 1);
  // allows the window to show over a fullscreen window
  win.setVisibleOnAllWorkspaces(true);
  // Open the DevTools.
  win.webContents.openDevTools();
  //win.maximize();
  win.setFullScreen(true);
  // Emitted when the window is closed.
  win.webContents.on("devtools-opened", () => {
    win.webContents.closeDevTools();
  });
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
