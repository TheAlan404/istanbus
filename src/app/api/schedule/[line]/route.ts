import { getSoap } from "../../../../util/getSoap";

const url = "https://api.ibb.gov.tr/iett/UlasimAnaVeri/PlanlananSeferSaati.asmx?wsdl";

export async function GET(
    request: Request,
    { params }: { params: { line: string } }
) {
    let result: any = await getSoap(url, "GetPlanlananSeferSaati_json", {
        HatKodu: params.line
    });

    return Response.json(result)
}


