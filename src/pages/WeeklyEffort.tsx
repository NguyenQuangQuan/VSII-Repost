/* eslint-disable react-hooks/exhaustive-deps */
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

// project imports
import { useAppDispatch } from 'app/hooks';
import MainCard from 'components/cards/MainCard';
import { Table, TableFooter } from 'components/extended/Table';
import { TabPanel } from 'components/extended/Tabs';
import Api from 'constants/Api';
import { REPORT_TYPE, SEARCH_PARAM_KEY, weeklyEffortReportTabs, paginationParamDefault, paginationResponseDefault } from 'constants/Common';
import { PERMISSIONS } from 'constants/Permission';
import { TabCustom } from 'containers';
import { FilterCollapse } from 'containers/search';
import {
    WeeklyEffortMemberSearch,
    WeeklyEffortMemberTBody,
    WeeklyEffortMemberThead,
    WeeklyEffortProjectDetailSearch,
    WeeklyEffortProjectDetailTBody,
    WeeklyEffortProjectDetailThead,
    WeeklyEffortProjectSearch,
    WeeklyEffortProjectTBody,
    WeeklyEffortProjectThead,
    WeeklyEffortSpentTimeDetail
} from 'containers/weekly-effort';
import sendRequest from 'services/ApiService';
import {
    IOption,
    IPaginationResponse,
    IResponseList,
    IUserVerify,
    IWeeklyEffortMember,
    IWeeklyEffortMemberList,
    IWeeklyEffortProject,
    IWeeklyEffortProjectDetail,
    IWeeklyEffortProjectDetailList,
    IWeeklyEffortProjectList
} from 'types';
import { IWeeklyEffortConfig, weeklyEffortConfig } from './Config';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { closeConfirm, openConfirm } from 'store/slice/confirmSlice';
import { checkAllowedPermission, checkAllowedTab } from 'utils/authorization';
import { exportDocument, getSearchParam, transformObject } from 'utils/common';
import { convertWeekFromToDate, getNumberOfWeek, getWeeksPeriodsInYear } from 'utils/date';
import { getUserInfoCookies } from 'utils/cookies';
import { openCommentDialog } from 'store/slice/commentSlice';

// third party
import { useSearchParams } from 'react-router-dom';

// ==============================|| Weekly Effort ||============================== //
/**
 *  URL Params
 *  tab
 *  page
 *  size
 *  year
 *  week
 *  ====== tab 0 - Member ======
 *  timeStatus
 *  userId
 *  fullname
 *  ====== tab 1 - Project ======
 *  projectId
 *  projectName
 */
