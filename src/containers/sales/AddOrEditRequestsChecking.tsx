// Third party
import { FormattedMessage } from 'react-intl';

// yup
import { yupResolver } from '@hookform/resolvers/yup';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, Grid, Stack } from '@mui/material';

// project import
import { DatePicker, FormProvider, Input } from 'components/extended/Form';
import Modal from 'components/extended/Modal';
import { Member, Possibility, StatusRequestsChecking } from 'containers/search';
import { gridSpacing } from 'store/constant';
import { IRequestsChecking } from 'types';
import { addOrEditRequestsCheckingFormDefault, addOrEditRequestsCheckingFormSchema } from 'pages/sales/Config';
import { dateFormat } from 'utils/date';
import { E_IS_LOGTIME } from 'constants/Common';

interface IAddOrEditRequestsCheckingProps {
    open: boolean;
    handleClose: () => void;
    loading?: boolean;
    requestChecking: IRequestsChecking;
    isEdit: boolean;
    addRequest: (request: IRequestsChecking) => void;
    editRequest: (request: IRequestsChecking) => void;
    onChange?: () => void;
}

const AddOrEditRequestsChecking = (props: IAddOrEditRequestsCheckingProps) => {
    const { open, handleClose, requestChecking, isEdit, loading, addRequest, editRequest } = props;

    const handleSubmit = (values: IRequestsChecking) => {
        if (isEdit) {
            editRequest({ ...values, receivedDate: dateFormat(values.receivedDate) });
        } else {
            addRequest({ ...values, receivedDate: dateFormat(values.receivedDate) });
        }
    };

    return (
        <>
            <Modal isOpen={open} title={isEdit ? 'edit-request' : 'add-request'} onClose={handleClose} keepMounted={false}>
                <FormProvider
                    form={{
                        defaultValues: addOrEditRequestsCheckingFormDefault,
                        resolver: yupResolver(addOrEditRequestsCheckingFormSchema)
                    }}
                    onSubmit={handleSubmit}
                    formReset={requestChecking}
                >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={6}>
                            <Input required name="partnerName" label={<FormattedMessage id="partner-name" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <DatePicker required name="receivedDate" label={<FormattedMessage id="received-date" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input required name="quantity" label={<FormattedMessage id="quantity" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input required name="timeline" label={<FormattedMessage id="timeline" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Member
                                required
                                isLogTime={E_IS_LOGTIME.YES}
                                isDefaultAll
                                name="picUserName"
                                label={<FormattedMessage id="pic-user-name" />}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <StatusRequestsChecking required isShowAll />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Possibility required isShowAll />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input required name="domain" label={<FormattedMessage id="domain" />} />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                required
                                textFieldProps={{ multiline: true, rows: 4 }}
                                name="request"
                                label={<FormattedMessage id="request" />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                required
                                textFieldProps={{ multiline: true, rows: 4 }}
                                name="technology"
                                label={<FormattedMessage id="technology" />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input textFieldProps={{ multiline: true, rows: 4 }} name="note" label={<FormattedMessage id="note" />} />
                        </Grid>
                        <Grid item xs={12}>
                            <DialogActions>
                                <Stack direction="row" spacing={1} justifyContent="flex-end">
                                    <Button color="error" onClick={handleClose}>
                                        <FormattedMessage id="cancel" />
                                    </Button>
                                    <LoadingButton loading={loading} variant="contained" type="submit">
                                        <FormattedMessage id="submit" />
                                    </LoadingButton>
                                </Stack>
                            </DialogActions>
                        </Grid>
                    </Grid>
                </FormProvider>
            </Modal>
        </>
    );
};

export default AddOrEditRequestsChecking;
