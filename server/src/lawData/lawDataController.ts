import {
    Controller,
    Example,
    Get,
    Path,
    Query,
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
     * @param jsonel If set as `true`, then `ApplData.LawFullText` is converted to [JsonEL](https://github.com/yamachig/elaws-openapi-proxy/blob/e6d40e42/server/src/common.ts#L20).
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
    }, "Success with Standard Law XML")
    @Example<LawData>({
        Result: {
            Code: "0",
            Message: "",
        },
        ApplData: {
            LawId: "...",
            LawNum: "...",
            LawFullText: [
                { tag: "Law", attr: {}, children: [
                    {
                        tag: "LawNum",
                        attr: {},
                        children: ["..."]
                    }
                ] }
            ],
            ImageData: "...[Base64]...",
        },
    }, "Success with JsonEL (jsonel=true)")
    @Example<LawData>({
        Result: {
            Code: "1",
            Message: "An error occurred.",
        },
    }, "Error")
    @Get("{lawid_or_lawnum}")
    public async getLawData(
        @Path() lawid_or_lawnum: string,
        @Query() jsonel?: boolean,
    ): Promise<LawData> {
        return new LawDataService().get({ lawid_or_lawnum, jsonel });
    }

}
