import { BusProvider, Schedule, ScheduleDay } from "@/types/Schedule";
import { getSoap } from "../../../../util/getSoap";

const url = "https://api.ibb.gov.tr/iett/UlasimAnaVeri/PlanlananSeferSaati.asmx?wsdl";

interface IETTSchedule {
    SHATKODU: string;
    HATADI: string;
    SGUZERAH: string;
    SYON: "G" | "D";
    SGUNTIPI: "C" | "I" | "P";
    GUZERGAH_ISARETI?: string;
    SSERVISTIPI: "Normal" | "ÖHO" | "OAS" | "Ara Dinlen" | "Gareli";
    DT: string;
};

const getDir = ({ SYON }: IETTSchedule) => SYON == "G" ? 0 : 1;

const getDay = ({ SGUNTIPI }: IETTSchedule) => ({
    I: "workdays",
    C: "saturday",
    P: "sunday",
} as Record<IETTSchedule["SGUNTIPI"], ScheduleDay["type"]>)[SGUNTIPI];

export async function GET(
    request: Request,
    { params }: { params: { line: string } }
) {
    let result = await getSoap<IETTSchedule[]>(url, "GetPlanlananSeferSaati_json", {
        HatKodu: params.line
    });

    let schedule: Schedule = {
        directions: [],
    };

    for(let item of result) {
        if(!schedule.directions[getDir(item)]) {
            let arr = item.HATADI.split("-").map(x => x.trim());
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

    return Response.json(result)
}


