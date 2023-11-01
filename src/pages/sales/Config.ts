// yup
import * as yup from 'yup';
import moment from 'moment';

// project imports
import {
    IProductivityHcInfo,
    IBudgetingPlanItem,
    IMonthlyProductionPerformanceAddOrEditForm,
    IProductivityHeadCountEditForm,
    ISaleBidding,
    ISaleOnGoingItem
} from 'types';
import { IOption, IPaginationParam, IRequestsChecking, ISupplierChecking } from 'types';
import { REGEX_CONSTANTS } from 'constants/Validation';
import { getCurrentYear } from 'utils/date';
import { VALIDATE_MESSAGES } from 'constants/Message';
import { CONTRACT_TYPE_SALE_REPORT, DEPARTMENTS, ROLE_TYPE, paginationParamDefault } from 'constants/Common';

// ============== Monthly Production Performance ============== //

export interface IMonthlyProductionPerformanceFilterConfig {
    year: number;
    month?: number[];
}

export const monthlyProductionPerformanceFilterConfig: IMonthlyProductionPerformanceFilterConfig = {
    year: getCurrentYear(),
    month: []
};

export const monthlyProductionPerformanceFilterSchema = yup.object().shape({
    year: yup.string(),
    month: yup.array()
});

export const monthlyProductionPerformanceInfoDefault = {
    months: [],
    departments: [],
    companyTotals: {
        totalHC: [],
        productivity: [],
        product: [],
        totalSI: [],
        totalDomesticITO: [],
        totalOverseasITO: [],
        totalITO: [],
        companyTotal: []
    }
};

// Edit HeadCount Form
export const productivityHeadCountEditFormSchema = yup.object().shape({
    year: yup.string().nullable(),
    month: yup.string().nullable(),
    value: yup
        .string()
        .nullable()
        .required(VALIDATE_MESSAGES.REQUIRED)
        .matches(REGEX_CONSTANTS.REGEX_NUMBER, VALIDATE_MESSAGES.INVALID_NUMBER)
});

export const productivityHeadCountEditFormDefault: IProductivityHeadCountEditForm = {
    year: getCurrentYear(),
    month: '1',
    value: ''
};

// ============== Sales Lead ============== //

// Sales Lead Form Search
export interface ISalesLeadFilterConfig extends IPaginationParam {
    partnerName: string;
    picUserName: IOption | null;
    supplierName: string;
    status: string;
    receivedDate: Date | null | string;
    fromDate: Date | null | string;
    toDate: Date | null | string;
}

export const salesLeadFilterConfig: ISalesLeadFilterConfig = {
    ...paginationParamDefault,
    supplierName: '',
    partnerName: '',
    status: '',
    receivedDate: null,
    picUserName: null,
    fromDate: null,
    toDate: null
};

export const salesLeadFilterShemcha = yup.object().shape({
    partnerName: yup.string().nullable(),
    supplierName: yup.string().nullable(),
    status: yup.string().nullable(),
    receivedDate: yup.date().nullable(),
    picUserName: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string()
        })
        .nullable(),
    fromDate: yup.date().nullable(),
    toDate: yup.date().nullable()
});

// Add or Edit Requests Checking Form
export const addOrEditRequestsCheckingFormDefault: IRequestsChecking = {
    partnerName: '',
    request: '',
    timeline: '',
    status: '',
    note: '',
    picUserName: null,
    domain: '',
    possibility: '',
    quantity: '',
    receivedDate: null,
    technology: ''
};

export const addOrEditRequestsCheckingFormSchema = yup.object().shape({
    partnerName: yup
        .string()
        .matches(REGEX_CONSTANTS.REGEX_SPECIAL_CHARACTERS, VALIDATE_MESSAGES.SPECIAL_CHARACTERS_PARTER_NAME)
        .matches(REGEX_CONSTANTS.REGEX_NO_NUMBER, VALIDATE_MESSAGES.NO_NUMBER)
        .required(VALIDATE_MESSAGES.REQUIRED),
    request: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    timeline: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    status: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    note: yup.string(),
    picUserName: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string()
        })
        .nullable()
        .required(VALIDATE_MESSAGES.REQUIRED),
    domain: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    possibility: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    quantity: yup
        .string()
        .matches(REGEX_CONSTANTS.REGEX_NUMBER, VALIDATE_MESSAGES.INVALID_NUMBER)
        .nullable()
        .required(VALIDATE_MESSAGES.REQUIRED),
    receivedDate: yup.date().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    technology: yup.string().required(VALIDATE_MESSAGES.REQUIRED)
});

