import { IGroup, ITreeItem } from 'types';

// Manage user
export interface IUserOnboardHistory {
    fromDate?: string | null;
    toDate?: string | null;
    contractor?: boolean | string | null;
}

export interface IUserRankHistory {
    fromDate?: string | null;
    toDate?: string | null;
    rankId?: string | null;
    titleCode?: string | null;
}
export interface IUserBillableHistory {
    fromDate?: string | null;
    toDate?: string | null;
}

export interface IMember {
    id: {};
    userId: string;
    memberCode: string;
    userName: string;
    userType: null | string;
    lastName: string;
    firstName: string;
    userDept: string;
    departmentId: string;
    onboardDate: string | null;
    outboardDate: string | null;
    created: string;
    creator: string;
    lastUpdate: string;
    idHexString: string | null;
    userUpdate: string;
    status: string;
    titleCode: string;
    rankId: string;
    rankCost: number;
    allocationCost: number;
    contractor: string | boolean;
    logtime: string | boolean;
    groups: IGroup[];
    userOnboardHistoryList?: IUserOnboardHistory[];
    userRankHistoryList?: IUserRankHistory[];
    userBillableHistoryList?: IUserBillableHistory[];
    projectPermissionEntity?: {
        type: string;
        assignedProjectList?: { projectId: number; projectName: string }[];
    } | null;
}

export interface IMemberList {
    content: IMember[];
}

export interface IMemberResponse {
    content: string;
}

// Manage project
export interface IProject {
    id?: {};
    projectId: number;
    projectName: string;
    projectPhase: string;
    deptId: string;
    implementQuota: number;
    maintainQuota: number;
    projectCostLimit: number;
    typeId?: any;
    startDate: Date;
    endDate: Date;
    type: string;
    sort: number;
    parentId: string;
    isMainProject?: any;
    projectStatus: string;
    creator: string;
    created: Date;
    lastUpdate?: any;
    userUpdate?: any;
    billable: string;
    contractSize: number;
    licenseAmount?: any;
    contractNo: string;
    typeCode: string;
    totalEffort?: any;
    percentageComplete?: any;
    mainProject?: any;
    projectManager: {
        userId: string;
        firstName: string;
        lastName: string;
        userName: string;
    } | null;
    note?: string;
}

export interface IProjectList {
    content: IProject[];
}

export interface IProjectHeadCount {
    id: {};
    projectId: string;
    userId: string;
    roleId: string;
    userName: string;
    idHexString: string;
    projectName: string;
    projectType: string;
    fromDate: Date;
    toDate?: any;
    firstName: string;
    lastName: string;
    memberCode?: string;
}

export interface IProjectDetail {
    project: IProject;
    headcount: IProjectHeadCount[];
}

export interface IProjectDetailResponse {
    content: IProjectDetail;
}

export interface IQuotaUpdateHistory {
    id: {};
    projectId: number | null;
    implQuota: number | null;
    maintainQuota: number | null;
    updateDate: string;
    userUpdate: string;
}
export interface IQuotaUpdateHistoryList {
    content: IQuotaUpdateHistory[];
}

// manage special Hours
export interface ISpecialHours {
    idHexString: string;
    userId: string;
    userName: string;
    fromDate: string | null;
    toDate: string | null;
    type: string;
    hourPerDay: string;
    note: string;
    totalHour?: string;
    created?: string;
    creator?: string;
    lastUpdate?: string;
    userUpdate?: string;
    lastName?: string;
    firstName?: string;
    memberCode?: string;
}

// Manage holiday
export interface IHoliday {
    idHexString: string;
    fromDate: Date | null;
    toDate: Date | null;
    type: string;
    note: string;
    dateCreate: string;
    userCreate: string;
    userUpdate: string;
    lastUpdate: string;
}

export interface IHolidayList {
    content: IHoliday[];
}

// Manage config
export interface ISystemConfig {
    idHexString?: string;
    key: string;
    value: string;
    valueTypeDate?: string;
    description: string;
    userCreate?: string;
    userUpdate?: string;
    lastUpdate?: any;
    dateCreate?: string;
    note?: string;
}
export interface ISystemConfigList {
    content: ISystemConfig[];
}

// manage rank
export interface IRankCostHistory {
    fromDate: string | null;
    toDate: string | null;
    amount: number | null;
    length?: number;
}

export interface IRank {
    rankId?: string;
    rankName: string;
    created?: string;
    creator?: string;
    lastUpdate?: string;
    userUpdate?: string;
    rankCost?: number;
    rankCostHistoryList: IRankCostHistory;
    idHexString: string;
}
export interface IRankList {
    content: IRank;
}

// Manage group
export interface IGroupItem {
    idHexString: string;
    groupId: string;
    groupName: string;
    groupType: string;
    note: string;
    children: ITreeItem[];
}

export interface IGroups {
    content: IGroupItem[];
}

//Email Config
export interface IEmailConfig {
    id?: {};
    idHexString?: string;
    emailCode: string;
    emailType?: string;
    role?: string;
    template: string;
    sendTo: string[];
    sendCC: string[];
    sendBCC: string[];
    content: string;
    userName: string;
    subject: string;
    nameFile: string;
    status?: string;
    timeSendMail: {
        day: string;
        hour: string;
        weekdays: string;
    };
}

export interface IEmailConfigList {
    content: IEmailConfig[];
}

export interface IAssignedUser {
    memberCode: string;
    userName: string;
    firstName: string;
    lastName: string;
    title: string;
}
