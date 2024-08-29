import { Router } from "express";
import { mapAllLines, mapAllStops, mapAnnouncements, mapSchedule, mapStops } from "../utils/mappers"
import { getAllLines, getAllStops } from "../routes/HatDurakGuzergah";
import { getAnnouncements } from "../routes/Duyurular";
import { Announcement } from "../../../common/types/Announcement";
import { getLineService, getStops } from "../routes/stops";
import { getSchedule } from "../routes/PlanlananSeferSaati";
import { GetRouteByStation, GetSearchItems, GetStationInfo } from "../routes/WebAPI";
import { Line, LineDetails } from "../../../common/types/Line";
import { SearchResult } from "../../../common/types/Search";
import { Stop } from "../../../common/types/Stop";

const api = Router();

let announcements: Announcement[] = [];
let lines: Line[] = [];
let stops: Stop[] = [];

getAllStops().then(x => stops = mapAllStops(x).sort((a, b) => a.name.localeCompare(b.name, "tr")))
getAnnouncements().then(a => announcements = mapAnnouncements(a));
getAllLines().then(l => lines = mapAllLines(l).sort((a, b) => a.id.localeCompare(b.id, "tr")));
setInterval(async () => {
    announcements = mapAnnouncements(await getAnnouncements());
}, 5 * 60 * 1000);

api.get("/lines", async (req, res) => {
    res.json(lines)
})

api.get("/line/:id", async (req, res) => {
    let { id } = req.params;

    let line = lines.find(x => x.id == id);

    if(!line) return res.status(404);

    let durakDetay = await getStops(id);
    let hatServisi = await getLineService(id);
    let seferSaatleri = await getSchedule(id);

    let [stopsA, stopsB] = mapStops(durakDetay);
    let schedule = mapSchedule(seferSaatleri);

    let data: LineDetails = {
        ...line,
        duration: Number(hatServisi.NewDataSet.Table.SEFER_SURESI),
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
    let { lines: _lines, type } = req.query;

    if(typeof _lines !== "string" && typeof _lines !== "undefined") return res.status(400).json("no");

    let lines = (_lines || "").split(";").filter(x=>x);

    res.json(announcements.filter(a => (
        (!lines.length || lines.includes(a.line))
        && (!type || a.type == type)
    )))
})

api.get("/stop/:id", async (req, res) => {
    let { id } = req.params;
    
    let passingLineIds = await GetRouteByStation(id);

    res.json({
        stop: stops.find(x => x.id == id),
        lines: lines.filter(x => passingLineIds.includes(x.id)),
    });
});

api.get("/busses/:id", async (req, res) => {
    let { id } = req.params;
    
    let { busses, notes } = await GetStationInfo(id);

    console.log(notes);

    res.json(
        busses
            .map(bus => ({
                estimation: bus.estimation,
                ...(lines.find(x => x.id == bus.line))
            })),
    );
});

api.get("/all", async (req, res) => {
    res.json({ lines, stops })
});

api.get("/quick", async (req, res) => {
    let { type, id } = req.query;

    res.json(
        (type == "line" ? lines : stops).find(x => x.id == id)
    )
});

api.get("/searchSuggestions", async (req, res) => {
    let { q, filter } = req.query;

    let query = (""+q).toLocaleUpperCase("tr");

    let exact: SearchResult[] = [];
    let partial: SearchResult[] = [];

    const limit = 20;

    if (filter == "line" || filter == "none" || !filter) {
        for (let line of lines || []) {
            if((exact.length + partial.length) > limit) break;

            if (line.id == query) {
                exact.push({ type: "line", ...line });
                continue;
            }

            if ([line.id, line.label].join(" ").toLocaleUpperCase("tr").includes(query)) {
                partial.push({ type: "line", ...line });
            }
        }
    }

    if (filter == "stop" || filter == "none" || !filter) {
        for (let stop of stops || []) {
            if((exact.length + partial.length) > limit) break;

            if (stop.name.includes(query)) {
                partial.push({ type: "stop", ...stop });
            }
        }
    }
    
    let items = [...exact, ...partial].slice(0, 100);

    res.json(items);
});

export default api;