// Add or Edit Supplier Checking Form

export const addOrEditSupplierCheckingFormDefault: ISupplierChecking = {
    picUserName: null,
    note: '',
    fromDate: null,
    toDate: null,
    supplierName: '',
    technology: '',
    unitPrice: null,
    workType: '',
    quantity: ''
};

export const addOrEditSupplierCheckingFormSchema = yup.object().shape({
    note: yup.string(),
    fromDate: yup.date().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    toDate: yup
        .date()
        .nullable()
        .required(VALIDATE_MESSAGES.REQUIRED)
        .test('toDate-after-fromDate', VALIDATE_MESSAGES.AFTER_DAY, function (value) {
            const fromDate = this.resolve(yup.ref('fromDate'));
            return !value || !fromDate || moment(value).isSameOrAfter(fromDate, 'day');
        }),
    picUserName: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string()
        })
        .nullable()
        .required(VALIDATE_MESSAGES.REQUIRED),
    supplierName: yup
        .string()
        .matches(REGEX_CONSTANTS.REGEX_SPECIAL_CHARACTERS, VALIDATE_MESSAGES.SPECIAL_CHARACTERS_SUPPLIER_NAME)
        .matches(REGEX_CONSTANTS.REGEX_NO_NUMBER, VALIDATE_MESSAGES.NO_NUMBER)
        .required(VALIDATE_MESSAGES.REQUIRED),
    quantity: yup.string().nullable().matches(REGEX_CONSTANTS.REGEX_NUMBER, VALIDATE_MESSAGES.INVALID_NUMBER),
    technology: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    unitPrice: yup
        .number()
        .nullable()
        .required(VALIDATE_MESSAGES.REQUIRED)
        .typeError(VALIDATE_MESSAGES.INVALID_NUMBER)
        .positive(VALIDATE_MESSAGES.POSITIVE_NUMBER),
    workType: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED)
});

export const hcInfoFormDefault: IProductivityHcInfo = {
    role: '',
    rate: '',
    rateUSD: '',
    quantity: '',
    amount: ''
};

export const hcInfoBuiddingFormDefault = {
    role: '',
    rate: '',
    rateVND: '',
    quantity: '',
    amount: ''
};

export const HcInfoDefault = {
    role: '',
    rate: 0,
    rateUSD: 0,
    quantity: 0,
    amount: 0
};

export const productionPerformanceAddOrEditFormDefault: IMonthlyProductionPerformanceAddOrEditForm = {
    idHexString: '',
    year: getCurrentYear(),
    month: 0,
    projectId: null,
    departmentId: '',
    projectName: '',
    contractSize: '',
    serviceType: '',
    contractType: CONTRACT_TYPE_SALE_REPORT.TM,
    originalContractSize: '',
    contractAllocation: '',
    duration: {
        fromDate: null,
        toDate: null
    },
    paymentTerm: '',
    currency: '',
    standardWorkingDay: '',
    exChangeRate: 0,
    delivered: 0,
    receivable: 0,
    received: 0,
    financial: 0,
    hcInfo: []
};

