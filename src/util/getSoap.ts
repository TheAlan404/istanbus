import { createClientAsync } from "soap/lib/soap";

export const getSoap = (url: string, method: string, args: any) => {
    return new Promise(async (resolve, reject) => {
        const client = await createClientAsync(url);

        client[method]({}, function (err, result) {
            if (err) reject(err);
            console.log(result);
            resolve(result);
        });
    });
}
