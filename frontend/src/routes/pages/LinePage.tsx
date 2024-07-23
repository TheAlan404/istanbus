import { Line, LineDetails } from "@common/types/Line";
import { Schedule, ScheduleDay, ScheduleEntry } from "@common/types/Schedule";
import { StopsResponse } from "@common/types/Stop";
import { Announcement } from "@common/types/Announcement";
import { Accordion, Box, Button, Divider, Group, Loader, SegmentedControl, Stack, Table, Text, Title } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { AnnouncementCard } from "../../components/cards/AnnouncementCard";
import { IconBusStop, IconCalendarClock, IconExternalLink, IconRoute, IconSpeakerphone } from "@tabler/icons-react";
import React, { Suspense, useState } from "react";
import { StopCard } from "../../components/cards/StopCard";
import { Header } from "../../components/layout/Header";
import { isAvailable, isToday, ScheduleEntryCard } from "../../components/cards/ScheduleEntryCard";

export const LinePage = () => {
    const { line } = useParams();
    const { data, loading, refetch } = useFetch<LineDetails>(`/api/v1/line/${line}`);


    console.log(data);

    let filteredAnnouncements = data?.announcements || [];


    return (
        <Stack>
            <Header
                icon={<IconRoute />}
                title={line.toLocaleUpperCase("tr")}
                subtitle={loading ? "Yükleniyor..." : data?.label}
                loading={loading}
                onReload={refetch}
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
                {!!filteredAnnouncements.length && (
                    <Accordion.Item value="announcements">
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
                        <ScheduleList details={data} />
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
                        <StopsList details={data} />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Stack>
    )
}

const getAnnouncementsForEntry = ({ details, entry, day }: { details: LineDetails, entry: ScheduleEntry, day: ScheduleDay["type"] }) => {
    if(!isToday(day)) return;
    return details?.announcements?.filter(x => x.type == "Sefer" && x.message.includes(entry.time));
}

const ScheduleList = ({ details }: { details?: LineDetails }) => {
    const [direction, setDirection] = useState(0);

    let days = details?.schedule?.directions?.[direction]?.days || [];

    let rows: React.ReactNode[][] = [];

    let hdr = ["workdays", "saturday", "sunday"] as ScheduleDay["type"][];
    for (let { entries, type } of days) {
        entries.forEach((entry, i) => {
            if(!rows[i]) rows[i] = [null, null, null];

            rows[i][hdr.indexOf(type)] = <ScheduleEntryCard announcements={getAnnouncementsForEntry({ day: type, entry, details })} entry={entry} day={type} />;
        });
    }

    let next = days
        .filter(x => isToday(x.type))
        .map(x => x.entries)
        .flat()
        .filter(x => isAvailable(x))
        .slice(0, 10);

    let currentDayType = days.find(x => isToday(x.type))?.type;

    return (
        <Stack>
            <SegmentedControl
                fullWidth
                data={(details?.between || [] as string[]).map((label, value) => ({
                    label: `Kalkış: ${label}`,
                    value: value.toString(),
                }))}
                value={direction.toString()}
                onChange={(v) => setDirection(Number(v))}
            />

            <Stack gap={0}>
                <Title order={6}>
                    Bir sonraki kalkışlar:
                </Title>

                <Group>
                    {next.map((entry, i) => (
                        <ScheduleEntryCard
                            entry={entry}
                            day={currentDayType}
                            announcements={getAnnouncementsForEntry({ entry, day: currentDayType, details })}
                            key={i}
                            withBorder
                        />
                    ))}
                </Group>
            </Stack>

            <Stack>
                <Table
                    stickyHeader
                    stickyHeaderOffset={60}
                    highlightOnHover
                    align="center"
                    data={{
                        head: ["İş Günleri", "Cumartesi", "Pazar"].map(h => <Text inherit ta="center">{h}</Text>),
                        body: rows,
                    }}
                />
            </Stack>
        </Stack>
    )
}

const StopsList = ({ details }: { details?: LineDetails }) => {
    const [direction, setDirection] = useState(0);

    let stops = details?.stops?.[direction]?.stops || [];

    return (
        <Stack>
            <SegmentedControl
                fullWidth
                data={(details?.between || []).map((label, value) => ({
                    label: `Kalkış: ${label}`,
                    value: value.toString(),
                }))}
                value={direction.toString()}
                onChange={(v) => setDirection(Number(v))}
            />

            <Stack>
                {stops.map((stop, i) => (
                    <StopCard stop={stop} index={i + 1} key={stop.id} />
                ))}
            </Stack>
        </Stack>
    )
}
