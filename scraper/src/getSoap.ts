import { XMLParser } from "fast-xml-parser";

export const getSoap = async <T>(url: string, method: string, args: Record<string, string> = {}): Promise<T> => {
    //const client = await getClient(url);

    console.log("getSoap", url, method, args);

    let body = `<?xml version="1.0" encoding="utf-8"?>
            <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:tm="http://microsoft.com/wsdl/mime/textMatching/" xmlns:tns="http://tempuri.org/">
                <soap:Body>
                    <${method} xmlns="http://tempuri.org/">
                        ${Object.entries(args).map(([k, v]) => `<${k}>${v}</${k}>`).join("")}
                    </${method}>
                </soap:Body>
            </soap:Envelope>`;

    //console.log(body);

    let res = await fetch(url, {
        method: "POST",
        headers: [
            ["Accept", "text/html,application/xhtml+xml,application/xml,text/xml;q=0.9,*/*;q=0.8"],
            ["Content-Type", "text/xml; charset=utf-8"],
            ["SOAPAction", `"http://tempuri.org/${method}"`],
        ],
        redirect: "follow",
        body,
    });

    let text = await res.text();
    let parser = new XMLParser();

    let xml = parser.parse(text);

    //console.log(xml);

    let result = xml["soap:Envelope"]["soap:Body"][`${method}Response`][`${method}Result`];

    let json = typeof result == "string" ? (JSON.parse(result) as T) : result as T;

    return json;
}
