import { Line } from "@common/types/Line";
import { IncomingBus, Stop } from "@common/types/Stop";
import { Accordion, Box, Button, Chip, CloseButton, Group, MultiSelect, Stack, Text } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { IconBusStop, IconExternalLink, IconLiveView, IconReload, IconRoute } from "@tabler/icons-react";
import { useState } from "react";
import { LineCard } from "../../components/cards/LineCard";
import { Header } from "../../components/ui/Header";
import { useFaves } from "../../hooks/useFaves";

export const StopPage = () => {
    const { stop } = useParams();
	const { data, loading } = useFetch<{ stop: Stop, lines: Line[] }>(`/api/v1/stop/${stop}`);
    const { faves, setFaves } = useFaves();

    return (
        <Stack>
            <Box h="8em" bg="dark">
                {data && (
                    <iframe
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "0px",
                        }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?${new URLSearchParams({ q: `${data.stop.position.y}N ${data.stop.position.x}E`, key: "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8" }).toString()}`}
                    />
                )}
            </Box>

            <Header
                icon={<IconBusStop />}
                title={loading || !data ? "Yükleniyor..." : data.stop.name}
                subtitle={data && data.stop.area.join(", ")}
                
                favourite={faves.some(f => f.ty == "stop" && f.id == stop)}
                setFavourite={(f) => setFaves(f ? [...faves, { ty: "stop", id: stop }] : faves.filter(l => !(l.ty == "stop" && l.id == stop)))}
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
                <Accordion.Item value="busses">
                    <Accordion.Control>
                        <Group>
                            <IconLiveView />
                            Anlık Otobüs Bilgisi
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <IncomingBusses
                            stop={stop}
                            lines={data?.lines?.map(x => x.id) || []}
                        />
                    </Accordion.Panel>
                </Accordion.Item>

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
            </Accordion>
        </Stack>
    )
}

const IncomingBusses = ({ stop, lines: _lines }: { stop: string; lines: string[] }) => {
    const { data, loading, refetch } = useFetch<IncomingBus[]>(`/api/v1/busses/${stop}`);

    const [filter, setFilter] = useState<string[]>([]);

    let list = (data || []).filter(x => !filter.length || filter.includes(x.id));

    let lines = Array.from(new Set(
        [
            ...((data || []).map(x => x.id)),
            ..._lines,
        ]
    )).sort();

    return (
        <Stack pt="sm">
            <Group justify="space-between" wrap="nowrap" align="start">
                {lines.length > 5 ? (
                    <Group grow w="100%">
                        <MultiSelect
                            data={lines}
                            value={filter}
                            onChange={setFilter}
                            clearable
                            searchable
                            placeholder="Filtrele..."
                            nothingFoundMessage="Hat bulunamadı, bu duraktan geçmeyebilir"
                        />
                    </Group>
                ) : (
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
                )}

                <Group>
                    <Button
                        variant="light"
                        onClick={refetch}
                        loading={loading}
                        leftSection={<IconReload />}
                    >
                        Yenile
                    </Button>
                </Group>
            </Group>

            <Stack>
                {!list.length && (
                    <Text c="dimmed" ta="center">
                        Otobüs bulunamadı :c
                    </Text>
                )}

                {list.map((bus, i) => (
                    <LineCard key={i} line={bus} est={bus.estimation} />
                ))}
            </Stack>
        </Stack>
    )
}

