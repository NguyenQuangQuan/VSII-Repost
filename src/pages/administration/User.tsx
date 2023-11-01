/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

// project imports
import { store } from 'app/store';
import MainCard from 'components/cards/MainCard';
import { Table, TableFooter } from 'components/extended/Table';
import Api from 'constants/Api';
import { SEARCH_PARAM_KEY, paginationParamDefault, paginationResponseDefault } from 'constants/Common';
import { TableToolbar } from 'containers';
import { AddOrEditUser, UserSearch, UserTBody, UserThead } from 'containers/administration';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { IMember, IMemberList, IMemberResponse, IPaginationResponse, IResponseList } from 'types';
import { IUserFilterConfig, userFilterConfig, userFormDefault } from './Config';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';
import { getSearchParam, transformObject } from 'utils/common';

// third party
import { useSearchParams } from 'react-router-dom';

// ==============================|| Manage User ||============================== //
/**
 *  page
 *  size
 *  memberCode
 *  userName
 *  departmentId
 *  status
 */
const ManageUser = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [
        SEARCH_PARAM_KEY.page,
        SEARCH_PARAM_KEY.size,
        SEARCH_PARAM_KEY.memberCode,
        SEARCH_PARAM_KEY.userName,
        SEARCH_PARAM_KEY.departmentId,
        SEARCH_PARAM_KEY.status,
        SEARCH_PARAM_KEY.contractor
    ];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);

    // Hooks, State, Variable
    const defaultConditions = { ...userFilterConfig, ...params };
    const [loading, setLoading] = useState<boolean>(false);
    const [addOrEditLoading, setAddOrEditLoading] = useState<boolean>(false);
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse>({
        ...paginationResponseDefault,
        pageNumber: params.page ? params.page : paginationResponseDefault.pageNumber,
        pageSize: params.size ? params.size : paginationResponseDefault.pageSize
    });
    const [users, setUsers] = useState<IMember[]>([]);
    const [conditions, setConditions] = useState<IUserFilterConfig>(defaultConditions);
    const [formReset] = useState<IUserFilterConfig>(defaultConditions);
    const [user, setUser] = useState<IMember>(userFormDefault);
    const [open, setOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const { userPermission } = PERMISSIONS.admin;

    // Function
    const getDataTable = async () => {
        setLoading(true);
        const response: IResponseList<IMemberList> = await sendRequest(Api.member.getAll, {
            ...conditions,
            page: conditions.page + 1
        });

        if (response) {
            const { status, result } = response;

            if (status) {
                const { content, pagination } = result;
                setPaginationResponse({ ...paginationResponse, totalElement: pagination.totalElement });
                setUsers(content as IMember[]);
                setLoading(false);
            } else {
                setDataEmpty();
            }
            return;
        } else {
            setDataEmpty();
        }
    };

    const postAddOrEditUser = async (payload: IMember) => {
        setAddOrEditLoading(true);
        const response: IResponseList<IMemberResponse> = await sendRequest(Api.member.postSaveOrUpdate, payload);
        if (response) {
            if (response.status) {
                setAddOrEditLoading(false);
                setOpen(false);
                store.dispatch(
                    openSnackbar({
                        open: true,
                        message: isEdit ? 'update-success' : 'add-success',
                        variant: 'alert',
                        alert: { color: 'success' }
                    })
                );
                getDataTable();
            } else {
                setAddOrEditLoading(false);
            }
        } else {
            setAddOrEditLoading(false);
        }
    };

    const setDataEmpty = () => {
        setUsers([]);
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

    const handleOpenDialog = (item?: any) => {
        setIsEdit(item ? true : false);
        setUser(
            item
                ? {
                    ...item,
                    departmentId: item.departmentId ? item.departmentId : '',
                    rankId: item.rankId ? item.rankId : '',
                    titleCode: item.titleCode ? item.titleCode : '',
                    groups: item.groups ? item.groups : [],
                    contractor: item.contractor === 'Yes' ? true : false,
                    logtime: item.logtime === 'Yes' ? true : false
                }
                : userFormDefault
        );
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    // Handle submit
    const handleSearch = (value: any) => {
        transformObject(value);
        setSearchParams(value);
        setConditions({ ...value });
    };

    const handleAddUser = (userNew: IMember) => {
        postAddOrEditUser(userNew);
    };

    const handleEditUser = (userEdit: IMember) => {
        postAddOrEditUser(userEdit);
    };

    // Effect
    useEffect(() => {
        getDataTable();
    }, [conditions]);

    return (
        <>
            {/* Search form  */}
            <FilterCollapse>
                <UserSearch formReset={formReset} handleSearch={handleSearch} />
            </FilterCollapse>

            {/* Table and Toolbar */}
            <MainCard>
                {checkAllowedPermission(userPermission.add) && (
                    <TableToolbar handleOpen={handleOpenDialog} handleRefreshData={getDataTable} />
                )}
                <Table heads={<UserThead />} isLoading={loading} data={users}>
                    <UserTBody page={conditions.page} size={conditions.size} users={users} handleOpen={handleOpenDialog} />
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

            {/* Add or Edit User Dialog */}
            {open && (
                <AddOrEditUser
                    open={open}
                    loading={addOrEditLoading}
                    isEdit={isEdit}
                    user={user}
                    handleClose={handleCloseDialog}
                    addUser={handleAddUser}
                    editUser={handleEditUser}
                />
            )}
        </>
    );
};

export default ManageUser;
