import {
    Controller,
    Example,
    Get,
    Path,
    Route,
    Tags,
} from "tsoa";
import { UpdateLawLists } from "./updateLawLists";
import { UpdateLawListsService } from "./updateLawListsService";

@Route("updatelawlists")
@Tags("e-LAWS API Proxy")
export class UpdateLawListController extends Controller {

    /**
     * @summary Retrieve a list of laws updated at a specified date.
     * @param date Date of update to retrieve.
     * @example date "20230303"
     */
    @Example<UpdateLawLists>({
        Result: {
            Code: "0",
            Message: "",
        },
        ApplData: {
            Date: "20230303",
            LawNameListInfo: [
                {
                    LawId: "...",
                    LawName: "...",
                    LawNo: "...",
                    PromulgationDate: "...",
                    LawTypeName: "...",
                    LawNameKana: "...",
                    OldLawName: "...",
                    AmendName: "...",
                    AmendNo: "...",
                    AmendPromulgationDate: "...",
                    EnforcementDate: "...",
                    EnforcementComment: "...",
                    LawUrl: "...",
                    EnforcementFlg: "0",
                    AuthFlg: "0",
                },
            ],
        },
    }, "Success")
    @Example<UpdateLawLists>({
        Result: {
            Code: "1",
            Message: "An error occurred.",
        },
    }, "Error")
    @Get("{date}")
    public async getUpdateLawLists(
        @Path() date: string,
    ): Promise<UpdateLawLists> {
        return new UpdateLawListsService().get({ date });
    }

}
