import React, { useEffect } from 'react';
import Switch from "react-switch";

import { handleAlarmOnOff } from '../../services/AlarmServices';

import { Alarm } from '../../types';
import { formatTimeHHMM } from '../../helper';
import "./alarm-row.css";

type AlarmRowProps = {
    alarm: Alarm;
    index: number;
    deleteAlarm: (id: number) => void;
};

export const AlarmRow: React.FC<AlarmRowProps> = ({ alarm, index, deleteAlarm }) => {
    const [checked, setChecked] = React.useState(alarm.is_active);

    const handleChange = async (checked: boolean, id: number) => {
        try {
            const status = await handleAlarmOnOff(id, checked);
            setChecked(checked);
        } catch (error) {
            console.error('Error adding alarm:', error);
        }
    };

    useEffect(() => {
        setChecked(alarm.is_active);
    }, [alarm]);

    return (
        <div className="alarm-row-content">
            <div className='alarm-row'>
                <div className='clock-alarm' key={index}>{formatTimeHHMM(alarm.alarm_time)}</div>
                <Switch
                    checked={checked}
                    onChange={(checked) => handleChange(checked, alarm.id)}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="react-switch"
                    id="material-switch"
                />
            </div>
            <div>
                <button onClick={() => deleteAlarm(alarm.id)} className="delete-button">
                    X
                </button>
            </div>
        </div>
    );
};