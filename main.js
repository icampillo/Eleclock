const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const sound = require("sound-play");

let mainWindow;
let db;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
}

app.whenReady().then(() => {
  createWindow();
  db = new sqlite3.Database('alarm.db', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      db.run(`CREATE TABLE IF NOT EXISTS alarms (
        id INTEGER PRIMARY KEY,
        alarm_time DATETIME,
        is_active BOOLEAN
    )`, (err) => {
        if (err) {
          console.error('Erreur lors de la création de la table :', err.message);
        } else {
          console.log('Table "alarms" créée avec succès.');
        }
      });
      console.log('Connected to the alarm database.');
    }
  });
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

setInterval(() => {
  db.all('SELECT * FROM alarms WHERE is_active = true', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la récupération des alarmes :', err.message);
    } else {
      console.log('Alarmes récupérées avec succès.');
      const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
      const [currentHour, currentMinute] = currentTime.split(':');
      rows.forEach(async (alarm) => {
        const dateObj = new Date(alarm.alarm_time);
        const alarmHour = dateObj.getHours().toString().padStart(2, '0');
        const alarmMinute = dateObj.getMinutes().toString().padStart(2, '0');

        // Comparer l'heure actuelle avec l'heure de l'alarme
        // console.log(`Heure actuelle : ${currentHour}:${currentMinute}`);
        // console.log(`Heure de l'alarme : ${alarmHour}:${alarmMinute}`);
        if (currentHour === alarmHour && currentMinute === alarmMinute) {
          console.log(`Il est temps de sonner l'alarme pour l'ID ${alarm.id} !`);
          db.run('UPDATE alarms SET is_active = ? WHERE id = ?', [false, alarm.id], function (err) {
            if (err) {
              console.error('Erreur lors de la mise à jour de l\'alarme :', err.message);
            } else {
              console.log(`L'alarme avec l'ID ${alarm.id} a été désactivée avec succès.`);
            }
          });
          sound.play("src/res/mp3/radar2.mp3");
          windowName.webContents.send('alarm-alert', data);
          // event.reply('dring-dring', { success: true, alarms: rows });
          // Ajoutez ici le code pour déclencher votre alarme (jouer un son, afficher une notification, etc.)
        }
      });
    }
  });
}, 3000);

ipcMain.handle('add-alarm', (event, args) => {
  // Logique pour ajouter une alarme dans la base de données
  const time = args.time;
  console.log('Ajout d\'une alarme à', time, '.')
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO alarms (alarm_time, is_active) VALUES (?, ?)', [time, true], function (err) {
      if (err) {
        console.log('Error add-alarm', err.message)
        reject(err);
      }
      console.log('Nouvelle alarme ajoutée avec succès.');
      resolve({ success: true });
    });
  });
});

// Delete alarm by ID from the database 
ipcMain.handle('delete-alarm', (event, args) => {
  const id = args.id;
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM alarms WHERE id = ?', [id], function (err) {
      if (err) {
        console.error('Erreur lors de la suppression de l\'alarme :', err.message);
        reject(err);
      } else {
        console.log('Alarme supprimée avec succès.');
        resolve("success");
      }
    }
    )
  });
});

// Get all alarms from the database
ipcMain.handle('get-alarms', async (event, data) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM alarms', (err, rows) => {
      if (err) {
        console.error('Erreur lors de la récupération des alarmes :', err.message);
        reject(err);
      } else {
        console.log('Alarmes récupérées avec succès.');
        console.log(rows)
        resolve(rows);
      }
    });
  });
});