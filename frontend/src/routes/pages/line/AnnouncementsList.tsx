import { Announcement } from "@common/types/Announcement";
import { useState } from "react"
import { AnnouncementCard } from "../../../components/cards/AnnouncementCard";
import { SegmentedControl, Stack, Text } from "@mantine/core";

export const AnnouncementsList = ({ announcements }: { announcements: Announcement[] }) => {
    const [filter, setFilter] = useState<"none" | Announcement["type"]>("none");

    let filteredAnnouncements = announcements.filter(x => filter == "none" || x.type == filter);
    
    return (
        <Stack>
            <SegmentedControl
                data={[
                    { value: "none", label: "Hepsi" },
                    { value: "Günlük", label: "Günlük" },
                    { value: "Sefer", label: "Sefer İptalleri" },
                ]}
                value={filter}
                onChange={(v: "none" | "Günlük" | "Sefer") => setFilter(v)}
            />

            {filteredAnnouncements.map((a, i) => (
                <AnnouncementCard announcement={a} key={i} />
            ))}

            {!filteredAnnouncements.length && (
                <Text c="dimmed" ta="center">
                    Duyuru bulunamadı :(
                </Text>
            )}
        </Stack>
    )
}
