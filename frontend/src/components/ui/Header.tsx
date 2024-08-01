import { ActionIcon, Group, Stack, Text, Title, Tooltip } from "@mantine/core"
import { IconReload, IconStar, IconStarFilled } from "@tabler/icons-react"

export const Header = ({
    icon,
    title,
    subtitle,
    loading,
    onReload,
    favourite,
    setFavourite,
}: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    loading?: boolean;
    onReload?: () => void;
    favourite?: boolean;
    setFavourite?: (fave: boolean) => void;
}) => {
    return (
        <Group justify="space-between" wrap="nowrap">
            <Group wrap="nowrap">
                {icon}
                <Stack gap={0}>
                    <Title order={4}>
                        {title}
                    </Title>
                    <Text>
                        {subtitle}
                    </Text>
                </Stack>
            </Group>
            <Group>
                {favourite !== undefined && (
                    <Tooltip label={favourite ? "Favorilerden çıkar" : "Favorilere ekle"}>
                        <ActionIcon
                            onClick={() => setFavourite(!favourite)}
                            color={favourite ? "yellow" : "gray"}
                            variant="light"
                        >
                            {favourite ? (
                                <IconStarFilled />
                            ) : (
                                <IconStar />
                            )}
                        </ActionIcon>
                    </Tooltip>
                )}
                {onReload && (
                    <Tooltip label="Yenile">
                        <ActionIcon
                            onClick={onReload}
                            loading={loading}
                            color="gray"
                            variant="light"
                        >
                            <IconReload />
                        </ActionIcon>
                    </Tooltip>
                )}
            </Group>
        </Group>
    )
}
