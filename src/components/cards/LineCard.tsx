import { Line } from "@/types/Line"
import { Group, Paper, Stack, Text } from "@mantine/core"
import { IconRoute } from "@tabler/icons-react"
import Link from "next/link"

export const LineCard = ({ line }: { line: Line }) => {
    return (
        <Paper
            c="var(--mantine-color-text)"
            className="hoverable"
            component={Link}
            href={`/hat/${line.id}`}
            p="xs"
            withBorder
            shadow="md"
        >
            <Stack>
                <Group>
                    <IconRoute />
                    <Stack gap={0}>
                        <Text fw="bold">{line.id}</Text>
                        <Text>{line.label}</Text>
                    </Stack>
                </Group>
            </Stack>
        </Paper>
    )
}
