/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from 'react';

// project imports
import Api from 'constants/Api';
import { EstimateCard, WeeklyCostMonitoringSearch } from 'containers/cost-monitoring';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import { IOption, IResponseList, IWeeklyCostMonitoringList, IWeeklyCostMonitoringResponse, Response } from 'types';
import { convertWeekFromToDate, getNumberOfWeek, getWeeksPeriodsInYear } from 'utils/date';
import { ICostMonitoringFilterConfig, costMonitoringFilterConfig, weeklyCostMonitoringDefault } from './Config';

// third party
import { useSearchParams } from 'react-router-dom';
import { SEARCH_PARAM_KEY } from 'constants/Common';
import { getSearchParam, transformObject } from 'utils/common';

// ==============================|| Weekly Cost Monitoring ||============================== //
/**
 *  URL Params
 *  year
 *  week
 *  projectId
 *  projectName
 */
const WeeklyCostMonitoring = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [SEARCH_PARAM_KEY.year, SEARCH_PARAM_KEY.week, SEARCH_PARAM_KEY.projectId, SEARCH_PARAM_KEY.projectName];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);
    // delete unnecessary key value
    const { projectName, ...cloneParams }: any = params;
    const { month, ...weeklyCostMonitoringConfig } = costMonitoringFilterConfig;

    // Hooks, State, Variable
    const defaultConditions = {
        ...weeklyCostMonitoringConfig,
        ...cloneParams,
        projectId: params.projectId ? { value: params.projectId, label: params.projectName } : costMonitoringFilterConfig.projectId
    };

    //get current week
    const getCurrentWeek = getWeeksPeriodsInYear(defaultConditions.year).filter((week) => {
        return defaultConditions.week === week.value;
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [weeklyCostMonitoring, setWeeklyCostMonitoring] = useState<IWeeklyCostMonitoringList>(weeklyCostMonitoringDefault);
    const [conditions, setConditions] = useState<ICostMonitoringFilterConfig>(defaultConditions);
    const [formReset, setFormReset] = useState<ICostMonitoringFilterConfig>(defaultConditions);
    const [year, setYear] = useState<number>(defaultConditions.year);
    const [isChangeYear, setIsChangeYear] = useState<boolean>(false);
    const [weeks, setWeeks] = useState<IOption[]>([]);
    const [week, setWeek] = useState(convertWeekFromToDate(getCurrentWeek[0].value));

    const getDataChart = async () => {
        setLoading(true);
        const weekSelected = convertWeekFromToDate(conditions.week || '');
        const { projectId } = conditions;
        let response = null;

        if (projectId) {
            const response = (await sendRequest(Api.cost_monitoring.getEffortByWeek, {
                ...conditions,
                projectId: projectId?.value,
                ...weekSelected,
                weekNumber: getNumberOfWeek(conditions.week || '')
            })) as IResponseList<IWeeklyCostMonitoringResponse>;
            if (response) {
                const { status, result } = response;
                if (status) {
                    setWeeklyCostMonitoring(result.content as IWeeklyCostMonitoringList);
                } else {
                    setDataEmpty();
                }
                setLoading(false);
            } else {
                setDataEmpty();
            }
        }
    };

    async function getAllProject() {
        const response = await sendRequest(Api.project.getAll, { size: 1000 });
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

    const setDataEmpty = () => {
        setWeeklyCostMonitoring(weeklyCostMonitoringDefault);
        setLoading(false);
    };

    const getWeekInYears = useCallback(async (p: number) => {
        const weekInYears = await getWeeksPeriodsInYear(p);
        return weekInYears;
    }, []);

    // Event
    const handleChangeYear = (e: any) => {
        const { value } = e.target;
        setYear(value);
        setIsChangeYear(true);
        setWeek(convertWeekFromToDate(getWeeksPeriodsInYear(value)[0].value));
    };

    const handleWeekChange = (value: string) => {
        const getWeek = weeks.filter((week) => {
            return week.value === value;
        });

        setWeek(convertWeekFromToDate(getWeek[0].value));
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
        getAllProject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getDataChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conditions]);

    useEffect(() => {
        getWeekInYears(year).then((items: IOption[]) => {
            setWeeks(items);
            if (items.length > 0 && isChangeYear) {
                setFormReset({ ...formReset, year, week: items[0].value });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year]);

    return (
        <>
            {/* Search form  */}
            <FilterCollapse>
                <WeeklyCostMonitoringSearch
                    conditions={formReset}
                    handleChangeYear={handleChangeYear}
                    handleSearch={handleSearch}
                    weeks={weeks}
                    handleWeekChange={handleWeekChange}
                    week={week}
                />
            </FilterCollapse>

            {/* Estimate Cost Card  */}
            <EstimateCard isLoading={loading} data={weeklyCostMonitoring} week={conditions.week} year={conditions.year} />
        </>
    );
};

export default WeeklyCostMonitoring;
