import { LawCategoryDummy } from "../common";

export type LawLists = {

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

        /**
         * Type of laws specified in the request:
         * * `1` - All of below
         * * `2` - Constitution and Acts
         * * `3` - Cabinet orders
         * * `4` - Ministerial ordinances and Rules
         */
        Category: LawCategoryDummy["t"];

        LawNameListInfo: {

            /** Law ID ("法令ID") */
            LawId: string;

            /** Law name ("法令名") */
            LawName: string;

            /** LawNum ("法令番号") */
            LawNo: string;

            /** Promulgation date ("公布日") in `YYYYMMDD` */
            PromulgationDate: string;

        }[];

    };

};
