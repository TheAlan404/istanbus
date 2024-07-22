import { getSoap } from "../utils/getSoap";

const url = "https://api.ibb.gov.tr/iett/ibb/ibb.asmx?wsdl";

export interface IETTTable<T> {
    NewDataSet: {
        Table: T,
    }
}

export interface IETTDurak {
    HATKODU: string;
    YON: "G" | "D";
    SIRANO: string;
    DURAKKODU: string;
    DURAKADI: string;
    XKOORDINATI: string;
    YKOORDINATI: string;
    DURAKTIPI: "İETTBAYRAK" | "WALLMODERN" | "CCMODERN" | "CCMODERNDR" | "AÇIK DURAK" | "İSTON GENİŞ" | "İSTON GENİŞ_İBB" | "DİĞER" | string;
    ISLETMEBOLGE: string;
    ISLETMEALTBOLGE: string;
    ILCEADI: string;
}

export const getStops = async (line: string) => {
    return await getSoap<IETTTable<IETTDurak[]>>(url, "DurakDetay_GYY", {
        hat_kodu: line
    });
}

export interface IETTLineService {
    HAT_KODU: string;
    HAT_ADI: string;
    TAM_HAT_ADI: string;
    HAT_DURUMU: string;
    SEFER_SURESI: string;
}

export const getLineService = async (line: string) => {
    return await getSoap<IETTTable<IETTLineService>>(url, "HatServisi_GYY", {
        hat_kodu: line
    });
}

// backup idk
/* const collectAllStops = async () => {
    let alphabet = "abcçdefgğhıijklmnoöprsştuüvyz";
    let obj: Record<string, string> = {};

    for (let letter of alphabet) {
        let results = await GetSearchItems(letter);

        for(let result of results) {
            if(!result.Stationcode) continue;
            if(stops[result.Stationcode.toString()]) continue;
            
            obj[result.Stationcode.toString()] = result.Name.toLocaleUpperCase("tr");
        }
    }

    stops = Object.entries(obj).map(([id, name]) => ({ id, name }))
} */

