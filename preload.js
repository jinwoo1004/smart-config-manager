const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  connect: config => ipcRenderer.invoke('db-connect', config),
  saveConfig: params => ipcRenderer.invoke('save-config', params)
});
