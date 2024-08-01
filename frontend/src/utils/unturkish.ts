export const unturkish = (s: string) => Object.entries({
    "Ş": "S",
    "Ğ": "G",
    "Ç": "C",
    "İ": "I",
    "Ü": "U",
}).reduce(
    (prev, [from, to]) => prev.replaceAll(from, to),
    s
);
