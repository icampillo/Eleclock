import React, { useEffect, useState } from 'react';

import { Alarm } from '../../types';
import { formatTimeHHMM } from '../../helper';

import "./alarmModal.css";

interface AlarmPopupProps {
  alarm: Alarm;
  onDismiss: () => void;
}

const AlarmPopup: React.FC<AlarmPopupProps> = ({ alarm, onDismiss }) => {
  const [audio] = useState(new Audio("https://universal-soundbank.com/sounds/8500.mp3"));

  const handleDismiss = async () => {
    audio.pause();
    onDismiss();
  };

  useEffect(() => {
    audio.loop = true;
    audio.play();
  }, []);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className='title-modal'>Alarme</h2>
        <p className='alarm-modal'>{formatTimeHHMM(alarm.alarm_time)}</p>
        <div className='centered'>
          <button className="modal-btn" onClick={handleDismiss}>Arreter</button>
        </div>
      </div>
    </div>
  );
};

export default AlarmPopup;
