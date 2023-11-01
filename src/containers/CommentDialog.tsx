import { useEffect, useState } from 'react';

// third party
import { yupResolver } from '@hookform/resolvers/yup';
import { FormattedMessage } from 'react-intl';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, Grid } from '@mui/material';

// project imports
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { FormProvider, Input } from 'components/extended/Form';
import Modal from 'components/extended/Modal';
import Api from 'constants/Api';
import { DATE_FORMAT } from 'constants/Common';
import { commentFormDefault, commentFormSchema } from 'pages/Config';
import sendRequest from 'services/ApiService';
import { gridSpacing } from 'store/constant';
import { closeCommentDialog, conditionsSelector, openSelector, changeCommented, titleDetailSelector } from 'store/slice/commentSlice';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { IComment } from 'types/comment';
import { isEmpty } from 'utils/common';
import { getUserInfoCookies } from 'utils/cookies';
import { convertWeekFromToDate, dateFormat, getNumberOfWeek } from 'utils/date';

// ==============================|| Comment Modal ||============================== //

const CommentDialog = () => {
    const dispatch = useAppDispatch();
    const [comment, setComment] = useState<IComment>();
    const userInfo = getUserInfoCookies();
    const open = useAppSelector(openSelector);
    const conditions = useAppSelector(conditionsSelector);
    const titleDetail = useAppSelector(titleDetailSelector);
    const week = conditions?.week ? getNumberOfWeek(conditions.week) : '';
    const weekSelected = conditions?.week ? convertWeekFromToDate(conditions.week) : '';
    const currentDate = new Date();
    const formattedDate = dateFormat(currentDate, DATE_FORMAT.DDMMYYYYHHmmss);
    const title = conditions?.userId ? 'update-comment' : 'update-report-comment';
    // Functions
    const getFindComment = async (conditions: IComment) => {
        const request = { ...conditions, ...weekSelected, week };
        const response = await sendRequest(conditions.userId ? Api.comment.getFindCommentDetail : Api.comment.getFindComment, request);

        if (response) {
            const { content } = response.result;
            setComment(content);
        }
    };

    const postSaveOrUpdateComment = async (value: IComment) => {
        const newConditions = { ...conditions, ...value, week };
        const isEmptyComment = isEmpty(comment);
        const { userName } = userInfo;
        const { idHexString } = comment ?? {};
        const params = {
            ...newConditions,
            ...weekSelected,
            idHexString,
            userName: null,
            [isEmptyComment ? 'userCreate' : 'userUpdate']: userName,
            [isEmptyComment ? 'dateCreate' : 'lastUpdate']: formattedDate
        };
        const response = await sendRequest(
            newConditions.userId ? Api.comment.postSaveOrUpdateCommentDetail : Api.comment.postSaveOrUpdateComment,
            params
        );
        if (response) {
            const message = 'comment-success';
            dispatch(openSnackbar({ open: true, message, variant: 'alert', alert: { color: 'success' } }));
            dispatch(changeCommented(true));
            handleClose();
        }
    };
    // Event

    const handleClose = () => {
        dispatch(closeCommentDialog());
        setComment({ ...comment, note: '' });
    };

    const handleSubmit = (value: IComment) => {
        postSaveOrUpdateComment(value);
    };

    // Effect
    useEffect(() => {
        open && conditions && getFindComment(conditions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, conditions]);

    return (
        <Modal isOpen={open} title={title} titleDetail={titleDetail} onClose={handleClose} keepMounted={false}>
            <FormProvider
                form={{
                    defaultValues: commentFormDefault,
                    resolver: yupResolver(commentFormSchema)
                }}
                formReset={comment}
                onSubmit={handleSubmit}
            >
                {/* Tabs  */}
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} lg={12}>
                        <Input textFieldProps={{ multiline: true, rows: 4 }} name="note" label={<FormattedMessage id="comment" />} />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <em>
                            {comment?.userUpdate ? (
                                <>
                                    <FormattedMessage id="last-update-comment" /> <strong>{comment.userUpdate}</strong> -{' '}
                                    <strong>{dateFormat(comment.lastUpdate, DATE_FORMAT.HHmmssDDMMYYYY)}</strong>
                                </>
                            ) : comment?.userCreate ? (
                                <>
                                    <FormattedMessage id="last-update-comment" /> <strong>{comment.userCreate}</strong> -{' '}
                                    <strong>{dateFormat(comment.dateCreate, DATE_FORMAT.HHmmssDDMMYYYY)}</strong>
                                </>
                            ) : (
                                ''
                            )}
                        </em>
                    </Grid>
                </Grid>
                {/* </TabPanel> */}

                <DialogActions style={{ marginTop: '20px' }}>
                    <Button color="error" onClick={handleClose}>
                        <FormattedMessage id="cancel" />
                    </Button>
                    <LoadingButton variant="contained" type="submit">
                        <FormattedMessage id="submit" />
                    </LoadingButton>
                </DialogActions>
            </FormProvider>
        </Modal>
    );
};

export default CommentDialog;
