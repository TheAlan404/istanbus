import { Coord } from "./Coord";

export type StopsResponse = [Stop[], Stop[]];

export interface StopsDirection {
    from: string;
    to: string;
    stops: Stop[];
}

export interface Stop {
    id: string;
    name: string;
    position: Coord;
    _type: string;
    area: [string, string, string];
};
