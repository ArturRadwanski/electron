import { app, BrowserWindow, ipcMain, ipcRenderer } from 'electron'
require('@electron/remote/main').initialize()

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
  if (require('electron-squirrel-startup')) return app.quit()
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1300,
    height: 900,
    backgroundColor: '#191622',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.webContents.session.on('will-download', (event, item) => {
    let filters: { name: string; extensions: string[] }[] = []
    switch (item.getMimeType()) {
      case 'text/csv':
        filters = [
          {
            name: 'Comma Separated Values File',
            extensions: ['csv'],
          },
        ]
        break
      case 'text/plain':
        filters = [{ name: 'plain text', extensions: ['txt'] }]
        break
      default:
        break
    }
    item.setSaveDialogOptions({
      title: 'Save As',
      filters: [...filters, { name: 'All Files', extensions: ['*'] }],
    })
  })
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
    mainWindow!.webContents.downloadURL(message)
  })
}

app
  .on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .catch(e => console.error(e))

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
