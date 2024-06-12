import { StopsResponse } from "@/types/Stop";
import { Line } from "../../../../types/Line";
import { getSoap } from "../../../../util/getSoap";

const url = "https://api.ibb.gov.tr/iett/ibb/ibb.asmx?wsdl";

interface IETTDurakDetay {
    NewDataSet: {
        Table: IETTDurak[],
    }
}

interface IETTDurak {
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

export async function GET(
    request: Request,
    { params }: { params: { line: string } }
) {
    let result = await getSoap<IETTDurakDetay>(url, "DurakDetay_GYY", {
        hat_kodu: params.line
    });

    let list = result.NewDataSet.Table;

    let groups: StopsResponse = [[],[]];

    for(let item of list) {
        let idx = item.YON == "G" ? 0 : 1;

        groups[idx].push({
            id: item.DURAKKODU,
            name: item.DURAKADI,
            position: {
                x: item.XKOORDINATI,
                y: item.YKOORDINATI,
            },
            area: [
                item.ISLETMEALTBOLGE,
                item.ILCEADI,
                item.ISLETMEBOLGE,
            ],
            _type: item.DURAKTIPI,
        });
    }

    return Response.json(groups)
}


