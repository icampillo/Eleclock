import React, { useEffect, useState } from 'react';

import { Alarm } from '../../types';
import { formatTimeHHMM } from '../../helper';

import "./alarmModal.css";

interface AlarmModalProps {
  alarm: Alarm;
  onDismiss: () => void;
}

const AlarmModal: React.FC<AlarmModalProps> = ({ alarm, onDismiss }) => {
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
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className='title-modal'>Alarme</h2>
        <p className='alarm-modal'>{formatTimeHHMM(alarm.alarm_time)}</p>
        <div className='centered'>
          <button className="modal-btn" onClick={handleDismiss}>Arreter</button>
        </div>
      </div>
    </div>
  );
};

export default AlarmModal;
