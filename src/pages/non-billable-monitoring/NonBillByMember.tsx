/* eslint-disable react-hooks/exhaustive-deps */
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';

// project imports
import { useAppDispatch, useAppSelector } from 'app/hooks';
import MainCard from 'components/cards/MainCard';
import { Table } from 'components/extended/Table';
import { TabPanel } from 'components/extended/Tabs';
import Api from 'constants/Api';
import { REPORT_TYPE, SEARCH_PARAM_KEY, nonBillMonitoringTabs } from 'constants/Common';
import { PERMISSIONS } from 'constants/Permission';
import { TabCustom } from 'containers';
import {
    NonBillByMemberNote,
    NonBillByMemberSearch,
    NonBillByMemberThead,
    NonBillByMemberTotal,
    NonBillByMemberTBody,
    WarningNonbillMemberTBody,
    WarningNonbillMemberThead
} from 'containers/non-billable-monitoring';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import { openCommentDialog, isCommentedSelector, changeCommented } from 'store/slice/commentSlice';
import {
    INonBillableMonitoringInfo,
    INonBillableMonitoringList,
    IOption,
    IResponseList,
    IWarningNonbillMember,
    IWarningNonbillMemberResponse
} from 'types';

// third party
import { useSearchParams } from 'react-router-dom';
import { checkAllowedPermission, checkAllowedTab } from 'utils/authorization';
import { convertWeekFromToDate, getNumberOfWeek, getWeeksPeriodsInYear } from 'utils/date';
import { exportDocument, getSearchParam, transformObject } from 'utils/common';
import { INonBillConfig, nonBillByMemberDefault, nonBillConfig, warningNonbillMemberDefault } from './Config';
import { useIntl } from 'react-intl';

// ==============================|| NonBill By Member ||============================== //
/**
 *  URL Params
 *  tab
 *  year
 *  week
 *  departmentId
 *  ====== tab 0 - By Member ======
 *  timeStatus
 */
