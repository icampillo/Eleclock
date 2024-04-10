import React, { useEffect, useState } from 'react';
import {
  AlarmView,
  TimeView
} from "./pages";

import "./app.css"
import { Alarm } from './types';
import AlarmPopup from './components/alarmModal/alarmModal';
import { getAlarms } from './services';

export const App = () => {
  const [activeTab, setActiveTab] = React.useState('alarm');
  const [alarm, setAlarm] = useState({} as Alarm);
  const [alarms, setAlarms] = useState([] as Alarm[]);
  const [showPopup, setShowPopup] = useState(false);

  const handleDismiss = async () => {
    setShowPopup(false);
    await fetchData();
  };

  const fetchData = async () => {
    try {
      const data = await getAlarms();
      setAlarms(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
    window.ipcRender.on('alarm-alert', async (_event: Electron.IpcRendererEvent, alarm: Alarm) => {
      setAlarm(alarm);
      setShowPopup(true);
    });
  }, []);

  useEffect(() => {
  }, [alarms]);

  return (
    <div>
      <h1 className='main-title'>Eleclock</h1>
      <div className='button-panel'>
        <button style={{marginRight: "5px"}} onClick={() => setActiveTab('alarm')}>Alarme ⏰</button>
        <button onClick={() => setActiveTab('clock')}>Life Time ❤️</button>
      </div>
      <div className='content'>
        {activeTab === 'alarm' && <AlarmView alarms={alarms} fetchData={fetchData} />}
        {activeTab === 'clock' && <TimeView />}
      </div>
      {showPopup && <AlarmPopup onDismiss={handleDismiss} alarm={alarm} />}
    </div>
  );
};