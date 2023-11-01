// Monthly effort summary
export interface INumberOfProject {
    scs: number[];
    prd: number[];
    rdc: number[];
}

export interface IEffortPlanUpdateStatus {
    name: string;
    data: number[] | undefined;
}

export interface ILogTimesheetOnRedmine {
    logTime: number[];
}

export interface IActualEffort {
    developmentProjects: number;
    maintainanceProjects: number;
    otherJointProjects: number;
    outsourcingProjects: number;
    presaleProjects: number;
    productProjects: number;
    trainingProjects: number;
    vacationProjects: number;
}

export interface IMonthEffortSummaryInfo {
    actualEffortScsPrd: IActualEffort;
    effortPlanUpdateStatus: IEffortPlanUpdateStatus[];
    logTimesheetOnRedmine: ILogTimesheetOnRedmine;
    numberOfProjects: INumberOfProject;
}

export interface IMonthlyEffortSummaryResponse {
    content: IMonthEffortSummaryInfo;
}

// Monthly effort project
export interface IMonthlyEffortProjectUserProject {
    id: {
        timestamp: number;
        date: string;
    };
    projectId: string;
    projectName: string;
    projectPhase: string;
    deptId: string;
    implementQuota: number;
    maintainQuota: number;
    projectCostLimit: number;
    typeId: string;
    startDate: string;
    endDate: string;
    type: string;
    sort: string;
    parentId: string;
    isMainProject: string;
    projectStatus: string;
    creator: string;
    created: string;
    lastUpdate: string;
    userUpdate: string;
    billable: string;
    contractSize: number;
    licenceAmount: number;
    contractNo: string;
    nameCode: string;
    totalEffort: string;
    percentageComplete: string;
    mainProject: string;
}

export interface IMonthlyEffortProjectMonth {
    january: number;
    february: number;
    march: number;
    april: number;
    may: number;
    june: number;
    july: number;
    august: number;
    september: number;
    october: number;
    november: number;
    december: number;
}

export interface IMonthlyEffortProjectUser {
    project: IMonthlyEffortProjectUserProject;
    totalQuota: number;
    implementQuota: number;
    percentageComplete?: string;
    maintainanceQuota: number;
    previousQuota: number;
    year: number;
    months: IMonthlyEffortProjectMonth;
    totalUsedEffort: number;
    remainingEffort: number;
}

export interface IMonthlyEffortProjectTotal {
    totalQuota: number;
    implementQuota: number;
    maintainanceQuota: number;
    previousQuota: number;
    year: number;
    months: IMonthlyEffortProjectMonth;
    totalUsedEffort: number;
    remainingEffort: number;
}

export interface IMonthlyEffortProject {
    users: IMonthlyEffortProjectUser[];
    total: IMonthlyEffortProjectTotal;
}

export interface IMonthlyEffortProjectList {
    content: IMonthlyEffortProject;
}

// Monthly effort member
export interface IId {
    timestamp: number;
    date: Date;
}

export interface IMonthlyEffortMemberInProject {
    id: IId;
    projectId: string;
    projectName: string;
    projectPhase: string;
    deptId: string;
    implementQuota: number;
    maintainQuota: number;
    projectCostLimit: number;
    typeId?: any;
    startDate: Date;
    endDate?: any;
    type: string;
    sort: string;
    parentId: string;
    isMainProject?: any;
    projectStatus: string;
    creator: string;
    created: Date;
    lastUpdate?: any;
    userUpdate?: any;
    billable: string;
    contractSize: number;
    licenceAmount?: any;
    contractNo?: any;
    nameCode?: any;
    totalEffort?: any;
    percentageComplete?: any;
    mainProject?: any;
}

export interface IMonthlyEffortMember {
    id: IId;
    userId: string;
    memberCode: string;
    level: string;
    tyear: number;
    tmonth: number;
    tweek: number;
    created: string;
    creator: string;
    department: string;
    firstName: string;
    lastUpdate: string;
    lastName: string;
    onboardDate?: any;
    status: string;
    userupDate: string;
    outboardDate?: any;
    userType?: any;
    title: string;
    rank: string;
    rankCost: string;
    allCcationCost: string;
    effortInMonth: string;
    differenceHours: string;
    project?: any;
    projects: string[];
    hours: string;
    timeStatus?: any;
}

export interface IMonthlyEffortMemberList {
    content: IMonthlyEffortMember[];
}

// Monthly effort member project
export interface IMonthlyEffortMemberProject {
    id: IId;
    projectId: string;
    projectName: string;
    projectPhase: string;
    deptId: string;
    implementQuota: number;
    maintainQuota: number;
    projectCostLimit: number;
    typeId?: any;
    startDate: Date;
    endDate?: any;
    type: string;
    sort: number;
    parentId: string;
    isMainProject?: any;
    projectStatus: string;
    creator: string;
    created: Date;
    lastUpdate: Date;
    userUpdate?: any;
    billable: string;
    contractSize: number;
    licenceAmount: number;
    contractNo?: any;
    nameCode: string;
    totalEffort: number;
    percentageComplete?: any;
    mainProject?: any;
}

export interface IMonthlyEffortMemberProjectList {
    content: IMonthlyEffortMemberProject[];
}

// Update effort plan
export interface IEffortPlanDepartment {
    effortplanSent: number | undefined;
    effortplanMissing: number | undefined;
    department: string;
}

export interface IUpdateEffortPlan {
    tyear: string | number;
    tmonth: string | number;
    effortPlanDepts: IEffortPlanDepartment[];
    createdDate?: string;
    userCreate?: string;
    createDate?: string;
    lastUpdateDate?: string;
    userUpdate?: string;
}

export interface IUpdateEffortPlanResponse {
    content: string;
}
