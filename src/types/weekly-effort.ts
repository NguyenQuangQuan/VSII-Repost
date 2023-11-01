// Member
export interface IWeeklyEffortMember {
    id: string;
    member: string;
    memberCode: string;
    firstName: string;
    lastName: string;
    rank: string;
    rankCost: string;
    allocationCost: string;
    department: string;
    effortInWeek: string;
    differenceHours: string;
    project: string;
    projectList: string[];
    standardHour: string;
    onboardDate: string;
    outboardDate: string;
}

export interface IWeeklyEffortMemberList {
    content: IWeeklyEffortMember[];
}

// Project
export interface IWeeklyEffortProject {
    projectId: string;
    projectName: string;
    department: string;
    spentOn: string;
    type: string;
    level0: string;
    level1: string;
    level2: string;
    level3: string;
    level4: string;
    totalEffort: string;
    totalCost: string;
}

export interface IWeeklyEffortProjectList {
    content: IWeeklyEffortProject[];
}

// Project detail
export interface IListLogTime {
    issueId: string;
    taskName: string;
    spentTime: number;
    date: string;
}

export interface IWeeklyEffortProjectDetail {
    effortInWeek?: number;
    effortPMVerified?: number | null;
    firstName: string;
    lastName: string;
    memberCode?: string;
    nonPayAbleOT?: number;
    nonPayAbleOTVerified?: number | null;
    payAbleOT?: number;
    payAbleOTVerified?: string | null;
    pmVerified?: string | null;
    pmVerifiedDate?: string | null;
    projectId?: number;
    projectName?: string;
    qaVerified?: string | null;
    qaVerifiedDate?: string | null;
    userId: string;
    userName?: string;
    listLogtime: IListLogTime[];
}

export interface IWeeklyEffortProjectDetailList {
    content: IWeeklyEffortProjectDetail[];
}

export interface IUserVerify {
    userId: string;
    pmVerifiedDate?: string | null;
    qaVerifiedDate?: string | null;
}
