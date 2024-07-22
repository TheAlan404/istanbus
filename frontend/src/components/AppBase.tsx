"use client";
import { AppShell, Button, Group, Stack } from "@mantine/core";
import { IconList } from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";

const AppBase = () => {
    return (
        <AppShell
            header={{ height: 60 }}
            px="md"
        >
            <AppShell.Header>
                <Group justify="space-between" align="center" h="100%" px="sm">
                    <Group>
                        <Button
                            variant="transparent"
                            component={Link}
                            to="/"
                        >
                            Istanbus
                        </Button>

                        {[
                            {
                                label: "Bütün Hatlar",
                                link: "/all",
                                icon: <IconList />,
                            }
                        ].map(({ label, link, icon }, i) => (
                            <Button
                                leftSection={icon}
                                component={Link}
                                to={link}
                                key={i}
                            >
                                {label}
                            </Button>
                        ))}
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Main>
                <Stack align="center">
                    <Stack w={{ base: "100%", sm: "80%", md: "60%", lg: "50%" }} py="xl" gap="xl">
                        <Outlet />
                    </Stack>
                </Stack>
            </AppShell.Main>
        </AppShell>
    )
};

export default AppBase;
