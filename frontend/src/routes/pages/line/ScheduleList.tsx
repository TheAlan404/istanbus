import { LineDetails } from "@common/types/Line";
import { ScheduleDay } from "@common/types/Schedule";
import { useState } from "react";
import { ScheduleEntryCard } from "../../../components/cards/ScheduleEntryCard";
import { getAnnouncementsForEntry, isAvailable, isToday } from "../../../utils/schedule";
import { Divider, Group, Spoiler, Stack, Table, Text, Title } from "@mantine/core";
import { DirectionControl } from "./DirectionControl";

export const ScheduleList = ({ details }: { details?: LineDetails }) => {
    const [direction, setDirection] = useState(0);

    let days = details?.schedule?.directions?.[direction]?.days || [];

    let rows: React.ReactNode[][] = [];

    let hdr = ["workdays", "saturday", "sunday"] as ScheduleDay["type"][];
    for (let { entries, type } of days) {
        entries.forEach((entry, i) => {
            if(!rows[i]) rows[i] = [null, null, null];

            rows[i][hdr.indexOf(type)] = (
                <ScheduleEntryCard
                    announcements={getAnnouncementsForEntry({
                        day: type,
                        entry,
                        details,
                        dir: direction,
                    })}
                    entry={entry}
                    day={type}
                />
            );
        });
    }

    let next = days
        .filter(x => isToday(x.type))
        .map(x => x.entries)
        .flat()
        .filter(x => isAvailable(x));

    let currentDayType = days.find(x => isToday(x.type))?.type;

    return (
        <Stack>
            <DirectionControl
                details={details}
                direction={direction}
                setDirection={setDirection}
            />

            <Stack gap="xs">
                {!!rows.length && (
                    <Title order={6}>
                        Bir sonraki kalkışlar:
                    </Title>
                )}

                {!next.length && !!rows.length && (
                    <Text c="dimmed">
                        Kalkış bulunamadı :(
                    </Text>
                )}

                <Spoiler maxHeight={36} hideLabel="Daha az göster" showLabel="Tümünü göster">
                    <Group px="sm">
                        {next.map((entry, i) => (
                            <ScheduleEntryCard
                                entry={entry}
                                day={currentDayType}
                                announcements={getAnnouncementsForEntry({
                                    entry,
                                    day: currentDayType,
                                    details,
                                    dir: direction,
                                })}
                                key={i}
                                withBorder
                            />
                        ))}
                    </Group>
                </Spoiler>
            </Stack>

            <Divider
                w="100%"
                label="Tablo"
            />

            <Stack>
                {!!rows.length ? (
                    <Table
                        stickyHeader
                        stickyHeaderOffset={60}
                        
                        align="center"
                        data={{
                            head: ["İş Günleri", "Cumartesi", "Pazar"]
                                .map(h => (
                                    <Text inherit ta="center" w="100%">
                                        {h}
                                    </Text>
                                )),
                            body: rows,
                        }}
                        style={{ tableLayout: "fixed" }}
                    />
                ) : (
                    <Text c="dimmed" ta="center">
                        Çizelge boş :(
                    </Text>
                )}
            </Stack>
        </Stack>
    )
}
