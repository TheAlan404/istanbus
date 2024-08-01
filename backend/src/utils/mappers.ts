import { IETTAnnouncement } from "../routes/Duyurular";
import { IETTLine, IETTStop } from "../routes/HatDurakGuzergah";
import { IETTSchedule } from "../routes/PlanlananSeferSaati";
import { IETTTable, IETTDurak } from "../routes/stops";
import { Announcement } from "../../../common/types/Announcement";
import { Line } from "../../../common/types/Line";
import { BusProvider, Schedule, ScheduleDay } from "../../../common/types/Schedule";
import { Stop, StopsResponse } from "../../../common/types/Stop";

export const mapAllLines = (lines: IETTLine[]) => lines.map(({
    HAT_UZUNLUGU,
    SEFER_SURESI,
    SHATADI,
    SHATKODU,
    TARIFE,
}) => ({
    id: SHATKODU,
    between: getBetween(SHATADI),
    label: SHATADI,
    fare: TARIFE,
    duration: SEFER_SURESI,
    length: HAT_UZUNLUGU,
} as Line));

export const mapAnnouncements = (result: IETTAnnouncement[]) => result.map(({
    GUNCELLEME_SAATI,
    HAT,
    HATKODU,
    MESAJ,
    TIP,
}) => ({
    dateText: GUNCELLEME_SAATI.split(" ")[2],
    line: HATKODU,
    label: HAT,
    message: MESAJ,
    type: TIP as "Sefer" | "Günlük",
    ...(TIP == "Sefer" ? {
        direction: MESAJ.split("dan")[0].trim(),
        time: MESAJ.split(" ").find(x => x.includes(":")),
    } : {}),
} as Announcement));

const getDir = ({ SYON }: IETTSchedule) => SYON == "G" ? 0 : 1;

const getDay = ({ SGUNTIPI }: IETTSchedule) => ({
    I: "workdays",
    C: "saturday",
    P: "sunday",
} as Record<IETTSchedule["SGUNTIPI"], ScheduleDay["type"]>)[SGUNTIPI];

const getBetween = (name: string) => {
    let a = name.split("-").map(x => x.trim());

    return [a[0], a[a.length-1]]
};

export const mapSchedule = (result: IETTSchedule[]) => {
    let schedule: Schedule = {
        directions: [],
    };

    for(let item of result) {
        if(!schedule.directions[getDir(item)]) {
            let arr = getBetween(item.HATADI || "");
            if(getDir(item)) arr.reverse();
            let [from, to] = arr;

            schedule.directions[getDir(item)] = {
                from,
                to,
                days: [
                    { type: "workdays", entries: [] },
                    { type: "saturday", entries: [] },
                    { type: "sunday", entries: [] },
                ],
            };
        }

        let dayIndex = schedule.directions[getDir(item)].days.findIndex(x => x.type == getDay(item));
        
        schedule.directions[getDir(item)].days[dayIndex].entries.push({
            provider: ({
                Normal: "IETT",
                OAS: "OAS",
                ÖHO: "OHO",
                "Ara Dinlen": "IETT",
                Gareli: "IETT",
            } as Record<IETTSchedule["SSERVISTIPI"], BusProvider>)[item.SSERVISTIPI],
            marker: item.GUZERGAH_ISARETI,
            time: item.DT,
            serviceType: ["Ara Dinlen", "Gareli"].includes(item.SSERVISTIPI) ? item.SSERVISTIPI : undefined,
        });
    };

    return schedule
}

export const mapStops = (result: IETTTable<IETTDurak[]>) => {
    let list = result?.NewDataSet?.Table || [];

    let groups: StopsResponse = [[],[]];

    for(let item of list) {
        let idx = item.YON == "G" ? 0 : 1;

        groups[idx].push({
            id: item.DURAKKODU,
            name: item.DURAKADI,
            position: {
                x: item.XKOORDINATI,
                y: item.YKOORDINATI,
            },
            area: [
                item.ISLETMEALTBOLGE,
                item.ILCEADI,
                item.ISLETMEBOLGE,
            ],
            _type: item.DURAKTIPI,
        });
    }

    return groups
};

export const mapAllStops = (result: IETTStop[]) => {
    let stops = result.map(({
        SDURAKKODU,
        SDURAKADI,
        KOORDINAT,
        ILCEADI,
    }) => ({
        id: ""+SDURAKKODU,
        name: SDURAKADI,
        position: {
            x: KOORDINAT.split(" ")[1].replace("(", ""),
            y: KOORDINAT.split(" ")[2].replace(")", ""),
        },
        area: [ILCEADI],
    } as Stop));

    return stops;
};

