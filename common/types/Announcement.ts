export type Announcement = {
    line: string;
    label: string;
    message: string;
    dateText: string;
} & (
    {
        type: "cancellation";
        direction: string;
        time: string;
    } | {
        type: "Günlük"; // "Günlük"
    } | {
        type: "Sefer"; // "Sefer"
    }
);
