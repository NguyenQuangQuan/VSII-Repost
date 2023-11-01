/* eslint-disable react-hooks/exhaustive-deps */
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';

// project imports
import MainCard from 'components/cards/MainCard';
import { Table, TableFooter } from 'components/extended/Table';
import { TabPanel } from 'components/extended/Tabs';
import Api from 'constants/Api';
import { REPORT_TYPE, SEARCH_PARAM_KEY, listProjectTeamTabs, paginationParamDefault, paginationResponseDefault } from 'constants/Common';
import { TabCustom } from 'containers';
import {
    ListProjectTeamSearch,
    ListProjectTeamTBody,
    ListProjectTeamThead,
    RatioJoiningProjectTBody,
    RatioJoiningProjectThead
} from 'containers/list-project-team';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import {
    IOption,
    IPaginationResponse,
    IProjectTeam,
    IProjectTeamList,
    IRatioJoiningProject,
    IRatioJoiningProjectList,
    IResponseList
} from 'types';
import { exportDocument, getSearchParam, transformObject } from 'utils/common';
import { convertWeekFromToDate, getNumberOfWeek, getWeeksPeriodsInYear } from 'utils/date';
import { IListProjectTeamConfig, listProjectTeamConfig } from './Config';
import { checkAllowedPermission, checkAllowedTab } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { openCommentDialog, isCommentedSelector, changeCommented } from 'store/slice/commentSlice';

// third party
import { useSearchParams } from 'react-router-dom';
import { useIntl } from 'react-intl';

// ==============================|| List Project Team ||============================== //
/**
 *  URL Params
 *  year
 *  month
 *  projectId
 *  projectName
 */
