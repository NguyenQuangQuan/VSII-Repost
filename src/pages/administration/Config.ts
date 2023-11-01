// yup
import * as yup from 'yup';

// project import
import { DEFAULT_VALUE_OPTION_SELECT, EMAIL_TYPE, paginationParamDefault } from 'constants/Common';
import { VALIDATE_MESSAGES } from 'constants/Message';
import {
    IHoliday,
    IMember,
    IOption,
    IPaginationParam,
    IRank,
    ISystemConfig,
    IRankCostHistory,
    IUserOnboardHistory,
    IUserRankHistory,
    IQuotaUpdateHistory,
    IUserBillableHistory,
    IEmailConfig
} from 'types';
import { REGEX_CONSTANTS } from 'constants/Validation';
import { dateFormatComparison } from 'utils/date';

// third party
import moment from 'moment';

// Manage user
export const userFormSchema = yup.object().shape({
    departmentId: yup.string().nullable(),
    firstName: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    lastName: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    memberCode: yup.string().nullable(),
    onboardDate: yup.date().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    outboardDate: yup.date().nullable().min(yup.ref('onboardDate'), VALIDATE_MESSAGES.OUTBOARDDATE),
    rankId: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    status: yup.string().nullable(),
    titleCode: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    userId: yup.string().nullable(),
    userName: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    userType: yup.string().nullable(),
    contractor: yup.boolean().nullable(),
    logtime: yup.boolean().nullable(),
    groups: yup.array().of(
        yup.object().shape({
            groupId: yup.number(),
            groupName: yup.string()
        })
    )
});

export const userFormDefault: IMember = {
    id: {},
    userId: '',
    userName: '',
    userType: '',
    lastName: '',
    firstName: '',
    departmentId: '',
    userDept: '',
    idHexString: null,
    onboardDate: null,
    outboardDate: null,
    created: '',
    creator: '',
    lastUpdate: '',
    userUpdate: '',
    status: '1',
    titleCode: '',
    rankId: '',
    rankCost: 0,
    allocationCost: 0,
    memberCode: '',
    contractor: false,
    logtime: false,
    groups: []
};

export interface IUserFilterConfig extends IPaginationParam {
    departmentId: string;
    memberCode: string;
    userName: string;
    status: string;
    contractor: boolean | string | null;
}

export const userFilterConfig: IUserFilterConfig = {
    ...paginationParamDefault,
    departmentId: '',
    memberCode: '',
    userName: '',
    status: '1',
    contractor: ''
};

export const userFilterSchema = yup.object().shape({
    departmentId: yup.string(),
    memberCode: yup.string(),
    userName: yup.string(),
    status: yup.string(),
    contractor: yup.string()
});

// On/outboard info

export const userOnboardHistoryFormDefault: IUserOnboardHistory = {
    fromDate: null,
    toDate: null,
    contractor: null
};
export const userRankHistoryFormDefault: IUserRankHistory = {
    fromDate: null,
    toDate: null,
    rankId: '',
    titleCode: ''
};

// Billble
export const userBillableFormDefault: IUserBillableHistory = {
    fromDate: null,
    toDate: null
};

