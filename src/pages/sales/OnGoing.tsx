/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// project imports
import { FilterCollapse } from 'containers/search';
import { AddOrEditOnGoing, OnGoingSearch, OnGoingTBody, OnGoingThead, OnGoingTotal } from 'containers/sales';
import { IOnGoingConfig, onGoingConfig } from './Config';
import { SEARCH_PARAM_KEY, paginationParamDefault, paginationResponseDefault } from 'constants/Common';
import { IPaginationResponse, IResponseList, ISaleOnGoingItem, ISaleOnGoingList, ITotalOnGoing } from 'types';
import { getSearchParam, transformObject } from 'utils/common';
import MainCard from 'components/cards/MainCard';
import { TableToolbar } from 'containers';
import { Table, TableFooter } from 'components/extended/Table';
import sendRequest from 'services/ApiService';
import Api from 'constants/Api';
import { useAppDispatch } from 'app/hooks';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { closeConfirm, openConfirm } from 'store/slice/confirmSlice';
import { PERMISSIONS } from 'constants/Permission';
import { checkAllowedPermission } from 'utils/authorization';

// third party
import { FormattedMessage } from 'react-intl';

// ==============================|| On Going ||============================== //
/**
 *  URL Params
 *  page
 *  size
 *  type
 *  year
 *  projectName
 *  productionPerformanceIdHexString
 *  status
 */
const OnGoing = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [
        SEARCH_PARAM_KEY.page,
        SEARCH_PARAM_KEY.size,
        SEARCH_PARAM_KEY.type,
        SEARCH_PARAM_KEY.year,
        SEARCH_PARAM_KEY.projectName,
        SEARCH_PARAM_KEY.productionPerformanceIdHexString,
        SEARCH_PARAM_KEY.status
    ];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);
    // delete unnecessary key value
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projectName, ...cloneParams }: any = params;
    // Hooks, State, Variable
    const defaultConditions = {
        ...onGoingConfig,
        ...cloneParams,
        productionPerformanceIdHexString: params.productionPerformanceIdHexString
            ? { value: params.productionPerformanceIdHexString, label: params.projectName }
            : null
    };

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const [year, setYear] = useState<number>();
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse>({
        ...paginationResponseDefault,
        pageNumber: params.page ? params.page : paginationResponseDefault.pageNumber,
        pageSize: params.size ? params.size : paginationResponseDefault.pageSize
    });
    const [projects, setProjects] = useState<ISaleOnGoingItem[]>([]);
    const [project, setProject] = useState<any>(null);
    const [addOrEditLoading, setAddOrEditLoading] = useState<boolean>(false);
    const [totalOnGoing, setTotalOnGoing] = useState<ITotalOnGoing>();
    const [conditions, setConditions] = useState<IOnGoingConfig>(defaultConditions);
    const [formReset] = useState<IOnGoingConfig>(defaultConditions);
    const [open, setOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const { onGoingPermission } = PERMISSIONS.sale.salePipeline

    // Functions
    const setDataEmpty = () => {
        setProjects([]);
        setTotalOnGoing(undefined)
        setLoading(false);
    };

    const getDataTable = async () => {
        setLoading(true);
        const response: IResponseList<ISaleOnGoingList> = await sendRequest(Api.sale_pipeline_on_going.getAll, {
            ...conditions,
            productionPerformanceIdHexString: conditions?.productionPerformanceIdHexString
                ? conditions?.productionPerformanceIdHexString.value
                : null,
            page: conditions.page + 1
        });
        if (response) {
            const { status, result } = response;
            if (status) {
                const { content, pagination } = result;
                setPaginationResponse({ ...paginationResponse, totalElement: pagination?.totalElement });
                setProjects(content.data);
                setTotalOnGoing(content.total);
                setLoading(false);
            } else {
                setDataEmpty();
            }
        } else {
            setDataEmpty();
        }
    };

    const postAddOrEditOnGoing = async (payload: any) => {
        setAddOrEditLoading(true);
        const response = await sendRequest(Api.sale_pipeline_on_going.saveOrUpdate, payload);
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
                dispatch(
                    openSnackbar({
                        open: true,
                        message: response.message,
                        variant: 'alert',
                        alert: { color: 'warning' }
                    })
                );
            }
        } else {
            setAddOrEditLoading(false);
        }
    };

    const deleteProjectOnGoing = async (idHexString: string) => {
        const response = await sendRequest(Api.sale_pipeline_on_going.delete, { idHexString });
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

    // Events
    const handleOpenDeleteProjectOnGoing = (idHexString: string) => {
        dispatch(
            openConfirm({
                open: true,
                title: <FormattedMessage id="warning" />,
                content: (
                    <>
                        <FormattedMessage id="messege-delete" />
                    </>
                ),
                handleConfirm: () => deleteProjectOnGoing(idHexString)
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

    const handleSearch = (values: any) => {
        const { productionPerformanceIdHexString } = values;
        transformObject(values);
        const paramsSearchOnGoing = productionPerformanceIdHexString
            ? {
                ...values,
                productionPerformanceIdHexString: productionPerformanceIdHexString.value,
                projectName: productionPerformanceIdHexString.label
            }
            : { ...values };
        setSearchParams(paramsSearchOnGoing);
        setConditions({ ...values });
    };

    const handleOpenDialog = (item?: ISaleOnGoingItem) => {
        setIsEdit(item ? true : false);
        setProject(item);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };
    const handleChangeYear = (e: ChangeEvent<HTMLInputElement>) => {
        setYear(+e.target.value as number);
    };

    // Effects
    useEffect(() => {
        getDataTable();
    }, [conditions]);

    return (
        <>
            {/* Search form */}
            <FilterCollapse>
                <OnGoingSearch formReset={formReset} handleSearch={handleSearch} handleChangeYear={handleChangeYear} year={year} />
            </FilterCollapse>

            {/* Total */}
            <OnGoingTotal loading={loading} total={totalOnGoing!} />

            {/* Table and Toolbar */}
            <MainCard>
                <TableToolbar handleOpen={checkAllowedPermission(onGoingPermission.add) ? handleOpenDialog : undefined} />
                <Table heads={<OnGoingThead />} isLoading={loading} data={projects}>
                    <OnGoingTBody
                        page={conditions.page}
                        size={conditions.size}
                        items={projects}
                        handleOpen={handleOpenDialog}
                        handleDelete={handleOpenDeleteProjectOnGoing}
                    />
                </Table>
            </MainCard>
            {/* Pagination */}
            {!loading && (
                <TableFooter
                    pagination={{ total: paginationResponse.totalElement, page: conditions.page, size: conditions.size }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
            {/* Add or Edit User Dialog */}
            {open && (
                <AddOrEditOnGoing
                    year={conditions.year}
                    open={open}
                    project={project}
                    handleClose={handleCloseDialog}
                    isEdit={isEdit}
                    loading={addOrEditLoading}
                    postAddOrEdit={postAddOrEditOnGoing}
                />
            )}
        </>
    );
};

export default OnGoing;
