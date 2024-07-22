import { readFile, writeFile } from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const ROOT = "../data";

const resolvePath = (path: string) => {
    let full = join(ROOT, path) + ".json";
    mkdirSync(dirname(full), { recursive: true });
    return full;
}

export const exists = (path: string) => existsSync(resolvePath(path));

export const write = async <T>(path: string, value: T) => {
    console.log(`-> ${path}`);
    await writeFile(resolvePath(path), JSON.stringify(value));
};

export const read = async <T>(path: string) => {
    console.log(`<- ${path}`);
    return JSON.parse((await readFile(resolvePath(path))).toString()) as T;
}
