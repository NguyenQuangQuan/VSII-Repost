export interface IWorkingCalendar {
    idHexString: string;
    idHexStringUser?: string;
    year: number;
    month: number;
    userId: string;
    userName: string;
    lastName: string;
    firstName: string;
    departmentId: string;
    memberCode: string;
    workdays: IWorkdays[];
    rank: IRankWC;
    workingDaySum: IWorkingDaySum;
    status: string;
    verify: string;
    message?: string;
}

export interface IWorkdays {
    day: number;
    type: string;
    dayOfWeek: string;
    verified?: string | null;
}

export interface IRankWC {
    fromDate: string;
    toDate?: string;
    rank: string;
    title: string;
}

export interface IWorkingDaySum {
    wao: number;
    wfh: number;
    onSite: number;
    leave: number;
    halfDayLeave: number;
    sickLeave: number;
    maternityLeave: number;
    holiday: number;
    wedding: number;
    compensatoryLeave: number;
}

export interface IAddOrEditResponse {
    content: string;
}

export interface ITypeList {
    key: string;
    value: string;
    total: string;
    color: string;
}

export interface TUpdateStatus {
    idHexString: string;
    status: string;
}

// Closing Date
export interface IClosingDate {
    year: number | string;
    idHexString: string;
    locked: string;
    closingDates: IClosingDateType[];
    userUpdate: string;
    lastUpdate: string | Date;
}

export interface IClosingDateType {
    month: number;
    closingDate: string;
}