export const editOnboardHistoryFormSchema = yup.object().shape({
    // user info
    memberCode: yup.string().nullable().matches(REGEX_CONSTANTS.REGEX_SPECIAL_CHARACTERS, VALIDATE_MESSAGES.SPECIAL_CHARACTERS),
    userName: yup
        .string()
        .required(VALIDATE_MESSAGES.REQUIRED)
        .matches(REGEX_CONSTANTS.REGEX_SPECIAL_CHARACTERS, VALIDATE_MESSAGES.SPECIAL_CHARACTERS)
        .required(VALIDATE_MESSAGES.REQUIRED),
    firstName: yup
        .string()
        .nullable()
        .required(VALIDATE_MESSAGES.REQUIRED)
        .matches(REGEX_CONSTANTS.REGEX_NAME, VALIDATE_MESSAGES.SPECIAL_CHARACTERS),
    lastName: yup
        .string()
        .nullable()
        .required(VALIDATE_MESSAGES.REQUIRED)
        .matches(REGEX_CONSTANTS.REGEX_NAME, VALIDATE_MESSAGES.SPECIAL_CHARACTERS),
    departmentId: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    status: yup.string().nullable(),
    logtime: yup.boolean().nullable(),
    // group
    groups: yup.array().of(
        yup.object().shape({
            groupId: yup.string(),
            groupName: yup.string()
        })
    ),
    // on/outboard info
    userOnboardHistoryList: yup.array().of(
        yup.object().shape({
            contractor: yup.string().nullable().typeError(VALIDATE_MESSAGES.REQUIRED),
            fromDate: yup
                .date()
                .nullable()
                .required(VALIDATE_MESSAGES.REQUIRED)
                .typeError(VALIDATE_MESSAGES.REQUIRED)
                .test('date-fromDate', VALIDATE_MESSAGES.ABOUT_DAYS, function (value, { from, path }: any) {
                    const userOnboardHistoryList = from[1].value.userOnboardHistoryList;
                    const index = Number(path.split('[')[1].split(']')[0]);
                    if (index === 0) return true;
                    let hasErrorDay = true;
                    userOnboardHistoryList.forEach((element: IUserOnboardHistory, i: number) => {
                        if (i === index) {
                            const toDate = dateFormatComparison(userOnboardHistoryList[i - 1].toDate);
                            const fromDate = dateFormatComparison(element.fromDate!);
                            if (fromDate <= toDate) {
                                hasErrorDay = false;
                                return;
                            }
                        }
                    });
                    return hasErrorDay;
                }),
            toDate: yup
                .date()
                .nullable()
                .test('different-from-fromDate', VALIDATE_MESSAGES.ENDDATE, function (value) {
                    const fromDate = this.resolve(yup.ref('fromDate'));
                    return !value || !fromDate || !moment(value).isSame(fromDate, 'day');
                })
                .test('toDate-after-fromDate', VALIDATE_MESSAGES.AFTER_DAY, function (value) {
                    const fromDate = this.resolve(yup.ref('fromDate'));
                    return !value || !fromDate || moment(value).isSameOrAfter(fromDate, 'day');
                })
                .test('date-toDate-one', VALIDATE_MESSAGES.REQUIRED, function (value, { from, path }: any) {
                    const userOnboardHistoryList = from[1].value.userOnboardHistoryList;
                    const currentIndex = parseInt(path.split('[')[1]);
                    if (userOnboardHistoryList.length > 1 && currentIndex !== userOnboardHistoryList.length - 1 && !value) {
                        return false;
                    }
                    return true;
                })
                .typeError(VALIDATE_MESSAGES.REQUIRED)
        })
    ),
    // title
    userRankHistoryList: yup.array().of(
        yup.object().shape({
            rankId: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            titleCode: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
            fromDate: yup
                .date()
                .nullable()
                .required(VALIDATE_MESSAGES.REQUIRED)
                .max(new Date(), VALIDATE_MESSAGES.FUTURE_DATES)
                .typeError(VALIDATE_MESSAGES.REQUIRED)
                .test('date-fromDate', VALIDATE_MESSAGES.ABOUT_DAYS, function (value, { from, path }: any) {
                    const userRankHistoryList = from[1].value.userRankHistoryList;
                    const index = Number(path.split('[')[1].split(']')[0]);
                    if (index === 0) return true;
                    let hasErrorDay = true;
                    userRankHistoryList.forEach((element: IUserRankHistory, i: number) => {
                        if (i === index) {
                            const toDate = dateFormatComparison(userRankHistoryList[i - 1].toDate);
                            const fromDate = dateFormatComparison(element.fromDate!);
                            if (fromDate <= toDate) {
                                hasErrorDay = false;
                                return;
                            }
                        }
                    });
                    return hasErrorDay;
                }),
            toDate: yup
                .date()
                .nullable()
                .test('different-from-fromDate', VALIDATE_MESSAGES.ENDDATE, function (value) {
                    const fromDate = this.resolve(yup.ref('fromDate'));
                    return !value || !fromDate || !moment(value).isSame(fromDate, 'day');
                })
                .test('toDate-after-fromDate', VALIDATE_MESSAGES.AFTER_DAY, function (value) {
                    const fromDate = this.resolve(yup.ref('fromDate'));
                    return !value || !fromDate || moment(value).isSameOrAfter(fromDate, 'day');
                })
                .test('date-toDate-one', VALIDATE_MESSAGES.REQUIRED, function (value, { from, path }: any) {
                    const userRankHistoryList = from[1].value.userRankHistoryList;
                    const currentIndex = parseInt(path.split('[')[1]);
                    if (userRankHistoryList.length > 1 && currentIndex !== userRankHistoryList.length - 1 && !value) {
                        return false;
                    }
                    return true;
                })
                .typeError(VALIDATE_MESSAGES.DATE_FORMAT)
        })
    ),
    // billable
    userBillableHistoryList: yup.array().of(
        yup.object().shape({
            fromDate: yup
                .date()
                .nullable()
                .required(VALIDATE_MESSAGES.REQUIRED)
                .typeError(VALIDATE_MESSAGES.DATE_FORMAT)
                .test('date_of_existence', VALIDATE_MESSAGES.DATE_OF_EXISTENCE, function (value, { from, path }: any) {
                    const userBillableHistoryList = from[1].value.userBillableHistoryList;
                    const index = Number(path.split('[')[1].split(']')[0]);
                    if (index === 0) return true;
                    let hasErrorDay = true;
                    userBillableHistoryList.forEach((element: IUserBillableHistory, i: number) => {
                        if (i === index) {
                            const fromDate = dateFormatComparison(element.fromDate);
                            const toDate = dateFormatComparison(element.toDate);

                            for (let j = 0; j < i; j++) {
                                const prevFromDate = dateFormatComparison(userBillableHistoryList[j].fromDate);
                                const prevToDate = dateFormatComparison(userBillableHistoryList[j].toDate);

                                if (
                                    (fromDate >= prevFromDate && fromDate <= prevToDate) ||
                                    (fromDate < prevFromDate && toDate > prevToDate)
                                ) {
                                    hasErrorDay = false;
                                    return;
                                }
                            }
                        }
                    });

                    return hasErrorDay;
                }),
            toDate: yup
                .date()
                .nullable()
                .required(VALIDATE_MESSAGES.REQUIRED)
                .test('toDate-after-fromDate', VALIDATE_MESSAGES.AFTER_DAY, function (value) {
                    const fromDate = this.resolve(yup.ref('fromDate'));
                    return !value || !fromDate || moment(value).isSameOrAfter(fromDate, 'day');
                })
                .test('date_of_existence', VALIDATE_MESSAGES.DATE_OF_EXISTENCE, function (value, { from, path }: any) {
                    const userBillableHistoryList = from[1].value.userBillableHistoryList;
                    const index = Number(path.split('[')[1].split(']')[0]);
                    if (index === 0) return true;
                    let hasErrorDay = true;
                    userBillableHistoryList.forEach((element: IUserBillableHistory, i: number) => {
                        if (i === index) {
                            const fromDateNew = dateFormatComparison(element.fromDate!);
                            const toDateNew = dateFormatComparison(element.toDate!);

                            for (let j = 0; j < i; j++) {
                                const prevFromDate = dateFormatComparison(userBillableHistoryList[j].fromDate);
                                const prevToDate = dateFormatComparison(userBillableHistoryList[j].toDate);

                                if (
                                    (toDateNew >= prevFromDate && toDateNew <= prevToDate) ||
                                    (fromDateNew < prevFromDate && toDateNew > prevToDate)
                                ) {
                                    hasErrorDay = false;
                                    return;
                                }
                            }
                        }
                    });

                    return hasErrorDay;
                })
        })
    ),
    // project permission
    projectPermissionEntity: yup.object({
        type: yup.string().nullable(),
        assignedProjectList: yup
            .array()
            .of(
                yup.object().shape({
                    projectId: yup.number(),
                    projectName: yup.string()
                })
            )
            .nullable()
    })
});

