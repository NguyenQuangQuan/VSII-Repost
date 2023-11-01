import React, { SyntheticEvent, useEffect, useState } from 'react';

// project imports
import { useAppDispatch } from 'app/hooks';
import MainCard from 'components/cards/MainCard';
import { Table, TableFooter } from 'components/extended/Table';
import Api from 'constants/Api';
import {
    PERMISSION_EXPANDED_DEFAULT_VALUE,
    SEARCH_PARAM_KEY,
    TREEITEM_DEFAULT_VALUE,
    paginationParamDefault,
    paginationResponseDefault
} from 'constants/Common';
import { TableToolbar } from 'containers';
import { AddOrEditGroup, ManageGroupSearch, ManageGroupTBody, ManageGroupThead } from 'containers/administration';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { IAssignedUser, IGroupItem, IGroups, IPaginationResponse, IResponseList, ITreeItem, ITreeItemList } from 'types';
import { IGroupSearchConfig, ISaveOrUpdateGroupConfig, groupSearchConfig } from './Config';
import { TreeItem } from 'components/extended/Tree';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';
import { getSearchParam, transformObject } from 'utils/common';

// third party
import { useSearchParams } from 'react-router-dom';

// ==============================|| Manage Group ||============================== //
/**
 *  URL Params
 *  page
 *  size
 *  groupCode
 *  groupName
 */
const Group = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [SEARCH_PARAM_KEY.page, SEARCH_PARAM_KEY.size, SEARCH_PARAM_KEY.groupCode, SEARCH_PARAM_KEY.groupName];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);
    // Hooks, State, Variable
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingDataAssignedUser, setloadingDataAssignedUser] = useState<boolean>(false);
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse>({
        ...paginationResponseDefault,
        pageNumber: params.page ? params.page : paginationResponseDefault.pageNumber,
        pageSize: params.size ? params.size : paginationResponseDefault.pageSize
    });
    const [group, setGroup] = useState<IGroupItem>();
    const [groups, setGroups] = useState<IGroupItem[]>([]);
    const [assignedUser, setAssignedUser] = useState<IAssignedUser[]>([]);
    const [conditions, setConditions] = useState<IGroupSearchConfig>({ ...groupSearchConfig, ...params });
    const [formReset] = useState<IGroupSearchConfig>({ ...groupSearchConfig, ...params });
    const [tabValue, setTabValue] = useState<number>(0);
    const [open, setOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [selectedPermission, setSelectedPermission] = useState<string[]>([]);
    const [selectedExpanded, setSelectedExpanded] = useState<string[]>([]);
    const [permission, setPermission] = useState<ITreeItem>(TREEITEM_DEFAULT_VALUE);
    const { groupPermission } = PERMISSIONS.admin;
    // Function
    const getDataTable = async () => {
        setLoading(true);
        const response: IResponseList<IGroups> = await sendRequest(Api.group.getAll, { ...conditions, page: conditions.page + 1 });
        if (response) {
            const { status, result } = response;
            if (status) {
                const { content, pagination } = result;
                setGroups(content);
                setPaginationResponse(
                    pagination ? { ...paginationResponse, totalElement: pagination.totalElement } : paginationResponseDefault
                );
                setLoading(false);
            } else {
                setDataEmpty();
            }
        } else {
            setDataEmpty();
        }
    };

    const getDataTableUser = async () => {
        if (isEdit) {
            setloadingDataAssignedUser(true);
            const response = await sendRequest(Api.member.getAll, {
                groupId: group?.groupId
            });
            if (response) {
                const { status, result } = response;
                if (status && result) {
                    const { content } = result;
                    setAssignedUser(content);
                    setloadingDataAssignedUser(false);
                } else {
                    setDataEmpty();
                }
            }
        } else {
            setDataEmpty();
        }
    };

    const getAllFunction = async () => {
        const response: IResponseList<ITreeItemList> = await sendRequest(Api.master.getFunctionAll);
        if (response) {
            const { status, result } = response;
            if (status) {
                setPermission({ ...permission, children: result.content });
            }
        }
    };

    const setDataEmpty = () => {
        setGroups([]);
        setAssignedUser([]);
        setLoading(false);
        setPaginationResponse(paginationResponseDefault);
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

    const handleOpenDialog = (item?: IGroupItem) => {
        if (item) {
            setIsEdit(true);
            if (item.children.length > 0) {
                item.children.forEach((module) => {
                    module!.children &&
                        module.children.forEach((mainFnc) => {
                            mainFnc.children &&
                                mainFnc.children.forEach((fnc) => {
                                    setSelectedPermission((prv) => [...prv, fnc.value]);
                                    setSelectedExpanded((prv) => [...prv, fnc.value]);
                                });
                            setSelectedExpanded((prv) => [...prv, mainFnc.value]);
                        });
                    setSelectedExpanded((prv) => [...prv, module.value]);
                });
            } else {
                setSelectedExpanded(PERMISSION_EXPANDED_DEFAULT_VALUE);
            }
            setGroup(item);
        } else {
            setIsEdit(false);
            setGroup(undefined);
            setSelectedPermission([]);
        }
        setTabValue(0);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setSelectedExpanded([]);
        setSelectedPermission([]);
        setOpen(false);
    };

    const handleChangeTab = (event: SyntheticEvent, newTabValue: number) => {
        setTabValue(newTabValue);
    };

    // Handle submit
    const handleSearch = (value: IGroupSearchConfig) => {
        transformObject(value);
        setSearchParams({ ...value, page: paginationParamDefault.page, size: conditions.size } as any);
        setConditions({ ...value, page: paginationParamDefault.page, size: conditions.size });
    };

    const handlePostSaveOrUpdateGroup = async (values: ISaveOrUpdateGroupConfig) => {
        const payload = { ...values, functions: selectedPermission };
        const response = await sendRequest(Api.group.postSaveOrUpdate, payload);
        if (response) {
            const { status, result } = response;
            if (status) {
                if (result.content) {
                    handleCloseDialog();
                    getDataTable();
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: isEdit ? 'update-success' : 'add-success',
                            variant: 'alert',
                            alert: { color: 'success' }
                        })
                    );
                }
            }
        }
    };

    // Effect
    useEffect(() => {
        getDataTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conditions]);

    useEffect(() => {
        getDataTableUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [group?.groupId]);

    useEffect(() => {
        getAllFunction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {/* Search form */}
            <FilterCollapse>
                <ManageGroupSearch formReset={formReset} handleSearch={handleSearch} />
            </FilterCollapse>

            {/* Table */}
            <MainCard>
                {checkAllowedPermission(groupPermission.add) && (
                    <TableToolbar handleOpen={handleOpenDialog} handleRefreshData={getDataTable} />
                )}
                <Table heads={<ManageGroupThead />} isLoading={loading} data={groups}>
                    <ManageGroupTBody
                        pageNumber={conditions.page}
                        pageSize={conditions.size}
                        groups={groups}
                        handleOpen={handleOpenDialog}
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

            {/* Add or Edit Group */}
            <AddOrEditGroup
                modal={{ open, handleClose: handleCloseDialog }}
                tab={{ tabValue, handleChangeTab }}
                group={group}
                assignedUser={assignedUser}
                loading={loadingDataAssignedUser}
                isEdit={isEdit}
                handleSubmit={handlePostSaveOrUpdateGroup}
                selectedExpand={selectedExpanded}
                renderTree={<TreeItem list={permission} setSelected={setSelectedPermission} selected={selectedPermission} />}
            />
        </>
    );
};

export default Group;
