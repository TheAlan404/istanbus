import { createClientAsync } from "soap/lib/soap";

export const getSoap = <T>(url: string, method: string, args: any) => {
    return new Promise<T>(async (resolve, reject) => {
        const client = await createClientAsync(url);

        if(!client[method]) {
            return reject(client.describe());
        }

        client[method](args, function (err: any, result: any) {
            if (err) reject(err);
            console.log(result);

            let json = JSON.parse(result[`${method}Result`]) as T;

            resolve(json);
        });
    });
}
