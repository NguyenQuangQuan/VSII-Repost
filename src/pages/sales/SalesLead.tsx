/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, memo, SyntheticEvent } from 'react';
import { useAppDispatch } from 'app/hooks';
// project imports
import { Table, TableFooter } from 'components/extended/Table';
import Api from 'constants/Api';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import {
    IPaginationResponse,
    IResponseList,
    IRequestsChecking,
    IRequestsCheckingResponse,
    ISupplierChecking,
    ISupplierCheckingResponse
} from 'types';
import RequestsCheckingSearch from 'containers/sales/RequestsCheckingSearch';
import {
    ISalesLeadFilterConfig,
    addOrEditRequestsCheckingFormDefault,
    addOrEditSupplierCheckingFormDefault,
    salesLeadFilterConfig
} from './Config';
import {
    AddOrEditRequestsChecking,
    AddOrEditSupplierChecking,
    RequestsCheckingTBody,
    RequestsCheckingThead,
    SupplierCheckingSearch,
    SupplierCheckingTBody,
    SupplierCheckingThead
} from 'containers/sales';
import MainCard from 'components/cards/MainCard';
import { TabCustom, TableToolbar } from 'containers';
import { checkAllowedPermission, checkAllowedTab } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';
import { SEARCH_PARAM_KEY, paginationParamDefault, paginationResponseDefault, saleListTabs } from 'constants/Common';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { closeConfirm, openConfirm } from 'store/slice/confirmSlice';
import { FormattedMessage } from 'react-intl';
import { TabPanel } from 'components/extended/Tabs';
import { exportDocument, getSearchParam, transformObject } from 'utils/common';
import { dateFormat } from 'utils/date';
import { useSearchParams } from 'react-router-dom';

// ==============================|| Sale List ||============================== //

