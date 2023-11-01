// yup
import * as yup from 'yup';

// project imports
import { paginationParamDefault } from 'constants/Common';
import { VALIDATE_MESSAGES } from 'constants/Message';
import { IOption, IPaginationParam } from 'types';
import { getCurrentWeek, getCurrentYear } from 'utils/date';

// ============== Weekly effort ============== //
export interface IWeeklyEffortConfig extends IPaginationParam {
    year: number;
    week: string | number;
    userId?: IOption | null;
    timeStatus?: string[];
    projectId?: IOption | null;
}

export const weeklyEffortConfig: IWeeklyEffortConfig = {
    ...paginationParamDefault,
    year: getCurrentYear(),
    week: getCurrentWeek().value,
    userId: null,
    timeStatus: [],
    projectId: null
};

export const weeklyEffortMemberSchema = yup.object().shape({
    year: yup.string(),
    week: yup.string(),
    userId: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string()
        })
        .nullable(),
    timeStatus: yup.array().nullable()
});

export const weeklyEffortProjectSchema = yup.object().shape({
    year: yup.string(),
    week: yup.string(),
    projectId: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string()
        })
        .nullable()
});

// ============== List project team ============== //
export interface IListProjectTeamConfig extends IPaginationParam {
    year: number;
    week: number | string;
    userName: IOption | null;
    departmentId: string;
}

export const listProjectTeamConfig: IListProjectTeamConfig = {
    ...paginationParamDefault,
    year: getCurrentYear(),
    week: getCurrentWeek().value,
    userName: null,
    departmentId: ''
};

export const listProjectTeamSchema = yup.object().shape({
    year: yup.string(),
    week: yup.string(),
    userName: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string()
        })
        .nullable(),
    departmentId: yup.string()
});

// ============== Login ============== //
export interface ILoginConfig {
    username: string;
    password: string;
}

export const loginConfig = {
    username: '',
    password: ''
};

export const loginSchema = yup.object().shape({
    username: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    password: yup.string().required(VALIDATE_MESSAGES.REQUIRED)
});

// ============== Comment ============== //

export interface ICommentForm {
    note: string;
}

export const commentFormDefault = {
    note: ''
};

export const commentFormSchema = yup.object().shape({
    note: yup.string().required(VALIDATE_MESSAGES.REQUIRED).max(5000, VALIDATE_MESSAGES.MAX_LENGTH)
});
