/* eslint-disable react-hooks/exhaustive-deps */
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';

// project imports
import MainCard from 'components/cards/MainCard';
import { Table, TableFooter } from 'components/extended/Table';
import { TabPanel } from 'components/extended/Tabs';
import Api from 'constants/Api';
import { SEARCH_PARAM_KEY, monthlyEffortReportTabs, paginationParamDefault, paginationResponseDefault } from 'constants/Common';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import {
    IMonthlyEffortMember,
    IMonthlyEffortMemberList,
    IMonthlyEffortMemberProject,
    IMonthlyEffortMemberProjectList,
    IOption,
    IPaginationResponse,
    IResponseList
} from 'types';
import { exportDocument, getSearchParam, transformObject } from 'utils/common';
import { getMonthsOfYear } from 'utils/date';
import { IMonthlyEffortConfig, monthlyEffortConfig } from './Config';
import { TabCustom } from 'containers';
import {
    MonthlyEffortMemberProjectSearch,
    MonthlyEffortMemberProjectTBody,
    MonthlyEffortMemberProjectThead,
    MonthlyEffortMemberSearch,
    MonthlyEffortMemberTBody,
    MonthlyEffortMemberThead
} from 'containers/monthly-effort';
import { checkAllowedPermission, checkAllowedTab } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';

// third party
import { useSearchParams } from 'react-router-dom';

// ==============================|| Monthly Effort - Department member ||============================== //
/**
 *  URL Params
 *  tab
 *  page
 *  size
 *  year
 *  month
 *  ====== tab 0 ======
 *  timeStatus
 *  departmentId
 *  userId
 *  fullname
 *  ====== tab 1 ======
 *  projectId
 *  projectName
 */
