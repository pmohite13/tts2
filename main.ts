import { app, BrowserWindow, screen, Menu, globalShortcut } from "electron";
import * as path from "path";
import * as url from "url";

let win, serve;
const args = process.argv.slice(1);
serve = args.some((val) => val === "--serve");

let appmenu = require("./menu.js");
let menu = appmenu.ApplicationMenu;

function registerShortCuts() {
  globalShortcut.unregisterAll();
  globalShortcut.register("Ctrl+N", () => {
    win.webContents.send("open-company", "company");
  });
}
function createWindow() {
  debugger;
  registerShortCuts();
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  menu.items[0]["submenu"].items[0].click = () => {
    win.webContents.send("open-company", "company");
  };

  menu.items[0]["submenu"].items[2].click = () => {
    win.webContents.send("open-department", "department");
  };

  menu.items[0]["submenu"].items[4].click = () => {
    win.webContents.send("open-division", "division");
  };

  menu.items[0]["submenu"].items[6].click = () => {
    win.webContents.send("open-grade", "grade");
  };

  menu.items[0]["submenu"].items[8].click = () => {
    win.webContents.send("open-category", "category");
  };
  menu.items[0]["submenu"].items[10].click = () => {
    win.webContents.send("open-holiday", "holiday");
  };
  menu.items[0]["submenu"].items[12].click = () => {
    win.webContents.send("open-shift", "shift");
  };
  menu.items[0]["submenu"].items[14].click = () => {
    win.webContents.send("open-employee", "employee");
  };

  menu.items[1].click = () => {
    app.quit();
  };

  if (serve) {
    require("electron-reload")(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`),
    });
    win.loadURL("http://localhost:4200");
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "dist/index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }

  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", createWindow);

  // Quit when all windows are closed.
  app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}