// Manage project
export interface IProjectSearchConfig extends IPaginationParam {
    projectType: string;
    status: number | string;
    projectId: IOption | null;
    projectManager: IOption | null;
    projectAuthorization?: string;
}

export const projectSearchConfig: IProjectSearchConfig = {
    ...paginationParamDefault,
    status: '',
    projectType: '',
    projectId: null,
    projectManager: null
};

export const projectSearchSchema = yup.object().shape({
    status: yup
        .number()
        .transform((value) => (isNaN(value) || value === null || value === undefined ? null : value))
        .nullable(),
    projectType: yup.string(),
    projectId: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string()
        })
        .nullable(),
    projectManager: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string()
        })
        .nullable()
});

export const quotaUpdateHistoryDefault: IQuotaUpdateHistory[] = [
    {
        id: {},
        projectId: null,
        implQuota: null,
        maintainQuota: null,
        updateDate: '',
        userUpdate: ''
    }
];

// Holiday
export interface IHolidaySearchConfig extends IPaginationParam {
    type: number | string;
}
export const holidaySearchConfig: IHolidaySearchConfig = {
    ...paginationParamDefault,
    type: ''
};

export const holidaySchema = yup.object().shape({
    status: yup.string()
});
export interface IProjectEditConfig {
    projectId: number | null;
    projectName: string;
    departmentId: string;
    contractNo: string;
    billable: string;
    projectType: string;
    startDate: Date | null;
    endDate: Date | null;
    contractSize: number | null;
    licenseAmount: number | null;
    projectCostLimit: number | null;
    implementQuota: number | null;
    maintainQuota: number | null;
    percentageComplete: any;
    userName: IOption | null;
    status: string;
    note: string;
}

