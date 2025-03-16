import { useEffect, useState } from "react";

export const useDate = (refreshInterval = 1000): Date => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, refreshInterval);

        return () => {
            clearInterval(interval);
        };
    });

    return date;
};
