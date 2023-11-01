import { yupResolver } from '@hookform/resolvers/yup';
import { FormattedMessage } from 'react-intl';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, Grid, Typography } from '@mui/material';

// project imports
import { FormProvider, Input } from 'components/extended/Form';
import Modal from 'components/extended/Modal';
import { MessageWorkingCalendarConfig, MessageWorkingCalendarSchema } from 'pages/register-working-calendar/Config';
import { gridSpacing } from 'store/constant';
import { IWorkingCalendar } from 'types/working-calendar';

// ==============================|| Message Working Calendar Modal ||============================== //

interface IMessageWorkingCalendarModalProps {
    loading?: boolean;
    open: boolean;
    handleClose: () => void;
    item?: IWorkingCalendar;
    isEdit: boolean;
    onSubmitMessage: (message: string) => void;
    postUpdateStatus: (item: IWorkingCalendar) => void;
}

const MessageWorkingCalendarModal = ({
    loading,
    open,
    handleClose,
    item,
    isEdit,
    onSubmitMessage,
    postUpdateStatus
}: IMessageWorkingCalendarModalProps) => {
    const handleSubmit = (values: any) => {
        const { message } = values;
        onSubmitMessage(message);
    };

    const hanldeVerified = (value: string) => {
        if (item) postUpdateStatus({ ...item, status: value });
    };

    return (
        <Modal isOpen={open} title={'message-working-calendar'} onClose={handleClose} keepMounted={false}>
            <FormProvider
                form={{
                    defaultValues: MessageWorkingCalendarConfig,
                    resolver: yupResolver(MessageWorkingCalendarSchema)
                }}
                onSubmit={handleSubmit}
                formReset={{
                    ...item,
                    message: item?.message ? item.message : ''
                }}
            >
                {/* Tabs  */}

                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Typography>
                            <FormattedMessage id={isEdit ? 'message-working-calendar-detail' : 'message-working-calendar-verify'} />
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Input
                            textFieldProps={{
                                multiline: true,
                                rows: 4,
                                disabled: !isEdit
                            }}
                            name="message"
                        />
                    </Grid>
                </Grid>

                {/* Button submit */}
                <DialogActions>
                    {isEdit ? (
                        <>
                            <Button color="error" onClick={handleClose}>
                                <FormattedMessage id="cancel" />
                            </Button>
                            <LoadingButton loading={loading} variant="contained" type="submit">
                                <FormattedMessage id="submit" />
                            </LoadingButton>
                        </>
                    ) : (
                        <>
                            <LoadingButton loading={loading} variant="contained" type="submit" onClick={() => hanldeVerified('approve')}>
                                <FormattedMessage id="approve" />
                            </LoadingButton>
                            <LoadingButton
                                loading={loading}
                                variant="contained"
                                type="submit"
                                color="error"
                                onClick={() => hanldeVerified('declines')}
                            >
                                <FormattedMessage id="declines" />
                            </LoadingButton>
                        </>
                    )}
                </DialogActions>
            </FormProvider>
        </Modal>
    );
};

export default MessageWorkingCalendarModal;