//schema
export const productionPerformanceAddOrEditFormSchema = yup.object().shape({
    year: yup.string().nullable(),
    idHexString: yup.string().nullable(),
    month: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    departmentId: yup.string().nullable(),
    serviceType: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),

    projectId: yup.object().when('departmentId', {
        is: (departmentId: string) => departmentId === DEPARTMENTS.SCS || departmentId === DEPARTMENTS.PRD,
        then: yup.object().nullable().required(VALIDATE_MESSAGES.REQUIRED),
        otherwise: yup.object().nullable()
    }),

    projectName: yup.string().when('departmentId', {
        is: DEPARTMENTS.SMD,
        then: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
        otherwise: yup.string().nullable()
    }),
    contractSize: yup.string().when(['departmentId', 'contractType'], {
        is: (departmentId: string, contractType: string) =>
            departmentId === DEPARTMENTS.SCS && contractType === CONTRACT_TYPE_SALE_REPORT.FIX_COST_BIDDING,
        then: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
        otherwise: yup.string().nullable()
    }),
    contractType: yup.string().when('departmentId', {
        is: DEPARTMENTS.SCS,
        then: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
        otherwise: yup.string().nullable()
    }),
    originalContractSize: yup.string().when(['departmentId', 'contractType'], {
        is: (departmentId: string, contractType: string) =>
            departmentId === DEPARTMENTS.SCS && contractType === CONTRACT_TYPE_SALE_REPORT.FIX_COST_BIDDING,
        then: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
        otherwise: yup.string().nullable()
    }),
    contractAllocation: yup.string().when('departmentId', {
        is: DEPARTMENTS.SCS,
        then: yup.string().nullable(),
        otherwise: yup.string().nullable()
    }),
    duration: yup.object().when('departmentId', {
        is: DEPARTMENTS.SCS,
        then: yup.object().shape({
            fromDate: yup.date().nullable(),
            toDate: yup
                .date()
                .nullable()
                .test('toDate-after-fromDate', VALIDATE_MESSAGES.AFTER_DAY, function (value) {
                    const fromDate = this.resolve(yup.ref('fromDate'));
                    return !value || !fromDate || moment(value).isSameOrAfter(fromDate, 'day');
                })
        }),
        otherwise: yup.object().shape({
            fromDate: yup.date().nullable(),
            toDate: yup
                .date()
                .nullable()
                .test('toDate-after-fromDate', VALIDATE_MESSAGES.AFTER_DAY, function (value) {
                    const fromDate = this.resolve(yup.ref('fromDate'));
                    return !value || !fromDate || moment(value).isSameOrAfter(fromDate, 'day');
                })
        })
    }),
    paymentTerm: yup.string().when(['departmentId', 'contractType'], {
        is: (departmentId: string, contractType: string) =>
            departmentId === DEPARTMENTS.SCS && contractType === CONTRACT_TYPE_SALE_REPORT.TM,
        then: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
        otherwise: yup.string().nullable()
    }),
    currency: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    delivered: yup.number().when('departmentId', {
        is: DEPARTMENTS.SCS,
        then: yup
            .number()
            .nullable()
            .typeError(VALIDATE_MESSAGES.INVALID_NUMBER)
            .positive(VALIDATE_MESSAGES.POSITIVE_NUMBER)
            .transform((_, val) => (val !== '' ? Number(val) : null))
            .min(0, VALIDATE_MESSAGES.POSITIVE_NUMBER),
        otherwise: yup.number().nullable()
    }),

    receivable: yup.number().when('departmentId', {
        is: DEPARTMENTS.SCS,
        then: yup
            .number()
            .nullable()
            .typeError(VALIDATE_MESSAGES.INVALID_NUMBER)
            .positive(VALIDATE_MESSAGES.POSITIVE_NUMBER)
            .transform((_, val) => (val !== '' ? Number(val) : null))
            .min(0, VALIDATE_MESSAGES.POSITIVE_NUMBER),
        otherwise: yup.number().nullable()
    }),
    received: yup.number().when('departmentId', {
        is: DEPARTMENTS.SCS,
        then: yup
            .number()
            .nullable()
            .typeError(VALIDATE_MESSAGES.INVALID_NUMBER)
            .positive(VALIDATE_MESSAGES.POSITIVE_NUMBER)
            .transform((_, val) => (val !== '' ? Number(val) : null))
            .min(0, VALIDATE_MESSAGES.POSITIVE_NUMBER),
        otherwise: yup.number().nullable()
    }),
    financial: yup.number().when('departmentId', {
        is: DEPARTMENTS.SCS,
        then: yup
            .number()
            .nullable()
            .typeError(VALIDATE_MESSAGES.INVALID_NUMBER)
            .positive(VALIDATE_MESSAGES.POSITIVE_NUMBER)
            .transform((_, val) => (val !== '' ? Number(val) : null))
            .min(0, VALIDATE_MESSAGES.POSITIVE_NUMBER),
        otherwise: yup.number().nullable()
    }),

    hcInfo: yup.array().when(['departmentId', 'contractType'], {
        is: (departmentId: string, contractType: string) =>
            departmentId === DEPARTMENTS.SCS && contractType === CONTRACT_TYPE_SALE_REPORT.TM,
        then: yup.array().of(
            yup.object().shape({
                role: yup
                    .mixed()
                    .test(
                        'isRoleValid',
                        VALIDATE_MESSAGES.REQUIRED,
                        (value) => value === null || ROLE_TYPE.map((option) => option.value).includes(value)
                    )
                    .required(VALIDATE_MESSAGES.REQUIRED)
                    .nullable(),
                rate: yup
                    .number()
                    .nullable()
                    .required(VALIDATE_MESSAGES.REQUIRED)
                    .transform((value, originalValue) => {
                        if (originalValue === '') return null;
                        return value;
                    }),
                rateUSD: yup
                    .number()
                    .nullable()
                    .required(VALIDATE_MESSAGES.REQUIRED)
                    .transform((value, originalValue) => {
                        if (originalValue === '') return null;
                        return value;
                    }),
                quantity: yup
                    .number()
                    .nullable()
                    .required(VALIDATE_MESSAGES.REQUIRED)
                    .transform((value, originalValue) => {
                        if (originalValue === '') return null;
                        return value;
                    }),
                amount: yup
                    .number()
                    .nullable()
                    .transform((value, originalValue) => {
                        if (originalValue === '') return null;
                        return value;
                    })
            })
        )
    }),

    exchangeRate: yup.number().when('departmentId', {
        is: DEPARTMENTS.SCS,
        then: yup.number().nullable(),
        otherwise: yup.number().nullable()
    }),

    standardWorkingDay: yup.number().when('departmentId', {
        is: DEPARTMENTS.SCS,
        then: yup
            .number()
            .nullable()
            .transform((value, originalValue) => {
                const parsedValue = parseFloat(originalValue);
                return isNaN(parsedValue) ? undefined : parsedValue;
            }),
        otherwise: yup.number().nullable()
    })
});
// ============== SALE PIPELINE ==============

