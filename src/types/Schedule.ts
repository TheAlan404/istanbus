export interface Schedule {
    directions: ScheduleDirection[];
};

export interface ScheduleDirection {
    from: string;
    to: string;
    days: ScheduleDay[];
};

export interface ScheduleDay {
    type: "workdays" | "saturday" | "sunday";
    entries: ScheduleEntry[];  
};

export type BusProvider = "OHO" | "OAS" | "IETT";

export interface ScheduleEntry {
    provider: BusProvider;
    time: string;
};
