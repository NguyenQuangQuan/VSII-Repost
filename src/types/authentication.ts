export interface Id {
    timestamp: number;
    date: Date;
}

export interface IUserInfo {
    id: Id;
    userId: string;
    userName: string;
    userType?: any;
    lastName: string;
    firstName: string;
    departmentId: string;
    onboardDate: Date;
    outboardDate?: any;
    created: Date;
    creator: string;
    lastUpdate: Date;
    userUpdate: string;
    status: string;
    titleCode: string;
    rankId: string;
    rankCost: number;
    allocationCost: number;
    memberCode: string;
    contractor: string;
    logtime: string;
    idHexString?: any;
    groups: string[];
    funtions?: any;
    userTitle: string;
    userRank: string;
    userDept: string;
}

export interface ILoginResponse {
    content: {
        authen: boolean;
        token: { accessToken: string; tokenId: string };
    };
}
