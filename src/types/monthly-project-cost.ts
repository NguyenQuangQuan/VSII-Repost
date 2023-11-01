import { IOption } from './common';

// Summary
export interface ICosts {
    year: number;
    costs: number;
}

export interface IMonthsMoney {
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
    thirteenthSalary: number;
    totalCost: number;
}

export interface IMonthlyProjectCostSummary {
    projectName: string;
    projectType: string;
    department: string;
    contractNo: string;
    contractSize: number;
    license?: any;
    costs: ICosts[];
    remaining: number;
    months: IMonthsMoney;
    totalCost: number;
    remainingAccumulation: number;
    projectId: string;
}

export interface IMonthlyProjectCostSummaryList {
    content: {
        summary: IMonthlyProjectCostSummary[];
        total: IMonthsMoney;
    };
}

// Detail report by month
export interface IDetailReportByMonth {
    projectId: string;
    project: string;
    dept: string;
    projectType: string;
    totalEffort: string;
    overheadAllocatedPer: string;
    overheadAllocatedAmt: number;
    salaryCost: number;
    totalCost: number;
}

export interface IDetailReportByMonthList {
    content: IDetailReportByMonth[];
}

// monthly cost data
export interface IMonthlyCostData {
    idHexString?: string;
    projectId: IOption | null;
    projectName?: string;
    projectType?: string;
    actualCost: string;
    allocatedAmount: string;
    totalCost: string;
    year: number;
    month: number | string;
    createDate: string;
    userCreate: string;
    lastUpdate: string;
    userUpdate: string;
    note: string;
}

export interface IMonthlyCostDataList {
    content: IMonthlyCostData[];
}

export interface IMonthlyCostDataResponse {
    content: string;
}