// ============== Summary ==============

// ============== OnGoing ==============
export interface IOnGoingConfig extends IPaginationParam {
    type: string;
    year: number;
    productionPerformanceIdHexString: IOption | null;
    status: string;
}

export const onGoingConfig: IOnGoingConfig = {
    ...paginationParamDefault,
    type: '',
    year: getCurrentYear(),
    productionPerformanceIdHexString: null,
    status: ''
};

export const onGoingSchema = yup.object().shape({
    type: yup.string().nullable(),
    year: yup.string().nullable(),
    productionPerformanceIdHexString: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string()
        })
        .nullable(),
    status: yup.string().nullable()
});

export const addOrEditOnGoingDefaultValue: ISaleOnGoingItem = {
    idHexString: '',
    projectInfo: {
        year: '',
        contractNo: '',
        customer: '',
        probability: '',
        productionPerformanceIdHexString: null,
        projectName: '',
        status: '',
        type: '',
        serviceType: '',
        contractDueDate: null,
        contractDurationFrom: null,
        contractDurationTo: null,
        contractType: '',
        note: '',
        warrantyTime: ''
    },
    // financial info
    financialInfo: {
        sizeVND: '',
        sizeUSD: '',
        managementRevenueAllocated: '',
        accountRevenueAllocatedVND: '',
        newSaleUSD: '',
        currency: '',
        exchangeRate: '',
        acctReceivables: '',
        netEarn: '',
        paid: '',
        remain: '',
        quarterLicense1st: '',
        quarterLicense2nd: '',
        quarterLicense3rd: '',
        quarterLicense4th: '',
        licenseFee: ''
    },
    // hc info
    hcInfo: {
        billableHcs: '',
        hcs: '',
        teamLeadHcs: '',
        seniorHcs: '',
        middleHcs: '',
        juniorHcs: '',
        quarter1st: '',
        quarter2nd: '',
        quarter3rd: '',
        quarter4th: '',
        totalNewSale: '',
        totalBillable: '',
        monthlyHCList: [
            {
                month: 0,
                hcMonthly: 0,
                billableDay: 0,
                billable: 0
            }
        ]
    },
    // other info
    otherInfo: {
        contact: null,
        presaleFolder: '',
        customerContact: '',
        phoneNumber: '',
        emailAddress: ''
    }
};

export const monthlyHCListDefaultValue = [
    {
        month: 0,
        hcMonthly: 0
    }
];

