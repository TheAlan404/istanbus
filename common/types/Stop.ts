import { Coord } from "./Coord";
import { Line } from "./Line";

export type StopsResponse = [Stop[], Stop[]];

export interface StopsDirection {
    from: string;
    to: string;
    stops: Stop[];
}

export interface Stop {
    id: string;
    name: string;
    position?: Coord;
    _type?: string;
    area?: string[];
};

export type IncomingBus = Line & { estimation: string };