export const projectEditConfig: IProjectEditConfig = {
    projectId: null,
    projectName: '',
    departmentId: '',
    contractNo: '',
    billable: '',
    projectType: '',
    startDate: null,
    endDate: null,
    contractSize: null,
    licenseAmount: null,
    projectCostLimit: null,
    implementQuota: null,
    maintainQuota: null,
    percentageComplete: '',
    userName: DEFAULT_VALUE_OPTION_SELECT,
    status: '',
    note: ''
};

export const projectEditSchema = yup.object().shape({
    projectId: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    projectName: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    departmentId: yup.string().required(VALIDATE_MESSAGES.REQUIRED).nullable(),
    contractNo: yup.string().nullable(),
    billable: yup.string().required(VALIDATE_MESSAGES.REQUIRED).nullable(),
    projectType: yup.string().required(VALIDATE_MESSAGES.REQUIRED).nullable(),
    startDate: yup.date().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    endDate: yup.date().min(yup.ref('startDate'), VALIDATE_MESSAGES.ENDDATE).nullable(),
    contractSize: yup
        .number()
        .typeError(VALIDATE_MESSAGES.INVALID_NUMBER)
        .positive(VALIDATE_MESSAGES.POSITIVE_NUMBER)
        .transform((_, val) => (val !== '' ? Number(val) : null))
        .min(0, VALIDATE_MESSAGES.POSITIVE_NUMBER)
        .nullable(),
    licenseAmount: yup
        .number()
        .typeError(VALIDATE_MESSAGES.INVALID_NUMBER)
        .positive(VALIDATE_MESSAGES.POSITIVE_NUMBER)
        .transform((_, val) => (val !== '' ? Number(val) : null))
        .min(0, VALIDATE_MESSAGES.POSITIVE_NUMBER)
        .nullable(),
    projectCostLimit: yup
        .number()
        .typeError(VALIDATE_MESSAGES.INVALID_NUMBER)
        .positive(VALIDATE_MESSAGES.POSITIVE_NUMBER)
        .transform((_, val) => (val !== '' ? Number(val) : null))
        .min(0, VALIDATE_MESSAGES.POSITIVE_NUMBER)
        .nullable(),
    implementQuota: yup
        .number()
        .typeError(VALIDATE_MESSAGES.INVALID_NUMBER)
        .positive(VALIDATE_MESSAGES.POSITIVE_NUMBER)
        .transform((_, val) => (val !== '' ? Number(val) : null))
        .min(0, VALIDATE_MESSAGES.POSITIVE_NUMBER)
        .test('decimal', VALIDATE_MESSAGES.ONE_DECIMAL, (value: any) => value === Math.round(value * 10) / 10)
        .nullable(),
    maintainQuota: yup
        .number()
        .typeError(VALIDATE_MESSAGES.INVALID_NUMBER)
        .positive(VALIDATE_MESSAGES.POSITIVE_NUMBER)
        .transform((_, val) => (val !== '' ? Number(val) : null))
        .min(0, VALIDATE_MESSAGES.POSITIVE_NUMBER)
        .test('decimal', VALIDATE_MESSAGES.ONE_DECIMAL, (value: any) => value === Math.round(value * 10) / 10)
        .nullable(),
    percentageComplete: yup
        .number()
        .typeError(VALIDATE_MESSAGES.INVALID_NUMBER)
        .transform((_, val) => (val !== '' ? Number(val) : null))
        .min(0, ({ min }) => `${VALIDATE_MESSAGES.LARGER_OR_EQUAL} ${min}`)
        .max(100, ({ max }) => `${VALIDATE_MESSAGES.LESS_OR_EQUAL} ${max}`)
        .nullable(),
    userName: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string()
        })
        .nullable(),
    status: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    note: yup.string().nullable()
});

