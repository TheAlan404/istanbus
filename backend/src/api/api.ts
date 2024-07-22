import { Router } from "express";
import { mapAllLines, mapAnnouncements, mapSchedule, mapStops } from "../utils/mappers"
import { getAllLines } from "../routes/HatDurakGuzergah";
import { getAnnouncements } from "../routes/Duyurular";
import { Announcement } from "../../../common/types/Announcement";
import { getLineService, getStops } from "../routes/stops";
import { getSchedule } from "../routes/PlanlananSeferSaati";
import { GetSearchItems } from "../routes/WebAPI";
import { Line, LineDetails } from "../../../common/types/Line";
import { SearchResult } from "../../../common/types/Search";

const api = Router();

let announcements: Announcement[] = [];
let lines: Line[] = [];

getAnnouncements().then(a => announcements = mapAnnouncements(a));
getAllLines().then(l => lines = mapAllLines(l));
setInterval(async () => {
    announcements = mapAnnouncements(await getAnnouncements());
    lines = mapAllLines(await getAllLines());
}, 120 * 1000);


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

api.get("/stops/:id", async (req, res) => {

});

api.get("/searchSuggestions", async (req, res) => {
    let { q = "" } = req.query;

    let items = await GetSearchItems(""+q);

    items.map(item => (item.StationCode == 0 ? ({
        type: "line",
        ...lines.find(l => l.id == item.Code),
    }) : ({
        type: "stop",
        name: item.Name,
        id: new URLSearchParams(item.Path.split("?")[1]).get("dkod"),
    })) as SearchResult)
});

export default api;
