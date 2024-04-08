import db from '../config/database';
import { Alarm } from '../models/alarm';

export class AlarmService {
    static getAllAlarms(): Promise<Alarm[]> {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM alarms', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows as Alarm[]);
                }
            });
        });
    }

    static createAlarm(time: Date): Promise<number> {
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO alarms (alarm_time, is_active) VALUES (?, ?)', [time, true], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    static deleteAlarm(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM alarms WHERE id = ?', [id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static getActiveAlarms(): Promise<Alarm[]> { 
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM alarms WHERE is_active = true', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows as Alarm[]);
                }
            });
        });
    }

    static deactivateAlarm(id: number): Promise<void> {
        return new Promise((resolve, reject) => {
            db.run('UPDATE alarms SET is_active = ? WHERE id = ?', [false, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    console.log(`L'alarme avec l'ID ${id} a été désactivée avec succès.`);
                    resolve();
                }
            });
        });
    }

    static handleAlarmOnOff(id: number, is_active: boolean): Promise<void> {
        return new Promise((resolve, reject) => {
            db.run('UPDATE alarms SET is_active = ? WHERE id = ?', [is_active, id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    console.log(`L'alarme avec l'ID ${id} a été activée/désactivée avec succès.`);
                    resolve();
                }
            });
        });
    }
}
