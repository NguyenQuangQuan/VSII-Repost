// yup
import * as yup from 'yup';

// project imports
import { VALIDATE_MESSAGES } from 'constants/Message';
import { getCurrentMonth, getCurrentYear } from 'utils/date';
import { IMonthlyCostData, IMonthsMoney, IOption } from 'types';

// ============== Detail report by month ============== //
export interface IDetailReportByMonthConfig {
    year: number;
    month: number | string;
    projectId: IOption | null;
}

export const detailReportByMonthConfig: IDetailReportByMonthConfig = {
    year: getCurrentYear(),
    month: getCurrentMonth(),
    projectId: null
};

export const detailReportByMonthSchema = yup.object().shape({
    year: yup.number(),
    month: yup.number(),
    projectId: yup.object().nullable()
});

// ============== Monthly cost data ============== //
export const monthlyCostDataFormSchema = yup.object().shape({
    year: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    month: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    projectId: yup
        .object()
        .shape({
            value: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
            label: yup.string().required(VALIDATE_MESSAGES.REQUIRED)
        })
        .nullable()
        .required(VALIDATE_MESSAGES.REQUIRED),
    actualCost: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    allocatedAmount: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    totalCost: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    note: yup.string().nullable(),
    userUpdate: yup.string().nullable(),
    lastUpdate: yup.string().nullable(),
    createDate: yup.string().nullable(),
    userCreate: yup.string().nullable()
});

export const monthlyCostDataFormDefault: IMonthlyCostData = {
    projectId: null,
    actualCost: '',
    allocatedAmount: '',
    totalCost: '',
    year: getCurrentYear(),
    month: getCurrentMonth(),
    createDate: '',
    userCreate: '',
    lastUpdate: '',
    userUpdate: '',
    note: ''
};

export interface IMonthlyCostDataConfig {
    year: number;
    month: string | number;
    projectId?: IOption | null;
}

export const monthlyCostDataConfig: IMonthlyCostDataConfig = {
    year: getCurrentYear(),
    month: getCurrentMonth(),
    projectId: null
};

export const monthlyCostDataSchema = yup.object().shape({
    year: yup.string(),
    month: yup.string(),
    projectId: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string()
        })
        .nullable()
});

// ============== Summary ============== //
export interface IMonthlyProjectCostSummaryConfig {
    year: number;
    month: number | string;
    departmentId: string;
    projectType: string;
    projectId?: IOption | null;
}

export const monthlyProjectCostSummaryConfig: IMonthlyProjectCostSummaryConfig = {
    year: getCurrentYear(),
    month: getCurrentMonth(),
    departmentId: '',
    projectType: '',
    projectId: null
};

export const monthlyProjectCostSummarySchema = yup.object().shape({
    year: yup.string(),
    month: yup.string(),
    departmentId: yup.string(),
    projectType: yup.string(),
    projectId: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string()
        })
        .nullable()
});

export const totalMoneyConfig: IMonthsMoney = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
    thirteenthSalary: 0,
    totalCost: 0
};
