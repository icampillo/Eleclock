import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import sqlite3 from 'sqlite3';

import { AlarmController } from './controllers/alarmController';

import db from './config/database';

let mainWindow: BrowserWindow | null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadFile(path.join(__dirname, '../index.html'));
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error('Erreur lors de la fermeture de la base de données:', err.message);
      } else {
        console.log('Base de données fermée avec succès.');
      }
    });
  }
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

//check every 3s if an alarm is ready
setInterval(() => {
  AlarmController.alarmIsReady();
}, 3000);

// get alarms
ipcMain.handle('get-alarms', async (event, data) => {
  try {
    return AlarmController.getAllAlarms();
  } catch (error) {
    console.error('Error fetching alarms:', error);
  }
});

// Add alarm
ipcMain.handle('add-alarm', (event, args) => {
  const time = args.time;
  try {
    console.log('Ajout d\'une alarme à', time, '.')
    return AlarmController.createAlarm(time);
  } catch (error) {
    console.error('Error adding alarm:', error);
  }
});

// Delete alarm by ID 
ipcMain.handle('delete-alarm', async (event, args) => {
  const id = args.id;
  try {
    await AlarmController.deleteAlarm(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting alarm:', error);
  }
});