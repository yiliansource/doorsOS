import { useEffect, useState } from "react";

export const useRememberedState = <T>(original: T) => {
    const [remembered, setRemembered] = useState<T | null>(null);

    useEffect(() => {
        if (original) {
            setRemembered(original);
        }
    }, [original]);

    return original ?? remembered;
};
