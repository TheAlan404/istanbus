import { useEffect, useState } from "react";

export const useDate = () => {
    let [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        let i = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(i);
    }, []);

    return date;
};