export const addOrEditOnGoingSchema = yup.object().shape({
    idHexString: yup.string().nullable(),
    // project info
    projectInfo: yup.object().shape({
        year: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        contractNo: yup.string().nullable(),
        customer: yup.string().nullable(),
        probability: yup
            .number()
            .typeError(VALIDATE_MESSAGES.INVALID_NUMBER)
            .transform((_, val) => (val !== '' ? Number(val) : null))
            .min(0, ({ min }) => `${VALIDATE_MESSAGES.LARGER_OR_EQUAL}${min}`)
            .max(100, ({ max }) => `${VALIDATE_MESSAGES.LESS_OR_EQUAL} ${max}`)
            .nullable(),
        productionPerformanceIdHexString: yup
            .object()
            .shape({
                value: yup.string().nullable(),
                label: yup.string()
            })
            .nullable()
            .required(VALIDATE_MESSAGES.REQUIRED),
        projectName: yup.string().nullable(),
        status: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
        type: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
        serviceType: yup.string().nullable(),
        contractType: yup.string().nullable(),
        contractDueDate: yup.date().nullable(),
        contractDurationFrom: yup.date().nullable(),
        contractDurationTo: yup.date().nullable(),
        note: yup.string().nullable(),
        warrantyTime: yup.string()
    }),
    // financial info
    financialInfo: yup.object().shape({
        sizeVND: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        sizeUSD: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        managementRevenueAllocated: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        accountRevenueAllocatedVND: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        newSaleUSD: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        currency: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        exchangeRate: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        acctReceivables: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        netEarn: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        paid: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        remain: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        quarterLicense1st: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        quarterLicense2nd: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        quarterLicense3rd: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        quarterLicense4th: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        licenseFee: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
    }),
    // hc info
    hcInfo: yup.object().shape({
        billableHcs: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        hcs: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        seniorHcs: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        middleHcs: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        juniorHcs: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        teamLeadHcs: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        quarter1st: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        quarter2nd: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        quarter3rd: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        quarter4th: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        totalNewSale: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable(),
        totalBillable: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
    }),
    // other info
    otherInfo: yup.object().shape({
        contact: yup
            .object()
            .shape({
                value: yup.string().nullable(),
                label: yup.string()
            })
            .nullable(),
        presaleFolder: yup.string().nullable(),
        customerContact: yup.string().nullable(),
        phoneNumber: yup.string().nullable(),
        emailAddress: yup.string().nullable()
    })
});

// ============== Bidding ==============
export interface IBiddingFilterConfig extends IPaginationParam {
    type: string;
    year: number;
    projectName: IOption | null;
    status: string;
}

export const biddingFilterConfig: IBiddingFilterConfig = {
    ...paginationParamDefault,
    type: '',
    year: getCurrentYear(),
    projectName: null,
    status: ''
};

export const biddingFilterShemcha = yup.object().shape({
    type: yup.string().nullable(),
    year: yup.string(),
    projectName: yup.string().nullable(),
    status: yup.string().nullable()
});

export const monthlyBillableDefault = {
    year: 0,
    month: 0,
    workingDays: 0
};
export const IRateByMonth = {
    role: '',
    rate: 0,
    rateVND: 0,
    quantity: 0,
    workDay: 0,
    amount: 0
};

export const hcInfoMonthdefault = {
    month: 0,
    billable: 0,
    rateByMonth: [IRateByMonth]
};

export const addOrEditBiddingConfig: ISaleBidding = {
    idHexString: '',
    financialInfo: {
        originalContractSize: '',
        sizeVND: '',
        sizeUSD: '',
        managementRevenueAllocated: '',
        accountRevenueAllocatedVND: '',
        newSaleUSD: '',
        currency: '',
        exchangeRate: '',
        acctReceivables: '',
        netEarn: '',
        paid: '',
        remain: '',
        quarterLicense1st: '',
        quarterLicense2nd: '',
        quarterLicense3rd: '',
        quarterLicense4th: '',
        licenseFee: ''
    },
    hcInfo: {
        billableHcs: '',
        hcs: '',
        teamLeadHcs: '',
        seniorHcs: '',
        middleHcs: '',
        juniorHcs: '',
        quarter1st: '',
        quarter2nd: '',
        quarter3rd: '',
        quarter4th: '',
        totalBillable: '',
        totalNewSale: '',
        hcInfoMonth: hcInfoMonthdefault,
        fixCostHcInfo: null,
        monthlyHCList: [
            {
                month: 1,
                hcMonthly: 0,
                billableDay: 0,
                billable: 0
            },
            {
                month: 2,
                hcMonthly: 0,
                billableDay: 0,
                billable: 0
            },
            {
                month: 3,
                hcMonthly: 0,
                billableDay: 0,
                billable: 0
            },
            {
                month: 4,
                hcMonthly: 0,
                billableDay: 0,
                billable: 0
            },
            {
                month: 5,
                hcMonthly: 0,
                billableDay: 0,
                billable: 0
            },
            {
                month: 6,
                hcMonthly: 0,
                billableDay: 0,
                billable: 0
            },
            {
                month: 7,
                hcMonthly: 0,
                billableDay: 0,
                billable: 0
            },
            {
                month: 8,
                hcMonthly: 0,
                billableDay: 0,
                billable: 0
            },
            {
                month: 9,
                hcMonthly: 0,
                billableDay: 0,
                billable: 0
            },
            {
                month: 10,
                hcMonthly: 0,
                billableDay: 0,
                billable: 0
            },
            {
                month: 11,
                hcMonthly: 0,
                billableDay: 0,
                billable: 0
            },
            {
                month: 12,
                hcMonthly: 0,
                billableDay: 0,
                billable: 0
            }
        ]
    },
    project: {
        productionPerformanceIdHexString: null,
        year: '',
        customer: '',
        projectName: '',
        type: '',
        serviceType: '',
        contractType: '',
        note: '',
        contractNo: '',
        probability: '',
        status: '',
        contractDueDate: null,
        contractDurationFrom: null,
        contractDurationTo: null,
        warrantyTime: ''
    },
    otherInfo: {
        contact: null,
        presaleFolder: '',
        customerContact: '',
        phoneNumber: '',
        emailAddress: ''
    }
};

