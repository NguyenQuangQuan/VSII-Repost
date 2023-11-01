// id
export interface Id {
    timestamp: number;
    date: Date;
}

// department
export interface IDepartment {
    id?: Id;
    deptId: string;
    deptName: string;
    userCreate?: string;
    createdDate?: string;
    userUpdate?: string;
    lastUpdate?: string;
}

export interface IDepartmentList {
    content: IDepartment[];
}

// title
export interface ITitle {
    id?: {};
    titleCode: string;
    titleName: string;
    created: string;
    creator: string;
    lastUpdate: string;
    userUpdate: string;
}

export interface ITitleList {
    content: ITitle[];
}

// level
export interface ILevel {
    id?: {};
    rankId: string;
    rankName: string;
    rankCost: number;
}

export interface ILevelList {
    content: ILevel[];
}

// group
export interface IGroup {
    groupId: string;
    groupName: string;
}

export interface IGroupList {
    content: IGroup[];
}

// projectType
export interface IProjectType {
    _id: Id;
    billable: string;
    created: Date;
    userCreator: string;
    id?: any;
    projectTypeName: string;
    userUpdate: string;
    lastUpdate: Date;
    typeCode: string;
}

export interface IProjectTypeList {
    content: IProjectType[];
}

// production performance
export interface IContractSizeProduction {
    value: number;
    comment: string;
}

export interface IProjectProduction {
    projectId: number;
    projectName: string;
    comment: string;
}

export interface IDuration {
    fromDate: string;
    toDate: string;
}

export interface IProductionPerformanceItem {
    idHexString: string;
    year: number;
    paymentTerm: string;
    departmentId: string;
    exchangeRate: string;
    serviceType: string;
    contractType: string;
    standardWorkingDay: string;
    originalContractSize: string;
    contractAllocation: string;
    dateCreate: string;
    lastUpdate: string;
    userCreate: string;
    userUpdate: string;
    contractSize: IContractSizeProduction;
    duration: IDuration | null;
    productivity: string;
    project: IProjectProduction;
    dataHcInfos: [];
}

export interface IProductionPerformanceList {
    content: IProductionPerformanceItem[];
}
