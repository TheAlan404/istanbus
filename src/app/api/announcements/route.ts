import { getSoap } from "../../../util/getSoap";
import { Announcement } from "@/types/Announcement";

const url = "https://api.ibb.gov.tr/iett/UlasimDinamikVeri/Duyurular.asmx?wsdl";

interface IETTAnnouncement {
    HATKODU: string;
    HAT: string;
    TIP: string;
    GUNCELLEME_SAATI: string;
    MESAJ: string;
}

export async function GET() {
    let result = await getSoap<IETTAnnouncement[]>(url, "GetDuyurular_json", {});

    return Response.json(result.map(({
        GUNCELLEME_SAATI,
        HAT,
        HATKODU,
        MESAJ,
        TIP,
    }) => ({
        dateText: GUNCELLEME_SAATI,
        id: HATKODU,
        label: HAT,
        message: MESAJ,
        type: TIP
    } as Announcement)))
}

