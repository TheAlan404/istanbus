import { Router } from "express";
import { mapAllLines, mapAllStops, mapAnnouncements, mapSchedule, mapStops } from "../utils/mappers"
import { getAllLines, getAllStops } from "../routes/HatDurakGuzergah";
import { getAnnouncements } from "../routes/Duyurular";
import { Announcement } from "../../../common/types/Announcement";
import { getLineService, getStops } from "../routes/stops";
import { getSchedule } from "../routes/PlanlananSeferSaati";
import { GetSearchItems, GetStationInfo } from "../routes/WebAPI";
import { Line, LineDetails } from "../../../common/types/Line";
import { SearchResult } from "../../../common/types/Search";
import { Stop } from "../../../common/types/Stop";

const api = Router();

let announcements: Announcement[] = [];
let lines: Line[] = [];
let stops: Stop[] = [];

getAllStops().then(x => stops = mapAllStops(x))
getAnnouncements().then(a => announcements = mapAnnouncements(a));
getAllLines().then(l => lines = mapAllLines(l));
setInterval(async () => {
    announcements = mapAnnouncements(await getAnnouncements());
    lines = mapAllLines(await getAllLines());
}, 5 * 60 * 1000);

api.get("/lines", async (req, res) => {
    res.json(mapAllLines(await getAllLines()))
})

api.get("/line/:id", async (req, res) => {
    let { id } = req.params;

    let line = lines.find(x => x.id == id)!;

    let durakDetay = await getStops(id);
    let hatServisi = await getLineService(id);
    let seferSaatleri = await getSchedule(id);

    let [stopsA, stopsB] = mapStops(durakDetay);
    let schedule = mapSchedule(seferSaatleri);

    let data: LineDetails = {
        ...line,
        schedule,
        announcements: announcements.filter(a => a.line == id),
        stops: [
            { from: line.between[0], to: line.between[1], stops: stopsA },
            { from: line.between[1], to: line.between[0], stops: stopsB },
        ],
    };
    
    res.json(data)
})

api.get("/announcements", async (req, res) => {
    res.json(announcements)
})

api.get("/stop/:id", async (req, res) => {
    let { id } = req.params;
    
    let { busses } = await GetStationInfo(id);

    res.json({
        busses: busses.map(bus => ({ estimation: bus.estimation, ...(lines.find(x => x.id == bus.line)) })),
        stop: stops.find(x => x.id == id),
    });
});

api.get("/all", async (req, res) => {
    res.json({ lines, stops })
});

api.get("/searchSuggestions", async (req, res) => {
    let { q } = req.query;

    let query = (""+q).toLocaleUpperCase("tr");

    let exact: SearchResult[] = [];
    let partial: SearchResult[] = [];

    for(let line of lines) {
        if (line.id == query) {
            exact.push({ type: "line", ...line });
            continue;
        }

        if ([line.id, line.label].join(" ").toLocaleUpperCase("tr").includes(query)) {
            partial.push({ type: "line", ...line });
        }
    }

    for(let stop of Object.values(stops)) {
        if (stop.name.includes(query)) {
            partial.push({ type: "stop", ...stop });
        }
    }

    let items = [...exact, ...partial].slice(0, 100);

    res.json(items);
});

export default api;
