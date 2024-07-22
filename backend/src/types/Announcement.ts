export interface Announcement {
    id: string;
    label: string;
    message: string;
    type: string; //"Sefer" | "Günlük";
    dateText: string;
};
