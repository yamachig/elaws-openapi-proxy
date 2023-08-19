import {
    Controller,
    Example,
    Get,
    Path,
    Route,
    Tags,
} from "tsoa";
import { LawLists } from "./lawLists";
import { LawListsService } from "./lawListsService";
import { LawCategoryDummy } from "../common";

@Route("lawlists")
@Tags("e-LAWS API Proxy")
export class LawListsController extends Controller {

    /**
     * @summary Retrieve a list of laws.
     * @param type Type of laws to retrieve:
     *     * `1` - All of below
     *     * `2` - Constitution and Acts
     *     * `3` - Cabinet orders
     *     * `4` - Ministerial ordinances and Rules
     * @example type "2"
     */
    @Example<LawLists>({
        Result: {
            Code: "0",
            Message: "",
        },
        ApplData: {
            Category: "2",
            LawNameListInfo: [
                {
                    LawId: "...",
                    LawName: "...",
                    LawNo: "...",
                    PromulgationDate: "...",
                },
            ],
        },
    }, "Success")
    @Example<LawLists>({
        Result: {
            Code: "1",
            Message: "An error occurred.",
        },
    }, "Error")
    @Get("{type}")
    public async getLawLists(
        @Path() type: LawCategoryDummy["t"],
    ): Promise<LawLists> {
        return new LawListsService().get({ type });
    }

}
