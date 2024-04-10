export type Alarm = {
  id: number;
  alarm_time: Date;
  is_active: boolean;
};

export type AlarmResponse = {
  success: boolean;
  alarms: Alarm[];
};