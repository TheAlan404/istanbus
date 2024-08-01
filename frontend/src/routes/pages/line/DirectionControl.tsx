import { LineDetails } from "@common/types/Line";
import { SegmentedControl, Text } from "@mantine/core";

export const DirectionControl = ({
    details,
    direction,
    setDirection,
}: {
    details?: LineDetails;
    direction: number;
    setDirection: (dir: number) => void;
}) => {
    return (
        <SegmentedControl
            fullWidth
            data={(details?.stops?.map(x => x.stops[0]?.name) || [] as string[]).map((label, value) => ({
                label: (
                    <Text>
                        Kalkış: <Text inline fw="bold">{label}</Text>
                    </Text>
                ),
                value: value.toString(),
            }))}
            value={direction.toString()}
            onChange={(v) => setDirection(Number(v))}
        />
    )
}
