"use client";

import { LineCard } from "@/components/cards/LineCard";
import { Line } from "@/types/Line";
import { useRouter } from 'next/navigation';
import { Stack, Code, Button, useCombobox, Combobox, InputBase, Title, Loader } from "@mantine/core";
import { useFetch } from "@mantine/hooks";
import { useState } from "react";

export default function HomePage() {
	const [search, setSearch] = useState("");
	const { data: lines, loading } = useFetch<Line[]>("/api/lines");
	const router = useRouter();

	const filteredOptions = (lines || []).filter(line =>
		line.id.toLocaleLowerCase("tr") === search.toLocaleLowerCase("tr")
	);

	const partialMatches = (lines || []).filter(line =>
		line.id.toLocaleLowerCase("tr") !== search.toLocaleLowerCase("tr") &&
		[
			line.id.toLocaleLowerCase("tr"),
			line.label.toLocaleLowerCase("tr"),
		].join(" ").includes(search.toLocaleLowerCase("tr"))
	);

	const combinedResults = !search ? [] : [...filteredOptions, ...partialMatches].slice(0, 5);

	const options = combinedResults.map((line) => (
		<Combobox.Option p={0} value={line.id} key={line.id}>
			<LineCard line={line} />
		</Combobox.Option>
	));

	const combobox = useCombobox({});

	const select = (id: string) => {
		router.push(`/hat/${id}`);
	};

	return (
		<Stack align="center">

			<Title>Istanbus</Title>

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
						label="Hat ara"
						placeholder="Kadıköy..."
						rightSectionPointerEvents="none"
					/>
				</Combobox.Target>

				<Combobox.Options p={0} mah={{ base: "50%" }}>
					<Stack>
						{options.length > 0 ? options : (
							search ? (
								<Combobox.Empty>Hat bulunamadı :c</Combobox.Empty>
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
