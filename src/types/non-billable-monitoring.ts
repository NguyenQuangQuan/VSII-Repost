import { IComment } from './comment';
export interface INonBillTotal {
    mandayWeek: number;
    mandayPresaleWeek: number;
    mandayNotPresale: number;
    mandayPayrollOnly: number;
    totalWeek: number;
    totalMonth: number;
    salaryFundPer: string;
}

export interface INonBillableMonitoring {
    id: string;
    userId: string;
    title: string;
    firstName: string;
    lastName: string;
    rank: string;
    rankCost: string;
    allocationCost: string;
    department: string;
    effortInWeek: string;
    differenceHours: string;
    notLogtimeYet: string;
    project: string;
    standardHour: string;
    onboardDate: string;
    outboardDate: string;
    projectList: string[];
    billAbleProject: string;
    timeStatus: string;
    comment: IComment;
    nonbillDivideTotal: string;
}
export interface INonbillByLevelList {
    level: string;
    personnel: number;
    perNonbill: number;
    perNonbillStr: string;
}
export interface INonbillPerPersonnelResponse {
    nonbillByLevelList: INonbillByLevelList[];
}
export interface INonBillableMonitoringInfo {
    nonBillTotal: INonBillTotal;
    nonbillPerPersonnelResponse: INonbillPerPersonnelResponse;
    data: INonBillableMonitoring[];
}

export interface INonBillableMonitoringList {
    content: INonBillableMonitoringInfo;
}

//warning nonbillable member
export interface IWarningNonbillMember {
    userId: number;
    memberCode: number;
    userName: string;
    title: string;
    dept: string;
    consecutiveWeek: number;
}

export interface IWarningNonbillMemberResponse {
    content: IWarningNonbillMember[];
}

//nonbillable cost by week
export interface INonBillByWeek {
    sort: number;
    week: string;
    budgetByWeek: number;
}

export interface INonBillByWeekList {
    nonbillByWeekList: INonBillByWeek[];
}

export interface INonBillByWeekListResponse {
    content: INonBillByWeekList;
}
