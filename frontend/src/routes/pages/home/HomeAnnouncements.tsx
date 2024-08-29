import { Accordion, Group, Loader, Stack, Text } from "@mantine/core"
import { IconSpeakerphone } from "@tabler/icons-react"
import { AnnouncementsList } from "../line/AnnouncementsList";
import { ErrorMessage } from "../../../components/ui/ErrorMessage";
import { useFaves } from "../../../hooks/useFaves";
import { useFetch } from "@mantine/hooks";
import { Announcement } from "@common/types/Announcement";

export const HomeAnnouncements = () => {
    const { faves } = useFaves();
    let faveLines = faves.filter(f => f.ty == "line").map(x => x.id);
    const { data, loading, refetch, error } = useFetch<Announcement[]>("/api/v1/announcements?" + new URLSearchParams({
        lines: (faveLines.length ? faveLines : ["NULL"]).join(";")
    }).toString());

    return (
        <Stack w="100%">
            <ErrorMessage
                error={error}
                retry={refetch}
            />

            {!!(data || []).length ? (
                <Accordion defaultValue="announcements">
                    <Accordion.Item value="announcements">
                        <Accordion.Control>
                            <Group>
                                <IconSpeakerphone />
                                <Text>
                                    Favori Hatlardan Duyurular ({data?.length})
                                </Text>
                            </Group>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Stack>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <AnnouncementsList
                                        announcements={data}
                                    />
                                )}
                            </Stack>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            ) : (
                <Text c="dimmed" ta="center">
                    {faveLines.length ? (
                        loading ? "Duyurular yükleniyor..." : "Favori hatlarınızdan duyuru yok :D"
                    ) : "Favorilenen hatların duyuruları burada gösterilecektir"}
                </Text>
            )}
        </Stack>
    )
}
