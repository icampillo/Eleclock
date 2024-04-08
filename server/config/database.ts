import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('alarm.db');

db.serialize(() => {
    // Créez la table des alarmes si elle n'existe pas
    db.run(`CREATE TABLE IF NOT EXISTS alarms (
    id INTEGER PRIMARY KEY,
    alarm_time DATETIME,
    is_active BOOLEAN
)`);
});

export default db;