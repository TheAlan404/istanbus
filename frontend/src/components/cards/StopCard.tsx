import { Stop } from "@common/types/Stop"
import { Grid, Group, Paper, Stack, Text } from "@mantine/core"
import { IconBusStop } from "@tabler/icons-react"
import { Link } from "react-router-dom"

export const StopCard = ({ stop }: { stop: Stop }) => {
    return (
        <Paper
            c="var(--mantine-color-text)"
            className="hoverable"
            component={Link}
            to={`/durak/${stop.id}`}
            p="xs"
            withBorder
            shadow="md"
        >
            <Grid gutter="sm">
                <Grid.Col span="content">
                    <IconBusStop />
                </Grid.Col>
                <Grid.Col span="auto">
                    <Stack gap={0}>
                        <Group justify="space-between">
                            <Text fw="bold">{stop.name}</Text>
                            <Text c="dimmed">{stop.id}</Text>
                        </Group>
                        <Text>{stop.area.join(", ")}</Text>
                    </Stack>
                </Grid.Col>
            </Grid>
        </Paper>
    )
}
