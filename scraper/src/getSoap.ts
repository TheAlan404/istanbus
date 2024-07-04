import { Client, createClientAsync } from "soap";
import { ISoapError } from "soap/lib/client";

const clients = new Map<string, Client>();

const getClient = async (url: string) => {
    if (clients.has(url)) return clients.get(url)!;

    console.log("Creating client for:");
    console.log("    " + url);
    let client = await createClientAsync(url);

    clients.set(url, client);

    console.log(client.describe());

    return client;
}

export const getSoap = async <T>(url: string, method: string, args: any): Promise<T> => {
    const client = await getClient(url);

    if(!client[method]) {
        client.describe();
        throw new Error("Function not found: " + method);
    }

    let [result, rawResponse, soapHeader, rawRequest] = await client[method + "Async"](args);

    result = result[`${method}Result`];

    let json = typeof result == "string" ? (JSON.parse(result) as T) : result as T;

    return json;
}
