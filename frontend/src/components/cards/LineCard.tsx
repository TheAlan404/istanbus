import { Line } from "@common/types/Line"
import { Grid, Group, Paper, Stack, Text } from "@mantine/core"
import { IconRoute } from "@tabler/icons-react"
import { Link } from "react-router-dom"

export const LineCard = ({ line }: { line: Line }) => {
    return (
        <Paper
            c="var(--mantine-color-text)"
            className="hoverable"
            component={Link}
            to={`/hat/${line.id}`}
            p="xs"
            withBorder
            shadow="md"
        >
            <Grid gutter="sm">
                <Grid.Col span="content">
                    <IconRoute />
                </Grid.Col>
                <Grid.Col span="auto">
                    <Stack gap={0}>
                        <Text fw="bold">{line.id}</Text>
                        <Text>{line.label}</Text>
                    </Stack>
                </Grid.Col>
            </Grid>
        </Paper>
    )
}