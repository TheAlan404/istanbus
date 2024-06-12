"use client";
import { Announcement } from "@/types/Announcement";
import { Line } from "@/types/Line";
import { Schedule } from "@/types/Schedule";
import { StopsResponse } from "@/types/Stop";
import { Box, Button, Group, Stack } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import Link from "next/link";

const Hat = ({ params: { line: id } }: { params: { line: string } }) => {
	const { data: lines } = useFetch<Line[]>("/api/lines");
	const { data: stopsResponse } = useFetch<StopsResponse>(`/api/stops/${id}`);
	const { data: schedule } = useFetch<Schedule>(`/api/schedule/${id}`);
	const { data: announcements } = useFetch<Announcement[]>(`/api/announcements`);

    const info = lines?.find(x => x.id == id);

    let direction = 0;
    let stops = stopsResponse ? stopsResponse[direction] : undefined;
    

    return (
        <Stack>
            <Group>
                
            </Group>
        </Stack>
    )
}

export default Hat;