export const defaultHcInfoMonths = [
    {
        month: 1,
        billable: 0,
        rateByMonth: [
            {
                role: '',
                rate: 0,
                rateVND: 0,
                quantity: 0,
                amount: 0
            }
        ]
    },
    {
        month: 2,
        billable: 0,
        rateByMonth: [
            {
                role: '',
                rate: 0,
                rateVND: 0,
                quantity: 0,
                amount: 0
            }
        ]
    },
    {
        month: 3,
        billable: 0,
        rateByMonth: [
            {
                role: '',
                rate: 0,
                rateVND: 0,
                quantity: 0,
                amount: 0
            }
        ]
    },
    {
        month: 4,
        billable: 0,
        rateByMonth: [
            {
                role: '',
                rate: 0,
                rateVND: 0,
                quantity: 0,
                amount: 0
            }
        ]
    },
    {
        month: 5,
        billable: 0,
        rateByMonth: [
            {
                role: '',
                rate: 0,
                rateVND: 0,
                quantity: 0,
                amount: 0
            }
        ]
    },
    {
        month: 6,
        billable: 0,
        rateByMonth: [
            {
                role: '',
                rate: 0,
                rateVND: 0,
                quantity: 0,
                amount: 0
            }
        ]
    },
    {
        month: 7,
        billable: 0,
        rateByMonth: [
            {
                role: '',
                rate: 0,
                rateVND: 0,
                quantity: 0,
                amount: 0
            }
        ]
    },
    {
        month: 8,
        billable: 0,
        rateByMonth: [
            {
                role: '',
                rate: 0,
                rateVND: 0,
                quantity: 0,
                amount: 0
            }
        ]
    },
    {
        month: 9,
        billable: 0,
        rateByMonth: [
            {
                role: '',
                rate: 0,
                rateVND: 0,
                quantity: 0,
                amount: 0
            }
        ]
    },
    {
        month: 10,
        billable: 0,
        rateByMonth: [
            {
                role: '',
                rate: 0,
                rateVND: 0,
                quantity: 0,
                amount: 0
            }
        ]
    },
    {
        month: 11,
        billable: 0,
        rateByMonth: [
            {
                role: '',
                rate: 0,
                rateVND: 0,
                quantity: 0,
                amount: 0
            }
        ]
    },
    {
        month: 12,
        billable: 0,
        rateByMonth: [
            {
                role: '',
                rate: 0,
                rateVND: 0,
                quantity: 0,
                amount: 0
            }
        ]
    }
];

export const defaultHcInfoMonthsFC = [
    {
        month: 1,
        billable: 0,
        contractAllocationByMonth: 0
    },
    {
        month: 2,
        billable: 0,
        contractAllocationByMonth: 0
    },
    {
        month: 3,
        billable: 0,
        contractAllocationByMonth: 0
    },
    {
        month: 4,
        billable: 0,
        contractAllocationByMonth: 0
    },
    {
        month: 5,
        billable: 0,
        contractAllocationByMonth: 0
    },
    {
        month: 6,
        billable: 0,
        contractAllocationByMonth: 0
    },
    {
        month: 7,
        billable: 0,
        contractAllocationByMonth: 0
    },
    {
        month: 8,
        billable: 0,
        contractAllocationByMonth: 0
    },
    {
        month: 9,
        billable: 0,
        contractAllocationByMonth: 0
    },
    {
        month: 10,
        billable: 0,
        contractAllocationByMonth: 0
    },
    {
        month: 11,
        billable: 0,
        contractAllocationByMonth: 0
    },
    {
        month: 12,
        billable: 0,
        contractAllocationByMonth: 0
    }
];

