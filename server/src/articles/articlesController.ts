import {
    Controller,
    Example,
    Get,
    Query,
    Route,
    Tags,
} from "tsoa";
import { Articles } from "./articles";
import { ArticlesService } from "./articlesService";

@Route("articles")
@Tags("e-LAWS API Proxy")
export class ArticlesController extends Controller {

    /**
     * @summary Retrieve part of a law such as Article ("条"), Paragraph ("項"), and AppdxTable ("別表").
     * @param lawId Law ID ("法令ID") of law to retrieve.
     * @example lawId "405AC0000000088"
     * @param lawNum LawNum ("法令番号") of law to retrieve.
     * @param article Article ("条") to retrieve.
     * @example article "第一条"
     * @param paragraph Paragraph ("項") to retrieve.
     * @param appdxTable AppdxTable ("別表") to retrieve.
     * @param jsonel If set as `true`, then `ApplData.LawContents` is converted to [JsonEL](https://github.com/yamachig/elaws-openapi-proxy/blob/e6d40e42/server/src/common.ts#L20).
     */
    @Example<Articles>({
        Result: {
            Code: "0",
            Message: "",
        },
        ApplData: {
            LawId: "...",
            LawNum: "...",
            Article: "...",
            Paragraph: "...",
            AppdxTable: "...",
            LawContents: "<...>...</...>",
            ImageData: "...[Base64]...",
        },
    }, "Success with Standard Law XML")
    @Example<Articles>({
        Result: {
            Code: "0",
            Message: "",
        },
        ApplData: {
            LawId: "...",
            LawNum: "...",
            Article: "...",
            Paragraph: "...",
            AppdxTable: "...",
            LawContents: [
                { tag: "Article", attr: {}, children: [
                    {
                        tag: "ArticleCaption",
                        attr: {},
                        children: ["..."]
                    }
                ] }
            ],
            ImageData: "...[Base64]...",
        },
    }, "Success with JsonEL (jsonel=true)")
    @Example<Articles>({
        Result: {
            Code: "1",
            Message: "An error occurred.",
        },
    }, "Error")
    @Get()
    public async getArticles(
        @Query() lawId?: string,
        @Query() lawNum?: string,
        @Query() article?: string,
        @Query() paragraph?: string,
        @Query() appdxTable?: string,
        @Query() jsonel?: boolean,
    ): Promise<Articles> {
        return new ArticlesService().get({ lawId, lawNum, article, paragraph, appdxTable, jsonel });
    }

}
