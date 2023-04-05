export type UpdateLawLists = {

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
         * The date specified in the request:
         */
        Date: string;

        LawNameListInfo: {

            /** Law ID ("法令ID") */
            LawId: string;

            /** Law name ("法令名") */
            LawName: string;

            /** LawNum ("法令番号") */
            LawNo: string;

            /** Promulgation date ("公布日") */
            PromulgationDate: string;

            LawTypeName: string;
            LawNameKana: string;
            OldLawName: string;
            AmendName: string;
            AmendNo: string;
            AmendPromulgationDate: string;
            EnforcementDate: string;
            EnforcementComment: string;
            LawUrl: string;
            EnforcementFlg: "0" | "1";
            AuthFlg: "0" | "1";

        }[];

    };

};
