// yup
import * as yup from 'yup';

// project imports
import { getCurrentWeek, getCurrentYear } from 'utils/date';
import { Props } from 'react-apexcharts';

// ============== Non billable By Member ============== //
export const nonBillByMemberDefault = {
    nonBillTotal: {
        mandayWeek: 0,
        mandayPresaleWeek: 0,
        mandayNotPresale: 0,
        mandayPayrollOnly: 0,
        totalWeek: 0,
        totalMonth: 0,
        salaryFundPer: ''
    },
    nonbillPerPersonnelResponse: {
        nonbillByLevelList: []
    },
    data: []
};

export interface INonBillConfig {
    year: number;
    week: string | number;
    timeStatus?: string;
    departmentId?: string;
}

export const nonBillConfig: INonBillConfig = {
    year: getCurrentYear(),
    week: getCurrentWeek().value,
    timeStatus: '',
    departmentId: ''
};

export const nonBillSchema = yup.object().shape({
    year: yup.string(),
    week: yup.string(),
    timeStatus: yup.string(),
    departmentId: yup.string()
});
// ============== Warning Nonbillable Member ============== //
export const warningNonbillMemberDefault = [
    {
        userId: 0,
        memberCode: 0,
        userName: '',
        title: '',
        dept: '',
        consecutiveWeek: 0
    }
];
// ============== Non billable Cost By Week ============== //

export const nonBillByWeekDefault = {
    nonbillByWeekList: [
        {
            sort: 0,
            week: '',
            budgetByWeek: 0
        }
    ]
};

export const nonBillCostByWeekChartOptionBase: Props = {
    chart: {
        toolbar: { show: false }
    },
    stroke: { width: [0, 3] },
    legend: {
        showForSingleSeries: true,
        itemMargin: { vertical: 10 }
    },
    yaxis: [
        {
            title: {
                text: '%',
                offsetY: -195,
                offsetX: 20,
                rotate: 360
            }
        }
    ],
    plotOptions: {
        bar: { columnWidth: '25px' }
    },
    dataLabels: { enabled: false }
};

export const nonBillCostByWeekChartOption = (labels: string[], colors: string[]) => {
    const options: Props = {
        ...nonBillCostByWeekChartOptionBase,
        labels,
        colors
    };
    return options;
};
