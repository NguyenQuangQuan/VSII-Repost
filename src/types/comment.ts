// Comment

export type IComment = {
    idHexString?: string;
    year?: number;
    dateCreate?: string;
    userCreate?: string;
    userUpdate?: string;
    lastUpdate?: string;
    reportType?: string;
    note?: string;
    fromDate?: string;
    toDate?: string;
    month?: number;
    week?: number | string;
    userId?: string;
};

export type IResponseFindComment = {
    content: IComment;
    pagination: string;
};

//  Comment detail

export type IConditionComment = {
    year: number;
    reportType: string;
    userId?: string;
    week?: number | string;
    month?: number;
};
