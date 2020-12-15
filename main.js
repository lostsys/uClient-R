const { app, BrowserWindow, screen, globalShortcut,shell} = require('electron');

//Disables FPS.
app.commandLine.appendSwitch('disable-frame-rate-limit');
app.commandLine.appendSwitch("disable-gpu-vsync");


app.on("ready",() => {
    if (!app.requestSingleInstanceLock()) app.quit();

    //Creates BrowserWindows.
    let gameWindow = new BrowserWindow({
		width: screen.width,
		height: screen.height,
		fullscreen: true,
		show: false,
		autoHideMenuBar: true,
		webPreferences: {
            nodeIntegration: false,
            preload: `${__dirname}/game.js`
		}
    })
    
    gameWindow.loadURL("https://repuls.io");

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

    globalShortcut.register("F11",() => {
        gameWindow.setFullScreen(!gameWindow.isFullScreen());
    })

    globalShortcut.register("F9",() => {
        gameWindow.webContents.openDevTools({
            mode: "undocked"
        });
    })

    globalShortcut.register("Alt+F4",() => {
        app.quit();
    })
})

app.on("before-quit",() => {
    globalShortcut.unregisterAll();
})
