import React from 'react';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';

// project imports
import { useAppDispatch } from 'app/hooks';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { validateFileFormat } from 'utils/common';

// assets
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';

interface IFileUploadSingleProps {
    loading?: boolean;
    selectedFile: File;
    handleChange: (file: File | null) => void;
    handleUpload: (file: File) => void;
    handleUploadConfirm: (file: File) => void;
}

const FileUploadSingle = ({ selectedFile, loading, handleUpload, handleUploadConfirm, handleChange }: IFileUploadSingleProps) => {
    const dispatch = useAppDispatch();

    // On file select (from the pop up)
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        handleChange(selectedFiles?.[0]);
        handleUploadConfirm(selectedFiles?.[0]);
    };

    // On file upload (click the upload button)
    const handleFileUpload = () => {
        if (validateFileFormat(selectedFile!)) {
            handleUpload(selectedFile as File);
        } else {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'error-file',
                    variant: 'alert',
                    alert: { color: 'error' }
                })
            );
        }
        handleChange(null);
    };

    // File upload confirm

    return (
        <>
            <Button
                color="primary"
                aria-label="upload picture"
                component="label"
                sx={{
                    textTransform: 'none'
                }}
            >
                {/* TODO: fix any */}
                <input hidden type="file" accept=".xlsx, .xls" onChange={handleFileChange} onClick={(e: any) => (e.target.value = null)} />
                {selectedFile ? `${selectedFile.name}` : 'Choose file...'}
            </Button>
            <LoadingButton
                loading={loading}
                disabled={!selectedFile}
                variant="contained"
                size="small"
                startIcon={<UploadFileRoundedIcon />}
                loadingPosition="start"
                onClick={() => handleFileUpload()}
            >
                Upload
            </LoadingButton>
        </>
    );
};

export default FileUploadSingle;
