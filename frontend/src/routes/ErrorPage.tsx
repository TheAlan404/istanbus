import { Stack, Text } from "@mantine/core";
import { useRouteError } from "react-router-dom"

export const ErrorPage = () => {
    let e = useRouteError();

    console.log(e);

    return (
        <Stack>
            <Text c="red">
                {JSON.stringify(e)}
            </Text>
        </Stack>
    )
}
