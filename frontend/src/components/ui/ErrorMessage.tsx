import { Box, Button, Stack, Text } from "@mantine/core";
import { IconAlertTriangle, IconReload } from "@tabler/icons-react";
import { useEffect } from "react";

export const ErrorMessage = ({
    error,
    retry,
}: {
    error?: any,
    retry?: () => void,
}) => {
    return (
        <Box>
            {error && (
                <Stack align="center">
                    <IconAlertTriangle />
                    <Stack gap={0} align="center">
                        <Text fw="bolder" c="yellow">Hata</Text>
                        <Text>{error.toString()}</Text>
                    </Stack>
                    {retry && (
                        <Button
                            variant="light"
                            
                            size="compact-sm"
                            leftSection={<IconReload />}
                            onClick={() => retry()}
                        >
                            Retry
                        </Button>
                    )}
                </Stack>
            )}
        </Box>
    );
};
