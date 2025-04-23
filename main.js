const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const mysql = require('mysql2/promise');

let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000, height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });
  const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, 'renderer/build/index.html')}`;
  await mainWindow.loadURL(startUrl);
}

app.whenReady().then(createWindow);

ipcMain.handle('db-connect', async (_, config) => {
  try {
    const conn = await mysql.createConnection(config);
    await conn.end();
    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
});

ipcMain.handle('save-config', async (_, { dbConfig, paramType, paramTypeValue, paramName, paramValue, paramComment }) => {
  const conn = await mysql.createConnection(dbConfig);
  const sql = `
    INSERT INTO tbl_config_setting_parameter
      (param_type, param_type_value, param_name, param_name_value, param_comment)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      param_type_value=VALUES(param_type_value),
      param_name_value=VALUES(param_name_value),
      param_comment=VALUES(param_comment)
  `;
  try {
    await conn.execute(sql, [paramType, paramTypeValue, paramName, paramValue, paramComment]);
    await conn.end();
    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
});
