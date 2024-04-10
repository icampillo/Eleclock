import React, { useEffect, useState } from "react";
import {
    AlarmComponent,
    Clock,
} from "../components";
import { Alarm } from "../types";

interface AlarmViewProps {
    alarms: Alarm[];
    fetchData: () => void;
}

export const AlarmView: React.FC<AlarmViewProps> = ({ alarms, fetchData }) => {
    useEffect(() => {
    }, [alarms]);

    return (
        <div>
            <div className='clock-content'>
                <Clock />
                <AlarmComponent alarms={alarms} fetchData={fetchData} />
            </div>
        </div>
    );
};