export interface ISaveOrUpdateProjectUserConfig {
    projectId: string;
    userId: IOption;
    roleId: string;
    memberCode: string;
    userName: string;
    projectName: string;
    projectType: string;
    fromDate: Date | null;
    toDate: Date | null;
    firstName: string;
    lastName: string;
}

export const saveOrUpdateProjectUserConfig: ISaveOrUpdateProjectUserConfig = {
    projectId: '',
    userId: DEFAULT_VALUE_OPTION_SELECT,
    roleId: '',
    memberCode: '',
    userName: '',
    projectName: '',
    projectType: '',
    fromDate: null,
    toDate: null,
    firstName: '',
    lastName: ''
};

export const saveOrUpdateProjectUserSchema = yup.object().shape({
    projectId: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    userId: yup
        .object()
        .shape({
            value: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
            label: yup.string()
        })
        .nullable(),
    roleId: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    memberCode: yup.string().nullable(),
    userName: yup.string().nullable(),
    projectName: yup.string(),
    projectType: yup.string(),
    fromDate: yup.date().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    toDate: yup.date().min(yup.ref('fromDate'), VALIDATE_MESSAGES.ENDDATE).nullable(),
    firstName: yup.string().nullable(),
    lastName: yup.string().nullable()
});
// Manage holiday

export const holidayFormDefault: IHoliday = {
    idHexString: '',
    fromDate: null,
    toDate: null,
    type: '',
    note: '',
    dateCreate: '',
    userCreate: '',
    userUpdate: '',
    lastUpdate: ''
};

export const holidaySearchSchema = yup.object().shape({
    type: yup.string()
});

export interface ISaveOrUpdateHolidayConfig {
    toDate: Date | null;
    fromDate: Date | null;
    type: string;
    note: string;
}

export const saveOrUpdateHolidayConfig: ISaveOrUpdateHolidayConfig = {
    fromDate: null,
    toDate: null,
    type: '',
    note: ''
};

export const saveOrUpdateHolidaySchema = yup.object().shape({
    fromDate: yup.date().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    toDate: yup
        .date()
        .nullable()
        .test('toDate-after-fromDate', VALIDATE_MESSAGES.AFTER_DAY, function (value) {
            const fromDate = this.resolve(yup.ref('fromDate'));
            return !value || !fromDate || moment(value).isSameOrAfter(fromDate, 'day');
        })
        .required(VALIDATE_MESSAGES.REQUIRED),
    type: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    note: yup.string().required(VALIDATE_MESSAGES.REQUIRED).trim().min(1, VALIDATE_MESSAGES.REQUIRED)
});
// Manage config

export const configFormDefault: ISystemConfig = {
    idHexString: '',
    key: '',
    value: '',
    valueTypeDate: '',
    description: '',
    userCreate: '',
    userUpdate: '',
    lastUpdate: '',
    dateCreate: '',
    note: ''
};
export interface IUpdateSystemConfig {
    key: string;
    value: string;
    note?: string;
}

