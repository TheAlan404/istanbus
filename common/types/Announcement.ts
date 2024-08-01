export type Announcement = {
    line: string;
    label: string;
    message: string;
    dateText: string;
} & (
    {
        type: "Sefer"; // "Sefer"
        direction: string;
        time: string;
    } | {
        type: "Günlük"; // "Günlük"
    }
);
