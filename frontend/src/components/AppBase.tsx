"use client";
import { ActionIcon, AppShell, Box, Button, Group, Space, Stack } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { IconExternalLink, IconHome, IconList, IconSpeakerphone } from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";
import { SearchBar } from "./SearchBar";

const AppBase = () => {
    return (
        <ModalsProvider>
            <AppShell
                header={{ height: 60 }}
                px="md"
            >
                <AppShell.Header>
                    <Group justify="space-between" wrap="nowrap" align="center" h="100%" px="sm">
                        <Group>
                            <Button
                                variant="transparent"
                                component={Link}
                                to="/"
                                visibleFrom="md"
                            >
                                Istanbus
                            </Button>
                            <ActionIcon
                                variant="transparent"
                                component={Link}
                                to="/"
                                hiddenFrom="md"
                            >
                                <IconHome />
                            </ActionIcon>

                            {[
                                {
                                    label: "Duyurular",
                                    link: "/duyurular",
                                    icon: <IconSpeakerphone />,
                                }
                            ].map(({ label, link, icon }, i) => (
                                <Box>
                                    <Button
                                        leftSection={icon}
                                        component={Link}
                                        variant="light"
                                        to={link}
                                        key={i}
                                        visibleFrom="md"
                                    >
                                        {label}
                                    </Button>
                                    <ActionIcon
                                        component={Link}
                                        variant="light"
                                        to={link}
                                        key={i}
                                        hiddenFrom="md"
                                    >
                                        {icon}
                                    </ActionIcon>
                                </Box>
                            ))}
                        </Group>

                        <SearchBar />

                        <Group>
                            <Button
                                variant="light"
                                component="a"
                                href="https://deniz.blue"
                                rightSection={<IconExternalLink />}
                                color="gray"
                                visibleFrom="md"
                            >
                                deniz.blue
                            </Button>
                            <ActionIcon
                                variant="light"
                                component="a"
                                href="https://deniz.blue"
                                color="gray"
                                hiddenFrom="md"
                            >
                                <IconExternalLink />
                            </ActionIcon>
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