const SalesLead = memo(() => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [
        SEARCH_PARAM_KEY.tab,
        SEARCH_PARAM_KEY.page,
        SEARCH_PARAM_KEY.size,
        // ====== tab 0 - Request ======
        SEARCH_PARAM_KEY.partnerName,
        SEARCH_PARAM_KEY.picUserName,
        SEARCH_PARAM_KEY.receivedDate,
        SEARCH_PARAM_KEY.status,
        SEARCH_PARAM_KEY.fullname,
        // ====== tab 1 - Supplier ======
        SEARCH_PARAM_KEY.supplierName,
        SEARCH_PARAM_KEY.fromDate,
        SEARCH_PARAM_KEY.toDate
    ];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);

    // delete unnecessary key value
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fullname, ...cloneParams }: any = params;

    // Hooks, State, Variable
    const defaultConditions = {
        ...salesLeadFilterConfig,
        ...cloneParams,
        picUserName: params.picUserName ? { value: params.picUserName, label: params.fullname } : null,
        partnerName: params.partnerName ? params.partnerName : null,
        receivedDate: params.receivedDate ? params.receivedDate : null,
        status: params.status ? params.status : '',
        supplierName: params.supplierName ? params.supplierName : null,
        fromDate: params.fromDate ? params.fromDate : null,
        toDate: params.toDate ? params.toDate : null
    };

    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [requests, setRequests] = useState<IRequestsChecking[]>([]);
    const [suppliers, setSuppliers] = useState<ISupplierChecking[]>([]);
    const [requestChecking, setRequestChecking] = useState<IRequestsChecking>(addOrEditRequestsCheckingFormDefault);
    const [supplierChecking, setSupplierChecking] = useState<ISupplierChecking>(addOrEditSupplierCheckingFormDefault);
    const [conditions, setConditions] = useState<ISalesLeadFilterConfig>(defaultConditions);
    const [formReset, setFormReset] = useState<ISalesLeadFilterConfig>(defaultConditions);
    const [tabValue, setTabValue] = useState(checkAllowedTab(saleListTabs, params.tab)[0]);
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse>({
        ...paginationResponseDefault,
        pageNumber: params.page ? params.page : paginationResponseDefault.pageNumber,
        pageSize: params.size ? params.size : paginationResponseDefault.pageSize
    });
    const [addOrEditLoading, setAddOrEditLoading] = useState<boolean>(false);
    const { saleList } = PERMISSIONS.sale;

    // Function
    const getDataTable = async (tabNumber?: number | string) => {
        setLoading(true);
        const response: IResponseList<IRequestsCheckingResponse | ISupplierCheckingResponse> = await sendRequest(
            tabNumber === 0 ? Api.sale_list.getRequestAll : Api.sale_list.getSupplierAll,
            {
                ...conditions,
                picUserName: conditions.picUserName ? conditions.picUserName.value! : null,
                page: conditions.page + 1,
                receivedDate: dateFormat(conditions.receivedDate),
                fromDate: dateFormat(conditions.fromDate),
                toDate: dateFormat(conditions.toDate)
            }
        );

        if (response) {
            const { status, result } = response;

            if (status) {
                const { content, pagination } = result;
                tabValue === 0 ? setRequests(content as IRequestsChecking[]) : setSuppliers(content as ISupplierChecking[]);
                setPaginationResponse({ ...paginationResponse, totalElement: pagination.totalElement });
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
        setRequests([]);
        setSuppliers([]);
        setLoading(false);
    };

    // Event
    const handleChangeTab = (event: SyntheticEvent, newTabValue: number) => {
        setTabValue(newTabValue);
        setConditions({ ...salesLeadFilterConfig });
        setFormReset({ ...salesLeadFilterConfig });
        setSearchParams({ tab: newTabValue } as any);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setConditions({ ...conditions, page: newPage });
        setSearchParams({ ...params, page: newPage } as any);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setConditions({ ...conditions, page: paginationParamDefault.page, size: parseInt(event.target.value, 10) });
        setSearchParams({ ...params, page: paginationParamDefault.page, size: parseInt(event.target.value, 10) } as any);
    };

    const handleOpenDialog = (item?: any) => {
        setIsEdit(item ? true : false);
        tabValue === 0
            ? setRequestChecking(
                item
                    ? {
                        ...item,
                        picUserName:
                            item.picUserName === null
                                ? null
                                : { value: item.picUserName, label: `${item.picFirstName} ${item.picLastName}` }
                    }
                    : addOrEditRequestsCheckingFormDefault
            )
            : setSupplierChecking(
                item
                    ? {
                        ...item,
                        picUserName:
                            item.picUserName === null
                                ? null
                                : { value: item.picUserName, label: `${item.picFirstName} ${item.picLastName}` }
                    }
                    : addOrEditSupplierCheckingFormDefault
            );
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    // Add Request
    const handleAddRequestsChecking = (requestCheckingValue: IRequestsChecking) => {
        postAddOrEditRequestsChecking({ ...requestCheckingValue, picUserName: requestCheckingValue.picUserName?.value });
    };

    // Add Supplier
    const handleAddSupplierChecking = (supplierCheckingValue: ISupplierChecking) => {
        postAddOrEditSupplierChecking({ ...supplierCheckingValue, picUserName: supplierCheckingValue.picUserName?.value });
    };

    //Edit Request
    const handleEditRequestsChecking = (requestCheckingValue: IRequestsChecking) => {
        postAddOrEditRequestsChecking({ ...requestCheckingValue, picUserName: requestCheckingValue.picUserName?.value });
    };

    // Edit Supplier
    const handleEditSupplierChecking = (supplierCheckingValue: ISupplierChecking) => {
        postAddOrEditSupplierChecking({ ...supplierCheckingValue, picUserName: supplierCheckingValue.picUserName?.value });
    };

    const handleOpenDeleteRequestsConfirm = (item: any, type?: string) => {
        dispatch(
            openConfirm({
                open: true,
                title: <FormattedMessage id="warning" />,
                content: type === 'delete' ? <FormattedMessage id="delete-record" /> : <FormattedMessage id="overwrite-record" />,
                handleConfirm: () => (type === 'delete' ? deleteRequestsCheckingById(`${item.idHexString}`) : '')
            })
        );
    };

    const handleOpenDeleteSupplierConfirm = (item: any, type?: string) => {
        dispatch(
            openConfirm({
                open: true,
                title: <FormattedMessage id="warning" />,
                content: type === 'delete' ? <FormattedMessage id="delete-record" /> : <FormattedMessage id="overwrite-record" />,
                handleConfirm: () => (type === 'delete' ? deleteSupplierCheckingById(`${item.idHexString}`) : '')
            })
        );
    };

    //Call API Request CreateOrUpdate
    const postAddOrEditRequestsChecking = async (value: IRequestsChecking) => {
        setAddOrEditLoading(true);
        const response: IResponseList<IRequestsCheckingResponse> = await sendRequest(Api.sale_list.postRequestsCreateOrUpdate, value);
        if (response) {
            const message = isEdit ? 'update-success' : 'add-success';
            dispatch(
                openSnackbar({
                    open: true,
                    message,
                    variant: 'alert',
                    alert: { color: 'success' }
                })
            );
            setAddOrEditLoading(false);
            tabValue === 0 ? getDataTable(0) : getDataTable(1);
            setOpen(false);
        } else {
            setAddOrEditLoading(false);
        }
    };

    const postAddOrEditSupplierChecking = async (value: ISupplierChecking) => {
        setAddOrEditLoading(true);
        const response: IResponseList<ISupplierCheckingResponse> = await sendRequest(Api.sale_list.postSupplierCreateOrUpdate, value);
        if (response) {
            const message = isEdit ? 'update-success' : 'add-success';
            dispatch(
                openSnackbar({
                    open: true,
                    message,
                    variant: 'alert',
                    alert: { color: 'success' }
                })
            );
            setAddOrEditLoading(false);
            tabValue === 1 ? getDataTable(1) : getDataTable(0);
            setOpen(false);
        } else {
            setAddOrEditLoading(false);
        }
    };

    //Call API Request delete
    const deleteRequestsCheckingById = async (idHexString: string) => {
        const response: IResponseList<IRequestsCheckingResponse> = await sendRequest(Api.sale_list.deleteRequests(idHexString));
        if (response) {
            const message = 'delete-success';
            dispatch(
                openSnackbar({
                    open: true,
                    message,
                    variant: 'alert',
                    alert: { color: 'success' }
                })
            );
            dispatch(closeConfirm());
            tabValue === 0 ? getDataTable(0) : getDataTable(1);
        }
    };

    const deleteSupplierCheckingById = async (idHexString: string) => {
        const response: IResponseList<IRequestsCheckingResponse> = await sendRequest(Api.sale_list.deleteSupplier(idHexString));
        if (response) {
            const message = 'delete-success';
            dispatch(
                openSnackbar({
                    open: true,
                    message,
                    variant: 'alert',
                    alert: { color: 'success' }
                })
            );
            dispatch(closeConfirm());
            tabValue === 0 ? getDataTable(0) : getDataTable(1);
        }
    };

    const handleExportDocument = () => {
        exportDocument(Api.sale_list.getDownload.url, {});
    };

    // Handle submit
    const handleRequestsSearch = (value: any) => {
        const { picUserName } = value;
        const saleListPicUserName = picUserName
            ? {
                ...value,
                tab: tabValue,
                picUserName: picUserName.value,
                fullname: picUserName.label
            }
            : { ...value, tab: tabValue };
        transformObject(saleListPicUserName);
        setSearchParams(saleListPicUserName);
        setConditions({ ...conditions, ...value, page: paginationParamDefault.page });
    };

    const handleSupplierSearch = (value: any) => {
        const { picUserName } = value;
        const saleListPicUserName = picUserName
            ? { ...value, tab: tabValue, picUserName: picUserName.value, fullname: picUserName.label }
            : { ...value, tab: tabValue };
        transformObject(saleListPicUserName);
        setSearchParams(saleListPicUserName);
        setConditions({ ...conditions, ...value, page: paginationParamDefault.page });
    };

    // Effect
    useEffect(() => {
        getDataTable(tabValue);
    }, [tabValue, conditions]);

    return (
        <>
            {/* Tabs  */}
            <TabCustom value={tabValue} handleChange={handleChangeTab} tabs={saleListTabs} />

            {/* Search form  */}
            <FilterCollapse
                handleExport={
                    checkAllowedPermission(saleList.downloadRequest)
                        ? handleExportDocument
                        : checkAllowedPermission(saleList.downloadSupplier)
                            ? handleExportDocument
                            : undefined
                }
            >
                <TabPanel value={tabValue} index={0}>
                    <RequestsCheckingSearch formReset={formReset} handleSearch={handleRequestsSearch} />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <SupplierCheckingSearch formReset={formReset} handleSearch={handleSupplierSearch} />
                </TabPanel>
            </FilterCollapse>

            {/* Table and Toolbar */}
            <MainCard>
                <TabPanel value={tabValue} index={0}>
                    {checkAllowedPermission(saleList.addRequest) && (
                        <TableToolbar handleOpen={handleOpenDialog} handleRefreshData={getDataTable} />
                    )}
                    <Table heads={<RequestsCheckingThead />} isLoading={loading} data={requests}>
                        <RequestsCheckingTBody
                            pageNumber={conditions.page}
                            pageSize={conditions.size}
                            requests={requests}
                            handleOpen={handleOpenDialog}
                            handleOpenDeleteConfirm={handleOpenDeleteRequestsConfirm}
                        />
                    </Table>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    {checkAllowedPermission(saleList.addSupplier) && (
                        <TableToolbar handleOpen={handleOpenDialog} handleRefreshData={getDataTable} />
                    )}
                    <Table heads={<SupplierCheckingThead />} isLoading={loading} data={suppliers}>
                        <SupplierCheckingTBody
                            suppliers={suppliers}
                            handleOpen={handleOpenDialog}
                            handleOpenDeleteConfirm={handleOpenDeleteSupplierConfirm}
                        />
                    </Table>
                </TabPanel>
            </MainCard>

            {/* Pagination  */}
            {!loading && tabValue < 2 && (
                <TableFooter
                    pagination={{ total: paginationResponse.totalElement, page: conditions.page, size: conditions.size }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}

            {/* Add or Edit Request Checking */}
            <AddOrEditRequestsChecking
                open={tabValue === 0 ? open : false}
                loading={addOrEditLoading}
                isEdit={isEdit}
                requestChecking={requestChecking}
                handleClose={handleCloseDialog}
                addRequest={handleAddRequestsChecking}
                editRequest={handleEditRequestsChecking}
            />

            {/* Add or Edit Supplier Checking */}
            <AddOrEditSupplierChecking
                open={tabValue === 1 ? open : false}
                loading={addOrEditLoading}
                isEdit={isEdit}
                supplierChecking={supplierChecking}
                handleClose={handleCloseDialog}
                addSupplier={handleAddSupplierChecking}
                editSupplier={handleEditSupplierChecking}
            />
        </>
    );
});

export default SalesLead;
