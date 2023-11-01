/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

// project imports
import { useAppDispatch } from 'app/hooks';
import MainCard from 'components/cards/MainCard';
import { Table, TableFooter } from 'components/extended/Table';
import Api from 'constants/Api';
import { SEARCH_PARAM_KEY, paginationParamDefault, paginationResponseDefault } from 'constants/Common';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import { IBiddingResponse, IMonthlyBillable, IPaginationResponse, IResponseList, ISaleBidding, ITotalBidding } from 'types';
import { PERMISSIONS } from 'constants/Permission';
import { IBiddingFilterConfig, biddingFilterConfig } from './Config';
import { AddOrEditBidding, BiddingSearch, BiddingTBody, BiddingThead, BiddingTotal } from 'containers/sales';
import { TableToolbar } from 'containers';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { closeConfirm, openConfirm } from 'store/slice/confirmSlice';
import { getSearchParam, transformObject } from 'utils/common';

// third party
import { useSearchParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { checkAllowedPermission } from 'utils/authorization';

// ==============================|| Bidding ||============================== //
/**
 *  URL Params
 *  type
 *  year
 *  projectName
 *  status
 */
const Bidding = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [SEARCH_PARAM_KEY.page, SEARCH_PARAM_KEY.size, SEARCH_PARAM_KEY.type, SEARCH_PARAM_KEY.year, SEARCH_PARAM_KEY.status];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    // Hooks, State, Variable
    const defaultConditions = {
        ...biddingFilterConfig,
        ...params
    };
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse>({
        ...paginationResponseDefault,
        pageNumber: params.page ? params.page : paginationResponseDefault.pageNumber,
        pageSize: params.size ? params.size : paginationResponseDefault.pageSize
    });
    const [saleBiddings, setSaleBiddings] = useState<ISaleBidding[]>([]);
    const [saleBidding, setSaleBidding] = useState<ISaleBidding>();
    const [totalBidding, setTotalBidding] = useState<ITotalBidding>();
    const [addOrEditLoading, setAddOrEditLoading] = useState<boolean>(false);
    const [conditions, setConditions] = useState<IBiddingFilterConfig>(defaultConditions);
    const [formReset] = useState<IBiddingFilterConfig>(defaultConditions);
    const [open, setOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [monthlyBillable, setMonthlyBillable] = useState<IMonthlyBillable>();
    const [exchangeRateVND, setexchangeRateVND] = useState<number>();
    const { biddingPermission } = PERMISSIONS.sale.salePipeline;

    // Function
    const getDataTable = async () => {
        setLoading(true);
        const response: IResponseList<IBiddingResponse> = await sendRequest(Api.sale_pipe_line_bidding.getBidding, {
            ...conditions,
            page: conditions.page + 1
        });

        if (response) {
            const { status, result } = response;

            if (status) {
                const { content, pagination } = result;
                setSaleBiddings(content.saleBidding);
                setTotalBidding(content.totalBidding);
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

    const getMonthlyBillable = async () => {
        const params = { year: conditions.year };
        const response = await sendRequest(Api.sale_pipe_line_bidding.getMonthlyBillable, params);
        if (response) {
            const { status, result } = response;
            if (status && result) {
                setMonthlyBillable(result.content);
            }
        }
    };

    const getCurrency = async () => {
        const params = { year: conditions.year ? conditions.year : 2023, currency: 'VND' };
        const response = await sendRequest(Api.sale_productivity.getExchangeRate, params);
        if (response) {
            const { status, result } = response;
            if (status && result) {
                setexchangeRateVND(result.content[0].exchangeRate);
            }
        }
    };

    const deleteProjectBidding = async (idHexString: string) => {
        const response = await sendRequest(Api.sale_pipe_line_bidding.deleteBidding, { idHexString });
        if (response.status) {
            dispatch(closeConfirm());
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'delete-success',
                    variant: 'alert',
                    alert: { color: 'success' }
                })
            );
            getDataTable();
        }
    };
    const setDataEmpty = () => {
        setSaleBiddings([]);
        setTotalBidding(undefined);
        setLoading(false);
    };

    // Event
    const handleOpenDeleteProjectBidding = (idHexString: string) => {
        dispatch(
            openConfirm({
                open: true,
                title: <FormattedMessage id="warning" />,
                content: (
                    <>
                        <FormattedMessage id="messege-delete" />
                    </>
                ),
                handleConfirm: () => deleteProjectBidding(idHexString)
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

    const handleOpenDialog = (item?: any) => {
        setIsEdit(item ? true : false);
        setSaleBidding(item);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    // Handle submit
    const handleSearch = (values: any) => {
        transformObject(values);
        setSearchParams(values);
        setConditions(values);
    };

    const handlePostAddOrEditBidding = async (payload: any) => {
        setAddOrEditLoading(true);
        const response = await sendRequest(Api.sale_pipe_line_bidding.postAddOrEditBidding, payload);
        if (response) {
            if (response.status) {
                setAddOrEditLoading(false);
                setOpen(false);
                getDataTable();
                dispatch(
                    openSnackbar({
                        open: true,
                        message: isEdit ? 'update-success' : 'add-success',
                        variant: 'alert',
                        alert: { color: 'success' }
                    })
                );
            } else {
                setAddOrEditLoading(false);
            }
        } else {
            setAddOrEditLoading(false);
        }
    };

    // Effect
    useEffect(() => {
        getDataTable();
    }, [conditions]);

    useEffect(() => {
        getMonthlyBillable();
        getCurrency();
    }, [conditions.year]);

    return (
        <>
            {/* Search form  */}
            <FilterCollapse>
                <BiddingSearch formReset={formReset} handleSearch={handleSearch} />
            </FilterCollapse>

            {/* Non Bill Total  */}
            <BiddingTotal totalBidding={totalBidding!} loading={loading} />

            <MainCard>
                <TableToolbar
                    handleOpen={checkAllowedPermission(biddingPermission.add) ? handleOpenDialog : undefined}
                    handleRefreshData={getDataTable}
                />
                <Table heads={<BiddingThead />} isLoading={loading} data={saleBiddings}>
                    <BiddingTBody
                        pageNumber={conditions.page}
                        pageSize={conditions.size}
                        handleOpen={handleOpenDialog}
                        saleBiddings={saleBiddings}
                        handleDelete={handleOpenDeleteProjectBidding}
                    />
                </Table>
            </MainCard>
            {/* Pagination  */}
            {!loading && (
                <TableFooter
                    pagination={{ total: paginationResponse.totalElement, page: conditions.page, size: conditions.size }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}

            {/* Add or Edit Biddng */}
            {open && (
                <AddOrEditBidding
                    open={open}
                    loading={addOrEditLoading}
                    isEdit={isEdit}
                    saleBidding={saleBidding}
                    handleClose={handleCloseDialog}
                    year={conditions.year}
                    postAddOrEdit={handlePostAddOrEditBidding}
                    monthlyBillable={monthlyBillable}
                    exchangeRateVND={exchangeRateVND}
                />
            )}
        </>
    );
};

export default Bidding;
