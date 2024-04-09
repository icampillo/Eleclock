import React, { Fragment, useEffect, useState } from "react";
import {
    AlarmComponent,
    Clock,
} from "../components";
import AlarmPopup from "../components/alarmModal/alarmModal";
import { Alarm } from "types";
import { getAlarms } from "../services";

export const AlarmView = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [alarms, setAlarms] = useState([] as Alarm[]);
    const [alarm, setAlarm] = useState({} as Alarm);
    const [showPopup, setShowPopup] = useState(false);

    const handleDismiss = async () => {
        setShowPopup(false);
        await fetchData();
    };

    const fetchData = async () => {
        try {
            const data = await getAlarms();
            setAlarms(data);
            setIsLoaded(true);
            return data;
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
        console.log("Weather alerts", alarms);
      }, [alarms]);

    return (
        <div>
            {isLoaded ?
                <div className='clock-content'>
                    <Clock />
                    <AlarmComponent alarms={alarms} fetchData={fetchData} />
                </div> : <div>Loading...</div>}
            {showPopup && <AlarmPopup onDismiss={handleDismiss} alarm={alarm} />}
        </div>
    );
};
