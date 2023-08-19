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
     * @summary Retrieve a part of a law. You can retrieve such as Article ("条"), Paragraph ("項"), and AppdxTable ("別表"). Note: If your law identifier contains non-ASCII characters, please use `lawNum`, not `lawId`.
     * @param lawId LawID ("法令ID", e.g. "405AC0000000088") of a law to retrieve. A LawID only contains ASCII characters. Examples: "405AC0000000088", "428M60000008031", "325AC0000000131".
     * @example lawId "405AC0000000088"
     * @example lawId "428M60000008031"
     * @example lawId "325AC0000000131"
     * @param lawNum LawNum ("法令番号", e.g. "平成五年法律第八十八号") of law to retrieve. Examples: "平成五年法律第八十八号", "平成二十八年総務省令第三十一号", "昭和二十五年法律第百三十一号".
     * @example LawNum "平成五年法律第八十八号"
     * @example LawNum "平成二十八年総務省令第三十一号"
     * @example LawNum "昭和二十五年法律第百三十一号"
     * @param article Article ("条") to retrieve. Examples: "第一条", "第十三条", "第百三条の四".
     * @example article "第一条"
     * @example article "第十三条"
     * @example article "第百三条の四"
     * @param paragraph Paragraph ("項") to retrieve.
     * @param appdxTable AppdxTable ("別表") to retrieve.
     * @param jsonel If set as `true`, then the XML in `ApplData.LawContents` is converted to JSON which complies with [JsonEL](https://yamachig.github.io/Lawtext/technical/intermediate-data/).
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
