import { LawCategoryDummy } from "../common";
import { LawLists } from "./lawLists";

const elawsApiBaseUrl = "https://elaws.e-gov.go.jp/api/1";

import { XMLParser, strnumOptions } from "fast-xml-parser";
const arrayElements = ["DataRoot.ApplData.LawNameListInfo"];

const xmlParser = new XMLParser({
    ignoreDeclaration: true,
    numberParseOptions: {
        skipLike: /^[0-9]+/,
    } as strnumOptions,
    isArray: (_, jpath) => arrayElements.includes(jpath),
});

export class LawListsService {
    public async get(type: LawCategoryDummy["t"]): Promise<LawLists> {
        const startTime = new Date();
        const url = `${elawsApiBaseUrl}/lawlists/${type}`;
        console.log(`LawListService.get: fetch("${url}")`);
        const response = await fetch(url);
        // if (!response.ok) throw Error(response.statusText);
        const text = await response.text();
        const endRequestTime = new Date();
        const doc = xmlParser.parse(text);
        const endParseTime = new Date();
        console.log({
            requestMS: endRequestTime.getTime() - startTime.getTime(),
            parseMS: endParseTime.getTime() - endRequestTime.getTime(),
        });
        return doc.DataRoot as LawLists;
    }
}
