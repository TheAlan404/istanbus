import { Line } from "../../../types/Line";
import { getSoap } from "../../../util/getSoap";

const url = "https://api.ibb.gov.tr/iett/UlasimAnaVeri/HatDurakGuzergah.asmx?wsdl";

interface IETTLine {
    SHATKODU: string;
    SHATADI: string;
    TARIFE: string;
    HAT_UZUNLUGU: number;
    SEFER_SURESI: number;
}

export async function GET() {
    let result = await getSoap<IETTLine[]>(url, "GetHat_json", {
        HatKodu: "",
    });

    return Response.json(result.map(({
        HAT_UZUNLUGU,
        SEFER_SURESI,
        SHATADI,
        SHATKODU,
        TARIFE,
    }) => ({
        id: SHATKODU,
        label: SHATADI,
        fare: TARIFE,
        duration: SEFER_SURESI,
        length: HAT_UZUNLUGU,
    } as Line)))
}


