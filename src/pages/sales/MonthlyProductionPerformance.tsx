/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';

// third party
import { FormattedMessage } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

// material-ui
import { PopoverVirtualElement, SelectChangeEvent } from '@mui/material';

// project imports
import { useAppDispatch } from 'app/hooks';
import { store } from 'app/store';
import MainCard from 'components/cards/MainCard';
import { Table } from 'components/extended/Table';
import Api from 'constants/Api';
import { CONTRACT_TYPE_SALE_REPORT, SEARCH_PARAM_KEY } from 'constants/Common';
import {
    AddOrEditProductionPerformance,
    CommentPopover,
    EditHeadCount,
    MonthlyProductionPerformanceSearch,
    MonthlyProductionPerformanceTBody,
    MonthlyProductionPerformanceThead
} from 'containers/sales';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import { closeConfirm, openConfirm } from 'store/slice/confirmSlice';
import { openSnackbar } from 'store/slice/snackbarSlice';
import {
    IAddOrEditProductivityResponse,
    ICommentForm,
    ICommentItem,
    IDataHCByMonth,
    IDeleteProductivityResponse,
    IDepartmentPerformance,
    IDepartmentPerformanceData,
    IEditCommentResponse,
    IHeadCountValueByMonthDetailResponse,
    IMonthlyProductionPerformance,
    IMonthlyProductionPerformanceAddOrEditForm,
    IMonthlyProductionPerformanceInfo,
    IMonthlyProductionPerformanceResponse,
    IOption,
    IProductivity,
    IProductivityHeadCountEditForm,
    IResponseList
} from 'types';
import { exportDocument, getDataProductivityByMonth, getSearchParam, isEmpty, transformObject } from 'utils/common';
import { getUserInfoCookies } from 'utils/cookies';
import { convertMonthFromToDate, getMonthsOfYear } from 'utils/date';
import {
    IMonthlyProductionPerformanceFilterConfig,
    monthlyProductionPerformanceFilterConfig,
    monthlyProductionPerformanceInfoDefault,
    productionPerformanceAddOrEditFormDefault,
    productivityHeadCountEditFormDefault
} from './Config';
import { PERMISSIONS } from 'constants/Permission';
import { checkAllowedPermission } from 'utils/authorization';

// ==============================|| Monthly Production Performance ||============================== //

