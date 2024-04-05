import React from 'react';

import { Alarm } from '../../types';
import { formatTimeHHMM } from '../../helper';
// import {deleteIcon} from './red-cross.jpeg';
import "./alarm-row.css";

type AlarmRowProps = {
    alarm: Alarm;
    index: number;
    deleteAlarm: (id: number) => void;
};

export const AlarmRow: React.FC<AlarmRowProps> = ({ alarm, index, deleteAlarm }) => {
    return (
        <div className='alarm-row'>
            <div className='clock-alarm' key={index}>{formatTimeHHMM(alarm.alarm_time)}</div>
            <button onClick={() => deleteAlarm(alarm.id)}>Delete</button>
        </div>
    );
};