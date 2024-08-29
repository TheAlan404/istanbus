import { LineDetails } from "@common/types/Line";
import { ScheduleDay, ScheduleEntry } from "@common/types/Schedule";
import { unturkish } from "./unturkish";

export const getAnnouncementsForEntry = ({
    details,
    entry,
    day,
    dir,
}: {
    details: LineDetails;
    entry: ScheduleEntry;
    day: ScheduleDay["type"];
    dir: number;
}) => {
    if(!isToday(day)) return;
    return details.announcements.filter(x => (
        x.type == "cancellation"
        && x.time == entry.time
        // awesome code uwu
        && x.direction == unturkish(details.stops[dir].stops[0].name)
    ));
};

export const getToday = () => {
    let currentDate = new Date();

    if(currentDate.getDay() == 0) return "sunday";
    if(currentDate.getDay() == 6) return "saturday";
    if(currentDate.getDay() != 0 && currentDate.getDay() != 6) return "workdays";
};

export const isToday = (day?: ScheduleDay["type"]) => {
    return day == getToday();
};

export const isAvailable = (entry: ScheduleEntry) => {
    let currentDate = new Date();

    let entryDate = new Date();
    let [h, m] = entry.time.split(":").map(Number);
    entryDate.setHours(h);
    entryDate.setMinutes(m);

    let available = entry.time == "00:00" || currentDate.getTime() <= entryDate.getTime();

    return available;
};
