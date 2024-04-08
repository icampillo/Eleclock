import React, { useState, useEffect } from 'react';

import { formatDate } from '../../helper';

export const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            {true ?
                <div className='clock-content'>
                    <p className='date'>{formatDate(time)}</p>
                    <p className='clock'>{time.toLocaleTimeString()}</p>
                </div> : <div>Loading...</div>}
        </div>
    );
};