const MonthlyEffortDepartmentMember = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [
        SEARCH_PARAM_KEY.tab,
        SEARCH_PARAM_KEY.page,
        SEARCH_PARAM_KEY.size,
        SEARCH_PARAM_KEY.year,
        SEARCH_PARAM_KEY.month,
        // ====== tab 0 - Member ======
        SEARCH_PARAM_KEY.timeStatus,
        SEARCH_PARAM_KEY.departmentId,
        SEARCH_PARAM_KEY.userId,
        SEARCH_PARAM_KEY.fullname,
        // ====== tab 1 - Project ======
        SEARCH_PARAM_KEY.projectId,
        SEARCH_PARAM_KEY.projectName
    ];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);
    // delete unnecessary key value
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fullname, projectName, ...cloneParams }: any = params;

    // Hooks, State, Variable
    const defaultConditions = {
        ...monthlyEffortConfig,
        ...cloneParams,
        userId: params.userId ? { value: params.userId, label: params.fullname } : null,
        projectId: params.projectId ? { value: params.projectId, label: params.projectName } : null
    };
    const [loading, setLoading] = useState<boolean>(false);
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse>({
        ...paginationResponseDefault,
        pageNumber: params.page ? params.page : paginationResponseDefault.pageNumber,
        pageSize: params.size ? params.size : paginationResponseDefault.pageSize
    });
    const [members, setMembers] = useState<IMonthlyEffortMember[]>([]);
    const [projects, setProjects] = useState<IMonthlyEffortMemberProject[]>([]);
    const [tabValue, setTabValue] = useState(checkAllowedTab(monthlyEffortReportTabs, params.tab)[0]);
    const [conditions, setConditions] = useState<IMonthlyEffortConfig>(defaultConditions);
    const [formReset, setFormReset] = useState<IMonthlyEffortConfig>(defaultConditions);
    const [year, setYear] = useState<number>(defaultConditions.year);
    const [months, setMonths] = useState<IOption[]>(getMonthsOfYear(monthlyEffortConfig.year));
    const [isChangeYear, setIsChangeYear] = useState<boolean>(false);
    const [isChangeTab, setIsChangeTab] = useState<boolean>(false);
    const { monthlyEffort } = PERMISSIONS.report;

    // Function
    const getDataTable = async (tabNumber: number) => {
        setLoading(true);
        if (tabNumber === 0) {
            delete conditions.projectId;
        } else {
            delete conditions.timeStatus;
            delete conditions.userId;
        }
        const payload =
            tabNumber === 0
                ? conditions.userId
                    ? { userId: conditions.userId.value }
                    : null
                : conditions.projectId
                ? { projectId: conditions.projectId.value }
                : null;
        const response: IResponseList<IMonthlyEffortMemberList | IMonthlyEffortMemberProjectList> = await sendRequest(
            tabNumber === 0 ? Api.monthly_efford.getMember : Api.monthly_efford.getMemberProject,
            {
                ...conditions,
                ...payload,
                page: conditions.page + 1
            }
        );

        if (response) {
            const { status, result } = response;

            if (status) {
                const { content, pagination } = result;
                setPaginationResponse({ ...paginationResponse, totalElement: pagination.totalElement });
                tabValue === 0 ? setMembers(content as IMonthlyEffortMember[]) : setProjects(content as IMonthlyEffortMemberProject[]);
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
        setMembers([]);
        setLoading(false);
    };

    const getMonthsInYear = useCallback(async (p: number) => {
        const monthInYear = await getMonthsOfYear(p);
        return monthInYear;
    }, []);

    // Event
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setConditions({ ...conditions, page: newPage });
        setSearchParams({ ...params, page: newPage } as any);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setConditions({ ...conditions, page: paginationParamDefault.page, size: parseInt(event.target.value, 10) });
        setSearchParams({ ...params, page: paginationParamDefault.page, size: parseInt(event.target.value, 10) } as any);
    };

    const handleChangeTab = (event: SyntheticEvent, newTabValue: number) => {
        setTabValue(newTabValue);
        setYear(monthlyEffortConfig.year);
        setConditions({ ...monthlyEffortConfig, ...paginationParamDefault });
        setFormReset({ ...monthlyEffortConfig });
        setSearchParams({ tab: newTabValue } as any);
        setIsChangeTab(true);
        setIsChangeYear(false);
    };

    const handleChangeYear = (e: any) => {
        const { value } = e.target;
        setYear(value);
        setIsChangeYear(true);
        setIsChangeTab(false);
    };

    const handleExportDocument = () => {
        exportDocument(Api.monthly_efford.getDownload.url, { year: conditions.year, month: conditions.month });
    };

    // Handle submit
    const handleSearch = (value: any) => {
        const { userId, projectId } = value;
        transformObject(value);
        const monthlyEffortMember = userId
            ? { ...value, tab: tabValue, userId: userId.value, fullname: userId.label }
            : { ...value, tab: tabValue };
        const monthlyEffortProject = projectId
            ? { ...value, tab: tabValue, projectId: projectId.value, projectName: projectId.label }
            : { ...value, tab: tabValue };
        setSearchParams(tabValue === 0 ? monthlyEffortMember : monthlyEffortProject);
        setConditions({ ...value, page: paginationParamDefault.page });
    };

    // Effect
    useEffect(() => {
        getDataTable(tabValue);
    }, [tabValue, conditions]);

    useEffect(() => {
        getMonthsInYear(year).then((items: IOption[]) => {
            setMonths(items);
            if (items.length > 0 && isChangeYear) {
                setFormReset({ ...formReset, year, month: months[0].value });
            }
        });
    }, [year]);

    useEffect(() => {
        getMonthsInYear(defaultConditions.year).then((items: IOption[]) => {
            setMonths(items);
            if (items.length > 0 && isChangeTab) {
                setFormReset({ ...formReset, year: monthlyEffortConfig.year, month: monthlyEffortConfig.month });
            }
        });
    }, [tabValue]);

    return (
        <>
            {/* Tabs  */}
            <TabCustom value={tabValue} handleChange={handleChangeTab} tabs={monthlyEffortReportTabs} />

            {/* Search form  */}
            <FilterCollapse handleExport={checkAllowedPermission(monthlyEffort.download) ? handleExportDocument : undefined}>
                <TabPanel value={tabValue} index={0}>
                    <MonthlyEffortMemberSearch
                        formReset={formReset}
                        months={months}
                        handleChangeYear={handleChangeYear}
                        handleSearch={handleSearch}
                    />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <MonthlyEffortMemberProjectSearch
                        formReset={formReset}
                        months={months}
                        handleChangeYear={handleChangeYear}
                        handleSearch={handleSearch}
                    />
                </TabPanel>
            </FilterCollapse>

            {/* Table  */}
            <MainCard>
                <TabPanel value={tabValue} index={0}>
                    <Table heads={<MonthlyEffortMemberThead />} isLoading={loading} data={members}>
                        <MonthlyEffortMemberTBody pageNumber={conditions.page} pageSize={conditions.size} members={members} />
                    </Table>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <Table heads={<MonthlyEffortMemberProjectThead />} isLoading={loading} data={projects}>
                        <MonthlyEffortMemberProjectTBody pageNumber={conditions.page} pageSize={conditions.size} projects={projects} />
                    </Table>
                </TabPanel>
            </MainCard>

            {/* Pagination  */}
            <TableFooter
                pagination={{ total: paginationResponse.totalElement, page: conditions.page, size: conditions.size }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default MonthlyEffortDepartmentMember;
