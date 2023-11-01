import { IOption } from 'types';

// Monthly Production Performance
export interface IMonthlyProductionPerformance {
    id: string;
}
// ==============================|| Monthly Production Performance ||============================== //

// Monthly Production Performance List
export interface IDataByMonth {
    value: string;
    comment: string;
    projectId?: string;
}

export interface IDataHCByMonth {
    month: string;
    value: string;
}

export interface IDepartmentPerformanceDataByTotal {
    month: string;
    delivered: string;
    receivable: string;
    received: string;
    financial: string;
}

export interface IDepartmentPerformanceDataByMonth {
    month: string;
    delivered: IDataByMonth;
    receivable: IDataByMonth;
    received: IDataByMonth;
    financial: IDataByMonth;
}

export interface IDepartmentPerformanceData {
    idHexString: string;
    project: IDataByMonth;
    departmentId: string;
    contractSize: IDataByMonth;
    contractType: string;
    serviceType: string;
    months: IDepartmentPerformanceDataByMonth[];
}

export interface IDepartmentPerformance {
    name: string;
    departmentId: string;
    total: IDepartmentPerformanceDataByTotal[];
    data: IDepartmentPerformanceData[];
}

export interface IMonthlyProductionPerformanceInfo {
    months: string[];
    departments: IDepartmentPerformance[];
    companyTotals: {
        totalHC: IDataHCByMonth[];
        productivity: number[];
        product: IDepartmentPerformanceDataByTotal[];
        totalSI: IDepartmentPerformanceDataByTotal[];
        totalDomesticITO: IDepartmentPerformanceDataByTotal[];
        totalOverseasITO: IDepartmentPerformanceDataByTotal[];
        totalITO: IDepartmentPerformanceDataByTotal[];
        companyTotal: IDepartmentPerformanceDataByTotal[];
    };
}

export interface IMonthlyProductionPerformanceResponse {
    content: IMonthlyProductionPerformanceInfo;
}

export interface IMonthlyProductionPerformanceDetailResponse {
    content: IDepartmentPerformanceDataByMonth;
}

export interface ICommentItem {
    type: string;
    idHexString: string;
    label: string;
    content: string;
    month?: string;
}

// Monthly Production Performance Add Or Edit
interface IObject {
    value?: number | null;
    label?: string;
    comment?: string;
    projectId?: number;
    projectName?: string;
}
export interface IProductivityHcInfo {
    role: string;
    rate: number | string | null;
    rateUSD: number | string | null;
    quantity: number | string | null;
    amount: any | string;
}

interface IDuration {
    fromDate: string | null;
    toDate: string | null;
}

export interface IProductivity {
    month: number | null;
    delivered: IObject | null;
    receivable: IObject | null;
    received: IObject | null;
    financial: IObject | null;
    hcInfo: IProductivityHcInfo[];
}

//
export interface IHcInfos {
    role: string;
    rate: number;
    rateUSD: number;
    quantity: number;
    workDay: number;
    amount: number;
}
export interface IDurations {
    fromDate: string | null;
    toDate: string | null;
}

export interface IMonthlyProductionPerformanceAddOrEditForm {
    idHexString: string;
    year: number;
    month: number;
    projectId: any;
    departmentId: string;
    projectName: string;
    contractSize: string;
    serviceType: string;
    contractType: string;
    originalContractSize: string;
    contractAllocation: string;
    duration: IDurations;
    paymentTerm: string;
    currency: string;
    standardWorkingDay?: string;
    exChangeRate?: number;
    delivered: number | undefined | null;
    receivable: number | undefined | null;
    received: number | undefined | null;
    financial: number | undefined | null;
    hcInfo: any;
    productivity?: IProductivity[];
    lastYearProductivity?: IProductivity[];
}

export interface IMonthlyProductionPerformance {
    idHexString: string;
    month: number;
    departmentId: string;
    standardWorkingDay: number | null;
    exchangeRate: IObject | null;
    serviceType: string;
    contractType: string;
    year: number | null;
    originalContractSize: number | null;
    currency: string;
    paymentTerm: number | null;
    contractAllocation: number | null;
    dateCreate: string | null;
    lastUpdate: string | null;
    userCreate: string | null;
    userUpdate: string | null;
    contractSize: IObject;
    duration: IDuration;
    productivity: IProductivity[];
    projectId: IOption | null;
    projectName: string | null;
    project: IObject | null;
    lastYearProductivity?: ILastYearProductivity[] | null;
}

