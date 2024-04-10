import LifeTime from "../components/lifeTime/lifeTime";
import {
    Clock,
} from "../components";
import React from "react";

export const TimeView = () => (
    <div>
        <div className='clock-content'>
            <Clock />
            <LifeTime />
        </div>
    </div>
);