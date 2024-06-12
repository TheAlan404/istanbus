import { createClientAsync } from "soap/lib/soap";

export const getSoap = <T>(url: string, method: string, args: any) => {
    return new Promise<T>(async (resolve, reject) => {
        const client = await createClientAsync(url);

        if(!client[method]) {
            return reject(client.describe());
        }

        client[method](args, function (err: any, result: any) {
            if (err) reject(err);

            result = result[`${method}Result`];

            let json = typeof result == "string" ? (JSON.parse(result) as T) : result;

            resolve(json);
        });
    });
}