export interface ILastYearProductivity {
    month: number;
    delivered: IObjectEstimane;
    receivable: IObjectEstimane;
    received: IObjectEstimane;
    financial: IObjectEstimane;
    hcInfo: [];
}

export interface IObjectEstimane {
    value: number;
    comment: string;
}
export interface ICurrency {
    idHexString: string;
    year: number;
    currency: string;
    userCreate: string;
    userUpdate: string;
    dateCreate: string;
    lastUpdate: string;
    exchangeRate: number;
}

export interface IAddOrEditProductivityResponse {
    content: any;
}

export interface IEditCommentResponse {
    content: IDepartmentPerformanceData;
}

export interface IDeleteProductivityResponse {
    content: string;
}

// Edit HeadCount
export interface IProductivityHeadCountEditForm {
    year: number;
    month: number | string;
    value: string;
}

export interface IHeadCountValueByMonthDetailResponse {
    content: IDataHCByMonth;
}

// Comment
export interface ICommentForm {
    idHexString: string;
    month?: string;
    projectName?: string;
    contractSize?: string;
    delivered?: string;
    receivable?: string;
    received?: string;
    financial?: string;
}

//Sale Lead
//Requests Checking
export interface IIdRequestsChecking {
    timestamp: number;
    date: string;
}

export interface IRequestsChecking {
    id?: IIdRequestsChecking;
    partnerName: string;
    picFirstName?: string;
    picLastName?: string;
    status: string | null;
    receivedDate: Date | null | string;
    request: string;
    timeline: string;
    note: string;
    picUserName: any;
    domain: string;
    possibility: string;
    quantity: string;
    technology: string;
}

export interface IRequestsCheckingResponse {
    content: IRequestsChecking[];
}

//Supplier Checking
export interface IIdSupplierChecking {
    timestamp: number;
    date: string;
}

export interface ISupplierChecking {
    id?: IIdSupplierChecking;
    picFirstName?: string;
    picLastName?: string;
    picUserName: any;
    note: string;
    fromDate: Date | null | string;
    toDate: Date | null | string;
    creator?: string;
    supplierName: string;
    technology: string;
    unitPrice: number | null;
    userUpdate?: string;
    workType: string;
    createdDate?: string;
    lastUpdate?: string;
    quantity: string;
}

export interface ISupplierCheckingResponse {
    content: ISupplierChecking[];
}

// ==============================|| Sale pipeline ||============================== //
// On-Going
export interface IMonthlyHCList {
    month: number;
    hcMonthly: number | null;
    billableDay: number | null;
    billable: number | null;
}

export interface IProjectInfo {
    year: number | string;
    customer: string;
    contractType: string;
    projectName: string;
    contractNo: string;
    productionPerformanceIdHexString: string | null;
    serviceType: string;
    note: string;
    probability: string;
    status: string;
    contractDueDate: string | null;
    contractDurationFrom: string | null;
    contractDurationTo: string | null;
    warrantyTime: string;
    type: string;
}

export interface IFinancialInfo {
    originalContractSize?: number | string;
    sizeVND: number | string;
    sizeUSD: number | string;
    managementRevenueAllocated: number | string;
    accountRevenueAllocatedVND: number | string;
    newSaleUSD: number | string;
    currency: string;
    exchangeRate: number | string;
    acctReceivables: number | string;
    netEarn: number | string;
    paid: number | string;
    remain: number | string;
    quarterLicense1st: number | string;
    quarterLicense2nd: number | string;
    quarterLicense3rd: number | string;
    quarterLicense4th: number | string;
    licenseFee: number | string;
}

export interface IHcInfo {
    billableHcs: number | string;
    hcs: number | string;
    teamLeadHcs: number | string;
    seniorHcs: number | string;
    middleHcs: number | string;
    juniorHcs: number | string;
    quarter1st: number | string;
    quarter2nd: number | string;
    quarter3rd: number | string;
    quarter4th: number | string;
    totalBillable: number | string;
    totalNewSale: number | string;
    monthlyHCList: IMonthlyHCList[];
}

export interface IOtherInfo {
    contact: {
        idHexString: string;
        firstName: string;
        lastName: string;
    } | null;
    presaleFolder: string;
    customerContact: string;
    phoneNumber: string;
    emailAddress: string;
}

export interface ITotalOnGoing {
    domesticITO: number;
    product: number;
    license: number;
    domesticITOAllocated: number;
    productAllocated: number;
    licenseAllocated: number;
    siallocated: number;
}

