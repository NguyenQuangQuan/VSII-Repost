// monthly cost monitoring

export interface IMonthlyCost {
    type: string;
    actualCosts: number;
    accumulatedCosts: number;
    accumulatedEffort: number;
    temporary?: boolean;
}

export interface ICost {
    monthlyCost: IMonthlyCost[];
    previousQuota: IMonthlyCost;
}

export interface ICostStatistics {
    contractSize: number;
    licenseAmt: number;
    costLimit: number;
    actualCost: number;
    remainingCost: number;
    cost: ICost;
}

export interface IEffortStatistics {
    effortQuota: number;
    actualCost: number;
    remainingCost: number;
    cost: ICost;
}

export interface IMonthlyCostMonitoringInfo {
    costStatistics: ICostStatistics;
    effortStatistics: IEffortStatistics;
}

export interface IMonthlyCostMonitoringResponse {
    content: IMonthlyCostMonitoringInfo;
}

// weekly cost monitoring
export interface IWeeklyCostMonitoring {
    projectId: string;
    projectName: string;
    estimatedCode: number;
    effort: number;
    week: string;
}

export interface IWeeklyCostMonitoringList {
    weeklyCostMonitoringList: IWeeklyCostMonitoring[];
}

export interface IWeeklyCostMonitoringResponse {
    content: IWeeklyCostMonitoringList;
}
