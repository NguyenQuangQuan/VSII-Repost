import React, { useEffect, useState } from 'react';

// project import
import { ManageRankTBody, ManageRankThead } from 'containers/administration';
import EditRank from 'containers/administration/EditRank';
import { Table, TableFooter } from 'components/extended/Table';
import MainCard from 'components/cards/MainCard';
import Api from 'constants/Api';
import { SEARCH_PARAM_KEY, paginationParamDefault, paginationResponseDefault } from 'constants/Common';
import sendRequest from 'services/ApiService';
import { IPaginationParam, IPaginationResponse, IRank, IRankList, IResponseList } from 'types';
import { IEditRank, rankValueDefault } from './Config';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { useAppDispatch } from 'app/hooks';
import { getSearchParam, transformObject } from 'utils/common';

// third party
import { useSearchParams } from 'react-router-dom';

// ==============================|| Manage Rank ||============================== //
/**
 *  page
 *  size
 */
const Rank = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [SEARCH_PARAM_KEY.page, SEARCH_PARAM_KEY.size];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);

    // Hooks, State, Variable
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [editLoading, setEditLoading] = useState<boolean>(false);
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse>({
        ...paginationResponseDefault,
        pageNumber: params.page ? params.page : paginationResponseDefault.pageNumber,
        pageSize: params.size ? params.size : paginationResponseDefault.pageSize
    });
    const [conditions, setConditions] = useState<IPaginationParam>({ ...paginationParamDefault, ...params });
    const [ranks, setRanks] = useState<IRank[]>([]);
    const [rank, setRank] = useState<IRank>(rankValueDefault);

    const getDataTable = async () => {
        setLoading(true);
        const response = await sendRequest(Api.rank.getAll, { ...conditions, page: conditions.page + 1 });
        if (response) {
            const { status, result } = response;

            if (status) {
                const { content } = result;
                setPaginationResponse(response.result.pagination);
                setRanks(content as IRank[]);
                setLoading(false);
            } else {
                setDataEmpty();
            }
            return;
        } else {
            setDataEmpty();
        }
    };

    const postEditRank = async (valueRank: IEditRank) => {
        setEditLoading(true);
        const response: IResponseList<IRankList> = await sendRequest(Api.rank.postUpdateRank, valueRank);
        if (response) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'update-success',
                    variant: 'alert',
                    alert: { color: 'success' }
                })
            );
            setEditLoading(false);
            getDataTable();
            setRank(rankValueDefault);
            setOpen(false);
        } else {
            setEditLoading(false);
        }
    };

    const setDataEmpty = () => {
        setRanks([]);
        setLoading(false);
    };

    // Event
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setConditions({ ...conditions, page: newPage });
        setSearchParams({ ...params, page: newPage } as any);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setConditions({ ...conditions, page: paginationParamDefault.page, size: parseInt(event.target.value, 10) });
        setSearchParams({ ...params, page: paginationParamDefault.page, size: parseInt(event.target.value, 10) } as any);
    };

    // Handle submit
    const handleOpenDialog = (item: any) => {
        setRank(item);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setRank(rankValueDefault);
    };

    const handleEditRank = (rankEdit: IEditRank) => {
        postEditRank(rankEdit);
    };

    useEffect(() => {
        getDataTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conditions]);

    return (
        <>
            {/* Table */}
            <MainCard>
                <Table heads={<ManageRankThead />} isLoading={loading} data={ranks}>
                    <ManageRankTBody pageNumber={conditions.page} pageSize={conditions.size} ranks={ranks} handleOpen={handleOpenDialog} />
                </Table>
            </MainCard>

            {/* Pagination  */}
            {!loading && (
                <TableFooter
                    pagination={{ total: paginationResponse?.totalElement ?? 0, page: conditions.page, size: conditions.size }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}

            {/*Edit rank Dialog */}
            {open && (
                <EditRank open={open} loading={editLoading} rank={rank} handleClose={handleCloseDialog} handleEditRank={handleEditRank} />
            )}
        </>
    );
};

export default Rank;
