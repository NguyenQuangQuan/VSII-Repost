/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

// material-ui
import { SelectChangeEvent, TableBody } from '@mui/material';

// project imports
import { useAppDispatch } from 'app/hooks';
import Api from 'constants/Api';
import { SEARCH_PARAM_KEY } from 'constants/Common';
import { PERMISSIONS } from 'constants/Permission';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { checkAllowedPermission } from 'utils/authorization';
import { exportDocument, getSearchParam, transformObject } from 'utils/common';
import { getMonthsOfYear } from 'utils/date';

// third party
import MainCard from 'components/cards/MainCard';
import { Table } from 'components/extended/Table';
import ClosingDateWorkingCalendar from 'containers/working-calendar/ClosingDateWorkingCalendar';
import EditRow from 'containers/working-calendar/EditRow';
import MessageWorkingCalendarModal from 'containers/working-calendar/MessageWorkingCalendarModal';
import ReadOnly from 'containers/working-calendar/ReadOnly';
import RegisterWorkingCalendarThead from 'containers/working-calendar/RegisterWorkingCalendarThead';
import RegisterWorkingCalendarType from 'containers/working-calendar/RegisterWorkingCalendarType';
import RegisterWorkingCalenderSearch from 'containers/working-calendar/RegisterWorkingCalenderSearch';
import { closeConfirm, openConfirm } from 'store/slice/confirmSlice';
import { IOption } from 'types';
import { IClosingDate, ITypeList, IWorkingCalendar } from 'types/working-calendar';
import { getUserInfoCookies } from 'utils/cookies';
import { IWorkingCalendarSearch, useWorkingCalendarForm, workingCalenderSearchConfig } from './Config';

// third party
import { FormattedMessage } from 'react-intl';

// ==============================|| Register Working Calendar ||============================== //

