import { Schedule } from "./Schedule";
import { StopsDirection } from "./Stop";

export interface Line {
    id: string;
    label: string;
    between: [string, string];
    fare: string;
    length?: number;
    duration?: number;
};

export interface LineDetails extends Line {
    schedule: Schedule;
    stops: [StopsDirection, StopsDirection];
}
