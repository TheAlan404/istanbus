import { Announcement } from "@common/types/Announcement";
import { Chip, CloseIcon, Group, Loader, MultiSelect, SegmentedControl, Stack } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { Suspense, useState } from "react";
import { AnnouncementCard } from "../../components/cards/AnnouncementCard";
import { IconSpeakerphone } from "@tabler/icons-react";
import { Header } from "../../components/ui/Header";

export const AnnouncementsPage = () => {
    const [lineFilter, setLineFilter] = useState<string[]>([]);
    const [typeFilter, setTypeFilter] = useState<"none" | "Günlük" | "Sefer">("none");
    const { data, loading, refetch } = useFetch<Announcement[]>("/api/v1/announcements");

    let lines = Array.from(new Set((data || []).map(x => x.line)));

    let list = (data || [])
        .filter(x => !lineFilter.length || lineFilter.includes(x.line))
        .filter(x => typeFilter == "none" || x.type == typeFilter);

    return (
        <Stack>
            <Header
                icon={<IconSpeakerphone />}
                title="Duyurular"
                onReload={refetch}
                loading={loading}
            />

            <Group grow align="end">
                <SegmentedControl
                    data={[
                        { value: "none", label: "Hepsi" },
                        { value: "Günlük", label: "Günlük" },
                        { value: "Sefer", label: "Sefer İptalleri" },
                    ]}
                    value={typeFilter}
                    onChange={(v: "none" | "Günlük" | "Sefer") => setTypeFilter(v)}
                />

                <MultiSelect
                    data={lines}
                    placeholder="Hat'a göre filtrele"
                    label="Filtre"
                    value={lineFilter}
                    onChange={setLineFilter}
                    clearable
                    searchable
                    nothingFoundMessage="Hiçbirşey... Hat hakkında duyuru olmayabilir"
                />
            </Group>

            <Stack>
                {loading && <Loader />}

                <Suspense fallback={<Loader />}>
                    {list.map((a, i) => (
                        <AnnouncementCard
                            announcement={a}
                            key={i}
                        />
                    ))}
                </Suspense>
            </Stack>
        </Stack>
    )
};
