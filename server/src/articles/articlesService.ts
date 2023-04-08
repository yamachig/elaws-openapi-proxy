import { xmlToJsonEL } from "../common";
import { Articles } from "./articles";

const elawsApiBaseUrl = "https://elaws.e-gov.go.jp/api/1";

import { XMLParser, strnumOptions } from "fast-xml-parser";
const arrayElements = ["DataRoot.ApplData.AppdxTableTitleLists.AppdxTableTitle"];

const xmlParser = new XMLParser({
    ignoreDeclaration: true,
    numberParseOptions: {
        skipLike: /^[0-9]+/,
    } as strnumOptions,
    isArray: (_, jpath) => arrayElements.includes(jpath),
    stopNodes: ["DataRoot.ApplData.LawContents"],
});

export interface GetArticlesOptions {
    lawId?: string,
    lawNum?: string,
    article?: string,
    paragraph?: string,
    appdxTable?: string,
    jsonel?: boolean,
}

export class ArticlesService {
    public async get(options: GetArticlesOptions): Promise<Articles> {
        const startTime = new Date();
        const optionsStr = Object.entries(options).filter(([, v]) => v !== undefined).map(([k, v]) => `;${k}=${v}`).join("");
        const url = `${elawsApiBaseUrl}/articles${optionsStr}`;
        const response = await fetch(url);
        console.log(`ArticlesService.get: fetch("${url}")`);
        // if (!response.ok) throw Error(response.statusText);
        const text = await response.text();
        const endRequestTime = new Date();
        const doc = xmlParser.parse(text);
        if (options.jsonel && "ApplData" in doc.DataRoot) {
            doc.DataRoot.ApplData.LawContents = xmlToJsonEL(doc.DataRoot.ApplData.LawContents);
        }
        const endParseTime = new Date();
        console.log({
            requestMS: endRequestTime.getTime() - startTime.getTime(),
            parseMS: endParseTime.getTime() - endRequestTime.getTime(),
        });
        return doc.DataRoot as Articles;
    }
}
