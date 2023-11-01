/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from 'react';

// project imports
import { useAppDispatch } from 'app/hooks';
import Api from 'constants/Api';
import { MONTH_SALARY_13TH_OPTION, REPORT_TYPE, SEARCH_PARAM_KEY } from 'constants/Common';
import { PERMISSIONS } from 'constants/Permission';
import { CostStatisticCard, EffortStatisticCard, MonthlyCostMonitoringSearch } from 'containers/cost-monitoring';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import { openCommentDialog } from 'store/slice/commentSlice';
import { IMonthlyCostMonitoringInfo, IMonthlyCostMonitoringResponse, IOption, IResponseList } from 'types';
import { checkAllowedPermission } from 'utils/authorization';
import { exportDocument, getSearchParam, transformObject } from 'utils/common';
import { getUserInfoCookies } from 'utils/cookies';
import { convertMonthFromToDate, getMonthsOfYear } from 'utils/date';
import { ICostMonitoringFilterConfig, costMonitoringFilterConfig, monthlyCostMonitoringInfoDefault } from './Config';

// third party
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

// ==============================|| Monthly Cost Monitoring ||============================== //
/**
 *  URL Params
 *  year
 *  month
 *  projectId
 *  projectName
 */
const MonthlyCostMonitoring = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [SEARCH_PARAM_KEY.year, SEARCH_PARAM_KEY.month, SEARCH_PARAM_KEY.projectId, SEARCH_PARAM_KEY.projectName];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);
    // delete unnecessary key value
    const { projectName, ...cloneParams }: any = params;
    const { week, ...monthlyCostMonitoringConfig } = costMonitoringFilterConfig;

    // Hooks, State, Variable
    const defaultConditions = {
        ...monthlyCostMonitoringConfig,
        ...cloneParams,
        projectId: params.projectId ? { value: params.projectId, label: params.projectName } : costMonitoringFilterConfig.projectId
    };

    //get current month
    const getCurrentMonth = getMonthsOfYear(defaultConditions.year).filter((month) => {
        return defaultConditions.month === month.value;
    });

    const dispatch = useAppDispatch();
    const intl = useIntl();
    const userInfo = getUserInfoCookies();
    const [loading, setLoading] = useState<boolean>(false);
    const [monthlyCostMonitoringInfo, setMonthlyCostMonitoringInfo] =
        useState<IMonthlyCostMonitoringInfo>(monthlyCostMonitoringInfoDefault);
    const [conditions, setConditions] = useState<ICostMonitoringFilterConfig>(defaultConditions);
    const [formReset, setFormReset] = useState<ICostMonitoringFilterConfig>(defaultConditions);
    const [year, setYear] = useState<number>(defaultConditions.year);
    const [months, setMonths] = useState<IOption[]>([]);
    const [month, setMonth] = useState(convertMonthFromToDate(getCurrentMonth[0].label));
    const [isChangeYear, setIsChangeYear] = useState<boolean>(false);
    const { costMonitoring } = PERMISSIONS.report;

    async function getAllProject() {
        const response = await sendRequest(Api.project.getAll, {
            size: 1000
        });
        if (!response) return;
        const { status, result } = response;
        if (status && result.content.length > 0) {
            const { content } = result;
            const projectId = { value: content[0].projectId, label: content[0].projectName };
            setConditions({ ...conditions, projectId });
            setFormReset({ ...formReset, projectId });
        }
        setLoading(false);
    }

    const getDataChart = async () => {
        setLoading(true);
        const { projectId } = conditions;
        let response = null;

        if (projectId)
            response = (await sendRequest(Api.cost_monitoring.getAll, {
                ...conditions,
                projectId: projectId?.value
            })) as IResponseList<IMonthlyCostMonitoringResponse>;

        if (response) {
            const { status, result } = response;
            if (status) {
                setMonthlyCostMonitoringInfo(result.content as IMonthlyCostMonitoringInfo);
            } else {
                setDataEmpty();
            }
            setLoading(false);
        } else {
            setDataEmpty();
        }
    };

    const setDataEmpty = () => {
        setMonthlyCostMonitoringInfo(monthlyCostMonitoringInfoDefault);
        setLoading(false);
    };

    const getMonthsInYears = useCallback(async (y: number) => {
        const monthInYears = await getMonthsOfYear(y);
        return monthInYears;
    }, []);

    // Event
    const handleOpenCommentDialog = () => {
        const newConditions = { ...conditions, week: '' };
        const updatedConditions = { ...newConditions, reportType: REPORT_TYPE.RRP_MONTHLY_COST_MONITORING };
        const titleDetail = `${conditions.month} - ${conditions.year}`;
        dispatch(
            openCommentDialog({
                conditions: updatedConditions,
                titleDetail: titleDetail
            })
        );
    };

    const handleChangeYear = (e: any) => {
        const { value } = e.target;
        setYear(value);
        setIsChangeYear(true);
        setMonth(convertMonthFromToDate(getMonthsOfYear(value)[0].label));
    };

    const handleChangeMonth = (e: any) => {
        const { value } = e.target;
        const getMonth = months.filter((month) => {
            return month.value === value;
        });

        setMonth(convertMonthFromToDate(getMonth[0].label));
    };

    const handleExportDocument = () => {
        exportDocument(Api.cost_monitoring.getDownload.url, {
            year: conditions.year,
            month: conditions.month,
            userName: userInfo!.userName
        });
    };

    // Handle submit
    const handleSearch = (value: any) => {
        const { projectId } = value;
        transformObject(value);
        setSearchParams(projectId ? { ...value, projectId: projectId.value, projectName: projectId.label } : value);
        setConditions({ ...conditions, ...value });
    };

    // Effect
    useEffect(() => {
        getDataChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conditions]);

    useEffect(() => {
        getMonthsInYears(year).then((items: IOption[]) => {
            setMonths([...items, MONTH_SALARY_13TH_OPTION]);
            if (items.length > 0 && isChangeYear) {
                setFormReset({ ...formReset, year, month: items[0].value });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year]);

    useEffect(() => {
        getAllProject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {/* Search form  */}
            <FilterCollapse
                handleExport={checkAllowedPermission(costMonitoring.download) ? handleExportDocument : undefined}
                handleOpenCommentDialog={checkAllowedPermission(costMonitoring.comment) ? handleOpenCommentDialog : undefined}
            >
                <MonthlyCostMonitoringSearch
                    conditions={formReset}
                    months={months}
                    handleChangeYear={handleChangeYear}
                    handleSearch={handleSearch}
                    handleChangeMonth={handleChangeMonth}
                    month={month}
                />
            </FilterCollapse>

            {/* Cost Statistic */}
            <CostStatisticCard isLoading={loading} data={monthlyCostMonitoringInfo.costStatistics} year={conditions.year} />
            {/* Effort Statistic */}
            {conditions.month !== '13' && (
                <EffortStatisticCard isLoading={loading} data={monthlyCostMonitoringInfo.effortStatistics} year={conditions.year} />
            )}
        </>
    );
};

export default MonthlyCostMonitoring;