const RegisterWorkingCalendar = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [SEARCH_PARAM_KEY.year, SEARCH_PARAM_KEY.month, SEARCH_PARAM_KEY.idHexString, SEARCH_PARAM_KEY.fullname];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fullname, idHexString, ...cloneParams }: any = params;
    // Hooks, State, Variable
    const defaultConditions = {
        ...workingCalenderSearchConfig,
        ...cloneParams,
        idHexString: params.idHexString ? { value: params.idHexString, label: params.fullname } : null
    };

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [workingCalendars, setWorkingCalendars] = useState<IWorkingCalendar[]>([]);
    const [typeList, setTypeList] = useState<ITypeList[]>([]);
    const [conditions, setConditions] = useState<IWorkingCalendarSearch>(defaultConditions);
    const [formReset, setFormReset] = useState<IWorkingCalendarSearch>(defaultConditions);
    const [year, setYear] = useState<number>(defaultConditions.year);
    const [months, setMonths] = useState<IOption[]>(getMonthsOfYear(workingCalenderSearchConfig.year));
    const [isChangeYear, setIsChangeYear] = useState<boolean>(false);
    const [addOrEditLoading, setAddOrEditLoading] = useState<boolean>(false);
    const { registerWorkingCalendar } = PERMISSIONS.workingCalendar;
    const [open, setOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(true);
    const [toggle, setToggle] = useState<string>('');
    const [editData, setEditData] = useState<IWorkingCalendar>();
    const [openClosingDate, setOpenClosingDate] = useState<boolean>(false);
    const [closingDate, setClosingDate] = useState<IClosingDate>();
    const [openEditClosingDate, setEditClosingDate] = useState<boolean>(false);
    const [isCheckEdit, setIsCheckEdit] = useState<boolean>(false);
    const [locked, setLocked] = useState<string>('');

    const form = useWorkingCalendarForm();
    const { handleSubmit, reset, control } = form;

    // API get
    const getDataTable = async () => {
        setLoading(true);
        const idHexString = conditions.idHexString ? conditions.idHexString.value : '';
        const response = await sendRequest(Api.working_calendar.getAll, {
            ...conditions,
            idHexString: idHexString
        });

        if (response) {
            const { status, result } = response;
            const { content } = result;
            const workingCalendarLength = content.workingCalendarResponses ? content.workingCalendarResponses.length : 0;
            if (status && result && (content.length > 0 || workingCalendarLength > 0)) {
                const workingCalendarResponses = content.workingCalendarResponses;
                setWorkingCalendars(workingCalendarResponses);
                setTypeList(content.typeList);
                setLoading(false);
            } else {
                setDataEmpty();
            }
            return;
        } else {
            setDataEmpty();
        }
    };

    // Call API saveOrUpdate
    const postEditWorkingCalendar = async (value: any) => {
        setAddOrEditLoading(true);
        const response = await sendRequest(Api.working_calendar.postSaveOrUpdate, value);
        if (response) {
            const workingCalendarBk = [...workingCalendars];
            const { result, status } = response;
            if (status) {
                setOpen(false);
                setAddOrEditLoading(false);
                workingCalendarBk.forEach((element, index) => {
                    if (element.idHexString === result.idHexString) workingCalendarBk[index] = result;
                });
                setWorkingCalendars(workingCalendarBk);
                setToggle('');
                dispatch(openSnackbar({ open: true, message: 'update-success', variant: 'alert', alert: { color: 'success' } }));
            } else {
                setOpen(true);
            }
        } else {
            setAddOrEditLoading(false);
        }
    };

    // Call API Verified of Member
    const postUpdateStatus = async (item: IWorkingCalendar) => {
        const response = await sendRequest(Api.working_calendar.postUpdateStatus, item);
        if (response) {
            const { status, result } = response;
            if (status) {
                setOpen(false);
                const newWorkingCalendar = [...workingCalendars];

                newWorkingCalendar.forEach((element, index) => {
                    if (element.idHexString === result.idHexString) newWorkingCalendar[index] = result;
                });
                setWorkingCalendars(newWorkingCalendar);
                setToggle('');
                dispatch(openSnackbar({ open: true, message: 'verified-success', variant: 'alert', alert: { color: 'success' } }));
            } else {
                dispatch(openSnackbar({ open: true, message: 'update-status-error', variant: 'alert', alert: { color: 'error' } }));
            }
        }
    };

    // Call API Verify All
    const postVerifyClosingDate = async (value: any, month: number | string) => {
        const response = await sendRequest(Api.working_calendar.postVerifyClosingDate, { userIdList: value, month: month });
        if (response) {
            const { status } = response;
            if (status) {
                dispatch(openSnackbar({ open: true, message: 'update-success', variant: 'alert', alert: { color: 'success' } }));
            } else {
                setOpen(true);
            }
        }
        dispatch(closeConfirm());
    };

    // Call Api Get Closing Date
    const getDataClosingdate = async (year?: number) => {
        const response = await sendRequest(Api.working_calendar.getClosingDate, {
            year: year
        });

        if (response) {
            const { status, result } = response;
            const { content } = result;
            if (status) {
                setClosingDate(content);
                setLocked(content.locked);
            }
            return;
        } else {
            setDataEmpty();
        }
    };
    // Call API Update Closing Date
    const postEditClosingDate = async (closingDateValue: IClosingDate) => {
        const response = await sendRequest(Api.working_calendar.postUpdateClosingDate, closingDateValue);
        if (response) {
            const status = response.status;

            if (status) {
                setEditClosingDate(false);
                getDataClosingdate(closingDateValue.year as number);
            } else {
                setEditClosingDate(true);
            }
            dispatch(
                openSnackbar({
                    open: true,
                    message: status ? 'update-closing-date-success' : 'error-closing-date',
                    variant: 'alert',
                    alert: { color: status ? 'success' : 'error' }
                })
            );
        }
    };

    // funtion
    const setDataEmpty = () => {
        setWorkingCalendars([]);
        setLoading(false);
        setClosingDate(undefined);
    };

    const getMonthsInYear = useCallback(async (p: number) => {
        const monthInYear = await getMonthsOfYear(p);
        return monthInYear;
    }, []);

    const onEdit = (item: IWorkingCalendar) => {
        setAddOrEditLoading(true);
        setToggle(item.idHexString);
        setEditData(item);
    };

    const onVerify = (item: IWorkingCalendar) => {
        setOpen(true);
        setIsEdit(false);
        setEditData(item);
    };

    const onCancel = (item: IWorkingCalendar) => {
        setAddOrEditLoading(false);
        reset({ workdays: item?.workdays });
        setToggle('');
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setOpenClosingDate(false);
    };

    const onSubmit = (values: any) => {
        const editPayload = {
            idHexString: editData?.idHexString,
            userIdHexString: editData?.idHexStringUser,
            year: editData?.year,
            month: editData?.month,
            userId: editData?.userId,
            userName: editData?.userName,
            lastName: editData?.lastName,
            firstName: editData?.firstName,
            departmentId: editData?.departmentId,
            memberCode: editData?.memberCode,
            rank: editData?.rank,
            workdays: values?.workdays
        };
        postEditWorkingCalendar(editPayload);
        setEditData(editPayload as any);
        setAddOrEditLoading(false);
    };

    const onSubmitMessage = (message: string) => {
        const payLoadNew = { ...editData, message: message };
        if (isEdit) {
            postEditWorkingCalendar(payLoadNew);
        }
    };

    const handleChangeYear = (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => {
        const { value } = e.target;
        setYear(value as number);
        setIsChangeYear(true);
    };

    const handleExportDocument = () => {
        exportDocument(Api.working_calendar.getDownload.url, {
            year: conditions.year,
            month: conditions.month
        });
    };

    const handleSearch = (value: IWorkingCalendarSearch) => {
        const { idHexString } = value;
        transformObject(value);
        const payload = { ...value, idHexString: idHexString?.value, fullname: idHexString?.label };
        transformObject(payload);
        setSearchParams(payload as any);
        setConditions({ ...value });
        setToggle('');
    };

    const { fields } = useFieldArray({ control, name: 'workdays' });

    const handleOpenClosingDialog = () => {
        setOpenClosingDate(true);
    };

    const handleOpenVerifyDialog = () => {
        const allApproved = workingCalendars.map((element) => element.status);
        const authorizedIds = workingCalendars.map((element) => element.userId);

        if (allApproved.every((status) => status === 'approve') && closingDate && closingDate.locked === 'Yes') {
            dispatch(
                openConfirm({
                    open: true,
                    title: <FormattedMessage id="warning" />,
                    content: <FormattedMessage id="verify-working-calendar" />,
                    handleConfirm: () => postVerifyClosingDate(authorizedIds, conditions.month)
                })
            );
        } else {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'status-not-approve',
                    variant: 'alert',
                    alert: { color: 'warning' }
                })
            );
        }
    };

    // Check quyền edit của các user

    const handleCheckEdit = () => {
        setIsCheckEdit(false);
        if (locked === 'Yes') {
            const { groups } = getUserInfoCookies();
            if (
                groups.includes(registerWorkingCalendar.editWorkingCalendar) &&
                groups.includes(registerWorkingCalendar.verifyWorkingCalendar)
            ) {
                setIsCheckEdit(true);
            } else {
                setIsCheckEdit(false);
            }
        } else {
            setIsCheckEdit(true);
        }
    };

    // Effect
    useEffect(() => {
        getDataTable();
    }, [conditions]);

    useEffect(() => {
        handleCheckEdit();
    }, [year, locked]);

    useEffect(() => {
        getDataClosingdate(year);
    }, []);

    useEffect(() => {
        reset({ workdays: editData?.workdays });
    }, [editData]);

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
            if (items.length > 0) {
                setFormReset({ ...formReset, year: workingCalenderSearchConfig.year, month: workingCalenderSearchConfig.month });
            }
        });
    }, []);

    useEffect(() => {
        if (fields.length > 0 && toggle) setAddOrEditLoading(false);
    }, [fields, toggle]);

    return (
        <>
            {/* Search form  */}
            <FilterCollapse
                handleClosingDate={
                    checkAllowedPermission(registerWorkingCalendar.closingWorkingCalendar) ? handleOpenClosingDialog : undefined
                }
                handleVerifiedWorkingCalendar={
                    checkAllowedPermission(registerWorkingCalendar.verifyWorkingCalendar) ? handleOpenVerifyDialog : undefined
                }
                handleExport={checkAllowedPermission(registerWorkingCalendar.exportWorkingCalendar) ? handleExportDocument : undefined}
            >
                <RegisterWorkingCalenderSearch
                    formReset={formReset}
                    months={months}
                    handleChangeYear={handleChangeYear}
                    handleSearch={handleSearch}
                />
            </FilterCollapse>

            {/* Note */}
            {typeList && <RegisterWorkingCalendarType typeList={typeList} />}

            {/* Table  */}
            <MainCard>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Table
                        heads={<RegisterWorkingCalendarThead conditions={conditions} data={workingCalendars} />}
                        isLoading={loading}
                        data={workingCalendars}
                    >
                        <TableBody>
                            {workingCalendars ? (
                                <>
                                    {workingCalendars.map((item: IWorkingCalendar, index: number) => (
                                        <>
                                            {!addOrEditLoading && toggle === item.idHexString ? (
                                                <>
                                                    <EditRow
                                                        idx={index}
                                                        item={item}
                                                        handleCancel={onCancel}
                                                        form={form}
                                                        dataLength={workingCalendars.length}
                                                    />
                                                </>
                                            ) : (
                                                <ReadOnly
                                                    dataLength={workingCalendars.length}
                                                    idx={index}
                                                    item={item}
                                                    handleEdit={onEdit}
                                                    loading={addOrEditLoading}
                                                    toggle={toggle}
                                                    handleVerify={onVerify}
                                                    isCheckEdit={isCheckEdit}
                                                />
                                            )}
                                        </>
                                    ))}
                                </>
                            ) : (
                                ''
                            )}
                        </TableBody>
                    </Table>
                </form>

                {/* Message working calendar */}
                <MessageWorkingCalendarModal
                    isEdit={isEdit}
                    open={open}
                    handleClose={handleCloseDialog}
                    item={editData}
                    onSubmitMessage={onSubmitMessage}
                    postUpdateStatus={postUpdateStatus}
                />

                {/* Closing Date */}
                {openClosingDate && closingDate && (
                    <ClosingDateWorkingCalendar
                        closingDate={closingDate}
                        getDataTable={getDataClosingdate}
                        postEditClosingDate={postEditClosingDate}
                        openClosingDate={openClosingDate}
                        handleClose={handleCloseDialog}
                        openEditClosingDate={openEditClosingDate}
                        setEditClosingDate={setEditClosingDate}
                    />
                )}
            </MainCard>
        </>
    );
};

export default RegisterWorkingCalendar;
