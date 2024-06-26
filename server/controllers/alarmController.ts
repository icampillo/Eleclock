import { AlarmService } from '../services/alarmService';
import { Alarm } from '../models/alarm';
import { BrowserWindow } from 'electron';
import { sortAlarmsByHours } from '../utils/sortAlarmsByHours';

export class AlarmController {

  static async getAllAlarms(): Promise<Alarm[] | undefined> {
    try {
      const alarms = await AlarmService.getAllAlarms();
      sortAlarmsByHours(alarms);
      return alarms;
    } catch (error) {
      console.log("getAlarms failed :", error)
    }
    return undefined;
  }

  static async createAlarm(time: Date): Promise<void> {
    try {
      await AlarmService.createAlarm(time);
    } catch (error) {
      console.log("createAlarms failed :", error)
    }
  }

  static async deleteAlarm(id: number): Promise<void> {
    try {
      return AlarmService.deleteAlarm(id);
    } catch (error) {
      console.log("deleteAlarms failed :", error)
    }
  }

  static async handleAlarmOnOff(id: number, is_active: boolean): Promise<void> {
    try {
      return AlarmService.handleAlarmOnOff(id, is_active);
    } catch (error) {
      console.log("handleAlarmOnOff failed :", error)
    }
  }

  static async alarmIsReady(mainWindow: BrowserWindow | null): Promise<void> {
    try {
      const alarms = await AlarmService.getActiveAlarms();
      const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
      const [currentHour, currentMinute] = currentTime.split(':');
      alarms.forEach(async (alarm: any) => {
        const dateObj = new Date((alarm as { alarm_time: string }).alarm_time);
        const alarmHour = dateObj.getHours().toString().padStart(2, '0');
        const alarmMinute = dateObj.getMinutes().toString().padStart(2, '0');
        if (currentHour === alarmHour && currentMinute === alarmMinute) {
          await AlarmService.deactivateAlarm(alarm.id);
          mainWindow?.webContents.send('alarm-alert', alarm);
        }
      });
    } catch (error) {
      console.log("alarmIsReady failed :", error)
    }
  }
}