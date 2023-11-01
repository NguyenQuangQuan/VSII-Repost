// react
import { createSearchParams, useNavigate } from 'react-router-dom';

// apexcharts
import { Props } from 'react-apexcharts';

// yup
import * as yup from 'yup';

// project imports
import { IOption, IPaginationParam } from 'types';
import { paginationParamDefault } from 'constants/Common';
import { getCurrentMonth, getCurrentYear } from 'utils/date';
import { REGEX_CONSTANTS } from 'constants/Validation';
import { VALIDATE_MESSAGES } from 'constants/Message';
import { ROUTER } from 'constants/Routers';

// ============== Department member ============== //
export interface IMonthlyEffortConfig extends IPaginationParam {
    year: number;
    month: number | string;
    departmentId?: string;
    userId?: IOption | null;
    timeStatus?: string;
    projectId?: IOption | null;
}

export const monthlyEffortConfig: IMonthlyEffortConfig = {
    ...paginationParamDefault,
    year: getCurrentYear(),
    month: getCurrentMonth(),
    departmentId: '',
    userId: null,
    timeStatus: '',
    projectId: null
};

export const monthlyEffortDepartmentMemberSchema = yup.object().shape({
    year: yup.string(),
    month: yup.string(),
    userId: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string()
        })
        .nullable(),
    departmentId: yup.string(),
    timeStatus: yup.string()
});

export const monthlyEffortDepartmentProjectSchema = yup.object().shape({
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

// ============== Project ============== //
export const monthEffortProjectDefault = {
    users: [],
    total: {
        totalQuota: 0,
        implementQuota: 0,
        maintainanceQuota: 0,
        previousQuota: 0,
        year: 0,
        months: {
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
            december: 0
        },
        totalUsedEffort: 0,
        remainingEffort: 0
    }
};

export interface IMonthlyEffortProjectConfig {
    year: number;
    month: string | number;
    departmentId?: string;
    projectType?: string;
    projectId?: IOption | null;
}

export const monthlyEffortProjectConfig: IMonthlyEffortProjectConfig = {
    year: getCurrentYear(),
    month: getCurrentMonth(),
    departmentId: '',
    projectType: '',
    projectId: null
};

export const monthlyEffortProjectSchema = yup.object().shape({
    year: yup.string(),
    month: yup.string(),
    projectType: yup.string(),
    projectId: yup
        .object()
        .shape({
            value: yup.string(),
            label: yup.string()
        })
        .nullable(),
    departmentId: yup.string()
});

// ============== Summary ============== //
export interface IMonthlyEffortSummaryConfig {
    year: number;
    month: string | number;
}

export const monthlyEffortSummaryConfig: IMonthlyEffortSummaryConfig = {
    year: getCurrentYear(),
    month: getCurrentMonth()
};

export const monthlyEffortSummarySchema = yup.object().shape({
    year: yup.number(),
    month: yup.number()
});

export const monthEffortSummaryInfoDefault = {
    numberOfProjects: { scs: [], prd: [], rdc: [] },
    effortPlanUpdateStatus: [
        { name: 'send-report', data: [0, 0] },
        { name: 'no-send-report', data: [0, 0] }
    ],
    actualEffortScsPrd: {
        developmentProjects: 0,
        maintainanceProjects: 0,
        outsourcingProjects: 0,
        presaleProjects: 0,
        productProjects: 0,
        otherJointProjects: 0,
        trainingProjects: 0,
        vacationProjects: 0
    },
    logTimesheetOnRedmine: { logTime: [] }
};

export const projectType: { [key: number]: string } = {
    0: 'Development',
    1: 'Maintenance',
    2: 'Outsourcing',
    3: 'Presale',
    4: 'Product',
    5: 'Training',
    6: 'Other',
    7: 'Leave'
};

export const numberOfProjectColorsChart = [
    { color: '#4272DF', name: 'development-projects' },
    { color: '#40BCDD', name: 'maintenance-projects' },
    { color: '#D74642', name: 'outsourcing-projects' },
    { color: '#ACDB4D', name: 'presale-projects' },
    { color: '#894BD4', name: 'product-projects' },
    { color: '#EB9217', name: 'training-projects' },
    { color: '#790236', name: 'other-joint-projects' },
    { color: '#3BCA49', name: 'leave' }
];

const numberOfProjectChartOptionBase: Props = {
    colors: numberOfProjectColorsChart.map((x) => x.color),
    chart: {
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            distributed: true,
            borderRadius: 0,
            dataLabels: {
                position: 'top'
            }
        }
    },
    legend: {
        show: false
    },
    dataLabels: {
        enabled: true,
        offsetY: -10,
        style: {
            fontSize: '0.75rem',
            colors: ['#304758']
        }
    },

    xaxis: {
        position: 'top',
        axisTicks: {
            show: false
        },
        labels: {
            show: false
        }
    },
    yaxis: {
        min: 0,
        max: 15
    },
    tooltip: {
        enabled: false
    },
    title: {
        text: 'SCS',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
            color: '#444'
        }
    },
    grid: {
        show: true
    }
};

