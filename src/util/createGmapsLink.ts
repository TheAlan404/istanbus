const BASE_URL = "https://www.google.com/maps/dir/";

const createGmapsLink = (places: string[]) => {
    const query = new URLSearchParams({
        api: "1",
        origin: places[0],
        destination: places[places.length - 1],
        waypoints: places.filter(
            (x, i, a) => i !== 0 && i !== (a.length-1)
        ).join("|"),
        travelmode: "driving",
    });

    return `${BASE_URL}?${query.toString()}`;
};
