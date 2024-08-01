import { SearchResult } from "@common/types/Search";
import { useEffect, useRef, useState } from "react";

export const useSearch = ({
    search,
    filter = "none",
}: {
    search: string;
    filter?: "none" | "stop" | "line";
}) => {
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const abortRef = useRef<AbortController | null>(null);

    const refetch = async () => {
        if(error) setResults([]);
        setLoading(true);
        setError(null);
        abortRef.current?.abort();
        abortRef.current = new AbortController();
        try {
            let res = await fetch("/api/v1/searchSuggestions?" + new URLSearchParams({
                q: search,
                filter,
            }));

            setResults(await res.json());
            setLoading(false);
        } catch(e) {
            setError(e);
            setResults([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        refetch();
    }, [search, filter])

    return {
        refetch,
        results,
        error,
        loading,
    };
};
