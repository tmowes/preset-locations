import { app } from 'electron'
import serve from 'electron-serve'

import { createWindow } from './helpers'

const WIDTH_SIZE = 640
const HEIGHT_SIZE = 360

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

// eslint-disable-next-line prettier/prettier
(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    autoHideMenuBar: true,
    transparent: true,
    frame: false,
    minWidth: WIDTH_SIZE,
    width: WIDTH_SIZE,
    maxWidth: WIDTH_SIZE,
    minHeight: HEIGHT_SIZE,
    height: HEIGHT_SIZE,
    maxHeight: HEIGHT_SIZE,
  })
  const gotTheLock = app.requestSingleInstanceLock()

  if (!gotTheLock) {
    app.quit()
  } else {
    app.on('second-instance', () => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
      }
    })
  }

  if (isProd) {
    await mainWindow.loadURL('app://./home.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    // mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})
