import { XMLParser } from "fast-xml-parser";

export const getXML = async <T>(url: string, query: Record<string, string>) => {
    let res = await fetch(url + "?" + new URLSearchParams(query).toString());
    let text = await res.text();
    let parser = new XMLParser();
    return parser.parse(text) as T;
};