export const updateSystemConfig: IUpdateSystemConfig = {
    key: '',
    value: '',
    note: ''
};

export const updateSystemConfigSchema = yup.object().shape({
    key: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    value: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    note: yup.string()
});

// Manage rank
export const rankCostHistoryFormDefault: IRankCostHistory = {
    fromDate: null,
    toDate: null,
    amount: null
};

export const rankValueDefault: IRank = {
    rankId: '',
    rankName: '',
    created: '',
    creator: '',
    lastUpdate: '',
    userUpdate: '',
    rankCost: 0,
    rankCostHistoryList: rankCostHistoryFormDefault,
    idHexString: ''
};

export interface IEditRank {
    rankCostHistoryList: IRankCostHistory[];
}

export const editRankFormSchema = yup.object().shape({
    rankCostHistoryList: yup.array().of(
        yup.object().shape({
            amount: yup
                .number()
                .nullable()
                .required(VALIDATE_MESSAGES.REQUIRED)
                .typeError(VALIDATE_MESSAGES.REQUIRED)
                .min(0, VALIDATE_MESSAGES.POSITIVE_NUMBER),
            fromDate: yup
                .date()
                .nullable()
                .required(VALIDATE_MESSAGES.REQUIRED)
                .typeError(VALIDATE_MESSAGES.REQUIRED)
                .test('date-fromDate', VALIDATE_MESSAGES.ABOUT_DAYS, function (value, { from, path }: any) {
                    const rankCostHistoryList = from[1].value.rankCostHistoryList;
                    const index = Number(path.split('[')[1].split(']')[0]);
                    if (index === 0) return true;
                    let hasErrorDay = true;
                    rankCostHistoryList.forEach((element: IRankCostHistory, i: number) => {
                        if (i === index) {
                            const toDate = dateFormatComparison(rankCostHistoryList[i - 1].toDate);
                            const fromDate = dateFormatComparison(element.fromDate!);
                            if (fromDate <= toDate) {
                                hasErrorDay = false;
                                return;
                            }
                        }
                    });
                    return hasErrorDay;
                }),
            toDate: yup
                .date()
                .nullable()
                .test('different-from-fromDate', VALIDATE_MESSAGES.ENDDATE, function (value) {
                    const fromDate = this.resolve(yup.ref('fromDate'));
                    return !value || !fromDate || !moment(value).isSame(fromDate, 'day');
                })
                .test('toDate-after-fromDate', VALIDATE_MESSAGES.AFTER_DAY, function (value) {
                    const fromDate = this.resolve(yup.ref('fromDate'));
                    return !value || !fromDate || moment(value).isSameOrAfter(fromDate, 'day');
                })
                .test('date-toDate-one', VALIDATE_MESSAGES.REQUIRED, function (value, { from, path }: any) {
                    const rankCostHistoryList = from[1].value.rankCostHistoryList;
                    const currentIndex = parseInt(path.split('[')[1]);
                    if (rankCostHistoryList.length > 1 && currentIndex !== rankCostHistoryList.length - 1 && !value) {
                        return false;
                    }
                    return true;
                })
                .typeError(VALIDATE_MESSAGES.REQUIRED)
        })
    )
});

// Manage special hours

export interface ISpecialHoursSearchConfig extends IPaginationParam {
    type: number | string;
}
export const specialHoursSearchConfig: ISpecialHoursSearchConfig = {
    ...paginationParamDefault,
    type: ''
};
export interface ISaveOrUpdateSpecialHoursConfig {
    idHexString: string;
    userId: IOption | null;
    userName: string;
    fromDate: string | null;
    toDate: string | null;
    type: string;
    hourPerDay: string;
    note: string;
    totalHour?: string;
    created?: string;
    creator?: string;
    lastUpdate?: string;
    userUpdate?: string;
    lastName?: string;
    firstName?: string;
    memberCode?: string;
}

