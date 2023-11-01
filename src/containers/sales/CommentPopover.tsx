import { Fragment, useEffect, useState } from 'react';

// material-ui
import { IconButton, PopoverVirtualElement, Stack, TextField } from '@mui/material';

// project imports
import { Popover } from 'components';
import MainCard from 'components/cards/MainCard';
import { ICommentForm, ICommentItem } from 'types';

// assets
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

// third party
import { useIntl } from 'react-intl';

interface ICommentPopoverProps {
    item: ICommentItem;
    anchorEl: Element | (() => Element) | PopoverVirtualElement | (() => PopoverVirtualElement) | null | undefined;
    handleClose: () => void;
    editComment: (payload: ICommentForm) => void;
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentPopover = (props: ICommentPopoverProps) => {
    const { item, anchorEl, handleClose, editComment, isEdit, setIsEdit } = props;
    const [comment, setComment] = useState<string>('');
    const intl = useIntl();

    const handleToggleEdit = () => {
        setIsEdit(true);
    };

    const handleConfirm = () => {
        const payload = { idHexString: item.idHexString!, month: item.month!, [item.type]: comment };
        editComment(payload);
    };

    useEffect(() => {
        setComment(item?.content);
    }, [item?.content]);

    return (
        <Popover
            anchorEl={anchorEl}
            handleClose={handleClose}
            sx={{
                '& .MuiPaper-root': { width: '300px', maxHeight: '400px' }
            }}
        >
            <MainCard
                title={intl.formatMessage({ id: 'comment' })}
                sx={{
                    '&': { overflowY: 'auto' },
                    '& .MuiCardContent-root': { padding: '6px 8px' },
                    '& .MuiCardHeader-root': { padding: '6px 8px' }
                }}
            >
                <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    fullWidth
                    defaultValue={item && item.content}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setComment(event.target.value);
                    }}
                    multiline
                    disabled={!isEdit}
                    variant="outlined"
                />

                <Stack direction="row" justifyContent="flex-end" sx={{ mt: '8px' }}>
                    {isEdit ? (
                        <Fragment>
                            <IconButton aria-label="Close" size="small" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <IconButton aria-label="Confirm" size="small" onClick={handleConfirm}>
                                <CheckIcon />
                            </IconButton>
                        </Fragment>
                    ) : (
                        <IconButton aria-label="Edit" size="small" onClick={handleToggleEdit}>
                            <EditIcon />
                        </IconButton>
                    )}
                </Stack>
            </MainCard>
        </Popover>
    );
};

export default CommentPopover;
