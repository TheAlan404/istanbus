import { Announcement } from "@/types/Announcement";
import { Line } from "@/types/Line";
import { Schedule } from "@/types/Schedule";
import { StopsResponse } from "@/types/Stop";

export const getAllLines = async (): Promise<Line[]> => {
    const res = await fetch("/api/lines");
    return res.json();
}

export const getSchedule = async (id: string): Promise<Schedule> => {
    const res = await fetch(`/api/schedule/${id}`);
    return res.json();
}

export const getStops = async (id: string): Promise<StopsResponse> => {
    const res = await fetch(`/api/schedule/${id}`);
    return res.json();
}

export const getAllAnnouncements = async (): Promise<Announcement[]> => {
    const res = await fetch(`/api/announcements`);
    return res.json();
}
