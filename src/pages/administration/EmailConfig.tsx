import React, { useEffect, useState } from 'react';

// projec import
import { AddOrEditEmailConfig, EmailConfigTBody, EmailConfigThead } from 'containers/administration';
import MainCard from 'components/cards/MainCard';
import { Table } from 'components/extended/Table';
import sendRequest from 'services/ApiService';
import Api from 'constants/Api';
import { IResponseList, IEmailConfig, IEmailConfigList } from 'types';
import { addOrEditEmailConfigFormDefault } from './Config';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { useAppDispatch } from 'app/hooks';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';
import { TableToolbar } from 'containers';

// ==============================|| Email Config ||============================== //

const EmailConfig = () => {
    // Hooks, State, Variable
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [addOrEditLoading, setAddOrEditLoading] = useState<boolean>(false);
    const [emailConfigs, setEmailConfigs] = useState<IEmailConfig[]>([]);
    const [emailConfig, setEmailConfig] = useState<IEmailConfig>(addOrEditEmailConfigFormDefault);
    const { emailConfigPermission } = PERMISSIONS.admin;

    const getDataTable = async () => {
        setLoading(true);
        const response = await sendRequest(Api.email_config.getAll);
        if (response) {
            const { status, result } = response;
            if (status) {
                const { content } = result;
                setEmailConfigs(content as IEmailConfig[]);
                setLoading(false);
            } else {
                setDataEmpty();
            }
            return;
        } else {
            setDataEmpty();
        }
    };

    const postAddOrEditEmailConfig = async (value: IEmailConfig) => {
        setAddOrEditLoading(true);
        const response: IResponseList<IEmailConfigList> = await sendRequest(Api.email_config.postSaveOrUpdateEmailConfig, value);
        if (response) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'update-success',
                    variant: 'alert',
                    alert: { color: 'success' }
                })
            );
            setAddOrEditLoading(false);
            getDataTable();
            setOpen(false);
        }
    };

    // Add Email Config
    const handleAddEmailConfig = (emailConfigValue: IEmailConfig) => {
        postAddOrEditEmailConfig(emailConfigValue);
    };

    // Edit Email Config
    const handleEditEmailConfig = (emailConfigValue: IEmailConfig) => {
        postAddOrEditEmailConfig(emailConfigValue);
    };

    const handleOpenDialog = (item?: IEmailConfig) => {
        setIsEdit(item ? true : false);
        setEmailConfig(item ? { ...item } : addOrEditEmailConfigFormDefault);
        setOpen(true);
    };

    const setDataEmpty = () => {
        setEmailConfigs([]);
        setLoading(false);
    };

    // Event
    const handleCloseDialog = () => {
        setOpen(false);
    };

    useEffect(() => {
        getDataTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <MainCard>
                {checkAllowedPermission(emailConfigPermission.add) && (
                    <TableToolbar handleOpen={handleOpenDialog} handleRefreshData={getDataTable} />
                )}
                <Table heads={<EmailConfigThead />} isLoading={loading} data={emailConfigs}>
                    <EmailConfigTBody emailConfigs={emailConfigs} handleOpen={handleOpenDialog} />
                </Table>
            </MainCard>

            {/*Add or Edit Email Config Dialog */}
            <AddOrEditEmailConfig
                open={open}
                loading={addOrEditLoading}
                isEdit={isEdit}
                emailConfig={emailConfig}
                handleClose={handleCloseDialog}
                addEmailConfig={handleAddEmailConfig}
                editEmailConfig={handleEditEmailConfig}
            />
        </div>
    );
};

export default EmailConfig;
