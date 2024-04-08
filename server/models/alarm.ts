export interface Alarm {
    id?: number;
    alarm_time: Date; // Au format texte pour SQLite
    is_active: boolean;
  }