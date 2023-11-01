import React, { useEffect, useState } from 'react';

// projec import
import { EditSystemConfig, SystemConfigTBody, SystemConfigThead } from 'containers/administration';
import MainCard from 'components/cards/MainCard';
import { Table, TableFooter } from 'components/extended/Table';
import { SEARCH_PARAM_KEY, paginationParamDefault, paginationResponseDefault } from 'constants/Common';
import sendRequest from 'services/ApiService';
import Api from 'constants/Api';
import { IPaginationParam, IPaginationResponse, IResponseList, ISystemConfig, ISystemConfigList } from 'types';
import { configFormDefault } from './Config';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { useAppDispatch } from 'app/hooks';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';
import { getSearchParam, transformObject } from 'utils/common';

// third party
import { useSearchParams } from 'react-router-dom';

// ==============================|| System Config ||============================== //
/**
 *  page
 *  size
 */
const SystemConfig = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [SEARCH_PARAM_KEY.page, SEARCH_PARAM_KEY.size];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);

    // Hooks, State, Variable
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [editLoading, setEditLoading] = useState<boolean>(false);
    const [conditions, setConditions] = useState<IPaginationParam>({ ...paginationParamDefault, ...params });
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse>({
        ...paginationResponseDefault,
        pageNumber: params.page ? params.page : paginationResponseDefault.pageNumber,
        pageSize: params.size ? params.size : paginationResponseDefault.pageSize
    });
    const [systemConfigs, setSystemConfigs] = useState<ISystemConfig[]>([]);
    const [systemConfig, setSystemConfig] = useState<ISystemConfig>(configFormDefault);
    const { systemConfigPermission } = PERMISSIONS.admin;

    const getDataTable = async () => {
        setLoading(true);
        const response = await sendRequest(Api.system_config.getAll, {
            ...conditions,
            page: conditions.page + 1
        });
        if (response) {
            const { status, result } = response;
            if (status) {
                const { content, pagination } = result;
                setPaginationResponse({ ...paginationResponse, totalElement: pagination.totalElement });
                setSystemConfigs(content as ISystemConfig[]);
                setLoading(false);
            } else {
                setDataEmpty();
            }
            return;
        } else {
            setDataEmpty();
        }
    };

    const postEditConfig = async (valueConfig: ISystemConfig) => {
        setEditLoading(true);
        const response: IResponseList<ISystemConfigList> = await sendRequest(Api.system_config.postUpdateConfig, valueConfig);
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
            setOpen(false);
        }
    };

    const handleOpenDialog = (item?: any) => {
        setSystemConfig(
            item
                ? {
                      ...item,
                      key: item.key ? item.key : '',
                      value: item.value ? item.value : '',
                      note: item.note ? item.note : ''
                  }
                : configFormDefault
        );
        setOpen(true);
    };

    const setDataEmpty = () => {
        setSystemConfigs([]);
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

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleEditConfig = (configEdit: ISystemConfig) => {
        postEditConfig(configEdit);
    };

    useEffect(() => {
        getDataTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <MainCard>
                <Table heads={<SystemConfigThead />} isLoading={loading} data={systemConfigs}>
                    <SystemConfigTBody
                        page={conditions.page}
                        size={conditions.size}
                        systemConfigs={systemConfigs}
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

            {/*Edit config Dialog */}
            {checkAllowedPermission(systemConfigPermission.edit) && (
                <EditSystemConfig
                    open={open}
                    loading={editLoading}
                    systemConfig={systemConfig}
                    handleClose={handleCloseDialog}
                    editSystemConfig={handleEditConfig}
                />
            )}
        </div>
    );
};

export default SystemConfig;
