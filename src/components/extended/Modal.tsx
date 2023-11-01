import React, { ReactElement, ReactFragment, ReactPortal } from 'react';
import { FormattedMessage } from 'react-intl';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { Dialog, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';

const DialogCustom = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3)
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

interface IDialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const DialogTitleCustom = (props: IDialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2, fontSize: '0.875rem' }} {...other}>
            {children}
            {onClose && (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 13, color: (theme) => theme.palette.grey[500] }}
                >
                    <HighlightOffTwoToneIcon fontSize="small" />
                </IconButton>
            )}
        </DialogTitle>
    );
};

interface IModalProps {
    isOpen: boolean;
    title: string;
    onClose?: any;
    maxWidth?: any;
    keepMounted: boolean;
    children: ReactFragment | ReactPortal | boolean | null | undefined | ReactElement<any, any>;
    titleDetail?: string;
}

const Modal = ({ isOpen, title, titleDetail, onClose, children, maxWidth, keepMounted, ...other }: IModalProps) => {
    const handleClose = (event?: any, reason?: string) => {
        if (reason && reason === 'backdropClick') return;
        onClose?.();
    };

    const dialogTitle = titleDetail ? (
        <>
            <FormattedMessage id={title} /> {titleDetail}
        </>
    ) : (
        <FormattedMessage id={title} />
    );

    return (
        <DialogCustom
            open={isOpen}
            keepMounted={keepMounted}
            disableEscapeKeyDown
            onClose={handleClose}
            scroll="paper"
            aria-labelledby="customized-dialog-title"
            aria-describedby="customized-dialog-description"
            sx={{
                '& .MuiDialog-paper': { p: 0 },
                '& .MuiCardHeader-root': { p: '5px 24px' }
            }}
            PaperProps={{ sx: { width: '100%', maxHeight: '80vh' } }}
            maxWidth={maxWidth}
            {...other}
        >
            <DialogTitleCustom id="customized-dialog-title" onClose={handleClose}>
                {dialogTitle}
            </DialogTitleCustom>
            <DialogContent dividers>{children}</DialogContent>
        </DialogCustom>
    );
};

Modal.defaultProps = {
    keepMounted: true
};

export default Modal;
