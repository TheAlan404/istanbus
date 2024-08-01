import { LineDetails } from "@common/types/Line";
import { Accordion, Button, Group, Loader, Space, Stack, Text } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { AnnouncementCard } from "../../../components/cards/AnnouncementCard";
import { IconBusStop, IconCalendarClock, IconExternalLink, IconRoute, IconSpeakerphone } from "@tabler/icons-react";
import { Header } from "../../../components/ui/Header";
import { StopsList } from "./StopsList";
import { ScheduleList } from "./ScheduleList";
import { AnnouncementsList } from "./AnnouncementsList";
import { useFaves } from "../../../hooks/useFaves";

export const LinePage = () => {
    const { line } = useParams();
    const { data, loading, refetch } = useFetch<LineDetails>(`/api/v1/line/${line}`);
    const { faves, setFaves } = useFaves();

    return (
        <Stack>
            <Header
                icon={<IconRoute />}
                title={line.toLocaleUpperCase("tr")}
                subtitle={loading ? "Yükleniyor..." : data?.label}
                loading={loading}
                onReload={refetch}
                favourite={faves.some(f => f.ty == "line" && f.id == line)}
                setFavourite={(f) => setFaves(f ? [...faves, { ty: "line", id: line }] : faves.filter(l => l.ty !== "line" && l.id !== line))}
            />

            <Group>
                {[
                    {
                        label: "IETT",
                        link: `https://iett.istanbul/RouteDetail?hkod=${line}`,
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
                {!!data?.announcements?.length && (
                    <Accordion.Item value="announcements">
                        <Accordion.Control>
                            <Group>
                                <IconSpeakerphone />
                                <Text>
                                    Duyurular ({data.announcements.length})
                                </Text>
                            </Group>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Stack>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <AnnouncementsList
                                        announcements={data.announcements}
                                    />
                                )}
                            </Stack>
                        </Accordion.Panel>
                    </Accordion.Item>
                )}

                <Accordion.Item value="schedule">
                    <Accordion.Control>
                        <Group>
                            <IconCalendarClock />
                            <Text>
                                Çizelge
                            </Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        {loading ? (
                            <Loader />
                        ) : (
                            <ScheduleList details={data} />
                        )}
                        <Space h="5em" />
                    </Accordion.Panel>
                </Accordion.Item>
                
                <Accordion.Item value="stops">
                    <Accordion.Control>
                        <Group>
                            <IconBusStop />
                            <Text>
                                Duraklar
                            </Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        {loading ? (
                            <Loader />
                        ) : (
                            <StopsList details={data} />
                        )}
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Stack>
    )
}


