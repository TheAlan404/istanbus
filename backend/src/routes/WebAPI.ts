import { getXML } from "../utils/getXML";

export interface StationInfoItem {
    line: string;
    label: string;
    estimation: string;
};

export const GetStationInfo = async (line: string) => {
    let xml = await getXML("https://iett.istanbul/tr/RouteStation/GetStationInfo", {
        langid: "1",
        dcode: line,
    });

    if(!xml["div"]) {
        console.log(JSON.stringify(xml))

        return { notes: [], busses: [] }
    };

    let notes = xml["div"][0]["p"] as string[];

    let busses = xml["div"][1]["div"]
        .map(x => x["div"])
        .filter(x => x["span"])
        .map(x => ({
            line: ""+x["span"],
            label: x["p"]["#text"],
            estimation: x["p"]["b"].split(" ")[0].replace("(", "").replace(")", ""),
        } as StationInfoItem)) as StationInfoItem[];

    console.log(notes);

    return { notes, busses };
};

export const GetRouteByStation = async (line: string) => {
    let xml = await getXML("https://iett.istanbul/tr/RouteStation/GetRouteByStation", {
        langid: "1",
        dcode: line,
    });

    if(!xml["div"]) {
        console.log(JSON.stringify(xml))
        return []
    };

    let lines: string[] = [];
    
    const map = (x) => {
        let id = ""+x.a.span[0] as string;
        lines.push(id);

        if(x.div) map(x.div);
    };

    map(xml.div);

    return lines;
};

GetRouteByStation("111051")

export type SearchItem = {
    Path: string;
    Code: string;
    Name: string;
    Location?: null;
    // 0 if its a line
    Stationcode: number;
}

export const GetSearchItems = async (query: string) => {
    let res = await fetch("https://iett.istanbul/tr/RouteStation/GetSearchItems" + "?" + new URLSearchParams({
        langid: "1",
        key: query,
    }).toString(), {});

    let { list }: { list: SearchItem[] } = await res.json();

    return list;
};


