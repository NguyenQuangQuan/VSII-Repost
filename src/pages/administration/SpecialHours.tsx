import React, { useEffect, useState } from 'react';

// projec import
import { useAppDispatch } from 'app/hooks';
import { TableToolbar } from 'containers';
import { SpecialHoursThead } from 'containers/administration';
import AddOrEditSpecialHours from 'containers/administration/AddOrEditSpecialHours';
import ManageSpecialHolidaySearch from 'containers/administration/SpecialHoursSearch';
import SpecialHoursTBody from 'containers/administration/SpecialHoursTBody';
import { FilterCollapse } from 'containers/search';
import MainCard from 'components/cards/MainCard';
import { Table, TableFooter } from 'components/extended/Table';
import Api from 'constants/Api';
import { SEARCH_PARAM_KEY, paginationParamDefault, paginationResponseDefault } from 'constants/Common';
import sendRequest from 'services/ApiService';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { IPaginationResponse, ISpecialHours } from 'types';
import { holidaySearchConfig, IHolidaySearchConfig, saveOrUpdateSpecialHoursConfig } from './Config';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';
import { getSearchParam, transformObject } from 'utils/common';

// third party
import { useSearchParams } from 'react-router-dom';

// ==============================|| Manage SpecialHours ||============================== //
/**
 *  URL Params
 *  page
 *  size
 *  specialHoursType
 */
const SpecialHours = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [SEARCH_PARAM_KEY.page, SEARCH_PARAM_KEY.size, SEARCH_PARAM_KEY.holidayType];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);

    // Hooks, State, Variable
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [holidayPagination, setHolidayPagination] = useState<IPaginationResponse>({
        ...paginationResponseDefault,
        pageNumber: params.page ? params.page : paginationResponseDefault.pageNumber,
        pageSize: params.size ? params.size : paginationResponseDefault.pageSize
    });
    const [conditions, setConditions] = useState<IHolidaySearchConfig>({ ...holidaySearchConfig, ...params });
    const [formReset] = useState<IHolidaySearchConfig>({ ...holidaySearchConfig, ...params });
    const [specialHours, setSpecialHours] = useState<ISpecialHours[]>([]);
    const [specialHour, setSpecialHour] = useState<any>(saveOrUpdateSpecialHoursConfig);
    const [addOrEditLoading, setAddOrEditLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { specialHoursPermission } = PERMISSIONS.admin;

    // Function
    const getDataTable = async () => {
        setLoading(true);
        const response = await sendRequest(Api.special_hours.getAll, {
            ...conditions,
            page: conditions.page + 1
        });
        if (response) {
            const { status, result } = response;

            if (status) {
                const { content, pagination } = result;
                setHolidayPagination({ ...holidayPagination, totalElement: pagination.totalElement });
                setSpecialHours(content);
                setLoading(false);
            } else {
                setDataEmpty();
            }
            return;
        } else {
            setDataEmpty();
        }
    };

    const postAddOrEditSpecialHours = async (valueSpecialHours: ISpecialHours) => {
        setAddOrEditLoading(true);
        const response = await sendRequest(Api.special_hours.postSaveOrUpdateSpecialHours, valueSpecialHours);
        if (response) {
            const status = response.status;
            const message = isEdit ? 'edit-special-hours-success' : 'add-special-hours-success';
            dispatch(
                openSnackbar({
                    open: true,
                    message: status ? message : response.result.messages[0].message,
                    variant: 'alert',
                    alert: { color: status ? 'success' : 'error' }
                })
            );
            setAddOrEditLoading(false);

            if (status) {
                getDataTable();
                setOpen(false);
            }
        } else {
            setAddOrEditLoading(false);
        }
    };

    const setDataEmpty = () => {
        setSpecialHours([]);
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
    const handleSearch = (value: IHolidaySearchConfig) => {
        transformObject(value);
        const payload = { ...value, page: paginationParamDefault.page, size: conditions.size };
        setSearchParams(payload as any);
        setConditions(payload);
    };

    const handleOpenDialog = (item: any) => {
        setIsEdit(item ? true : false);
        setSpecialHour(
            item
                ? {
                      ...item,
                      fromDate: item.fromDate ? item.fromDate : '',
                      toDate: item.toDate ? item.toDate : '',
                      hourPerDay: item.hourPerDay ? item.hourPerDay : '0',
                      type: item.type ? item.type : '',
                      note: item.note ? item.note : ''
                  }
                : saveOrUpdateSpecialHoursConfig
        );
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleAddSpecialHours = (specialHoursAdd: ISpecialHours) => {
        postAddOrEditSpecialHours(specialHoursAdd);
    };

    const handleEditSpecialHours = (specialHoursEdit: ISpecialHours) => {
        postAddOrEditSpecialHours(specialHoursEdit);
    };

    // Effect
    useEffect(() => {
        getDataTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conditions]);

    return (
        <>
            {/* Search form  */}
            <FilterCollapse>
                <ManageSpecialHolidaySearch handleSearch={handleSearch} formReset={formReset} />
            </FilterCollapse>

            {/* Table */}
            <MainCard>
                {checkAllowedPermission(specialHoursPermission.add) && <TableToolbar handleOpen={handleOpenDialog} />}
                <Table heads={<SpecialHoursThead />} isLoading={loading} data={specialHours}>
                    <SpecialHoursTBody
                        pageNumber={conditions.page}
                        pageSize={conditions.size}
                        specialHours={specialHours}
                        handleOpen={handleOpenDialog}
                    />
                </Table>
            </MainCard>

            {/* Pagination  */}
            {!loading && (
                <TableFooter
                    pagination={{ total: holidayPagination?.totalElement ?? 0, page: conditions.page, size: conditions.size }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}

            {/* Add or edit special hours dialog */}
            {open && (
                <AddOrEditSpecialHours
                    open={open}
                    loading={addOrEditLoading}
                    isEdit={isEdit}
                    handleClose={handleCloseDialog}
                    specialHours={specialHour}
                    setSpecialHours={setSpecialHour}
                    addSpecialHours={handleAddSpecialHours}
                    editSpecialHours={handleEditSpecialHours}
                />
            )}
        </>
    );
};

export default SpecialHours;
