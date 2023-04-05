import {
    Controller,
    Example,
    Get,
    Path,
    Route,
    Tags,
} from "tsoa";
import { LawData } from "./lawData";
import { LawDataService } from "./lawDataService";

@Route("lawdata")
@Tags("e-LAWS API Proxy")
export class LawDataController extends Controller {

    /**
     * @summary Retrieve the full text of a law.
     * @param lawid_or_lawnum Law ID ("法令ID") or LawNum ("法令番号") of law to retrieve.
     * @example lawid_or_lawnum "405AC0000000088"
     * @example lawid_or_lawnum "平成五年法律第八十八号"
     */
    @Example<LawData>({
        Result: {
            Code: "0",
            Message: "",
        },
        ApplData: {
            LawId: "...",
            LawNum: "...",
            LawFullText: "<Law>...</Law>",
            ImageData: "...[Base64]...",
        },
    }, "Success")
    @Example<LawData>({
        Result: {
            Code: "1",
            Message: "An error occurred.",
        },
    }, "Error")
    @Get("{lawid_or_lawnum}")
    public async getLawInfo(
        @Path() lawid_or_lawnum: string,
    ): Promise<LawData> {
        return new LawDataService().get(lawid_or_lawnum);
    }

}
