import { UpdateLawLists } from "./updateLawLists";

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

export interface GetUpdateLawListsOptions {
    date: string,
}

export class UpdateLawListsService {
    public async get(options: GetUpdateLawListsOptions): Promise<UpdateLawLists> {
        const startTime = new Date();
        const url = `${elawsApiBaseUrl}/updatelawlists/${options.date}`;
        const response = await fetch(url);
        console.log(`UpdateLawListsService.get: fetch("${url}")`);
        // if (!response.ok) throw Error(response.statusText);
        const text = await response.text();
        const endRequestTime = new Date();
        const doc = xmlParser.parse(text);
        const endParseTime = new Date();
        console.log({
            requestMS: endRequestTime.getTime() - startTime.getTime(),
            parseMS: endParseTime.getTime() - endRequestTime.getTime(),
        });
        return doc.DataRoot as UpdateLawLists;
    }
}
