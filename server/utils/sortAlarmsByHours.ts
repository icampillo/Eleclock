import { Alarm } from "../models/alarm";

export const sortAlarmsByHours = (alarms: Alarm[]) => {
    alarms.sort((a, b) => {
        const timeA = new Date(a.alarm_time).getTime();
        const timeB = new Date(b.alarm_time).getTime();
        return timeA - timeB;
    });
}
