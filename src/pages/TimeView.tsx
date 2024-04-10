import TimeCalculator from "../components/calcultime";
import {
    Clock,
} from "../components";
import React from "react";

export const TimeView = () => (
    <div>
        <div className='clock-content'>
            <Clock />
            <TimeCalculator />
        </div>
    </div>
);