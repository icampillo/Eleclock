import React from 'react';
import {
  AlarmView,
  Clock
} from "./components";

import "./app.css"

export const App = () => {
  const [activeTab, setActiveTab] = React.useState('alarm');

  return (
    <div>
      <h1 className='main-title'>Eleclock</h1>
      <div className='button-panel'>
        <button onClick={() => setActiveTab('alarm')}>Alarme</button>
        <button onClick={() => setActiveTab('clock')}>Horloge</button>
      </div>
      <div className='content'>
        {activeTab === 'alarm' && <AlarmView />}
        {activeTab === 'clock' && <Clock/>}
      </div>
    </div>
  );
};
