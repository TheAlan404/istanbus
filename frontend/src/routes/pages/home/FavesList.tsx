import { Stack } from "@mantine/core";
import { useFaves } from "../../../hooks/useFaves"
import { LineCardFromID } from "../../../components/cards/LineCard";
import { StopCardFromID } from "../../../components/cards/StopCard";

export const FavesList = () => {
    const { faves, setFaves } = useFaves();

    return (
        <Stack w="100%">
            {faves.map(({ ty, id }) => (
                ty == "line" ? (
                    <LineCardFromID id={id} key={ty+"::"+id} />
                ) : (
                    <StopCardFromID id={id} key={ty+"::"+id} />
                )
            ))}
        </Stack>
    )
}
