import { useState } from "react";
import { DirectionControl } from "./DirectionControl";
import { Stack } from "@mantine/core";
import { StopCard } from "../../../components/cards/StopCard";
import { LineDetails } from "@common/types/Line";

export const StopsList = ({ details }: { details?: LineDetails }) => {
    const [direction, setDirection] = useState(0);

    let stops = details?.stops?.[direction]?.stops || [];

    return (
        <Stack>
            <DirectionControl
                details={details}
                direction={direction}
                setDirection={setDirection}
            />

            <Stack>
                {stops.map((stop, i) => (
                    <StopCard stop={stop} index={i + 1} key={stop.id} />
                ))}
            </Stack>
        </Stack>
    )
}
