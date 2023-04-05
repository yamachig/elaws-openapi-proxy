export type LawData = {

    Result: {

        /**
         * Whether an error occurred or not.
         * * "0" - Success
         * * "1" - Error
         */
        Code: "0" | "1";

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

        /** Full text in [Japanese Standard Law XML format](https://elaws.e-gov.go.jp/file/XMLSchemaForJapaneseLaw_v3.xsd). */
        LawFullText: string;

        /** Image files referenced in `LawFullText`. Compressed as Zip and encoded in Base64. */
        ImageData: string;

    };

};
