import { Group, Paper, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { ScheduleDay, ScheduleEntry } from "../../../../common/types/Schedule";
import { useDate } from "../../hooks/useDate";
import { Announcement } from "@common/types/Announcement";
import { IconInfoCircle } from "@tabler/icons-react";
import { AnnouncementCard } from "./AnnouncementCard";

export const isToday = (day?: ScheduleDay["type"]) => {
    let currentDate = new Date();

    let today = false;
    if(day == "sunday" && currentDate.getDay() == 0) today = true;
    if(day == "saturday" && currentDate.getDay() == 6) today = true;
    if(day == "workdays" && currentDate.getDay() != 0 && currentDate.getDay() != 6) today = true;

    return today;
};

export const isAvailable = (entry: ScheduleEntry) => {
    let currentDate = new Date();

    let entryDate = new Date();
    let [h, m] = entry.time.split(":").map(Number);
    entryDate.setHours(h);
    entryDate.setMinutes(m);

    let available = entry.time == "00:00" || currentDate.getTime() <= entryDate.getTime();

    return available;
};

export const ScheduleEntryCard = ({
    entry,
    day,
    announcements,
    withBorder,
}: {
    entry: ScheduleEntry,
    day?: ScheduleDay["type"],
    announcements?: Announcement[],
    withBorder?: boolean,
}) => {
    const currentDate = useDate();

    let c = "dimmed";
    if(isAvailable(entry) && isToday(day)) c = "green";
    if(c == "green" && !!announcements?.length) c = "yellow";
    
    return (
        <Stack align="center">
            <Paper
                withBorder={withBorder}
                className="hoverable ptr"
                onClick={(!!announcements?.length) && (() => {
                    modals.open({
                        title: "Duyurular",
                        withinPortal: false,
                        children: (
                            <Stack>
                                {announcements?.map((a, i) => <AnnouncementCard announcement={a} key={i} />)}
                            </Stack>
                        ),
                    })
                })}
            >
                <Group gap="xs">
                    {!!announcements?.length && (
                        <IconInfoCircle />
                    )}
                    <Text fw="bold" c={c}>
                        {entry.time}
                    </Text>
                    {entry.marker && (
                        <Text>{entry.marker}</Text>
                    )}
                </Group>
            </Paper>
        </Stack>
    )
};
