"use client";
import { AppShell, Button, Group } from "@mantine/core";
import Link from "next/link";

const AppBase = ({ children }: React.PropsWithChildren) => {
    return (
        <AppShell
            header={{ height: 60 }}
        >
            <AppShell.Header>
                <Group justify="space-between" align="center" h="100%" px="sm">
                    <Group>
                        <Button
                            variant="transparent"
                            component={Link}
                            href="/"
                        >
                            Istanbus
                        </Button>
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    )
};

export default AppBase;
