"use client";

import { Stack, Code, Button } from "@mantine/core";
import { useFetch } from "@mantine/hooks";

export default function HomePage() {
	const { data, error, loading, refetch } = useFetch("/api/hat");

	return (
		<Stack>
			<Code>
				{JSON.stringify(data)}
			</Code>
			{loading && "Loading..."}
			<Button onClick={refetch}>
				refetch
			</Button>
		</Stack>
	);
}
