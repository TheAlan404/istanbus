import { Accordion, SegmentedControl, Stack, Title } from "@mantine/core";
import { HomeSearch } from "./HomeSearch";
import { useFaves } from "../../../hooks/useFaves";
import { useFetch } from "@mantine/hooks";
import { ErrorMessage } from "../../../components/ui/ErrorMessage";
import { HomeAnnouncements } from "./HomeAnnouncements";
import { useState } from "react";
import { FavesList } from "./FavesList";

export const HomePage = () => {
	const [filter, setFilter] = useState<"none" | "stop" | "line" | "fav">("none");

	return (
		<Stack align="center" w="100%">
			<Title>Istanbus</Title>

			<HomeAnnouncements />
			<Stack w="100%">
				<SegmentedControl
					fullWidth
					data={[
						{ label: "Hepsi", value: "none" },
						{ label: "Hatlar", value: "line" },
						{ label: "Duraklar", value: "stop" },
						{ label: "Favoriler", value: "fav" },
					]}
					value={filter}
					onChange={(v: "none" | "stop" | "line" | "fav") => setFilter(v)}
				/>

				{filter == "fav" ? (
					<FavesList />
				) : (
					<HomeSearch filter={filter} />
				)}
			</Stack>
		</Stack>
	);
}
