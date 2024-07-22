import { Line, LineDetails } from "@common/types/Line";
import { Schedule } from "@common/types/Schedule";
import { StopsResponse } from "@common/types/Stop";
import { Announcement } from "@common/types/Announcement";
import { Accordion, Box, Button, Divider, Group, Loader, SegmentedControl, Stack, Text } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { AnnouncementCard } from "../../components/cards/AnnouncementCard";
import { IconSpeakerphone } from "@tabler/icons-react";
import { Suspense, useState } from "react";
import { StopCard } from "../../components/cards/StopCard";

export const LinePage = () => {
    const { line } = useParams();
	const { data } = useFetch<LineDetails>(`/api/v1/line/${line}`);
    const [direction, setDirection] = useState(0);

    let filteredAnnouncements = data?.announcements || [];
    let stops = data?.stops?.[direction]?.stops || [];

    return (
        <Stack>
            {!!filteredAnnouncements.length && (
                <Accordion defaultValue="a">
                    <Accordion.Item value="a">
                        <Accordion.Control>
                            <Group>
                                <IconSpeakerphone />
                                <Text>
                                    Duyurular ({filteredAnnouncements.length})
                                </Text>
                            </Group>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Stack>
                                {filteredAnnouncements.map((a, i) => (
                                    <AnnouncementCard announcement={a} key={i} />
                                ))}
                            </Stack>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            )}

            <Divider
                label="Duraklar"
            />

            <SegmentedControl
                data={(data?.between || []).map((label, value) => ({
                    label: `Kalkış: ${label}`,
                    value: value.toString(),
                }))}
                value={direction.toString()}
                onChange={(v) => setDirection(Number(v))}
            />

            <Stack>
                {stops.map((stop) => (
                    <StopCard stop={stop} key={stop.id} />
                ))}
            </Stack>
        </Stack>
    )
}

