import { useLocalStorage } from "@mantine/hooks";

export interface FaveItem {
    id: string;
    ty: "line" | "stop";
};

export const useFaves = () => {
    const [faves, setFaves] = useLocalStorage<FaveItem[]>({
        key: "istanbus:faves",
        defaultValue: [],
    });

    return {
        faves,
        setFaves,
    }
};
