import { Line } from "./Line";
import { Stop } from "./Stop";

export type SearchResult = ({ type: "line" } & Line) | ({ type: "stop" } & Stop);
