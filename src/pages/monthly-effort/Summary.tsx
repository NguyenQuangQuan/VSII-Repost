import { useCallback, useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { store } from 'app/store';
import Api from 'constants/Api';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slice/snackbarSlice';
import {
    IEffortPlanDepartment,
    IEffortPlanUpdateStatus,
    IMonthEffortSummaryInfo,
    IMonthlyEffortSummaryResponse,
    IOption,
    IResponseList,
    IUpdateEffortPlanResponse
} from 'types';
import { exportDocument, getSearchParam, transformObject } from 'utils/common';
import { dateFormat, getMonthsOfYear } from 'utils/date';

import { useAppDispatch } from 'app/hooks';
import { PERMISSIONS } from 'constants/Permission';
import { monthEffortSummaryInfoDefault, monthlyEffortSummaryConfig, IMonthlyEffortSummaryConfig } from './Config';
import {
    ActualEffortAllocationCard,
    EffortPlanUpdateStatusCard,
    LogTimesheetOnRedmineCard,
    MonthlyEffortSummarySearch,
    NumberOfProjectCard,
    UpdateEffortPlan
} from 'containers/monthly-effort';
import { checkAllowedPermission } from 'utils/authorization';
import { MONTHS, REPORT_TYPE, SEARCH_PARAM_KEY } from 'constants/Common';
import { openCommentDialog } from 'store/slice/commentSlice';

// third party
import { useSearchParams } from 'react-router-dom';
import { useIntl } from 'react-intl';

// ==============================|| Monthly Effort - Summary ||============================== //
/**
 *  URL Params
 *  year
 *  month
 */
const MonthlyEffortSummary = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [SEARCH_PARAM_KEY.year, SEARCH_PARAM_KEY.month];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);

    // Hooks, State, Variable
    const defaultConditions = { ...monthlyEffortSummaryConfig, ...params };
    const dispatch = useAppDispatch();
    const intl = useIntl();
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [monthlyEffortSummaryInfo, setMonthlyEffortSummaryInfo] = useState<IMonthEffortSummaryInfo>(monthEffortSummaryInfoDefault);
    const [conditions, setConditions] = useState<IMonthlyEffortSummaryConfig>(defaultConditions);
    const [formReset, setFormReset] = useState<IMonthlyEffortSummaryConfig>(defaultConditions);
    const [months, setMonths] = useState<IOption[]>([]);
    const [year, setYear] = useState<number>(defaultConditions.year);
    const [effortPlanDepts, setEffortPlanDepts] = useState<IEffortPlanDepartment[]>([]);
    const [isChangeYear, setIsChangeYear] = useState<boolean>(false);
    const { monthlyEffort } = PERMISSIONS.report;

    const getDataChart = async () => {
        setLoading(true);
        const response: IResponseList<IMonthlyEffortSummaryResponse> = await sendRequest(Api.monthly_efford.getSummary, {
            ...conditions
        });

        if (response) {
            const { status, result } = response;

            if (status) {
                setMonthlyEffortSummaryInfo(result.content as IMonthEffortSummaryInfo);
            } else {
                setDataEmpty();
            }
            setLoading(false);
        } else {
            setDataEmpty();
        }
    };

    const setDataEmpty = () => {
        setMonthlyEffortSummaryInfo(monthEffortSummaryInfoDefault);
        setLoading(false);
    };

    const getMonthInYears = useCallback(async (y: number) => {
        const monthInYears = await getMonthsOfYear(y);
        return monthInYears;
    }, []);

    // Event
    const handleOpenCommentDialog = () => {
        const updatedConditions = { ...conditions, reportType: REPORT_TYPE.RP_MONTHLY };
        const month = conditions?.month && typeof conditions.month === 'number' ? MONTHS[conditions.month - 1].toLowerCase() : '';
        const titleDetail = `${intl.formatMessage({ id: month })} - ${conditions.year}`;
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
    };

    const handleExportDocument = () => {
        exportDocument(Api.monthly_efford.getDownload.url, { year: conditions.year, month: conditions.month });
    };

    const handleOpenDialog = () => {
        const effortPlanUpdateStatus: IEffortPlanUpdateStatus[] = monthlyEffortSummaryInfo.effortPlanUpdateStatus;
        const effortPlanDepartment = [
            {
                effortplanMissing: effortPlanUpdateStatus[1].data?.[0],
                effortplanSent: effortPlanUpdateStatus[0].data?.[0],
                department: 'SCS'
            },
            {
                effortplanMissing: effortPlanUpdateStatus[1].data?.[1],
                effortplanSent: effortPlanUpdateStatus[0].data?.[1],
                department: 'PRD'
            }
        ];
        setEffortPlanDepts(effortPlanDepartment);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleUpdateEffortPlan = async (effortPlanDepts: IEffortPlanDepartment[]) => {
        const currentDate = `${dateFormat(new Date())}`;
        const payload = {
            tyear: conditions.year,
            tmonth: conditions.month,
            effortPlanDepts,
            createdDate: currentDate,
            userCreate: ''
        };
        const response: IResponseList<IUpdateEffortPlanResponse> = await sendRequest(Api.monthly_efford.postUpdateEffordPlan, payload);
        if (response) {
            const { status, result } = response;
            if (status) {
                handleCloseDialog();
                store.dispatch(
                    openSnackbar({
                        open: true,
                        message: 'update-success',
                        variant: 'alert',
                        alert: { color: 'success' }
                    })
                );
                setMonthlyEffortSummaryInfo({
                    ...monthlyEffortSummaryInfo,
                    effortPlanUpdateStatus: result.content as any
                });
            }
        }
    };

    // Handle submit
    const handleSearch = (value: IMonthlyEffortSummaryConfig) => {
        setSearchParams(value as any);
        setConditions({ ...conditions, ...value });
    };

    useEffect(() => {
        getDataChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conditions]);

    useEffect(() => {
        getMonthInYears(year).then((items: IOption[]) => {
            setMonths(items);
            if (items.length > 0 && isChangeYear) setFormReset({ ...formReset, year, month: items[0].value });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year]);

    return (
        <>
            <FilterCollapse
                handleExport={checkAllowedPermission(monthlyEffort.download) ? handleExportDocument : undefined}
                handleOpenCommentDialog={checkAllowedPermission(monthlyEffort.comment) ? handleOpenCommentDialog : undefined}
            >
                <MonthlyEffortSummarySearch
                    conditions={formReset}
                    months={months}
                    handleChangeYear={handleChangeYear}
                    handleSearch={handleSearch}
                />
            </FilterCollapse>

            {/* Number of project card */}
            <NumberOfProjectCard isLoading={loading} data={monthlyEffortSummaryInfo.numberOfProjects} />

            {/* Update effort plan and log timesheet on redmine card */}
            <Grid
                container
                spacing={gridSpacing}
                sx={{
                    marginBottom: '16px',
                    '& .MuiPaper-root': {
                        marginBottom: '0 !important',
                        height: '100%'
                    }
                }}
                alignItems="center"
            >
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={4}>
                            <EffortPlanUpdateStatusCard
                                isLoading={loading}
                                data={monthlyEffortSummaryInfo.effortPlanUpdateStatus}
                                month={conditions.month}
                                handleOpen={handleOpenDialog}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <LogTimesheetOnRedmineCard isLoading={loading} data={monthlyEffortSummaryInfo.logTimesheetOnRedmine} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* Actual effort allocation card */}
            <ActualEffortAllocationCard isLoading={loading} conditions={conditions} data={monthlyEffortSummaryInfo.actualEffortScsPrd} />

            {/* Update Effort Plan Dialog */}
            <UpdateEffortPlan
                open={open}
                effortPlanDepts={effortPlanDepts}
                handleClose={handleCloseDialog}
                updateEffortPlan={handleUpdateEffortPlan}
            />
        </>
    );
};

export default MonthlyEffortSummary;
