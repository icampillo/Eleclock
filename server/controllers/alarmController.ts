import { Request, Response } from 'express';
import { AlarmService } from '../services/alarmService';
import { Alarm } from '../models/alarm';

export class AlarmController {

  static async getAllAlarms(): Promise<Alarm[] | undefined> {
    try {
      return AlarmService.getAllAlarms();
    } catch (error) {
      console.log("getAlarms failed :", error)
    }
    return undefined;
  }

  static async createAlarm(time: Date): Promise<void> {
    try {
      const newAlarmId = await AlarmService.createAlarm(time);
    } catch (error) {
      console.log("createAlarms failed :", error)
    }
  }

  static async deleteAlarm(id: any): Promise<void> {
    try {
      return AlarmService.deleteAlarm(id);
    } catch (error) {
      console.log("deleteAlarms failed :", error)
    }
  }

  static async alarmIsReady(): Promise<void> {
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
        }
      });

    } catch (error) {
      console.log("alarmIsReady failed :", error)
    }
  }
}
