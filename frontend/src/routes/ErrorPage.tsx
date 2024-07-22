import { Stack, Text } from "@mantine/core";
import { useRouteError } from "react-router-dom"

export const ErrorPage = () => {
    let e = useRouteError();

    return (
        <Stack>
            <Text c="red">
                {e?.toString?.()}
            </Text>
        </Stack>
    )
}
