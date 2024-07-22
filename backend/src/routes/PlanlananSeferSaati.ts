import { getSoap } from "../utils/getSoap";

const url = "https://api.ibb.gov.tr/iett/UlasimAnaVeri/PlanlananSeferSaati.asmx?wsdl";

export interface IETTSchedule {
    SHATKODU: string;
    HATADI?: string;
    SGUZERAH: string;
    SYON: "G" | "D";
    SGUNTIPI: "C" | "I" | "P";
    GUZERGAH_ISARETI?: string;
    SSERVISTIPI: "Normal" | "ÖHO" | "OAS" | "Ara Dinlen" | "Gareli";
    DT: string;
};

export const getSchedule = async (line: string) => {
    return await getSoap<IETTSchedule[]>(url, "GetPlanlananSeferSaati_json", {
        HatKodu: line
    });
}