export const numberOfProjectChartSCSOptions: Props = {
    ...numberOfProjectChartOptionBase,
    title: { ...numberOfProjectChartOptionBase.title, text: 'SCS' }
};

export const numberOfProjectChartPRDOptions: Props = {
    ...numberOfProjectChartOptionBase,
    title: { ...numberOfProjectChartOptionBase.title, text: 'PRD' }
};

export const numberOfProjectChartRDCOptions: Props = {
    ...numberOfProjectChartOptionBase,
    title: { ...numberOfProjectChartOptionBase.title, text: 'RDC' }
};

export const effortPlanUpdateStatusColors = [
    { color: '#4272DF', name: 'send-report' },
    { color: '#D74642', name: 'no-send-report' }
];

export const effortPlanUpdateStatusChartOptions: Props = {
    colors: effortPlanUpdateStatusColors.map((x) => x.color),
    chart: {
        type: 'bar',
        stacked: true,
        stackType: '100%',
        toolbar: { show: false }
    },
    legend: {
        show: false
    },
    xaxis: {
        categories: ['SCS', 'PRD'],
        labels: {
            style: { fontWeight: 600 }
        }
    },
    dataLabels: {
        formatter: function (value: number) {
            return value.toFixed(1) + '%';
        }
    },
    yaxis: {
        tickAmount: 5,
        labels: {
            formatter: (value: number) => {
                return `${value}`;
            }
        }
    }
};

export const actualEffortAllocationChartOptionBase: Props = {
    colors: numberOfProjectColorsChart.map((x) => x.color),
    responsive: [
        {
            breakpoint: 1920,
            options: {
                chart: { width: 350 }
            }
        }
    ],
    legend: { show: false }
};

export const actualEffortAllocationChartOptions = (labels: string[], conditions?: IMonthlyEffortSummaryConfig) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    const options: Props = {
        ...actualEffortAllocationChartOptionBase,
        chart: {
            events: {
                dataPointSelection: (_event: any, _chartContext: any, config: any) => {
                    const index: number = config.dataPointIndex;
                    navigate({
                        pathname: `/${ROUTER.reports.monthly_effort.index}/${ROUTER.reports.monthly_effort.project}`,
                        search: `?${createSearchParams({ ...conditions, projectType: projectType[index] } as any)}`
                    });
                },
                dataPointMouseEnter: function (event: any) {
                    event.target.style.cursor = 'pointer';
                }
            }
        },
        labels
    };
    return options;
};

export const logTimesheetOnRedmineColorsChart = [
    { color: '#4272DF', name: 'standard-time' },
    { color: '#D74642', name: 'less-standard-time' },
    { color: '#DDCD38', name: 'more-standard-time' }
];

export const logTimesheetOnRedmineChartOptionBase: Props = {
    colors: logTimesheetOnRedmineColorsChart.map((x) => x.color),
    responsive: [
        {
            breakpoint: 1920,
            options: {
                chart: { width: 335 }
            }
        }
    ],
    legend: { show: false }
};

export const logTimesheetOnRedmineChartOptions = (labels: string[]) => {
    const options: Props = {
        ...logTimesheetOnRedmineChartOptionBase,
        labels
    };
    return options;
};

// Update effort plan dialog
export const updateEffortPlanFormSchema = yup.object().shape({
    effortPlanDepts: yup.array().of(
        yup.object().shape({
            effortplanSent: yup
                .string()
                .matches(REGEX_CONSTANTS.REGEX_NUMBER, VALIDATE_MESSAGES.INVALID_NUMBER)
                .required(VALIDATE_MESSAGES.REQUIRED),
            effortplanMissing: yup
                .string()
                .matches(REGEX_CONSTANTS.REGEX_NUMBER, VALIDATE_MESSAGES.INVALID_NUMBER)
                .required(VALIDATE_MESSAGES.REQUIRED),
            department: yup.string()
        })
    )
});

export const updateEffortPlanFormDefault = {
    effortPlanDepts: [
        { effortplanMissing: 0, effortplanSent: 0, department: 'SCS' },
        { effortplanMissing: 0, effortplanSent: 0, department: 'PRD' }
    ]
};
