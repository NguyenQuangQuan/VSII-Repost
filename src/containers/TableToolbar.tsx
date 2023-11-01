import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

// material-ui
import { Button, Grid, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';

// project import
import { useAppDispatch } from 'app/hooks';
import { FileUploadSingle } from 'components';
import Modal from 'components/extended/Modal';
import { Table } from 'components/extended/Table';
import Api from 'constants/Api';
import sendRequest from 'services/ApiService';
import { dateFormat } from 'utils/date';
import ErrorMessageThead from './ErrorMessageThead';
import { gridSpacing } from 'store/constant';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { getUserInfoCookies } from 'utils/cookies';
import ErrorMessageTBody from './ErrorMessageTBody';

// assets
import AddIcon from '@mui/icons-material/Add';
import DownloadForOfflineTwoToneIcon from '@mui/icons-material/DownloadForOfflineTwoTone';
import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone';
import { LoadingButton } from '@mui/lab';

interface ITableToolbarProps {
    handleOpen?: (actualCost?: any) => void;
    handleExportTemplate?: () => void;
    handleRefreshData?: (confirm?: string) => void;
    handleExportDocument?: () => void;
    isShowUpload?: boolean;
    isUpdateFile?: boolean;
}

const TableToolbar = (props: ITableToolbarProps) => {
    const { handleOpen, handleExportTemplate, handleRefreshData, handleExportDocument, isShowUpload, isUpdateFile } = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isConfirm, setIsConfirm] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFileConfirm, setSelectedFileConfirm] = useState<File | null>(null);

    const today = dateFormat(new Date());
    const userInfo = getUserInfoCookies();
    const dispatch = useAppDispatch();
    const theme = useTheme();

    // Modal message error
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<any>([]);

    // On file select (from the pop up)
    const handleFileChange = (file: File | null) => {
        setSelectedFile(file);
    };

    const handleFileChangeConfirm = (file: File | null) => {
        setSelectedFileConfirm(file);
    };

    function handleCloseModal() {
        setOpenModal(false);
    }

    function handleOpenModal(isConfirm?: boolean) {
        isConfirm && setIsConfirm(true);
        setOpenModal(true);
    }

    // On file upload (click the upload button)
    const handleFileUpload = async (file: File) => {
        setIsLoading(true);
        // Request made to the backend api
        const response = await sendRequest(Api.monthly_project_cost.postImportTemplateMonthlyCost, {
            file,
            userCreate: userInfo?.userName,
            dateCreate: today,
            confirm: ''
        });

        if (response) {
            const { status, result } = response;
            if (status) {
                const { content } = result;
                setErrorMessages(content.messages);
                if (!content.status) {
                    content.popup && handleOpenModal();
                    if (!content.popup) {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: content.messages[0].message,
                                variant: 'alert',
                                alert: { color: 'error' }
                            })
                        );
                    }
                } else {
                    if (content.popup) {
                        handleOpenModal(true);
                    } else {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: content.messages[0].message,
                                variant: 'alert',
                                alert: { color: 'success' }
                            })
                        );
                    }
                }
                setIsLoading(false);
                handleRefreshData && result.content.status && handleRefreshData();
            }
        } else {
            setIsLoading(false);
        }
    };

    // Confirm upload
    const handleFileUploadConfirm = async (confirm: string) => {
        const response = await sendRequest(Api.monthly_project_cost.postImportTemplateMonthlyCost, {
            file: selectedFileConfirm,
            userCreate: userInfo?.userName,
            dateCreate: today,
            confirm: confirm
        });
        if (response) {
            const { status, result } = response;
            if (status) {
                const { content } = result;
                if (content.status) {
                    setOpenModal(false);
                    handleRefreshData && handleRefreshData();
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: content.messages[0].message,
                            variant: 'alert',
                            alert: { color: 'success' }
                        })
                    );
                }
            }
        }
    };

    return (
        <>
            <Grid container justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: '10px' }}>
                <Grid item xs={12} sm={6}>
                    {handleOpen && (
                        <Button size="small" variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>
                            <FormattedMessage id="add" />
                        </Button>
                    )}
                </Grid>
                {!isUpdateFile && (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        sx={{
                            textAlign: 'right',
                            '& .MuiButtonBase-root': {
                                fontSize: '15px !important',
                                marginLeft: '5px'
                            }
                        }}
                    >
                        {handleExportDocument && (
                            <Button size="large" onClick={() => handleExportDocument()}>
                                <Stack direction="row" gap={1} alignItems="center">
                                    <FileDownloadTwoToneIcon />
                                    <Typography fontWeight={500}>
                                        <FormattedMessage id="download-report" />
                                    </Typography>
                                </Stack>
                            </Button>
                        )}

                        {handleExportTemplate && (
                            <Tooltip title="Download Template">
                                <IconButton size="large" onClick={() => handleExportTemplate()}>
                                    <DownloadForOfflineTwoToneIcon />
                                </IconButton>
                            </Tooltip>
                        )}

                        {isShowUpload && (
                            <FileUploadSingle
                                loading={isLoading}
                                handleUpload={handleFileUpload}
                                selectedFile={selectedFile!}
                                handleChange={handleFileChange}
                                handleUploadConfirm={handleFileChangeConfirm}
                            />
                        )}
                    </Grid>
                )}
            </Grid>
            {isShowUpload && (
                <Modal isOpen={openModal} title="error-message" keepMounted={false} onClose={handleCloseModal}>
                    <Table heads={<ErrorMessageThead />} data={errorMessages} isLoading={isLoading}>
                        <ErrorMessageTBody errorMessages={errorMessages} />
                    </Table>
                    {isConfirm && (
                        <Stack direction="row" spacing={1} justifyContent="center" sx={{ marginTop: theme.spacing(gridSpacing) }}>
                            <Button color="error" onClick={handleCloseModal}>
                                <FormattedMessage id="cancel" />
                            </Button>
                            <LoadingButton variant="contained" type="submit" onClick={() => handleFileUploadConfirm('No')}>
                                <FormattedMessage id="accept-only-new" />
                            </LoadingButton>
                            <LoadingButton variant="contained" type="submit" onClick={() => handleFileUploadConfirm('Yes')}>
                                <FormattedMessage id="accept-all" />
                            </LoadingButton>
                        </Stack>
                    )}
                </Modal>
            )}
        </>
    );
};

export default TableToolbar;
