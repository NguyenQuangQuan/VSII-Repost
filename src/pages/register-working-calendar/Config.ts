import { yupResolver } from '@hookform/resolvers/yup';
import { VALIDATE_MESSAGES } from 'constants/Message';
import { useForm } from 'react-hook-form';
import { IOption } from 'types';
import { getCurrentMonth, getCurrentYear } from 'utils/date';
import * as yup from 'yup';

export interface IWorkingCalendarSearch {
    year: number;
    month: number | string;
    departmentId?: string;
    idHexString?: IOption | null;
}

export const workingCalenderSearchConfig: IWorkingCalendarSearch = {
    year: getCurrentYear(),
    month: getCurrentMonth(),
    departmentId: '',
    idHexString: null
};

export const workingCalendarSearhSchema = yup.object().shape({
    year: yup.number(),
    month: yup.number(),
    departmentId: yup.string(),
    idHexString: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string()
        })
        .nullable()
});

export interface IRegisterWorkingCalendar {
    idHexString: IOption | null;
    idHexStringUser?: string;
    year: number;
    month: number;
    userId: string;
    userName: string;
    lastName: string;
    firstName: string;
    departmentId: string;
    memberCode: string;
    workdays: [];
    rank: [];
    workingDaySum: '';
}

export const registerWorkingcalenderDefault: IRegisterWorkingCalendar = {
    year: getCurrentYear(),
    month: getCurrentMonth(),
    departmentId: '',
    idHexString: null,
    idHexStringUser: '',
    userId: '',
    userName: '',
    lastName: '',
    firstName: '',
    memberCode: '',
    workdays: [],
    rank: [],
    workingDaySum: ''
};

export const registerWorkingCalendarSchema = yup.object().shape({
    idHexString: yup.string(),
    idHexStringUser: yup.string(),
    year: yup.number(),
    month: yup.number(),
    userId: yup.string(),
    userName: yup.string(),
    lastName: yup.string(),
    firstName: yup.string(),
    departmentId: yup.string(),
    memberCode: yup.string(),
    workdays: yup.array().of(
        yup.object().shape({
            day: yup.string().nullable(),
            type: yup.string().nullable(),
            dayOfWeek: yup.string().nullable()
        })
    )
});

export interface WorkDayShape {
    day: string | number;
    type: string | null;
    dayOfWeek: string;
    verified: string | null;
}

export interface WorkingCalendarFormShape {
    workdays: WorkDayShape[];
}

const schema = yup.object({
    workdays: yup
        .array()
        .of(yup.object({ day: yup.string().nullable(), type: yup.string().nullable(), dayOfWeek: yup.string().nullable() }))
});

export const useWorkingCalendarForm = () => {
    return useForm<WorkingCalendarFormShape>({
        mode: 'all',
        resolver: yupResolver(schema)
    });
};

// Message Working Calendar
export interface IMessageWorkingCalendar {
    message?: string;
    authorization?: string[];
}

export const MessageWorkingCalendarConfig: IMessageWorkingCalendar = {
    message: '',
    authorization: []
};

export const MessageWorkingCalendarSchema = yup.object().shape({
    message: yup.string().required(VALIDATE_MESSAGES.REQUIRED)
});

// Closing Date Working Calendar
export interface IClosingDateWorkingCalendar {
    year: string;
    idHexString: string;
    locked: string;
    closingDates: [];
    userUpdate: string;
    lastUpdate: string;
}

export const ClosingDateWorkingCalendarConfig: IClosingDateWorkingCalendar = {
    year: '',
    idHexString: '',
    locked: '',
    closingDates: [],
    userUpdate: '',
    lastUpdate: ''
};

export const ClosingDateWorkingCalendarSchema = yup.object().shape({
    year: yup.string().nullable(),
    idHexString: yup.string().nullable(),
    locked: yup.string().nullable(),
    userUpdate: yup.string().nullable(),
    lastUpdate: yup.string().nullable()
});
