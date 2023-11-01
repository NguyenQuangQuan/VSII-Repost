import { useAppDispatch } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

// projec import
import MainCard from 'components/cards/MainCard';
import { Table, TableFooter } from 'components/extended/Table';
import Api from 'constants/Api';
import { SEARCH_PARAM_KEY, paginationParamDefault, paginationResponseDefault } from 'constants/Common';
import { PERMISSIONS } from 'constants/Permission';
import { TableToolbar } from 'containers';
import { ManageHolidaySearch, ManageHolidayTBody, ManageHolidayThead } from 'containers/administration';
import AddOrEditHoliday from 'containers/administration/AddOrEditHoliday ';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { IHoliday, IPaginationResponse } from 'types';
import { checkAllowedPermission } from 'utils/authorization';
import { getSearchParam, transformObject } from 'utils/common';
import { IHolidaySearchConfig, holidayFormDefault, holidaySearchConfig } from './Config';
import { closeConfirm, openConfirm } from 'store/slice/confirmSlice';

// third party

// ==============================|| Manage Holiday ||============================== //
/**
 *  URL Params
 *  page
 *  size
 *  holidayType
 */
const Holiday = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [SEARCH_PARAM_KEY.page, SEARCH_PARAM_KEY.size, SEARCH_PARAM_KEY.holidayType];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);

    // Hooks, State, Variable
    const [open, setOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [conditions, setConditions] = useState<IHolidaySearchConfig>({ ...holidaySearchConfig, ...params });
    const [formReset] = useState<IHolidaySearchConfig>({ ...holidaySearchConfig, ...params });
    const [holidays, setHolidays] = useState<IHoliday[]>([]);
    const [holiday, setHoliday] = useState<IHoliday>(holidayFormDefault);
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse>({
        ...paginationResponseDefault,
        pageNumber: params.page ? params.page : paginationResponseDefault.pageNumber,
        pageSize: params.size ? params.size : paginationResponseDefault.pageSize
    });
    const [addOrEditLoading, setAddOrEditLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { holidayPermission } = PERMISSIONS.admin;

    const getDataTable = async () => {
        setLoading(true);
        const response = await sendRequest(Api.holiday.getAll, {
            ...conditions,
            page: conditions.page + 1
        });
        if (response) {
            const { content } = response.result;
            setPaginationResponse(response.result.pagination);
            setHolidays(content);
            setLoading(false);
        } else {
            setDataEmpty();
        }
    };

    const postAddOrEditHoliday = async (valueHoliday: IHoliday) => {
        setAddOrEditLoading(true);
        const response = await sendRequest(Api.holiday.postSaveOrUpdateHoliday, valueHoliday);
        if (response) {
            const status = response.status;
            const message = isEdit ? 'update-success' : 'add-success';
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

    // Call API Holiday delete
    const deleteHoliday = async (id: string) => {
        const response = await sendRequest(Api.holiday.delete, {
            id
        });
        const { status } = response;
        if (status) {
            dispatch(openSnackbar({ open: true, message: 'delete-success', variant: 'alert', alert: { color: 'success' } }));
            dispatch(closeConfirm());
            getDataTable();
        }
    };

    const setDataEmpty = () => {
        setHolidays([]);
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

    const handleOpenDialog = (item?: any) => {
        setIsEdit(item ? true : false);
        setHoliday(
            item
                ? {
                      ...item,
                      fromDate: item.fromDate ? item.fromDate : '',
                      toDate: item.toDate ? item.toDate : '',
                      type: item.type ? item.type : '',
                      note: item.note ? item.note : ''
                  }
                : holidayFormDefault
        );
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setHoliday(holidayFormDefault);
    };

    const handleAddHoliday = (holidayNew: IHoliday) => {
        postAddOrEditHoliday(holidayNew);
    };

    const handleEditHoliday = (holidayEdit: IHoliday) => {
        postAddOrEditHoliday(holidayEdit);
    };

    const handleOpenConfirm = (id: string) => {
        dispatch(
            openConfirm({
                open: true,
                title: <FormattedMessage id="warning" />,
                content: <FormattedMessage id="delete-record" />,
                handleConfirm: () => deleteHoliday(id)
            })
        );
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
                <ManageHolidaySearch formReset={formReset} handleSearch={handleSearch} />
            </FilterCollapse>

            {/* Table */}
            <MainCard>
                {checkAllowedPermission(holidayPermission.add) && <TableToolbar handleOpen={handleOpenDialog} />}
                <Table heads={<ManageHolidayThead />} isLoading={loading} data={holidays}>
                    <ManageHolidayTBody
                        pageNumber={conditions.page}
                        pageSize={conditions.size}
                        holidays={holidays}
                        handleOpen={handleOpenDialog}
                        handleOpenConfirm={handleOpenConfirm}
                    />
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
            <AddOrEditHoliday
                open={open}
                loading={addOrEditLoading}
                isEdit={isEdit}
                holiday={holiday}
                handleClose={handleCloseDialog}
                addHoliday={handleAddHoliday}
                editHoliday={handleEditHoliday}
            />
        </>
    );
};

export default Holiday;
