import React from 'react';
import {
  AlarmView,
  TimeView
} from "./pages";

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
        {activeTab === 'clock' && <TimeView/>}
      </div>
    </div>
  );
};
