// main/alarmController.ts

import { Database } from 'sqlite3';

// Créer une base de données SQLite en mémoire
const db = new Database(':memory:');

// Créer une table pour stocker les alarmes
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS alarms (id INTEGER PRIMARY KEY AUTOINCREMENT, time TEXT)');
});

// Fonction pour ajouter une alarme dans la base de données
export function addAlarm(time: string, callback: Function) {
  db.run(`INSERT INTO alarms (time) VALUES (?)`, [time], (err) => {
    if (err) {
      console.error(err.message);
      callback(err.message, null);
    } else {
      console.log('Alarm added successfully');
      callback(null, 'Alarm added successfully');
    }
  });
}

// Fonction pour récupérer toutes les alarmes de la base de données
export function getAllAlarms(callback: Function) {
  db.all('SELECT * FROM alarms', (err, rows) => {
    if (err) {
      console.error(err.message);
      callback(err.message, null);
    } else {
      console.log('All alarms retrieved successfully');
      callback(null, rows);
    }
  });
}

// Autres fonctions de manipulation des alarmes (suppression, mise à jour, etc.) peuvent être ajoutées ici
