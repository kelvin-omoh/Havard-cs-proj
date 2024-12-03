import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="timer-display">
            <span>{time.toLocaleTimeString()}</span>
        </div>
    );
};

export default Timer; 