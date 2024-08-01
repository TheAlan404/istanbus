import { Announcement } from "@common/types/Announcement";
import { Alert, Button, Group, Stack, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { ScheduleEntryCard } from "./ScheduleEntryCard";
import { getToday, isAvailable } from "../../utils/schedule";

export const AnnouncementCard = ({
    announcement,
}: { announcement: Announcement }) => {
    return (
        <Alert
            bg={(
                (announcement.type == "Sefer" && !isAvailable({ time: announcement.time, provider: "IETT" }))
                ? "dark.7"
                : undefined
            )}
            title={(
                <Group wrap="nowrap" justify="space-between" w="100%">
                    <Group>
                        <Button
                            variant="outline"
                            size="compact-sm"
                            component={Link}
                            to={`/hat/${announcement.line}`}
                        >
                            {announcement.line}
                        </Button>
                        <Text inherit>{announcement.label}</Text>
                    </Group>
                    <Text span c="dimmed">{announcement.dateText}</Text>
                </Group>
            )}
            icon={<IconInfoCircle />}
        >
            <Stack gap={0}>
                {announcement.type == "Günlük" ? (
                    <Text>
                        {announcement.message}
                    </Text>
                ) : (
                    <Stack gap={0}>
                        <Text>
                            Sefer çeşitli sebeplerden dolayı iptal edilmiştir
                        </Text>
                        <Group wrap="nowrap">
                            <Stack gap={0}>
                                <Text fw="bold">Kalkış:</Text>
                                <Text fw="bold">Saat:</Text>
                            </Stack>
                            <Stack gap={0} align="start">
                                <Text>{announcement.direction}</Text>
                                <ScheduleEntryCard
                                    entry={{ time: announcement.time, provider: "IETT" }}
                                    announcements={[announcement]}
                                    day={getToday()}
                                />
                            </Stack>
                        </Group>
                    </Stack>
                )}
            </Stack>
        </Alert>
    )
};