const ProjectTeam = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [
        SEARCH_PARAM_KEY.tab,
        SEARCH_PARAM_KEY.page,
        SEARCH_PARAM_KEY.size,
        SEARCH_PARAM_KEY.year,
        SEARCH_PARAM_KEY.week,
        SEARCH_PARAM_KEY.userName,
        SEARCH_PARAM_KEY.fullname,
        SEARCH_PARAM_KEY.departmentId
    ];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);
    // delete unnecessary key value
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fullname, ...cloneParams }: any = params;

    // Hooks, State, Variable
    const defaultConditions = {
        ...listProjectTeamConfig,
        ...cloneParams,
        userName: params.userName ? { value: params.userName, label: params.fullname } : null
    };
    const dispatch = useAppDispatch();
    const intl = useIntl();

    const [loading, setLoading] = useState<boolean>(false);
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse>({
        ...paginationResponseDefault,
        pageNumber: params.page ? params.page : paginationResponseDefault.pageNumber,
        pageSize: params.size ? params.size : paginationResponseDefault.pageSize
    });
    const [tabValue, setTabValue] = useState(checkAllowedTab(listProjectTeamTabs, params.tab)[0]);
    const [projectTeam, setProjectTeam] = useState<IProjectTeam[]>([]);
    const [ratioJoiningProject, setRatioJoiningProject] = useState<IRatioJoiningProject[]>([]);
    const [conditions, setConditions] = useState<IListProjectTeamConfig>(defaultConditions);
    const [formReset, setFormReset] = useState<IListProjectTeamConfig>(defaultConditions);
    const [year, setYear] = useState<number>(defaultConditions.year);
    const [weeks, setWeeks] = useState<IOption[]>([]);
    const [isChangeYear, setIsChangeYear] = useState<boolean>(false);
    const [isChangeTab, setIsChangeTab] = useState<boolean>(false);
    const { listProjectTeam } = PERMISSIONS.report;
    const isCommented = useAppSelector(isCommentedSelector);

    // Function
    const getDataTable = async (tabNumber: number) => {
        setLoading(true);
        const weekSelected = convertWeekFromToDate(conditions.week);

        const response: IResponseList<IProjectTeamList | IRatioJoiningProjectList> = await sendRequest(
            tabNumber === 0 ? Api.list_project_team.getListProjectTeam : Api.list_project_team.getRatioJoiningProject,
            {
                ...weekSelected,
                ...conditions,
                userName: conditions.userName ? conditions.userName.value : null,
                reportType: REPORT_TYPE.RP_LIST_PROJECT_TEAM,
                page: conditions.page + 1
            }
        );

        if (response) {
            const { status, result } = response;

            if (status) {
                const { content, pagination } = result;
                setPaginationResponse({ ...paginationResponse, totalElement: pagination.totalElement });
                tabValue === 0 ? setProjectTeam(content as IProjectTeam[]) : setRatioJoiningProject(content as IRatioJoiningProject[]);
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
        setProjectTeam([]);
        setRatioJoiningProject([]);
        setLoading(false);
    };

    const getWeekInYears = useCallback(async (p: number) => {
        const weekInYears = await getWeeksPeriodsInYear(p);
        return weekInYears;
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
        setYear(listProjectTeamConfig.year);
        setConditions({ ...listProjectTeamConfig, ...paginationParamDefault });
        setFormReset({ ...listProjectTeamConfig, ...paginationParamDefault });
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
        exportDocument(Api.list_project_team.getDownload.url, {
            ...convertWeekFromToDate(conditions.week),
            year: conditions.year,
            weekNumber: getNumberOfWeek(conditions.week)
        });
    };

    const handleOpenCommentDialog = (userId?: string, subTitle?: string) => {
        const updatedConditions = { ...conditions, userId, reportType: REPORT_TYPE.RP_LIST_PROJECT_TEAM };
        const titleDetail = conditions?.week ? `${getNumberOfWeek(conditions.week)} - ${conditions.year}` : '';

        dispatch(openCommentDialog(updatedConditions));
        dispatch(
            openCommentDialog({
                conditions: updatedConditions,
                titleDetail: userId ? subTitle : intl.formatMessage({ id: 'weeks' }) + ' ' + titleDetail
            })
        );
    };

    // Handle submit
    const handleSearch = (value: any) => {
        const { userName } = value;
        transformObject(value);
        setSearchParams(
            userName
                ? { tab: tabValue, ...value, userName: userName.value, fullname: userName.label, page: paginationParamDefault.page }
                : { tab: tabValue, ...value }
        );
        setConditions({ ...value, page: paginationParamDefault.page });
    };

    // Effect
    useEffect(() => {
        getDataTable(tabValue);
    }, [tabValue, conditions]);

    useEffect(() => {
        getWeekInYears(year).then((items: IOption[]) => {
            setWeeks(items);
            if (items.length > 0 && isChangeYear) {
                setFormReset({ ...formReset, year, week: items[0].value });
            }
        });
    }, [year]);

    useEffect(() => {
        getWeekInYears(defaultConditions.year).then((items: IOption[]) => {
            setWeeks(items);
            if (items.length > 0 && isChangeTab) {
                setFormReset({ ...formReset, year: listProjectTeamConfig.year, week: listProjectTeamConfig.week });
            }
        });
    }, [tabValue]);

    useEffect(() => {
        if (isCommented) {
            getDataTable(tabValue);
            dispatch(changeCommented(false));
        }
    }, [isCommented, dispatch]);

    return (
        <>
            {/* Tabs  */}
            <TabCustom value={tabValue} handleChange={handleChangeTab} tabs={listProjectTeamTabs} />

            {/* Search form  */}
            <FilterCollapse
                handleExport={checkAllowedPermission(listProjectTeam.download) ? handleExportDocument : undefined}
                handleOpenCommentDialog={checkAllowedPermission(listProjectTeam.comment) ? handleOpenCommentDialog : undefined}
            >
                <ListProjectTeamSearch
                    formReset={formReset}
                    weeks={weeks}
                    handleChangeYear={handleChangeYear}
                    handleSearch={handleSearch}
                />
            </FilterCollapse>

            {/* Table and Toolbar */}
            <MainCard>
                <TabPanel value={tabValue} index={0}>
                    <Table heads={<ListProjectTeamThead />} isLoading={loading} data={projectTeam}>
                        <ListProjectTeamTBody
                            handleOpenCommentDialog={handleOpenCommentDialog}
                            pageNumber={conditions.page}
                            pageSize={conditions.size}
                            projectTeam={projectTeam}
                        />
                    </Table>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <Table heads={<RatioJoiningProjectThead />} isLoading={loading} data={ratioJoiningProject}>
                        <RatioJoiningProjectTBody
                            pageNumber={conditions.page}
                            pageSize={conditions.size}
                            ratioJoiningProject={ratioJoiningProject}
                        />
                    </Table>
                </TabPanel>
            </MainCard>

            {/* Pagination  */}
            {!loading && (
                <TableFooter
                    pagination={{ total: paginationResponse.totalElement, page: conditions.page, size: conditions.size }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </>
    );
};

export default ProjectTeam;
