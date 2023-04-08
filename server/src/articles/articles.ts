import { JsonEL } from "../common";

export type Articles = {

    Result: {

        /**
         * Whether an error occurred or not.
         * * "0" - Success with a single result.
         * * "1" - Error
         * * "2" - Success with multiple results.
         */
        Code: "0" | "1" | "2";

        /**
         * Error message when `Code` is "1".
         */
        Message: string;

    };

    /**
     * Result data when `Result.Code` is "0".
     */
    ApplData?: {

        /** Law ID ("法令ID") specified in the request. */
        LawId: string;

        /** LawNum ("法令番号") specified in the request. */
        LawNum: string;

        /** Article ("条") specified in the request. */
        Article: string;

        /** Paragraph ("項") specified in the request. */
        Paragraph: string;

        /** AppdxTable ("別表") specified in the request. */
        AppdxTable: string;

        /** Contents in [Japanese Standard Law XML format](https://elaws.e-gov.go.jp/file/XMLSchemaForJapaneseLaw_v3.xsd). If `jsonel=true` is specified, the xml is converted to json. */
        LawContents: string | JsonEL[];

        /** List of titles of AppdxTables if multiple results are detected. */
        AppdxTableTitleLists?: { AppdxTableTitle: string[] };

        /** Image files referenced in `LawContents`. Compressed as Zip and encoded in Base64. */
        ImageData: string;

    };

};
