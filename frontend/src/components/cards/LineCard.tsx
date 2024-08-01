import { Line } from "@common/types/Line"
import { Grid, Group, Loader, Paper, Stack, Text } from "@mantine/core"
import { useFetch } from "@mantine/hooks"
import { IconRoute } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const LineCardFromID = ({ id }: { id: string }) => {
    const { data } = useFetch<Line>("/api/v1/quick?" + new URLSearchParams({ type: "line", id }).toString());

    return (
        <LineCard
            line={{
                id,
                label: "Yükleniyor...",
                ...(data || {}),
            } as Line}
        />
    )
}

export const LineCard = ({
    line,
    est,
    loading,
}: {
    line: Line,
    est?: string,
    loading?: boolean,
}) => {
    return (
        <Paper
            c="var(--mantine-color-text)"
            className="hoverable"
            component={Link}
            to={`/hat/${line?.id}`}
            p="xs"
            withBorder
            shadow="md"
        >
            <Grid gutter="sm">
                <Grid.Col span="content">
                    {loading ? <Loader /> : <IconRoute />}
                </Grid.Col>
                <Grid.Col span="auto">
                    <Stack gap={0}>
                        <Text fw="bold">{line.id}</Text>
                        <Text>{line.label}</Text>
                    </Stack>
                </Grid.Col>
                {est && (
                    <Grid.Col span="content">
                        <Estimation est={est} />
                    </Grid.Col>
                )}
            </Grid>
        </Paper>
    )
}

function automaticRelativeDifference(d: Date) {
	const diff = -((new Date().getTime() - d.getTime())/1000)|0;
	const absDiff = Math.abs(diff);
	if (absDiff > 86400*30*10) {
		return { duration: Math.round(diff/(86400*365)), unit: 'years' };
	}
	if (absDiff > 86400*25) {
		return { duration: Math.round(diff/(86400*30)), unit: 'months' };
	}
	if (absDiff > 3600*21) {
		return { duration: Math.round(diff/86400), unit: 'days' };
	}
	if (absDiff > 60*44) {
		return { duration: Math.round(diff/3600), unit: 'hours' };
	}
	if (absDiff > 30) {
		return { duration: Math.round(diff/60), unit: 'minutes' };
	}
	return { duration: diff, unit: 'seconds' };
}

const Estimation = ({ est }: { est: string }) => {
    const calc = () => {
        let [h, m] = est.split(":").map(Number);
        let date = new Date();
        date.setHours(h);
        date.setMinutes(m);
        let formatter = new Intl.RelativeTimeFormat("tr", { style: "narrow", numeric: "auto" });
        let { duration, unit } = automaticRelativeDifference(date);
        return formatter.format(duration, unit as Intl.RelativeTimeFormatUnit);
    };
    
    const [text, setText] = useState(calc());

    useEffect(() => {
        let i = setInterval(() => {
            setText(calc());
        }, 1000);
        return () => clearInterval(i);
    }, []);

    return (
        <Stack align="end" gap={0}>
            <Text fw="bold">{text}</Text>
            <Text>{est}</Text>
        </Stack>
    )
};
