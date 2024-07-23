import { Line } from "@common/types/Line";
import { SearchResult } from "@common/types/Search";
import { Stack, Code, Button, useCombobox, Combobox, InputBase, Title, Loader, Group, SegmentedControl } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineCard } from "../../components/cards/LineCard";
import { StopCard } from "../../components/cards/StopCard";
import { Stop } from "@common/types/Stop";

export const HomePage = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState<"none" | "stop" | "line">("none");
	const [results, setResults] = useState<SearchResult[]>([]);
	const { data, loading } = useFetch<{ stops: Stop[], lines: Line[] }>("/api/v1/all");

	useEffect(() => {
		if(!data) return;

		const limit = 20;

		let exact: SearchResult[] = [];
		let partial: SearchResult[] = [];
		let query = search.toLocaleUpperCase("tr");

		if (filter == "line" || filter == "none") {
			for (let line of data?.lines || []) {
				if((exact.length + partial.length) > limit) break;

				if (line.id == query) {
					exact.push({ type: "line", ...line });
					continue;
				}

				if ([line.id, line.label].join(" ").toLocaleUpperCase("tr").includes(query)) {
					partial.push({ type: "line", ...line });
				}
			}
		}

		if (filter == "stop" || filter == "none") {
			for (let stop of data?.stops || []) {
				if((exact.length + partial.length) > limit) break;

				if (stop.name.includes(query)) {
					partial.push({ type: "stop", ...stop });
				}
			}
		}

		setResults([...exact, ...partial]);
	}, [data, search, filter]);

	const options = results.slice(0, 100).map((result, i) => (
		<Combobox.Option p={0} value={"/" + (result.type == "line" ? "hat" : "durak") + "/" + result.id} key={i}>
			{result.type == "line" ? (
				<LineCard line={result} />
			) : (
				<StopCard stop={result} />
			)}
		</Combobox.Option>
	));

	const combobox = useCombobox({});

	const select = (id: string) => {
		navigate(id);
	};

	return (
		<Stack align="center">

			<Title>Istanbus</Title>

			<Group>
				<SegmentedControl
					data={[
						{ label: "Hepsi", value: "none" },
						{ label: "Hatlar", value: "line" },
						{ label: "Duraklar", value: "stop" },
					]}
					value={filter}
					onChange={(v: "none" | "stop" | "line") => setFilter(v)}
				/>
			</Group>

			<Combobox
				store={combobox}
				withinPortal={false}
				onOptionSubmit={(val) => {
					setSearch(val);
					combobox.closeDropdown();
					select(val);
				}}
			>
				<Combobox.Target>
					<InputBase
						rightSection={loading ? <Loader /> : <Combobox.Chevron />}
						w="100%"
						value={search}
						onChange={(event) => {
							combobox.openDropdown();
							combobox.updateSelectedOptionIndex();
							setSearch(event.currentTarget.value);
						}}
						onClick={() => combobox.openDropdown()}
						onFocus={() => combobox.openDropdown()}
						onBlur={() => {
							combobox.closeDropdown();
						}}
						label="Ara"
						placeholder="Kadıköy..."
						rightSectionPointerEvents="none"
					/>
				</Combobox.Target>

				<Combobox.Options w="100%" p={0} mah={{ base: "50%" }}>
					<Stack>
						{options.length > 0 ? options : (
							search ? (
								<Combobox.Empty>Sonuç yok :c</Combobox.Empty>
							) : (
								<Combobox.Empty></Combobox.Empty>
							)
						)}
					</Stack>
				</Combobox.Options>
			</Combobox>
		</Stack>
	);
}
