import { XMLParser } from "fast-xml-parser";

export interface StationInfoItem {
    line: string;
    label: string;
    estimation: string;
};

export const GetStationInfo = async (line: string) => {
    let res = await fetch("https://iett.istanbul/tr/RouteStation/GetStationInfo" + "?" + new URLSearchParams({
        langid: "1",
        dcode: line,
    }).toString(), {});

    let text = await res.text();
    let parser = new XMLParser();
    let xml = parser.parse(text);


    let notes = xml["div"][0]["p"] as string[];

    let busses = xml["div"][1]["div"]
        .map(x => x["div"])
        .filter(x => x["span"])
        .map(x => ({
            line: ""+x["span"],
            label: x["p"]["#text"],
            estimation: x["p"]["b"].split(" ")[0].replace("(", "").replace(")", ""),
        } as StationInfoItem)) as StationInfoItem[];

    return { notes, busses };
};

export const GetRouteByStation = async (line: string) => {
    let res = await fetch("https://iett.istanbul/tr/RouteStation/GetRouteByStation" + "?" + new URLSearchParams({
        langid: "1",
        dcode: line,
    }).toString(), {});

    let text = await res.text();
    let parser = new XMLParser();
    let xml = parser.parse(text);

    throw new Error("unimplemented!()");
};

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


