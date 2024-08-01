import { Group, Paper, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { ScheduleDay, ScheduleEntry } from "../../../../common/types/Schedule";
import { useDate } from "../../hooks/useDate";
import { Announcement } from "@common/types/Announcement";
import { IconSpeakerphone, IconX } from "@tabler/icons-react";
import { AnnouncementCard } from "./AnnouncementCard";
import { isAvailable, isToday } from "../../utils/schedule";

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
    if(c == "green" && !!announcements?.length) c = "red";
    
    return (
        <Stack align="center">
            <Paper
                withBorder={withBorder}
                className="hoverable ptr"
                onClick={(!!announcements?.length) && (() => {
                    modals.open({
                        title: "Duyurular",
                        withinPortal: false,
                        size: "100%",
                        children: (
                            <Stack>
                                {announcements?.map((a, i) => <AnnouncementCard announcement={a} key={i} />)}
                            </Stack>
                        ),
                    })
                })}
            >
                <Group gap="xs" c={c} wrap="nowrap" style={{ textWrap: "nowrap" }}>
                    <Text fw="bold" td={!!announcements?.length ? "line-through 2px" : ""}>
                        {entry.time}
                    </Text>
                    {entry.marker && (
                        <Text>{entry.marker}</Text>
                    )}
                    {!!announcements?.length && (
                        <IconX />
                    )}
                </Group>
            </Paper>
        </Stack>
    )
};
