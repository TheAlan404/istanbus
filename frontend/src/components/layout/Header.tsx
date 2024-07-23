import { ActionIcon, Group, Stack, Text, Title } from "@mantine/core"
import { IconReload } from "@tabler/icons-react"

export const Header = ({
    icon,
    title,
    subtitle,
    loading,
    onReload,
}: {
    icon: React.ReactNode,
    title: string,
    subtitle?: string,
    loading: boolean,
    onReload: () => void,
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
            <ActionIcon
                onClick={onReload}
                loading={loading}
                color="gray"
                variant="light"
            >
                <IconReload />
            </ActionIcon>
        </Group>
    )
}
