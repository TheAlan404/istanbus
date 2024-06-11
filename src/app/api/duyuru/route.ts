import { getSoap } from "../../../util/getSoap";

const url = "https://api.ibb.gov.tr/iett/UlasimDinamikVeri/Duyurular.asmx?wsdl";

export async function GET() {
    let result: any = await getSoap(url, "GetDuyurular_json", {});
    result = JSON.parse(result.GetDuyurular_jsonResult);

    return Response.json({ result })
}

