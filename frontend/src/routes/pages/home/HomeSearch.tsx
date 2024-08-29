import { Combobox, Group, InputBase, Loader, SegmentedControl, Stack, useCombobox } from "@mantine/core";
import { ErrorMessage } from "../../../components/ui/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSearch } from "../../../hooks/useSearch";
import { LineCard } from "../../../components/cards/LineCard";
import { StopCard } from "../../../components/cards/StopCard";

export const HomeSearch = ({
    filter,
}: {
    filter: "none" | "stop" | "line",
}) => {
    const navigate = useNavigate();
	const [search, setSearch] = useState("");

	const {
		error,
		loading,
		refetch,
		results,
	} = useSearch({
		search,
		filter,
	});

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
        <Stack align="center" w="100%" gap={0}>
            <ErrorMessage
				error={loading ? null : error}
				retry={refetch}
			/>

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
						rightSection={loading ? <Loader m="xs" /> : <Combobox.Chevron />}
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
					<Stack pt="sm">
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
    )
};
