import { exists, read, write } from "./io";
import { mapAllLines, mapAnnouncements, mapSchedule, mapStops } from "./mappers";
import { getAnnouncements } from "../routes/Duyurular";
import { getAllGarages, getAllLines, getAllStops } from "../routes/HatDurakGuzergah";
import { getSchedule, IETTSchedule } from "../routes/PlanlananSeferSaati";
import { getLineService, getStops, IETTDurak, IETTLineService, IETTTable } from "../routes/stops";
import { LineDetails } from "../../../common/types/Line";

const scrapeRaw = async (overwrite = false) => {
    if (overwrite || !exists(`raw/GetDuyurular`)) await write("raw/GetDuyurular", await getAnnouncements());
    if (overwrite || !exists(`raw/GetDurak`)) await write("raw/GetDurak", await getAllStops());
    if (overwrite || !exists(`raw/GetGaraj`)) await write("raw/GetGaraj", await getAllGarages());

    let rawLines = await getAllLines();
    await write("raw/GetHat", rawLines);

    let lines = rawLines.map(x => x.SHATKODU);

    console.log(`Scraping ${lines.length} lines...`);

    let idx = 0;
    for (let line of lines) {
        console.log(`${idx++}/${lines.length} :: ${line}`);
        if (overwrite || !exists(`raw/line/${line}/DurakDetay`)) await write(`raw/line/${line}/DurakDetay`, await getStops(line));
        if (overwrite || !exists(`raw/line/${line}/HatServisi`)) await write(`raw/line/${line}/HatServisi`, await getLineService(line));
        if (overwrite || !exists(`raw/line/${line}/GetPlanlananSeferSaati`)) await write(`raw/line/${line}/GetPlanlananSeferSaati`, await getSchedule(line));
    }
};

const convert = async <T, U>(
    from: string,
    to: string,
    mapper: (v: T) => Promise<U> | U,
) => {
    let raw = await read<T>(from);
    let converted = await mapper(raw);
    await write(to, converted);
    return converted;
};

const convertData = async () => {
    console.log("Converting...");

    await convert("raw/GetDuyurular", "data/announcements", mapAnnouncements);

    let lines = await convert("raw/GetHat", "data/lines", mapAllLines);

    console.log(`Converting ${lines.length} lines`);

    let idx = 0;
    for(let line of lines) {
        console.log(`${idx++}/${lines.length} :: ${line.id} / ${line.label}`);

        let durakDetay = await read<IETTTable<IETTDurak[]>>(`raw/line/${line.id}/DurakDetay`);
        let hatServisi = await read<IETTTable<IETTLineService>>(`raw/line/${line.id}/HatServisi`);
        let seferSaatleri = await read<IETTSchedule[]>(`raw/line/${line.id}/GetPlanlananSeferSaati`);

        let [stopsA, stopsB] = mapStops(durakDetay);
        let schedule = mapSchedule(seferSaatleri);

        let data: LineDetails = {
            ...line,
            schedule,
            announcements: [],
            stops: [
                { from: line.between[0], to: line.between[1], stops: stopsA },
                { from: line.between[1], to: line.between[0], stops: stopsB },
            ],
        };

        await write(`/data/line/${line.id}`, data);
    }
};

export const main = async () => {
    console.log("-- Started --");
    if (process.argv.includes("--raw"))
        await scrapeRaw(process.argv.includes("--overwrite"));
    if (process.argv.includes("--convert"))
        await convertData();
};
