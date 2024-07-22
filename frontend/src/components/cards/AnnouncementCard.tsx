import { Announcement } from "@common/types/Announcement";
import { Alert, Group, Stack, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export const AnnouncementCard = ({
    announcement,
}: { announcement: Announcement }) => {
    return (
        <Alert
            title={announcement.line + " | " + announcement.label}
            icon={<IconInfoCircle />}
        >
            <Stack>
                <Text>
                    {announcement.message}
                </Text>
                <Text c="dimmed">
                    <Group justify="space-between">
                        <Text span inherit>{announcement.type}</Text>
                        <Text span inherit>{announcement.dateText}</Text>
                    </Group>
                </Text>
            </Stack>
        </Alert>
    )
};