const MonthlyProductionPerformance = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [SEARCH_PARAM_KEY.year];
    const keyParamsArray = [SEARCH_PARAM_KEY.month];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams, keyParamsArray);
    transformObject(params);

    // Hooks, State, Variable
    const dispatch = useAppDispatch();
    const defaultConditions = { ...monthlyProductionPerformanceFilterConfig, ...params };
    const userInfo = getUserInfoCookies();
    const [loading, setLoading] = useState<boolean>(false);
    const [addOrEditLoading, setAddOrEditLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [openHC, setOpenHC] = useState<boolean>(false);
    const [monthlyProductionPerformanceInfo, setMonthlyProductionPerformanceInfo] = useState<IMonthlyProductionPerformanceInfo>(
        monthlyProductionPerformanceInfoDefault
    );
    const [conditions, setConditions] = useState<IMonthlyProductionPerformanceFilterConfig>(defaultConditions);
    const [formReset, setFormReset] = useState<IMonthlyProductionPerformanceFilterConfig>(defaultConditions);
    const [months, setMonths] = useState<IOption[]>([]);
    const [year, setYear] = useState<number>(defaultConditions.year);
    const [isChangeYear, setIsChangeYear] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [productivityManyMonths, setProductivityManyMonths] = useState<IMonthlyProductionPerformance>();
    const [productivity, setProductivity] = useState<IMonthlyProductionPerformanceAddOrEditForm>(productionPerformanceAddOrEditFormDefault);
    const [productivityHeadCount, setProductivityHeadCount] = useState<IProductivityHeadCountEditForm>(
        productivityHeadCountEditFormDefault
    );
    const [anchorEl, setAnchorEl] = useState<
        Element | (() => Element) | PopoverVirtualElement | (() => PopoverVirtualElement) | null | undefined
    >(null);
    const [commentItem, setCommentItem] = useState<ICommentItem | null>(null);
    const [isEditComment, setIsEditComment] = useState<boolean>(false);
    const { monthlyProductionPerformancePermission } = PERMISSIONS.sale;

    // Functions
    const getDataTable = async () => {
        setLoading(true);
        const response: IResponseList<IMonthlyProductionPerformanceResponse> = await sendRequest(Api.sale_productivity.getAll, {
            ...conditions
        });
        if (response) {
            const { status, result } = response;
            if (status) {
                setMonthlyProductionPerformanceInfo(result.content as IMonthlyProductionPerformanceInfo);
            } else {
                setDataEmpty();
            }
            setLoading(false);
        } else {
            setDataEmpty();
        }
    };

    const getDetailMonths = async (idHexString: string) => {
        const params = { idHexString };

        const response = await sendRequest(Api.sale_productivity.getDetail, params);
        const { status, result } = response;
        if (response && status) {
            const data = result.content;
            const payload = {
                idHexString: data.idHexString,
                year: data.year,
                month: data?.productivity[0].month,
                standardWorkingDay: data?.productivity[0].month,
                projectId: { value: data.project?.projectId, label: data.project?.projectName },
                departmentId: data.departmentId,
                projectName: data.project.projectName,
                contractSize: data.contractSize.value,
                serviceType: data.serviceType,
                contractType: data.contractType,
                originalContractSize: data.originalContractSize,
                contractAllocation: data.contractAllocation,
                duration: data.duration,
                paymentTerm: data.paymentTerm,
                currency: data.exchangeRate.label,
                exchangeRate: data.exchangeRate.value,
                delivered: data?.productivity[0].delivered.value,
                receivable: data?.productivity[0].receivable.value,
                received: data?.productivity[0].received.value,
                financial: data?.productivity[0].financial.value,
                hcInfo: data?.productivity[0].hcInfo,
                productivity: data.productivity,
                lastYearProductivity: data.lastYearProductivity
            };
            setProductivity(payload);
            setProductivityManyMonths(result.content as any);
        }
    };

    const getStandardWorkingDay = async (fromDate: string, toDate: string, month?: number) => {
        let standardWorkingDay = 0;
        const params = { fromDate, toDate };
        const response = await sendRequest(Api.sale_productivity.getStandardWorkingDay, params);
        const { status, result } = response;
        if (response && status) {
            const { value } = result.content;
            standardWorkingDay = value;
        }

        return standardWorkingDay;
    };

    const onChangeYearGetStandardWorkingDay = async (
        payload: IMonthlyProductionPerformanceAddOrEditForm,
        fromDate: string,
        toDate: string,
        month?: number,
        paymentTerm?: string
    ) => {
        const standardWorkingDayValue = await getStandardWorkingDay(fromDate, toDate, month);
        const productivityBase = productivity.productivity ? productivity.productivity : [];
        const productivityLastYear = productivity.lastYearProductivity ? productivity.lastYearProductivity : [];
        let payloadBase = {
            ...payload,
            month: month ? month : 1,
            standardWorkingDay: String(standardWorkingDayValue),
            paymentTerm: paymentTerm ? paymentTerm : payload.paymentTerm
        };
        let productivityArray =
            productivity.productivity &&
            productivity.productivity.filter((el: IProductivity) => {
                return el.month === month;
            });

        const productivityDefaultValue = {
            ...payloadBase,
            delivered: 0,
            receivable: 0,
            received: 0,
            financial: 0,
            hcInfo: []
        };
        const createProductivityObject = (item: any) => {
            return {
                ...payloadBase,
                delivered: item.delivered?.value || 0,
                receivable: item.receivable?.value || 0,
                received: item.received?.value || 0,
                financial: item.financial?.value || 0,
                hcInfo: item.hcInfo || []
            };
        };

        // TH productivityArray trả về mảng rỗng
        if (payload.contractType === CONTRACT_TYPE_SALE_REPORT.TM) {
            if (productivityArray?.length === 0) {
                // Month > Payment Term
                if (month && +month > +(paymentTerm ? paymentTerm : payload.paymentTerm)) {
                    let arr1 = getDataProductivityByMonth(productivityBase, +month - +(paymentTerm ? paymentTerm : payload.paymentTerm));
                    setProductivity(
                        arr1 && arr1.length > 0
                            ? {
                                ...payloadBase,
                                delivered: arr1[0].delivered?.value,
                                receivable: arr1[0].delivered?.value,
                                received: arr1[0].delivered?.value,
                                financial: arr1[0].delivered?.value,
                                hcInfo: arr1[0].hcInfo || []
                            }
                            : productivityDefaultValue
                    );
                }

                // Month = Payment Term
                if (month && +month === +(paymentTerm ? paymentTerm : payload.paymentTerm)) {
                    let arr2 = getDataProductivityByMonth(productivityLastYear, 12);
                    setProductivity(
                        arr2 && arr2.length > 0
                            ? {
                                ...payloadBase,
                                delivered: arr2[0].delivered?.value,
                                receivable: arr2[0].delivered?.value,
                                received: arr2[0].delivered?.value,
                                financial: arr2[0].delivered?.value,
                                hcInfo: arr2[0].hcInfo || []
                            }
                            : productivityDefaultValue
                    );
                }

                // Month < Payment Term
                if (month && +month < +(paymentTerm ? paymentTerm : payload.paymentTerm)) {
                    const count = +(paymentTerm ? paymentTerm : payload.paymentTerm) - +month;
                    const countFinal = 12 - count;
                    let arr3 = getDataProductivityByMonth(productivityLastYear, countFinal);
                    setProductivity(
                        arr3 && arr3.length > 0
                            ? {
                                ...payloadBase,
                                delivered: arr3[0].delivered?.value,
                                receivable: arr3[0].delivered?.value,
                                received: arr3[0].delivered?.value,
                                financial: arr3[0].delivered?.value,
                                hcInfo: arr3[0].hcInfo || []
                            }
                            : productivityDefaultValue
                    );
                }
            } else {
                productivityArray && productivityArray.length > 0 && setProductivity(createProductivityObject(productivityArray[0]));
            }
        } else {
            let arr4 = getDataProductivityByMonth(productivityBase, month!);
            let arr5 = getDataProductivityByMonth(productivityBase, +month! - 1);
            let arr6 = getDataProductivityByMonth(productivityLastYear, 12);
            if (month === 1) {
                setProductivity(arr6 && arr6.length > 0 ? createProductivityObject(arr6[0]) : productivityDefaultValue);
            } else {
                if (arr4 && arr4.length > 0) {
                    setProductivity(createProductivityObject(arr4[0]));
                } else {
                    setProductivity(arr5 && arr5.length > 0 ? createProductivityObject(arr5[0]) : productivityDefaultValue);
                }
            }
        }
    };

    const getHeadCountValueByMonth = async (month: string) => {
        const params = { month, year: conditions.year };
        const response: IResponseList<IHeadCountValueByMonthDetailResponse> = await sendRequest(
            Api.sale_productivity.getDetailHeadCountByMonth,
            params
        );
        if (response) {
            const { status, result } = response;

            if (status) {
                const data = result.content as IDataHCByMonth;
                const isEmptyData = isEmpty(data);
                setProductivityHeadCount({
                    ...productivityHeadCount,
                    month,
                    value: !isEmptyData ? data.value : ''
                });
            }
        }
    };

    const setDataEmpty = () => {
        setMonthlyProductionPerformanceInfo(monthlyProductionPerformanceInfoDefault);
        setLoading(false);
    };

    const getMonthInYears = useCallback(async (y: number) => {
        const monthInYears = await getMonthsOfYear(y);
        return monthInYears;
    }, []);

    // Event
    const handleChangeYear = (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => {
        const value = e.target.value;
        setYear(value as number);
        setIsChangeYear(true);
    };

    const handleExportDocument = () => {
        exportDocument(Api.sale_productivity.getDownload.url, { year: conditions.year, userName: userInfo!.userName });
    };

    const handleOpenDialog = async (department: IDepartmentPerformance, item?: IDepartmentPerformanceData) => {
        const idHexString = item?.idHexString;
        setIsEdit(item ? true : false);
        let payload = { ...productionPerformanceAddOrEditFormDefault, year: conditions.year, departmentId: department.name, month: 1 };

        if (item) {
            getDetailMonths(idHexString as string);
        } else {
            const getMonth = months.filter((month) => {
                return month.value === 1;
            });
            const { fromDate, toDate } = convertMonthFromToDate(getMonth[0].label);
            const standardWorkingDayValue = await getStandardWorkingDay(fromDate, toDate, 1);
            setProductivity({ ...payload, standardWorkingDay: String(standardWorkingDayValue) });
        }
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        getDataTable();
    };

    const handleOpenEditHeadCountDialog = (item: IDataHCByMonth[]) => {
        setProductivityHeadCount({
            year: conditions.year,
            month: conditions.month ? conditions.month[0] : '1',
            value: item[0].value
        });
        setOpenHC(true);
    };

    const handleCloseEditHeadCountDialog = () => {
        setOpenHC(false);
    };

    const postAddOrEditProductivity = async (payload: IMonthlyProductionPerformanceAddOrEditForm) => {
        setAddOrEditLoading(true);
        const response: IResponseList<IAddOrEditProductivityResponse> = await sendRequest(
            Api.sale_productivity.postCreateOrUpdate,
            payload
        );
        if (response) {
            const { status } = response;
            setAddOrEditLoading(false);
            store.dispatch(
                openSnackbar({
                    open: true,
                    message: status ? (isEdit ? 'update-success' : 'add-success') : 'exist-project-name',
                    variant: 'alert',
                    alert: { color: status ? 'success' : 'warning' }
                })
            );
            getDetailMonths(response.result?.content?.message?.idHexString);
        } else {
            setAddOrEditLoading(false);
        }
    };

    const postEditHeadCount = async (payload: IProductivityHeadCountEditForm) => {
        setAddOrEditLoading(true);
        const response: IResponseList<IAddOrEditProductivityResponse> = await sendRequest(
            Api.sale_productivity.postUpdateHeadCount,
            payload
        );
        if (response) {
            const { status } = response;
            if (status) {
                setAddOrEditLoading(false);
                handleCloseEditHeadCountDialog();
                store.dispatch(openSnackbar({ open: true, message: 'update-success', variant: 'alert', alert: { color: 'success' } }));
                getDataTable();
            } else {
                setAddOrEditLoading(false);
            }
        } else {
            setAddOrEditLoading(false);
        }
    };

    const postEditComment = async (payload?: ICommentForm) => {
        const response: IResponseList<IEditCommentResponse> = await sendRequest(Api.sale_productivity.postComment, {
            ...payload,
            months: conditions.month
        });

        if (response) {
            const result = response.result.content;
            const departmentNews = monthlyProductionPerformanceInfo.departments.map((department: IDepartmentPerformance) => ({
                ...department,
                data: department.data.map((el: IDepartmentPerformanceData) => (el.idHexString === result.idHexString ? result : el))
            }));
            setMonthlyProductionPerformanceInfo({ ...monthlyProductionPerformanceInfo, departments: departmentNews });
            store.dispatch(openSnackbar({ open: true, message: 'update-success', variant: 'alert', alert: { color: 'success' } }));
            setIsEditComment(false);
        }
    };

    const deleteProductivity = async (id: string) => {
        const response: IResponseList<IDeleteProductivityResponse> = await sendRequest(Api.sale_productivity.delete, {
            id
        });
        const { status } = response;
        if (status) {
            dispatch(openSnackbar({ open: true, message: 'delete-success', variant: 'alert', alert: { color: 'success' } }));
            dispatch(closeConfirm());
            getDataTable();
        }
    };

    const handleOpenConfirm = (id: string) => {
        dispatch(
            openConfirm({
                open: true,
                title: <FormattedMessage id="warning" />,
                content: <FormattedMessage id="delete-record" />,
                handleConfirm: () => deleteProductivity(id)
            })
        );
    };

    const handleOpenComment = (event: React.MouseEvent<Element>, item: ICommentItem) => {
        setAnchorEl(event.currentTarget);
        setCommentItem(item);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setIsEditComment(false);
    };

    // Handle submit
    const handleSearch = (value: IMonthlyProductionPerformanceFilterConfig) => {
        transformObject(value);
        setSearchParams(value as any);
        setConditions(value);
    };

    const handleAddProductivity = (productivityNew: IMonthlyProductionPerformanceAddOrEditForm) => {
        postAddOrEditProductivity(productivityNew);
    };

    const handleEditProductivity = (productivityEdit: IMonthlyProductionPerformanceAddOrEditForm) => {
        postAddOrEditProductivity(productivityEdit);
    };

    const handleEditHeadCount = (headCountEdit: IProductivityHeadCountEditForm) => {
        postEditHeadCount(headCountEdit);
    };

    const handleEditComment = (comment?: ICommentForm) => {
        postEditComment(comment);
    };

    // Effect
    useEffect(() => {
        getDataTable();
    }, [conditions]);

    useEffect(() => {
        getMonthInYears(year).then((items: IOption[]) => {
            setMonths(items);
            if (items.length > 0 && isChangeYear) setFormReset({ ...formReset, year, month: [] });
        });
    }, [year]);

    return (
        <>
            {/* Filter */}
            <FilterCollapse
                handleExport={checkAllowedPermission(monthlyProductionPerformancePermission.download) ? handleExportDocument : undefined}
            >
                <MonthlyProductionPerformanceSearch
                    conditions={formReset}
                    months={months}
                    handleChangeYear={handleChangeYear}
                    handleSearch={handleSearch}
                />
            </FilterCollapse>

            {/* Table */}
            <MainCard>
                <Table
                    heads={
                        <MonthlyProductionPerformanceThead
                            months={monthlyProductionPerformanceInfo.months}
                            count={monthlyProductionPerformanceInfo.departments.length}
                        />
                    }
                    isLoading={loading}
                    data={monthlyProductionPerformanceInfo.departments}
                >
                    <MonthlyProductionPerformanceTBody
                        info={monthlyProductionPerformanceInfo}
                        handleOpen={handleOpenDialog}
                        handleOpenComment={handleOpenComment}
                        handleOpenEditHeadCount={handleOpenEditHeadCountDialog}
                        editComment={handleEditComment}
                        handleOpenConfirm={handleOpenConfirm}
                    />
                </Table>
            </MainCard>

            {/* Add or Edit Production Performance Dialog */}
            {open && (
                <AddOrEditProductionPerformance
                    open={open}
                    isEdit={isEdit}
                    loading={addOrEditLoading}
                    months={months}
                    handleClose={handleCloseDialog}
                    productivityManyMonths={productivityManyMonths}
                    productivity={productivity}
                    addProductivity={handleAddProductivity}
                    editProductivity={handleEditProductivity}
                    onChangeYearGetStandardWorkingDay={onChangeYearGetStandardWorkingDay}
                />
            )}

            {/* Edit HeadCount Dialog */}
            {openHC && (
                <EditHeadCount
                    open={openHC}
                    loading={addOrEditLoading}
                    headCount={productivityHeadCount}
                    months={months}
                    handleClose={handleCloseEditHeadCountDialog}
                    getDetailByMonth={getHeadCountValueByMonth}
                    editHeadCount={handleEditHeadCount}
                />
            )}

            {/* Comment */}
            <CommentPopover
                item={commentItem!}
                anchorEl={anchorEl}
                handleClose={handleClose}
                isEdit={isEditComment}
                setIsEdit={setIsEditComment}
                editComment={handleEditComment}
            />
        </>
    );
};

export default MonthlyProductionPerformance;
