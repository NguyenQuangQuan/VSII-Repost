/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

// project imports
import MainCard from 'components/cards/MainCard';
import { Table } from 'components/extended/Table';
import Api from 'constants/Api';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import { IDetailReportByMonth, IDetailReportByMonthList, IOption, IResponseList } from 'types';
import { exportDocument, getSearchParam, transformObject } from 'utils/common';
import { convertMonthFromToDate, getMonthsOfYear } from 'utils/date';
import { detailReportByMonthConfig, IDetailReportByMonthConfig } from './Config';
import { DetailReportByMonthSearch, DetailReportByMonthTBody, DetailReportByMonthThead } from 'containers/monthly-project-cost';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';
import { SEARCH_PARAM_KEY } from 'constants/Common';

// third party
import { useSearchParams } from 'react-router-dom';

// ==============================|| Monthly Project Cost - Detail ||============================== //
/**
 *  URL Params
 *  year
 *  month
 *  projectId
 *  projectName
 */
const DetailReportByMonth = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [SEARCH_PARAM_KEY.year, SEARCH_PARAM_KEY.month, SEARCH_PARAM_KEY.projectId, SEARCH_PARAM_KEY.projectName];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);
    // delete unnecessary key value
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projectName, ...cloneParams }: any = params;

    // Hooks, State, Variable
    const defaultConditions = {
        ...detailReportByMonthConfig,
        ...cloneParams,
        projectId: params.projectId ? { value: params.projectId, label: params.projectName } : null
    };

    //get current month
    const getCurrentMonth = getMonthsOfYear(defaultConditions.year).filter((month) => {
        return defaultConditions.month === month.value;
    });

    // Hooks, State, Variable
    const [loading, setLoading] = useState<boolean>(false);
    const [projects, setProjects] = useState<IDetailReportByMonth[]>([]);
    const [conditions, setConditions] = useState<IDetailReportByMonthConfig>(defaultConditions);
    const [formReset, setFormReset] = useState<IDetailReportByMonthConfig>(defaultConditions);
    const [year, setYear] = useState<number>(defaultConditions.year);
    const [months, setMonths] = useState<IOption[]>(getMonthsOfYear(defaultConditions.year));
    const [month, setMonth] = useState(convertMonthFromToDate(getCurrentMonth[0].label));
    const [isChangeYear, setIsChangeYear] = useState<boolean>(false);
    const { monthlyProjectCost } = PERMISSIONS.report;

    // Function
    const getDataTable = async () => {
        setLoading(true);
        const response: IResponseList<IDetailReportByMonthList> = await sendRequest(Api.monthly_project_cost.getDetailReportByMonth, {
            ...conditions,
            projectId: conditions.projectId ? conditions.projectId.value : null
        });
        if (response) {
            const { status, result } = response;
            if (status) {
                const { content } = result;
                setProjects(content);
                setLoading(false);
            } else {
                setDataEmpty();
            }
            return;
        } else {
            setDataEmpty();
        }
    };

    const setDataEmpty = () => {
        setProjects([]);
        setLoading(false);
    };

    const getMonthsInYear = useCallback(async (p: number) => {
        const monthInYear = await getMonthsOfYear(p);
        return monthInYear;
    }, []);

    // Event
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
        exportDocument(Api.monthly_project_cost.getDownload.url, { year: conditions.year, month: conditions.month });
    };

    // Handle submit
    const handleSearch = (value: any) => {
        const { projectId } = value;
        transformObject(value);
        setSearchParams(projectId ? { ...value, projectId: projectId.value, projectName: projectId.label } : value);
        setConditions({ ...value });
    };

    // Effect
    useEffect(() => {
        getDataTable();
    }, [conditions]);

    useEffect(() => {
        getMonthsInYear(year).then((items: IOption[]) => {
            setMonths(items);
            if (items.length > 0 && isChangeYear) {
                setFormReset({ ...formReset, year, month: months[0].value });
            }
        });
    }, [year]);

    return (
        <>
            {/* Search form */}
            <FilterCollapse handleExport={checkAllowedPermission(monthlyProjectCost.download) ? handleExportDocument : undefined}>
                <DetailReportByMonthSearch
                    months={months}
                    handleChangeYear={handleChangeYear}
                    handleSearch={handleSearch}
                    formReset={formReset}
                    handleChangeMonth={handleChangeMonth}
                    month={month}
                />
            </FilterCollapse>

            {/* Table and Toolbar */}
            <MainCard>
                <Table heads={<DetailReportByMonthThead />} isLoading={loading} data={projects}>
                    <DetailReportByMonthTBody projects={projects} />
                </Table>
            </MainCard>
        </>
    );
};

export default DetailReportByMonth;