const NonBillByMember = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [
        SEARCH_PARAM_KEY.tab,
        SEARCH_PARAM_KEY.year,
        SEARCH_PARAM_KEY.week,
        SEARCH_PARAM_KEY.departmentId,
        // ====== tab 0 - By Member ======
        SEARCH_PARAM_KEY.timeStatus
    ];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);

    // Hooks, State, Variable
    const defaultConditions = {
        ...nonBillConfig,
        ...params
    };
    const dispatch = useAppDispatch();
    const intl = useIntl();
    const [loading, setLoading] = useState<boolean>(false);
    const [nonBillByMember, setNonBillByMember] = useState<INonBillableMonitoringInfo>(nonBillByMemberDefault);
    const [warningNonBillMember, setWarningNonBillMember] = useState<IWarningNonbillMember[]>(warningNonbillMemberDefault);
    const [conditions, setConditions] = useState<INonBillConfig>(defaultConditions);
    const [formReset, setFormReset] = useState<INonBillConfig>(defaultConditions);
    const [year, setYear] = useState<number>(defaultConditions.year);
    const [weeks, setWeeks] = useState<IOption[]>([]);
    const [isChangeYear, setIsChangeYear] = useState<boolean>(false);
    const [tabValue, setTabValue] = useState(checkAllowedTab(nonBillMonitoringTabs, params.tab)[0]);
    const [isChangeTab, setIsChangeTab] = useState<boolean>(false);
    const { nonBillable } = PERMISSIONS.report;
    const isCommented = useAppSelector(isCommentedSelector);

    // Function
    const getDataTable = async (tabNumber: number) => {
        setLoading(true);
        const weekSelected = convertWeekFromToDate(conditions.week);
        const response: IResponseList<INonBillableMonitoringList | IWarningNonbillMemberResponse> = await sendRequest(
            tabNumber === 0 ? Api.non_billable_monitoring.getAll : Api.non_billable_monitoring.getWarningNonbillable,
            {
                ...weekSelected,
                ...conditions,
                reportType: REPORT_TYPE.RP_NON_BILLABLE_MONITORING
            }
        );

        if (response) {
            const { status, result } = response;

            if (status) {
                const { content } = result;
                tabValue === 0
                    ? setNonBillByMember(content as INonBillableMonitoringInfo)
                    : setWarningNonBillMember(content as IWarningNonbillMember[]);
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
        setNonBillByMember(nonBillByMemberDefault);
        setWarningNonBillMember([]);
        setLoading(false);
    };

    const getWeekInYears = useCallback(async (y: number) => {
        const weekInYears = await getWeeksPeriodsInYear(y);
        return weekInYears;
    }, []);

    // Event
    const handleOpenCommentDialog = (userId?: string, subTitle?: string) => {
        const updatedConditions = { ...conditions, userId, reportType: REPORT_TYPE.RP_NON_BILLABLE_MONITORING };
        const titleDetail = conditions?.week ? `${getNumberOfWeek(conditions.week)} - ${conditions.year}` : '';

        dispatch(
            openCommentDialog({
                conditions: updatedConditions,
                titleDetail: userId ? subTitle : intl.formatMessage({ id: 'week' }) + ' ' + titleDetail
            })
        );
    };

    const handleChangeTab = (event: SyntheticEvent, newTabValue: number) => {
        setYear(nonBillConfig.year);
        setTabValue(newTabValue);
        setConditions({ ...nonBillConfig });
        setFormReset({ ...nonBillConfig });
        setSearchParams({ tab: newTabValue } as any);
        setIsChangeTab(true);
        setIsChangeYear(false);
    };

    const handleChangeYear = (e: any) => {
        const { value } = e.target;
        setYear(value);
        setIsChangeYear(true);
    };

    const handleExportDocument = () => {
        exportDocument(Api.non_billable_monitoring.getDownload.url, {
            ...convertWeekFromToDate(conditions.week),
            weekNumber: getNumberOfWeek(conditions.week),
            year: conditions.year
        });
    };

    // Handle submit
    const handleSearch = (value: INonBillConfig) => {
        transformObject(value);
        setSearchParams({ ...value, tab: tabValue } as any);
        setConditions(value);
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
                setFormReset({ ...formReset, year: nonBillConfig.year, week: nonBillConfig.week });
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
            <TabCustom value={tabValue} handleChange={handleChangeTab} tabs={nonBillMonitoringTabs} />

            {/* Search form  */}
            <FilterCollapse
                handleExport={checkAllowedPermission(nonBillable.download) ? handleExportDocument : undefined}
                handleOpenCommentDialog={checkAllowedPermission(nonBillable.comment) ? handleOpenCommentDialog : undefined}
            >
                <NonBillByMemberSearch
                    conditions={formReset}
                    weeks={weeks}
                    handleChangeYear={handleChangeYear}
                    handleSearch={handleSearch}
                    tabValue={tabValue}
                />
            </FilterCollapse>

            {/* Nonbillable by Member */}
            <TabPanel value={tabValue} index={0}>
                {/* Note  */}
                <NonBillByMemberNote />

                {/* Non Bill Total  */}
                <NonBillByMemberTotal nonBillByMember={nonBillByMember} isLoading={loading} />

                <MainCard>
                    <Table heads={<NonBillByMemberThead />} isLoading={loading} data={nonBillByMember?.data}>
                        <NonBillByMemberTBody handleOpenCommentDialog={handleOpenCommentDialog} data={nonBillByMember?.data} />
                    </Table>
                </MainCard>
            </TabPanel>

            {/* Warning Nonbill Member */}
            <TabPanel value={tabValue} index={1}>
                <MainCard>
                    <Table heads={<WarningNonbillMemberThead />} isLoading={loading} data={warningNonBillMember}>
                        <WarningNonbillMemberTBody data={warningNonBillMember} />
                    </Table>
                </MainCard>
            </TabPanel>
        </>
    );
};

export default NonBillByMember;
