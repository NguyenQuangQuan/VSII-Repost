// react apexchart
import { Props } from 'react-apexcharts';

// yup
import * as yup from 'yup';

// project imports
import { getCurrentMonth, getCurrentWeek, getCurrentYear } from 'utils/date';
import { IOption } from 'types';
import { formatPrice } from 'utils/common';

// ============== Cost monitoring ============== //
export interface ICostMonitoringFilterConfig {
    year: number;
    month: string | number;
    projectId: IOption | null;
    week: string | number;
}

export const costMonitoringFilterConfig: ICostMonitoringFilterConfig = {
    year: getCurrentYear(),
    month: getCurrentMonth(),
    week: getCurrentWeek().value,
    projectId: null
};

export const costMonitoringFilterSchema = yup.object().shape({
    year: yup.string(),
    month: yup.string(),
    week: yup.string(),
    projectId: yup.object().nullable()
});

// ============== Monthly Cost monitoring ============== //
export const monthlyCostMonitoringInfoDefault = {
    costStatistics: {
        contractSize: 0,
        licenseAmt: 0,
        costLimit: 0,
        actualCost: 0,
        remainingCost: 0,
        cost: {
            monthlyCost: [],
            previousQuota: {
                type: '',
                actualCosts: 0,
                accumulatedCosts: 0,
                accumulatedEffort: 0
            }
        }
    },
    effortStatistics: {
        effortQuota: 0,
        actualCost: 0,
        remainingCost: 0,
        cost: {
            monthlyCost: [],
            previousQuota: {
                type: '',
                actualCosts: 0,
                accumulatedEffort: 0,
                accumulatedCosts: 0
            }
        }
    }
};

export const costStatisticsChartOptionBase: Props = {
    chart: {
        toolbar: { show: false }
    },
    stroke: { width: [0, 3, 3] },
    legend: {
        showForSingleSeries: true,
        itemMargin: { vertical: 10 }
    },
    yaxis: {
        labels: {
            formatter: (value: number) => {
                return `${formatPrice(value)}`;
            }
        }
    },
    plotOptions: {
        bar: { columnWidth: '40px' }
    },
    dataLabels: { enabled: false }
};

export const costStatisticsChartOption = (labels: string[], colors: string[]) => {
    const options: Props = {
        ...costStatisticsChartOptionBase,
        labels,
        colors
    };
    return options;
};

// ============== Weekly Cost monitoring ============== //
export const weeklyCostMonitoringDefault = {
    weeklyCostMonitoringList: [
        {
            projectId: '',
            projectName: '',
            estimatedCode: 0,
            effort: 0,
            week: ''
        }
    ]
};

export const estimatedCostChartOptionBase: Props = {
    chart: {
        toolbar: { show: false },
        width: '100%'
    },
    stroke: { show: 'none', width: 0 },
    legend: {
        showForSingleSeries: true,
        itemMargin: { vertical: 10 }
    },
    plotOptions: {
        bar: { columnWidth: '40px' }
    },
    dataLabels: { enabled: false },
    responsive: [
        {
            breakpoint: 1000,
            options: {
                plotOptions: {
                    bar: {
                        columnWidth: '40px'
                    }
                }
            }
        }
    ]
};

export const estimatedCostChartOption = (labels: string[], colors: string[], titles: string[]) => {
    const options: Props = {
        ...estimatedCostChartOptionBase,
        labels,
        colors,
        yaxis: [
            {
                labels: {
                    formatter: (value: number) => {
                        return `${formatPrice(value)}`;
                    }
                },
                title: {
                    text: titles[0],
                    offsetY: -195,
                    offsetX: 20,
                    rotate: 360
                }
            },
            {
                opposite: true,
                labels: {
                    formatter: (value: number) => {
                        return `${formatPrice(value)}`;
                    }
                },
                title: {
                    text: titles[1],
                    offsetY: -195,
                    offsetX: -20,
                    rotate: 360
                },
                showAlways: true,
                seriesIndex: [1]
            }
        ]
    };
    return options;
};
