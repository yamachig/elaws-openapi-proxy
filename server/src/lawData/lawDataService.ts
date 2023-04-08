import { xmlToJsonEL } from "../common";
import { LawData } from "./lawData";

const elawsApiBaseUrl = "https://elaws.e-gov.go.jp/api/1";

import { XMLParser, strnumOptions } from "fast-xml-parser";

const xmlParser = new XMLParser({
    ignoreDeclaration: true,
    numberParseOptions: {
        skipLike: /^[0-9]+/,
    } as strnumOptions,
    stopNodes: ["DataRoot.ApplData.LawFullText"],
});

export interface GetLawDataOptions {
    lawid_or_lawnum: string,
    jsonel?: boolean,
}

export class LawDataService {
    public async get(options: GetLawDataOptions): Promise<LawData> {
        const startTime = new Date();
        const url = `${elawsApiBaseUrl}/lawdata/${options.lawid_or_lawnum}`;
        const response = await fetch(url);
        console.log(`LawDataService.get: fetch("${url}")`);
        // if (!response.ok) throw Error(response.statusText);
        const text = await response.text();
        const endRequestTime = new Date();
        const doc = xmlParser.parse(text);
        if (options.jsonel && "ApplData" in doc.DataRoot) {
            doc.DataRoot.ApplData.LawFullText = xmlToJsonEL(doc.DataRoot.ApplData.LawFullText);
        }
        const endParseTime = new Date();
        console.log({
            requestMS: endRequestTime.getTime() - startTime.getTime(),
            parseMS: endParseTime.getTime() - endRequestTime.getTime(),
        });
        return doc.DataRoot as LawData;
    }
}
