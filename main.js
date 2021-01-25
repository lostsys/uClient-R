const { app, BrowserWindow, screen, globalShortcut, shell, clipboard} = require('electron');
const { autoUpdater } = require("electron-updater");

app.commandLine.appendSwitch("disable-frame-rate-limit");
app.commandLine.appendSwitch("disable-gpu-vsync");
app.commandLine.appendSwitch("enable-accelerated-2d-canvas");
app.commandLine.appendSwitch("ignore-gpu-blacklist");

function createWindow() {
     //Creates BrowserWindows.
     let gameWindow = new BrowserWindow({
		width: screen.getPrimaryDisplay().workAreaSize.width,
		height: screen..getPrimaryDisplay().workAreaSize.height,
		fullscreen: false,
		show: false,
    })
    gameWindow.removeMenu();
    gameWindow.loadURL("https://repuls.io");
    
    //AutoUpdater.
    checkForUpdate();

    //Shows Window when Ready. 
    gameWindow.on("ready-to-show",() => {
        gameWindow.show();
        gameWindow.focus();
    })

    gameWindow.webContents.on("new-window",(e, url) => {
        if (new URL(url).hostname != "repuls.io") {
            e.preventDefault();
            shell.openExternal(url);
        }
    })
    
    globalShortcut.register("F1",() => {
        if (new URL(gameWindow.webContents.getURL()).hostname != "repuls.io") gameWindow.loadURL("https://repuls.io");
    })
    globalShortcut.register("F2",() => {
        if (new URL(clipboard.readText()).hostname == "repuls.io" && new URL(clipboard.readText()).pathname.split("?r=").length > 1) gameWindow.loadURL(clipboard.readText());
    })
    globalShortcut.register("F11",() => {
        gameWindow.setFullScreen(!gameWindow.isFullScreen());
    })
    globalShortcut.register("F9",() => {
        gameWindow.webContents.openDevTools({
            mode: "undocked"
        });
    })
    globalShortcut.register('CommandOrControl+F5', () => {
		gameWindow.webContents.reloadIgnoringCache();
	})
    globalShortcut.register("Alt+F4",() => {
        app.quit();
    })

    app.on("before-quit",() => {
        globalShortcut.unregisterAll();
    })
}

function checkForUpdate(){
    autoUpdater.checkForUpdatesAndNotify();
    autoUpdater.once('update-available', () => {
        gameWindow.webContents.executeJavaScript(`alert("Update is available and will be installed in the background.")`)
    })
    autoUpdater.on('update-downloaded', () => {
        gameWindow.webContents.executeJavaScript(`alert("The latest update will be installed now.")`).then(() => autoUpdater.quitAndInstall())
    });
}