export const saveOrUpdateSpecialHoursConfig: ISaveOrUpdateSpecialHoursConfig = {
    idHexString: '',
    userId: DEFAULT_VALUE_OPTION_SELECT,
    userName: '',
    fromDate: '',
    toDate: '',
    type: '',
    hourPerDay: '',
    note: '',
    totalHour: '',
    created: '',
    creator: '',
    lastUpdate: '',
    userUpdate: '',
    lastName: '',
    firstName: '',
    memberCode: ''
};

export const saveOrUpdateSpecialHoursSchema = yup.object().shape({
    userId: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string().required(VALIDATE_MESSAGES.REQUIRED)
        })
        .required(VALIDATE_MESSAGES.REQUIRED),
    fromDate: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    toDate: yup
        .string()
        .test('is-greater-than-fromDate', VALIDATE_MESSAGES.ENDDATE, function (value) {
            const fromDate = this.parent.fromDate;
            return !value || !fromDate || moment(value).isSameOrAfter(fromDate, 'day');
        })
        .required(VALIDATE_MESSAGES.REQUIRED),
    type: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    note: yup.string().nullable(),
    hourPerDay: yup
        .mixed()
        .test('isNumber', VALIDATE_MESSAGES.NUMBER, (value) => {
            if (value === null || value === '') {
                return true;
            }
            return /^\d+\.?\d*$/.test(value);
        })
        .nullable()
        .required(VALIDATE_MESSAGES.REQUIRED)
});

// Manage group
export interface IGroupSearchConfig extends IPaginationParam {
    code: string;
    name: string;
}

export const groupSearchConfig: IGroupSearchConfig = {
    ...paginationParamDefault,
    code: '',
    name: ''
};

export const groupSearchSchema = yup.object().shape({
    code: yup.string(),
    name: yup.string()
});

export interface ISaveOrUpdateGroupConfig {
    groupId: string;
    groupName: string;
    note: string;
    groupType: string;
    idHexString?: string;
    functions?: string[];
}

export const saveOrUpdateGroupConfig: ISaveOrUpdateGroupConfig = {
    groupId: '',
    groupName: '',
    groupType: '',
    note: ''
};

export const saveOrUpdateGroupSchema = yup.object().shape({
    groupId: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    groupName: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    groupType: yup.string().nullable(),
    note: yup.string().nullable()
});

//Email Config
export const addOrEditEmailConfigFormDefault: IEmailConfig = {
    emailType: '',
    emailCode: '',
    template: '',
    sendTo: [],
    sendCC: [],
    sendBCC: [],
    content: '',
    userName: '',
    subject: '',
    nameFile: '',
    status: '',
    timeSendMail: {
        day: '',
        hour: '',
        weekdays: ''
    }
};

export const addOrEditEmailConfigSchema = yup.object().shape({
    emailType: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    emailCode: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    sendTo: yup.array().nullable().of(yup.string()).required(VALIDATE_MESSAGES.REQUIRED).min(1, VALIDATE_MESSAGES.REQUIRED),
    sendCC: yup.array().nullable().of(yup.string()),
    sendBCC: yup.array().nullable().of(yup.string()),
    nameFile: yup
        .string()
        .required(VALIDATE_MESSAGES.REQUIRED)
        .matches(REGEX_CONSTANTS.REGEX_NAME_FILE, VALIDATE_MESSAGES.INVALID_NAME_FILE),
    timeSendMail: yup
        .object()
        .shape({
            day: yup.string(),
            hour: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
            weekdays: yup.string()
        })
        .when('emailType', {
            is: (emailType: string) => emailType === EMAIL_TYPE.RP_MONTH,
            then: yup.object().shape({
                day: yup.string(),
                hour: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
                weekdays: yup.string()
            })
        })
        .when('emailType', {
            is: (emailType: string) => emailType === EMAIL_TYPE.RP_WEEK,
            then: yup.object().shape({
                day: yup.string(),
                hour: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
                weekdays: yup.string().required(VALIDATE_MESSAGES.REQUIRED)
            })
        }),
    template: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    subject: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    content: yup.string().required(VALIDATE_MESSAGES.REQUIRED).trim().min(1, VALIDATE_MESSAGES.REQUIRED),
    status: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED)
});