export const addOrEditBiddingSchema = yup.object().shape({
    idHexString: yup.string().nullable(),
    // project
    productionPerformanceIdHexString: yup.string().nullable(),
    projectName: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    status: yup.string().required(VALIDATE_MESSAGES.REQUIRED),
    type: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    serviceType: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    contractType: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),

    contractNo: yup.string().nullable(),
    customer: yup.string().nullable().nullable(),
    probability: yup
        .number()
        .typeError(VALIDATE_MESSAGES.INVALID_NUMBER)
        .transform((_, val) => (val !== '' ? Number(val) : null))
        .min(0, ({ min }) => `${VALIDATE_MESSAGES.LARGER_OR_EQUAL}${min}`)
        .max(100, ({ max }) => `${VALIDATE_MESSAGES.LESS_OR_EQUAL} ${max}`)
        .nullable(),
    contractDueDate: yup.string().nullable(),
    contractDurationFrom: yup.string().nullable(),
    contractDurationTo: yup.string().nullable(),
    note: yup.string().nullable(),
    warrantyTime: yup.string(),
    // financial info

    currency: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    originalContractSize: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(), //     currency: yup.string().nullable(),
    sizeVND: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    sizeUSD: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    managementRevenueAllocated: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    accountRevenueAllocatedVND: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    newSaleUSD: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    exchangeRate: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    acctReceivables: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    netEarn: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    paid: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    remain: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    quarterLicense1st: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    quarterLicense2nd: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    quarterLicense3rd: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    quarterLicense4th: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    licenseFee: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    //hc info
    billableHcs: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    hcs: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    teamLeadHcs: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    seniorHcs: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    middleHcs: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    juniorHcs: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    quarter1st: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    quarter2nd: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    quarter3rd: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    quarter4th: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    totalBillable: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    totalNewSale: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable(),
    monthlyHCList: yup.array().of(
        yup.object().shape({
            month: yup
                .number()
                .transform((value) => (Number.isNaN(value) ? null : value))
                .nullable(),
            hcMonthly: yup
                .number()
                .transform((value) => (Number.isNaN(value) ? null : value))
                .nullable(),
            billableDay: yup
                .number()
                .transform((value) => (Number.isNaN(value) ? null : value))
                .nullable(),
            billable: yup
                .number()
                .transform((value) => (Number.isNaN(value) ? null : value))
                .nullable()
        })
    )
});

export const addOrEditRateByMonthSchema = yup.object().shape({
    contractType: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    month: yup.string().nullable().required(VALIDATE_MESSAGES.REQUIRED),
    rateByMonth: yup.array().when('contractType', {
        is: (contractType: string) => contractType === CONTRACT_TYPE_SALE_REPORT.TM,
        then: yup.array().of(
            yup.object().shape({
                role: yup
                    .mixed()
                    .test(
                        'isRoleValid',
                        VALIDATE_MESSAGES.REQUIRED,
                        (value) => value === null || ROLE_TYPE.map((option) => option.value).includes(value)
                    )
                    .required(VALIDATE_MESSAGES.REQUIRED)
                    .nullable(),
                rate: yup
                    .number()
                    .nullable()
                    .required(VALIDATE_MESSAGES.REQUIRED)
                    .transform((value, originalValue) => {
                        if (originalValue === '') return null;
                        return value;
                    }),
                rateVND: yup
                    .number()
                    .nullable()
                    .required(VALIDATE_MESSAGES.REQUIRED)
                    .transform((value, originalValue) => {
                        if (originalValue === '') return null;
                        return value;
                    }),
                quantity: yup
                    .number()
                    .nullable()
                    .required(VALIDATE_MESSAGES.REQUIRED)
                    .transform((value, originalValue) => {
                        if (originalValue === '') return null;
                        return value;
                    })
            })
        )
    })
});

// ============== Budgeting plan ==============