const WeeklyEffort = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [
        SEARCH_PARAM_KEY.tab,
        SEARCH_PARAM_KEY.page,
        SEARCH_PARAM_KEY.size,
        SEARCH_PARAM_KEY.year,
        SEARCH_PARAM_KEY.week,
        // ====== tab 0 - Member ======
        SEARCH_PARAM_KEY.userId,
        SEARCH_PARAM_KEY.fullname,
        // ====== tab 1 - Project , tab 2 - Project detail======
        SEARCH_PARAM_KEY.projectName,
        SEARCH_PARAM_KEY.projectId
    ];
    const keyParamsArray = [SEARCH_PARAM_KEY.timeStatus];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams, keyParamsArray);
    transformObject(params);
    // delete unnecessary key value
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fullname, projectName, ...cloneParams }: any = params;

    // Hooks, State, Variable
    const defaultConditions = {
        ...weeklyEffortConfig,
        ...cloneParams,
        userId: params.userId ? { value: params.userId, label: params.fullname } : null,
        projectId: params.projectId ? { value: params.projectId, label: params.projectName } : null
    };

    //get current week
    const getCurrentWeek = getWeeksPeriodsInYear(defaultConditions.year).filter((week) => {
        return defaultConditions.week === week.value;
    });

    const dispatch = useAppDispatch();
    const intl = useIntl();
    const [loading, setLoading] = useState<boolean>(false);
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse>({
        ...paginationResponseDefault,
        pageNumber: params.page ? params.page : paginationResponseDefault.pageNumber,
        pageSize: params.size ? params.size : paginationResponseDefault.pageSize
    });
    const [open, setOpen] = useState<boolean>(false);
    const [members, setMembers] = useState<IWeeklyEffortMember[]>([]);
    const [projects, setProjects] = useState<IWeeklyEffortProject[]>([]);
    const [tabValue, setTabValue] = useState(checkAllowedTab(weeklyEffortReportTabs, params.tab)[0]);
    const [conditions, setConditions] = useState<IWeeklyEffortConfig>(defaultConditions);
    const [formReset, setFormReset] = useState<IWeeklyEffortConfig>(defaultConditions);
    const [year, setYear] = useState<number>(defaultConditions.year);
    const [weeks, setWeeks] = useState<IOption[]>([]);
    const [isChangeYear, setIsChangeYear] = useState<boolean>(false);
    const [isChangeTab, setIsChangeTab] = useState<boolean>(false);
    const { weeklyEffort } = PERMISSIONS.report;
    const userName = getUserInfoCookies()?.userName;
    const [projectDetails, setProjectDetails] = useState<IWeeklyEffortProjectDetail[]>([]);
    const [projectDetailUser, setProjectDetailUser] = useState<IWeeklyEffortProjectDetail>({
        firstName: '',
        lastName: '',
        listLogtime: [],
        userId: ''
    });
    const [selected, setSelected] = useState<IUserVerify[]>([]);
    const isCheckAll = projectDetails.length > 0 ? selected.length === projectDetails.length : false;
    const isSomeSelected = selected.length > 0 && selected.length < projectDetails.length;
    const [week, setWeek] = useState(convertWeekFromToDate(getCurrentWeek[0].value));

    async function getAllProject() {
        if (tabValue < 2 || conditions.projectId) return false;
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

    // Functions
    const getDataTable = async (tabNumber: number) => {
        if (tabValue === 2 && !conditions.projectId) return false;
        setLoading(true);
        const weekSelected = convertWeekFromToDate(conditions.week);
        if (tabNumber === 0) {
            delete conditions.projectId;
        } else if (tabNumber === 1) {
            delete conditions.timeStatus;
            delete conditions.userId;
        } else {
            delete conditions.timeStatus;
            delete conditions.userId;
        }

        const payload = {
            ...conditions,
            ...weekSelected,
            ...(tabValue === 0 && {
                page: conditions.page + 1,
                userId: conditions.userId ? conditions.userId.value : null
            }),
            ...(tabValue === 1 && {
                page: conditions.page + 1,
                projectId: conditions.projectId ? conditions.projectId.value : null
            }),
            ...(tabValue === 2 && {
                projectId: conditions.projectId ? conditions.projectId?.value : null
            })
        };

        const response: IResponseList<IWeeklyEffortMemberList | IWeeklyEffortProjectList | IWeeklyEffortProjectDetailList> =
            await sendRequest(
                tabNumber === 0
                    ? Api.weekly_efford.getMember
                    : tabNumber === 1
                    ? Api.weekly_efford.getProject
                    : Api.weekly_efford.getProjectDetail,
                payload
            );

        if (response) {
            const { status, result } = response;
            if (status) {
                const { content, pagination } = result;
                tabValue === 0
                    ? setMembers(content as IWeeklyEffortMember[])
                    : tabValue === 1
                    ? setProjects(content as IWeeklyEffortProject[])
                    : setProjectDetails(content as IWeeklyEffortProjectDetail[]);
                setPaginationResponse({ ...paginationResponse, totalElement: pagination?.totalElement });
                setLoading(false);
            } else {
                setDataEmpty();
            }
        } else {
            setDataEmpty();
        }
    };

    // Post Project PM and QA verify
    const postVerified = async (type: string, verifyUsers: string[]) => {
        if (verifyUsers.length > 0) {
            const weekSelected = convertWeekFromToDate(conditions.week);
            const response = await sendRequest(Api.weekly_efford.postVerified, {
                ...weekSelected,
                verifiedType: type,
                userNameVerified: userName,
                projectId: conditions.projectId?.value,
                listUserVerified: verifyUsers
            });
            if (response) {
                const { message } = response.result.messages[0];
                const alertColor = response.status ? 'success' : 'warning';
                dispatch(openSnackbar({ open: true, message, variant: 'alert', alert: { color: alertColor } }));
                if (response.status) {
                    getDataTable(tabValue);
                    setSelected([]);
                }
            }
        } else {
            dispatch(
                openSnackbar({
                    open: true,
                    message: type === 'PM' ? 'pm-and-qa-verified' : 'pm-not-verify',
                    variant: 'alert',
                    alert: { color: 'warning' }
                })
            );
        }
        dispatch(closeConfirm());
    };

    const setDataEmpty = () => {
        setProjects([]);
        setMembers([]);
        setProjectDetails([]);
        setLoading(false);
    };

    const getWeekInYears = useCallback(async (p: number) => {
        const weekInYears = await getWeeksPeriodsInYear(p);
        return weekInYears;
    }, []);

    // Event
    const handleOpenCommentDialog = () => {
        const updatedConditions = { ...conditions, reportType: REPORT_TYPE.RP_WEEK };
        const titleDetail = conditions?.week ? `${getNumberOfWeek(conditions.week)} - ${conditions.year}` : '';
        dispatch(
            openCommentDialog({
                conditions: updatedConditions,
                titleDetail: intl.formatMessage({ id: 'week' }) + ' ' + titleDetail
            })
        );
    };

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
        setYear(weeklyEffortConfig.year);
        setConditions({ ...weeklyEffortConfig, ...paginationParamDefault });
        setFormReset({ ...weeklyEffortConfig });
        setSearchParams({ tab: newTabValue } as any);
        setIsChangeTab(true);
        setIsChangeYear(false);
    };

    const handleChangeYear = (e: any) => {
        const { value } = e.target;
        setYear(value);
        setIsChangeYear(true);
        setIsChangeTab(false);
        setWeek(convertWeekFromToDate(getWeeksPeriodsInYear(value)[0].value));
    };

    const handleWeekChange = (value: string) => {
        const getWeek = weeks.filter((week) => {
            return week.value === value;
        });

        setWeek(convertWeekFromToDate(getWeek[0].value));
    };

    const handleExportDocument = () => {
        exportDocument(Api.weekly_efford.getDownload.url, {
            ...convertWeekFromToDate(conditions.week),
            year: conditions.year,
            weekNumber: getNumberOfWeek(conditions.week)
        });
    };

    const handleSearch = (value: any) => {
        const { userId, projectId } = value;
        transformObject(value);
        const weeklyEffortMember = userId
            ? { ...value, tab: tabValue, userId: userId.value, fullname: userId.label }
            : { ...value, tab: tabValue };
        const weeklyEffortProject = projectId
            ? { ...value, tab: tabValue, projectId: projectId.value, projectName: projectId.label }
            : { ...value, tab: tabValue };
        const weeklyEffortProjectDetail = projectId
            ? { year: value.year, week: value.week, tab: tabValue, projectId: projectId.value, projectName: projectId.label }
            : { year: value.year, week: value.week, tab: tabValue };
        setSearchParams(tabValue === 0 ? weeklyEffortMember : tabValue === 1 ? weeklyEffortProject : weeklyEffortProjectDetail);
        setConditions({ ...value, page: paginationParamDefault.page });
        setSelected([]);
    };

    useEffect(() => {
        getAllProject();
    }, [tabValue]);

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
                setFormReset({ ...formReset, year: weeklyEffortConfig.year, week: weeklyEffortConfig.week });
            }
        });
    }, [tabValue]);

    // project detail
    const handleVerifiedConfirm = (type: string) => {
        const verifyUsers: any = selected
            .filter((userVerifiedByTypes) =>
                type === 'PM'
                    ? !userVerifiedByTypes.pmVerifiedDate
                    : type === 'QA'
                    ? !userVerifiedByTypes.qaVerifiedDate && userVerifiedByTypes.pmVerifiedDate
                    : null
            )
            .map((item) => item.userId);

        if (selected.length > 0) {
            dispatch(
                openConfirm({
                    open: true,
                    title: <FormattedMessage id="warning" />,
                    content: type ? <FormattedMessage id="message-verify" /> : '',
                    handleConfirm: () => (type ? postVerified(type, verifyUsers) : '')
                })
            );
        } else {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'project-details-selection',
                    variant: 'alert',
                    alert: { color: 'warning' }
                })
            );
        }
    };

    // Project Detail Selection
    const handleCheckOne = (userSelected: IUserVerify) => {
        const index = selected.findIndex((project) => project.userId === userSelected.userId);
        if (index !== -1) {
            setSelected(selected.filter((project) => project.userId !== userSelected.userId));
        } else {
            setSelected([...selected, userSelected]);
        }
    };
    const handleCheckAll = () => {
        if (selected.length < projectDetails.length) {
            const userIds: IUserVerify[] = projectDetails.map((user) => {
                return { userId: user.userId, pmVerifiedDate: user.pmVerifiedDate, qaVerifiedDate: user.qaVerifiedDate };
            });
            setSelected(userIds);
        } else {
            setSelected([]);
        }
    };

    const handleOpenDialog = (item: IWeeklyEffortProjectDetail) => {
        setProjectDetailUser(item);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    return (
        <>
            {/* Tabs  */}
            <TabCustom value={tabValue} handleChange={handleChangeTab} tabs={weeklyEffortReportTabs} />

            {/* Search form  */}
            <FilterCollapse
                handleExport={checkAllowedPermission(weeklyEffort.download) && tabValue !== 2 ? handleExportDocument : undefined}
                handleVerifiedConfirm={tabValue === 2 ? handleVerifiedConfirm : undefined}
                handleOpenCommentDialog={
                    checkAllowedPermission(weeklyEffort.comment) && tabValue === 0 ? handleOpenCommentDialog : undefined
                }
            >
                <TabPanel value={tabValue} index={0}>
                    <WeeklyEffortMemberSearch
                        formReset={formReset}
                        weeks={weeks}
                        handleChangeYear={handleChangeYear}
                        handleSearch={handleSearch}
                    />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <WeeklyEffortProjectSearch
                        formReset={formReset}
                        weeks={weeks}
                        handleChangeYear={handleChangeYear}
                        handleSearch={handleSearch}
                        handleWeekChange={handleWeekChange}
                        week={week}
                    />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <WeeklyEffortProjectDetailSearch
                        formReset={formReset}
                        weeks={weeks}
                        handleSearch={handleSearch}
                        handleChangeYear={handleChangeYear}
                        handleWeekChange={handleWeekChange}
                        week={week}
                    />
                </TabPanel>
            </FilterCollapse>

            {/* Table and Toolbar */}
            <MainCard>
                <TabPanel value={tabValue} index={0}>
                    <Table heads={<WeeklyEffortMemberThead />} isLoading={loading} data={members}>
                        <WeeklyEffortMemberTBody pageNumber={conditions.page} pageSize={conditions.size} members={members} />
                    </Table>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <Table heads={<WeeklyEffortProjectThead />} isLoading={loading} data={projects}>
                        <WeeklyEffortProjectTBody pageNumber={conditions.page} pageSize={conditions.size} projects={projects} />
                    </Table>
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    <Table
                        heads={
                            <WeeklyEffortProjectDetailThead
                                handleCheckAll={handleCheckAll}
                                isCheckAll={isCheckAll}
                                isSomeSelected={isSomeSelected}
                            />
                        }
                        isLoading={loading}
                        data={projectDetails}
                    >
                        <WeeklyEffortProjectDetailTBody
                            projectDetails={projectDetails}
                            selected={selected}
                            handleCheckOne={handleCheckOne}
                            isCheckAll={isCheckAll}
                            handleOpen={handleOpenDialog}
                        />
                    </Table>
                </TabPanel>
            </MainCard>

            <WeeklyEffortSpentTimeDetail open={open} projectDetailUser={projectDetailUser} handleClose={handleCloseDialog} />

            {/* Pagination  */}
            {!loading && tabValue < 2 && (
                <TableFooter
                    pagination={{ total: paginationResponse.totalElement, page: conditions.page, size: conditions.size }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </>
    );
};

export default WeeklyEffort;
