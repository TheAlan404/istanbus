"use client";

import { LineCard } from "@/components/cards/LineCard";
import { Line } from "@/types/Line";
import { Loader, Stack, Text } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { Suspense } from "react";

export default function All() {
    const { data: lines, loading } = useFetch<Line[]>("/api/lines");

    return (
        <Stack align="center">
            <Text>
                {loading ? "Yükleniyor..." : `${lines?.length} hat gösteriliyor`}
            </Text>
            {loading ? (
                <Loader />
            ) : (
                <Suspense
                    fallback={<Loader />}
                >
                    <Stack>
                        {lines?.map((line, i) => (
                            <LineCard
                                key={i}
                                line={line}
                            />
                        ))}
                    </Stack>
                </Suspense>
            )}
        </Stack>
    )
}