export interface IBudgetingPlanSearch {
    year: number;
    type: string;
}

export const budgetingPlanSearchConfig: IBudgetingPlanSearch = {
    year: getCurrentYear(),
    type: ''
};

export const budgetingPlanSearchSchema = yup.object().shape({
    type: yup.string().nullable(),
    year: yup.string().nullable()
});

export const editBudgetingPlanDefaultValue: IBudgetingPlanItem = {
    idHexString: '',
    projectInfo: {
        year: '',
        salePipelineIdHexString: '',
        salePipelineType: '',
        projectName: '',
        type: '',
        serviceType: '',
        note: '',
        riskFactor: 0,
        numberOfMonths: 0,
        contractedValue: 0,
        effortLimitManHours: null,
        costLimitVND: 0
    },
    //projectKPIScore
    projectKPIScore: {
        estimateUsedEffort: 0,
        estimatedUseCost: 0,
        planDelivery: 0,
        totalOnTimeDelivery: 0,
        effortKPIScore: 0,
        costKPI: 0,
        deadlineKPI: 0,
        taskMGT: 0,
        kpiScore: 0
    },
    // projectKPIBonus
    projectKPIBonus: {
        addedEbitda: '',
        projectSetRevenue: 0,
        actualCostByACD: 0,
        companyRevActualCost: 0,
        projectMGTPerformanceLevel: 0,
        projectSavingCost: 0,
        estimatedKPIProjectSavingCost: 0,
        estimatedShareCompanyProfit: 0,
        estimatedTotalKPIBonus: 0,
        totalKPIBonus: 0,
        kpiBonus: 0
    }
};

export const editBudgetingPlanSchema = yup.object().shape({
    idHexString: yup.string().nullable(),
    // project info
    projectInfo: yup.object().shape({
        riskFactor: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
            .min(0, VALIDATE_MESSAGES.RISK_FACTOR_MIN)
            .max(100, VALIDATE_MESSAGES.RISK_FACTOR_MAX),
        note: yup.string().nullable().max(5000, VALIDATE_MESSAGES.MAX_LENGTH)
    }),
    // projectKPIScore
    projectKPIScore: yup.object().shape({
        planDelivery: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .integer()
            .nullable()
            .min(0, VALIDATE_MESSAGES.PLAN_DELIVERY_MIN)
            .max(10, VALIDATE_MESSAGES.PLAN_DELIVERY_MAX),
        totalOnTimeDelivery: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
            .when('planDelivery', (planDelivery): any => {
                if (planDelivery) {
                    return yup
                        .number()
                        .transform((value) => (Number.isNaN(value) ? null : value))
                        .nullable()
                        .min(0, VALIDATE_MESSAGES.TOTAL_ON_TIME_DELIVERY_MIN)
                        .max(planDelivery, VALIDATE_MESSAGES.TOTAL_ON_TIME_DELIVERY_MORE);
                }
            })
            .min(0, VALIDATE_MESSAGES.TOTAL_ON_TIME_DELIVERY_MIN)
            .max(10, VALIDATE_MESSAGES.TOTAL_ON_TIME_DELIVERY_MAX),
        taskMGT: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
            .min(1, VALIDATE_MESSAGES.TASK_MGT_MIN)
            .max(10, VALIDATE_MESSAGES.TASK_MGT_MAX)
    }),
    //projectKPIBonus
    projectKPIBonus: yup.object().shape({
        estimatedTotalKPIBonus: yup.string().nullable()
    })
});

export const dataFake = {
    status: true,
    result: {
        pagination: null,
        content: [
            {
                year: 2023,
                month: 1,
                workingDays: 16
            },
            {
                year: 2023,
                month: 2,
                workingDays: 20
            },
            {
                year: 2023,
                month: 3,
                workingDays: 23
            },
            {
                year: 2023,
                month: 4,
                workingDays: 20
            },
            {
                year: 2023,
                month: 5,
                workingDays: 21
            },
            {
                year: 2023,
                month: 6,
                workingDays: 21
            },
            {
                year: 2023,
                month: 7,
                workingDays: 21
            },
            {
                year: 2023,
                month: 8,
                workingDays: 23
            },
            {
                year: 2023,
                month: 9,
                workingDays: 21
            },
            {
                year: 2023,
                month: 10,
                workingDays: 22
            },
            {
                year: 2023,
                month: 11,
                workingDays: 22
            }
        ]
    }
};
