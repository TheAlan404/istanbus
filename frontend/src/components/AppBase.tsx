"use client";
import { AppShell, Button, Group, Space, Stack } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { IconList, IconSpeakerphone } from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";

const AppBase = () => {
    return (
        <ModalsProvider>
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
                                    label: "Duyurular",
                                    link: "/duyurular",
                                    icon: <IconSpeakerphone />,
                                }
                            ].map(({ label, link, icon }, i) => (
                                <Button
                                    leftSection={icon}
                                    component={Link}
                                    variant="light"
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

                            <Space h="50vh" />
                        </Stack>
                    </Stack>
                </AppShell.Main>
            </AppShell>
        </ModalsProvider>
    )
};

export default AppBase;
