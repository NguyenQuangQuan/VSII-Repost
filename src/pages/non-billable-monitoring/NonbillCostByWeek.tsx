import { useCallback, useEffect, useState } from 'react';

// project imports
import Api from 'constants/Api';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import { exportDocument, getSearchParam, transformObject } from 'utils/common';
import { convertWeekFromToDate, getNumberOfWeek, getWeeksPeriodsInYear } from 'utils/date';
import { INonBillByWeekList, INonBillByWeekListResponse, IOption, IResponseList } from 'types';
import { INonBillConfig, nonBillConfig, nonBillByWeekDefault } from './Config';
import NonBillCostByWeekSearch from 'containers/non-billable-monitoring/NonBillCostByWeekSearch';
import NonBillCostByWeekCard from 'containers/non-billable-monitoring/NonBillCostByWeekCard';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';
import { SEARCH_PARAM_KEY } from 'constants/Common';

// third party
import { useSearchParams } from 'react-router-dom';

// ==============================|| Nonbill Cost By Week ||============================== //
/**
 *  URL Params
 *  year
 *  week
 */
const NonbillCostByWeek = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [SEARCH_PARAM_KEY.year, SEARCH_PARAM_KEY.week];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);
    // delete unnecessary key value
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { timeStatus, departmentId, ...nonBillConfigByMember } = nonBillConfig;

    // Hooks, State, Variable
    const defaultConditions = {
        ...nonBillConfigByMember,
        ...params
    };
    const [loading, setLoading] = useState<boolean>(false);
    const [nonBillByWeek, setNonBillByWeek] = useState<INonBillByWeekList>(nonBillByWeekDefault);
    const [conditions, setConditions] = useState<INonBillConfig>(defaultConditions);
    const [formReset, setFormReset] = useState<INonBillConfig>(defaultConditions);
    const [year, setYear] = useState<number>(defaultConditions.year);
    const [weeks, setWeeks] = useState<IOption[]>([]);
    const [isChangeYear, setIsChangeYear] = useState<boolean>(false);
    const { nonBillable } = PERMISSIONS.report;

    const getDataChart = async () => {
        setLoading(true);
        const weekSelected = convertWeekFromToDate(conditions.week || '');
        const response: IResponseList<INonBillByWeekListResponse> = await sendRequest(Api.non_billable_monitoring.getCostByWeek, {
            ...conditions,
            ...weekSelected,
            week: getNumberOfWeek(conditions.week || '')
        });

        if (response) {
            const { status, result } = response;
            if (status) {
                setNonBillByWeek(result.content as INonBillByWeekList);
            } else {
                setDataEmpty();
            }
            setLoading(false);
        } else {
            setDataEmpty();
        }
    };

    const setDataEmpty = () => {
        setNonBillByWeek(nonBillByWeekDefault);
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
    };

    const handleExportDocument = () => {
        exportDocument(Api.non_billable_monitoring.getDownload.url, {
            ...convertWeekFromToDate(conditions.week),
            year: conditions.year,
            weekNumber: getNumberOfWeek(conditions.week)
        });
    };

    // Handle submit
    const handleSearch = (value: INonBillConfig) => {
        setSearchParams(value as any);
        setConditions(value);
    };

    // Effect
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
            <FilterCollapse handleExport={checkAllowedPermission(nonBillable.download) ? handleExportDocument : undefined}>
                <NonBillCostByWeekSearch
                    conditions={formReset}
                    weeks={weeks}
                    handleChangeYear={handleChangeYear}
                    handleSearch={handleSearch}
                />
            </FilterCollapse>

            {/* NonBillCostByWeekCard */}
            <NonBillCostByWeekCard isLoading={loading} data={nonBillByWeek} year={conditions.year} />
        </>
    );
};

export default NonbillCostByWeek;