export interface ISaleOnGoingItem {
    idHexString: string;
    projectInfo: IProjectInfo;
    financialInfo: IFinancialInfo;
    hcInfo: IHcInfo;
    otherInfo: IOtherInfo;
}

export interface ISaleOnGoingList {
    content: { total: ITotalOnGoing; data: ISaleOnGoingItem[] };
}

//Bidding
export interface IMonthlyBillable {
    year: number;
    month: number;
    workingDays: number;
}
export interface ISaleBidding {
    idHexString: string;
    financialInfo: IFinancialInfo;
    hcInfo: IHcInfoBuidding;
    project: IProjectInfo;
    otherInfo: IOtherInfo;
}
export interface IRateByMonth {
    role: string;
    rate: number;
    rateVND: number;
    quantity: number;
    workDay: number;
    amount: number;
}

export interface IhcInfoMonth {
    month: number;
    billable: number;
    rateByMonth: IRateByMonth[];
}

export interface IHcInfoBuidding {
    billableHcs: number | string;
    hcs: number | string;
    teamLeadHcs: number | string;
    seniorHcs: number | string;
    middleHcs: number | string;
    juniorHcs: number | string;
    quarter1st: number | string;
    quarter2nd: number | string;
    quarter3rd: number | string;
    quarter4th: number | string;
    totalBillable: number | string;
    totalNewSale: number | string;
    monthlyHCList: IMonthlyHCList[];
    hcInfoMonth: IhcInfoMonth | null;
    fixCostHcInfo: any;
}

export interface ITotalBidding {
    totalSmm: number;
    totalDomesticITO: number;
    totalProduct: number;
    si: number;
    domesticITO: number;
    prd: number;
    totalSmmManagement: number;
    totalDomesticITOManagement: number;
    totalPrdValueManagement: number;
    domesticITOAccountant: number;
    sivalueAccountant: number;
    prdaccountant: number;
}

export interface IBidding {
    saleBidding: ISaleBidding[];
    totalBidding: ITotalBidding;
}

export interface IBiddingResponse {
    content: IBidding;
}

// Sale pipelime summary
export interface ISalePipelineSummary {
    tableLarge: ITableLarge;
    tableSmall: ITableSmall;
}

export interface ITableLarge {
    listParent: IListParent[];
}
export interface ITableSmall {
    listTable: IListTable[];
}

export interface IListParent {
    name: string;
    color?: string;
    backgroundColor?: string;
    value?: IValueSummary;
    childrens?: IListParent[];
}

export interface IListTable {
    name: string;
    color?: string;
    backgroundColor?: string;
    value?: number;
}
export interface IValueSummary {
    usd: number | null;
    vnd: number | null;
    quarter1: number | null;
    quarter2: number | null;
    quarter3: number | null;
    quarter4: number | null;
    totalRevenueEstimation: number | null;
}

// Budgeting plan
export interface IProjectInfoBudgetingPlan {
    year: string | number;
    salePipelineIdHexString: string;
    salePipelineType: string;
    projectName: string;
    type: string;
    serviceType: string;
    note: string;
    riskFactor: number;
    numberOfMonths: number;
    contractedValue: number;
    effortLimitManHours: number | null;
    costLimitVND: number | null;
}

export interface IProjectKPIScore {
    estimateUsedEffort: number;
    estimatedUseCost: number;
    planDelivery: number;
    totalOnTimeDelivery: number;
    effortKPIScore: number;
    costKPI: number;
    deadlineKPI: number;
    taskMGT: number;
    kpiScore: number;
}

export interface IProjectKPIBonus {
    addedEbitda: string;
    projectSetRevenue: number;
    actualCostByACD: number;
    companyRevActualCost: number;
    projectMGTPerformanceLevel: number;
    projectSavingCost: number;
    estimatedKPIProjectSavingCost: number;
    estimatedShareCompanyProfit: number;
    estimatedTotalKPIBonus: number;
    totalKPIBonus: number;
    kpiBonus: number;
}

export interface ITotalBudgetingPlan {
    totalContractValue: number;
    totalProjectSetRevenue: number;
    totalCostLimit: number;
    totalActualCostByACD: number;
    totalEffortLimit: number;
}

export interface IBudgetingPlan {
    name: string;
    budgetPlan: IBudgetingPlanItem[];
}

export interface IBudgetingPlanItem {
    idHexString: string;
    projectInfo: IProjectInfoBudgetingPlan;
    projectKPIScore: IProjectKPIScore;
    projectKPIBonus: IProjectKPIBonus;
}
