import { useState, useTransition } from "react";
import { DirectionControl } from "./DirectionControl";
import { Loader, Stack } from "@mantine/core";
import { StopCard } from "../../../components/cards/StopCard";
import { LineDetails } from "@common/types/Line";

export const StopsList = ({ details }: { details?: LineDetails }) => {
    const [direction, setDirection] = useState(0);
    const [isPending, startTransition] = useTransition();

    let stops = details?.stops?.[direction]?.stops || [];

    return (
        <Stack>
            <DirectionControl
                details={details}
                direction={direction}
                setDirection={(dir) => startTransition(() => setDirection(dir))}
            />

            <Stack>
                {isPending ? (
                    <Stack align="center">
                        <Loader />
                    </Stack>
                ) : (
                    stops.map((stop, i) => (
                        <StopCard stop={stop} index={i + 1} key={stop.id} />
                    ))
                )}
            </Stack>
        </Stack>
    )
}
