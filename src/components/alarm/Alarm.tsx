import React, { useState, useEffect } from 'react';

import { AlarmRow } from '../alarmRow/alarm-row';

import { formatDate } from '../../helper';
import { Alarm } from '../../types';

import "./clock.css";
import { deleteAlarm, getAlarms, addAlarm } from '../../services/AlarmServices';

export const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [alarms, setAlarms] = useState([] as Alarm[]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getAlarms();
      setAlarms(data);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteAlarm(id);
      await fetchData();
    } catch (error) {
      console.error('Error adding alarm:', error);
    }
  };

  const handleAddAlarm = async (time: Date) => {
    try {
      await addAlarm(time);
      await fetchData();
    } catch (error) {
      console.error('Error adding alarm:', error);
    }
  };

  useEffect(() => {
    fetchData();
    //futur handle alert alarm
    window.ipcRender.on('alarm-alert', (data) => { console.log(data); });

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleSaveAlarm = async () => {
    const inputTime = document.querySelector('input[type="time"]') as HTMLInputElement;
    const selectedTime = inputTime.value;
    const [hours, minutes] = selectedTime.split(':');
    const newTime = new Date();
    newTime.setHours(Number(hours));
    newTime.setMinutes(Number(minutes));
    await handleAddAlarm(newTime);
  };

  return (
    <div>
      {isLoaded ?
        <div className='clock-content'>
          <p className='date'>{formatDate(time)}</p>
          <p className='clock'>{time.toLocaleTimeString()}</p>
          <div className='input-content'>
            <>Créer une alarme :</>
            <input className='input-time' type="time" />
            <button onClick={handleSaveAlarm}>Save</button>
          </div>
          <div className='alarms-content'>
            {alarms.map((alarm: Alarm, index: number) => (
              <AlarmRow alarm={alarm} index={index} deleteAlarm={handleDelete} key={index} />
            ))}
          </div>
        </div> : <div>Loading...</div>}
    </div>
  );
};