import { Announcement } from "@common/types/Announcement";
import { Alert, Button, Group, Stack, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const AnnouncementCard = ({
    announcement,
}: { announcement: Announcement }) => {
    return (
        <Alert
            title={(
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
            )}
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
