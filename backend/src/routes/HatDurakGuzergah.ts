import { Line } from "../../../common/types/Line";
import { getSoap } from "../utils/getSoap";

const url = "https://api.ibb.gov.tr/iett/UlasimAnaVeri/HatDurakGuzergah.asmx?wsdl";

export interface IETTLine {
    SHATKODU: string;
    SHATADI: string;
    TARIFE: string;
    HAT_UZUNLUGU: number;
    SEFER_SURESI: number;
}

export interface IETTStop {
    SDURAKKODU: string;
    SDURAKADI: string;
    KOORDINAT: string;
    ILCEADI: string;
    SYON: string;
    AKILLI: string;
    FIZIKI: string;
    DURAK_TIPI: string;
    ENGELLIKULLANIM: string;
}

export interface IETTGarage {
    ID: string;
    GARAJ_ADI: string;
    GARAJ_KODU: string;
    KOORDINAT: string;
}

export const getAllLines = async () => {
    return await getSoap<IETTLine[]>(url, "GetHat_json", {
        HatKodu: "",
    });
}

export const getAllStops = async () => {
    return await getSoap<IETTStop[]>(url, "GetDurak_json", {
        DurakKodu: "",
    });
}

export const getAllGarages = async () => {
    return await getSoap<IETTGarage[]>(url, "GetGaraj_json", {});
}



