import { useState, useEffect } from 'react';

export const useCurrentTime = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${
                hours >= 12 ? 'PM' : 'AM'
            }`;
            setTime(`Today @ ${formattedTime}`);
        };

        updateTime(); // Set the initial time
        const interval = setInterval(updateTime, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return time;
};
