import { useState } from "react";
import { useSearch } from "../hooks/useSearch"
import { Combobox, Group, InputBase, Loader, ScrollArea, SegmentedControl, Stack, useCombobox } from "@mantine/core";
import { LineCard } from "./cards/LineCard";
import { StopCard } from "./cards/StopCard";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "./ui/ErrorMessage";

export const SearchBar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const {
        error,
        loading,
        refetch,
        results,
    } = useSearch({
        search,
        filter: "line",
    });

    const options = results.slice(0, 100).map((result, i) => (
        <Combobox.Option
            value={"/" + (result.type == "line" ? "hat" : "durak") + "/" + result.id}
            key={i}
            p={0}
        >
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
        <Combobox
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val) => {
                setSearch("");
                combobox.closeDropdown();
                select(val);
            }}
        >
            <Combobox.Target>
                <InputBase
                    rightSection={loading ? <Loader m="xs" /> : <Combobox.Chevron />}
                    w="50vw"
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
                    placeholder="Kadıköy..."
                    rightSectionPointerEvents="none"
                />
            </Combobox.Target>

            <Combobox.Dropdown mah="50vh" p={0}>
                <ScrollArea.Autosize type="scroll" mah="50vh">
                    <Stack gap={0}>
                        <ErrorMessage
                            error={loading ? null : error}
                            retry={refetch}
                        />

                        <Combobox.Options>
                            <Stack gap={0}>
                                {options.length > 0 ? options : (
                                    search && (
                                        <Combobox.Empty>Sonuç yok :c</Combobox.Empty>
                                    )
                                )}
                            </Stack>
                        </Combobox.Options>
                    </Stack>
                </ScrollArea.Autosize>
            </Combobox.Dropdown>
        </Combobox>

    )
}