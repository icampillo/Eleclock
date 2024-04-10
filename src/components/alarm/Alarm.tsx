import React, { useState } from 'react';

import { AlarmRow } from '../alarmRow/alarm-row';
import { Alarm } from '../../types';

import { deleteAlarm, addAlarm } from '../../services/AlarmServices';

import "./alarm.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { formatTimeHHMM } from '../../helper';

interface AlarmProps {
  alarms: Alarm[];
  fetchData: () => void;
}

export const AlarmComponent: React.FC<AlarmProps> = ({ alarms, fetchData }) => {
  const [inputError, setInputError] = useState<boolean>(false);

  const handleDelete = async (id: number) => {
    try {
      await deleteAlarm(id);
      await fetchData();
      toast(`Alarme supprimé ⏰`); // Remove extra curly braces
    } catch (error) {
      console.error('Error adding alarm:', error);
    }
  };

  const handleAddAlarm = async (time: Date) => {
    try {
      await addAlarm(time);
      await fetchData();
      toast(`Alarme enregistré pour ${formatTimeHHMM(time)} ⏰`); // Remove extra curly braces
    } catch (error) {
      console.error('Error adding alarm:', error);
    }
  };

  const handleSaveAlarm = async () => {
    const inputTime = document.querySelector('input[type="time"]') as HTMLInputElement;
    if (!inputTime.value) {
      setInputError(true);
      return;
    }
    setInputError(false);
    const selectedTime = inputTime.value;
    const [hours, minutes] = selectedTime.split(':');
    const newTime = new Date();
    newTime.setHours(Number(hours));
    newTime.setMinutes(Number(minutes));
    await handleAddAlarm(newTime);
  };

  return (
    <div>
      <div className='input-content'>
        <>Créer une alarme :</>
        <input className='input-time' type="time" />
        <button onClick={handleSaveAlarm}>Save</button>
      </div>
      {inputError && (
          <p style={{ color: '#AE281E' }}>Veuillez entrer une date de naissance valide.</p>
        )}
      <div className='alarms-content'>
        {alarms.map((alarm: Alarm, index: number) => (
          <AlarmRow alarm={alarm} index={index} deleteAlarm={handleDelete} key={index} />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};