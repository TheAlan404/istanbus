import { Line, LineDetails } from "@common/types/Line";
import { Schedule } from "@common/types/Schedule";
import { IncomingBus, Stop } from "@common/types/Stop";
import { Accordion, ActionIcon, Box, Button, Divider, Group, Loader, SegmentedControl, Stack, Text, Title } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { AnnouncementCard } from "../../components/cards/AnnouncementCard";
import { IconBusStop, IconReload, IconSpeakerphone } from "@tabler/icons-react";
import { Suspense, useState } from "react";
import { StopCard } from "../../components/cards/StopCard";
import { LineCard } from "../../components/cards/LineCard";

export const StopPage = () => {
    const { stop } = useParams();
	const { data, loading, refetch } = useFetch<{ busses: IncomingBus[], stop: Stop }>(`/api/v1/stop/${stop}`);

    console.log(data);

    return (
        <Stack>
            <Group justify="space-between">
                <Group>
                    <IconBusStop />
                    <Stack gap={0}>
                        <Title order={3}>
                            {loading || !data ? "Yükleniyor..." : data.stop.name}
                        </Title>
                        <Text>
                            {data && data.stop.area.join(", ")}
                        </Text>
                    </Stack>
                </Group>
                <ActionIcon
                    onClick={refetch}
                    loading={loading}
                    color="gray"
                    variant="light"
                >
                    <IconReload />
                </ActionIcon>
            </Group>

            <Stack>
                {data && data.busses.map((bus, i) => (
                    <LineCard line={bus} est={bus.estimation} />
                ))}
            </Stack>
        </Stack>
    )
}

