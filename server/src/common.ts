import { XMLParser, strnumOptions } from "fast-xml-parser";

export interface LawCategoryDummy {
    t: "1" | "2" | "3" | "4";
}

type FXPJsonEL = ({
    [tagName: string]: FXPJsonEL[],
} & {
    ":@"?: {
        [key: string]: string,
    },
    "#text"?: undefined,
}) | {
    "#text": string,
};


// ref: https://github.com/yamachig/Lawtext-core/blob/e57026a/src/node/el/jsonEL.ts
export interface JsonEL {
    tag: string
    attr: { [key: string]: string | undefined }
    children: Array<JsonEL | string>
}


const xmlParser = new XMLParser({
    ignoreDeclaration: true,
    numberParseOptions: {
        skipLike: /^[0-9]+/,
    } as strnumOptions,
    preserveOrder: true,
    ignoreAttributes: false,
    attributeNamePrefix: "",
});

export const xmlToJsonEL = (xml: string): (JsonEL | string)[] => {
    const origJson = xmlParser.parse(`<root>${xml}</root>`)[0].root as FXPJsonEL[];
    return origJson.map(FXPToJsonEL);
};

const FXPToJsonEL = (fxp: FXPJsonEL): JsonEL | string => {
    if (typeof fxp["#text"] === "string") {
        return fxp["#text"];
    } else {
        const ret: JsonEL = {
            tag: "",
            attr: {},
            children: [],
        };
        if (fxp[":@"]) {
            Object.assign(ret.attr, fxp[":@"]);
        }
        for (const key of Object.keys(fxp).filter(k => k !== ":@")) {
            ret.tag = key;
            ret.children.push(...fxp[key].map(FXPToJsonEL));
        }
        return ret;
    }
};
