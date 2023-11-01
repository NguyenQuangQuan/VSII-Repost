/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

// project imports
import MainCard from 'components/cards/MainCard';
import { Table } from 'components/extended/Table';
import Api from 'constants/Api';
import {
    MonthlyProjectCostSummarySearch,
    MonthlyProjectCostSummaryTBody,
    MonthlyProjectCostSummaryTFooter,
    MonthlyProjectCostSummaryThead,
    ProjectHeadCount
} from 'containers/monthly-project-cost';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import { IMonthlyProjectCostSummary, IMonthlyProjectCostSummaryList, IMonthsMoney, IOption, IProjectHeadCount, IResponseList } from 'types';
import { exportDocument, getSearchParam, transformObject } from 'utils/common';
import { getMonthsOfYear } from 'utils/date';
import { IMonthlyProjectCostSummaryConfig, monthlyProjectCostSummaryConfig, totalMoneyConfig } from './Config';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';
import { SEARCH_PARAM_KEY } from 'constants/Common';

// third party
import { useSearchParams } from 'react-router-dom';

// ==============================|| Monthy Project Cost - Summary ||============================== //
/**
 *  URL Params
 *  year
 *  month
 *  departmentId
 *  projectType
 *  projectId
 *  projectName
 */
const MonthlyProjectCostSummary = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [
        SEARCH_PARAM_KEY.year,
        SEARCH_PARAM_KEY.month,
        SEARCH_PARAM_KEY.departmentId,
        SEARCH_PARAM_KEY.projectType,
        SEARCH_PARAM_KEY.projectId,
        SEARCH_PARAM_KEY.projectName
    ];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);
    // delete unnecessary key value
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projectName, ...cloneParams }: any = params;

    // Hooks, State, Variable
    const defaultConditions = {
        ...monthlyProjectCostSummaryConfig,
        ...cloneParams,
        projectId: params.projectId ? { value: params.projectId, label: params.projectName } : null
    };
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingHeadCount, setLoadingHeadCount] = useState<boolean>(false);
    const [projects, setProjects] = useState<IMonthlyProjectCostSummary[]>([]);
    const [total, setTotal] = useState<IMonthsMoney>(totalMoneyConfig);
    const [conditions, setConditions] = useState<IMonthlyProjectCostSummaryConfig>(defaultConditions);
    const [formReset, setFormReset] = useState<IMonthlyProjectCostSummaryConfig>(defaultConditions);
    const [year, setYear] = useState<number>(defaultConditions.year);
    const [months, setMonths] = useState<IOption[]>(getMonthsOfYear(monthlyProjectCostSummaryConfig.year));
    const [isChangeYear, setIsChangeYear] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [headCounts, setHeadCounts] = useState<IProjectHeadCount[]>([]);
    const { monthlyProjectCost } = PERMISSIONS.report;

    // Function
    const getDataTable = async () => {
        setLoading(true);
        const response: IResponseList<IMonthlyProjectCostSummaryList> = await sendRequest(Api.monthly_project_cost.getSummary, {
            ...conditions,
            projectId: conditions.projectId ? conditions.projectId.value : null
        });
        if (response) {
            const { result } = response;
            const { content } = result || {};
            const { summary, total } = content || {};
            if (summary) {
                setProjects(summary);
                setTotal(total);
                setLoading(false);
            } else {
                setDataEmpty();
            }
            return;
        } else {
            setDataEmpty();
        }
    };

    const getProjectHeadCounts = async (projectId: string) => {
        setLoadingHeadCount(true);
        const response = await sendRequest(Api.project.getDetail, { projectId });
        if (response) {
            const { content } = response.result;
            setHeadCounts(content.headcount);
            setLoadingHeadCount(false);
        }
    };

    const setDataEmpty = () => {
        setProjects([]);
        setTotal(totalMoneyConfig);
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
    };

    const handleExportDocument = () => {
        exportDocument(Api.monthly_project_cost.getDownload.url, { year: conditions.year, month: conditions.month });
    };

    const handleOpenDialog = (projectId: string) => {
        setOpen(true);
        getProjectHeadCounts(projectId);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    // Handle submit
    const handleSearch = (value: any) => {
        const { projectId } = value;
        transformObject(value);
        setSearchParams(projectId ? { ...value, projectId: projectId.value, projectName: projectId.label } : value);
        setConditions(value);
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
            {/* Search form  */}
            <FilterCollapse handleExport={checkAllowedPermission(monthlyProjectCost.download) ? handleExportDocument : undefined}>
                <MonthlyProjectCostSummarySearch
                    formReset={formReset}
                    months={months}
                    handleChangeYear={handleChangeYear}
                    handleSearch={handleSearch}
                />
            </FilterCollapse>

            {/* Table and Toolbar */}
            <MainCard>
                <Table
                    heads={<MonthlyProjectCostSummaryThead projectLength={projects.length} year={conditions.year} />}
                    footer={projects.length > 0 && <MonthlyProjectCostSummaryTFooter total={total!} />}
                    isLoading={loading}
                    data={projects}
                >
                    <MonthlyProjectCostSummaryTBody handleOpen={handleOpenDialog} projects={projects} />
                </Table>
            </MainCard>

            {/* Project HeadCount Dialog */}
            {open && <ProjectHeadCount open={open} isLoading={loadingHeadCount} handleClose={handleCloseDialog} headCounts={headCounts} />}
        </>
    );
};

export default MonthlyProjectCostSummary;
