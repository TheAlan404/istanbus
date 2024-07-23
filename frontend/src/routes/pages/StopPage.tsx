import { Line, LineDetails } from "@common/types/Line";
import { Schedule } from "@common/types/Schedule";
import { IncomingBus, Stop } from "@common/types/Stop";
import { Accordion, ActionIcon, Box, Button, Chip, CloseButton, Divider, Group, Loader, SegmentedControl, Stack, Text, Title } from "@mantine/core";
import { useFetch, useListState } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { AnnouncementCard } from "../../components/cards/AnnouncementCard";
import { IconBusStop, IconExternalLink, IconLiveView, IconReload, IconRoute, IconSpeakerphone } from "@tabler/icons-react";
import { Suspense, useState } from "react";
import { StopCard } from "../../components/cards/StopCard";
import { LineCard } from "../../components/cards/LineCard";
import { Header } from "../../components/layout/Header";

export const StopPage = () => {
    const { stop } = useParams();
	const { data, loading, refetch } = useFetch<{ busses: IncomingBus[], stop: Stop, lines: Line[] }>(`/api/v1/stop/${stop}`);

    console.log(data);

    return (
        <Stack>
            {data && (
                <Box h="8em">
                    {data && (
                        <iframe
                            style={{
                                width: "100%",
                                height: "100%",
                                border: "0px",
                                //filter: "grayscale(90%) invert(92%) contrast(83%)",
                            }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?${new URLSearchParams({ q: `${data.stop.position.y}N ${data.stop.position.x}E`, key: "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8" }).toString()}`}
                        />
                    )}
                </Box>
            )}

            <Header
                icon={<IconBusStop />}
                loading={loading}
                onReload={refetch}
                title={loading || !data ? "Yükleniyor..." : data.stop.name}
                subtitle={data && data.stop.area.join(", ")}
            />

            <Group>
                {[
                    {
                        label: "IETT",
                        link: `https://iett.istanbul/StationDetail?dkod=${stop}`,
                    }
                ].map(({ label, link }, i) => (
                    <Button
                        component="a"
                        href={link}
                        target="_blank"
                        leftSection={<IconExternalLink />}
                        variant="light"
                        color="gray"
                    >
                        {label}
                    </Button>
                ))}
            </Group>

            <Accordion multiple>
                <Accordion.Item value="lines">
                    <Accordion.Control>
                        <Group>
                            <IconRoute />
                            Duraktan Geçen Hatlar
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Stack>
                            {(data?.lines || []).map(line => (
                                <LineCard line={line} key={line.id} />
                            ))}
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="busses">
                    <Accordion.Control>
                        <Group>
                            <IconLiveView />
                            Anlık Otobüs Bilgisi
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <IncomingBusses busses={data?.busses} />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Stack>
    )
}

const IncomingBusses = ({ busses }: { busses?: IncomingBus[] }) => {
    const [filter, setFilter] = useState<string[]>([]);

    let list = (busses || []).filter(x => !filter.length || filter.includes(x.id));

    let lines = Array.from(new Set((busses || []).map(x => x.id))).sort();

    return (
        <Stack>
            <Group>
                <Chip.Group multiple value={filter} onChange={setFilter}>
                    {lines.map(line => (
                        <Chip key={line} value={line}>
                            {line}
                        </Chip>
                    ))}
                </Chip.Group>

                {!!filter.length && (
                    <CloseButton
                        onClick={() => setFilter([])}
                    />
                )}
            </Group>

            <Stack>
                {list.map((bus, i) => (
                    <LineCard key={i} line={bus} est={bus.estimation} />
                ))}
            </Stack>
        </Stack>
    )
}

