import { getSoap } from "../utils/getSoap";

const url = "https://api.ibb.gov.tr/iett/UlasimDinamikVeri/Duyurular.asmx?wsdl";

export interface IETTAnnouncement {
    HATKODU: string;
    HAT: string;
    TIP: string;
    GUNCELLEME_SAATI: string;
    MESAJ: string;
}

export const getAnnouncements = async () => {
    return await getSoap<IETTAnnouncement[]>(url, "GetDuyurular_json", {});
}
