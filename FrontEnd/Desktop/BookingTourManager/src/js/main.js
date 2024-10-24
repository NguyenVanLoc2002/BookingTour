const { app, BrowserWindow } = require('electron');
const path = require('path');

// Sử dụng electron-reload mà không chỉ rõ đường dẫn electron
require('electron-reload')(path.join(__dirname, '../html'), {
  hardResetMethod: 'exit' // Phương pháp hard reset khi có thay đổi lớn
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,  // Cho phép sử dụng require trong render
      contextIsolation: false // Cho phép render và main giao tiếp
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../html/listTour.html'));
  // mainWindow.loadFile(path.join(__dirname, '../html/createTour.html'));
}

app.whenReady().then(createWindow);
