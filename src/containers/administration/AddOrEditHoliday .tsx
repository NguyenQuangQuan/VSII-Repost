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
import { HolidayType } from 'containers/search';
import { saveOrUpdateHolidayConfig, saveOrUpdateHolidaySchema } from 'pages/administration/Config';
import { gridSpacing } from 'store/constant';
import { IHoliday } from 'types';
import { dateFormat } from 'utils/date';
import { getUserInfoCookies } from 'utils/cookies';
import { DATE_FORMAT } from 'constants/Common';

interface IAddOrEditHolidayProps {
    open: boolean;
    handleClose: () => void;
    loading?: boolean;
    holiday: IHoliday | undefined;
    isEdit: boolean;
    addHoliday: (holiday: IHoliday) => void;
    editHoliday: (holiday: IHoliday) => void;
}

const AddOrEditHoliday = (props: IAddOrEditHolidayProps) => {
    const { open, handleClose, holiday, isEdit, loading, addHoliday, editHoliday } = props;
    const { userName } = getUserInfoCookies();
    const currentDate = dateFormat(new Date());

    const handleSubmit = (values: any) => {
        const fromDate = dateFormat(values.fromDate, DATE_FORMAT.DDMMYYYY);
        const toDate = dateFormat(values.toDate, DATE_FORMAT.DDMMYYYY);
        const payload = { ...values, fromDate, toDate };
        if (isEdit) {
            editHoliday({ ...payload, userUpdate: userName, idHexString: holiday?.idHexString, lastUpdate: currentDate });
        } else {
            addHoliday({ ...payload, userCreate: userName, dateCreate: currentDate });
        }
    };

    return (
        <>
            <Modal isOpen={open} title={isEdit ? 'edit-holiday' : 'add-holiday'} onClose={handleClose} keepMounted={false}>
                <FormProvider
                    form={{ defaultValues: saveOrUpdateHolidayConfig, resolver: yupResolver(saveOrUpdateHolidaySchema) }}
                    onSubmit={handleSubmit}
                    formReset={holiday}
                >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6}>
                            <DatePicker required name="fromDate" label={<FormattedMessage id="from-date" />} />
                        </Grid>
                        <Grid item xs={6}>
                            <DatePicker required name="toDate" label={<FormattedMessage id="to-date" />} />
                        </Grid>
                        <Grid item xs={12}>
                            <HolidayType required select={true} />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                required
                                textFieldProps={{ placeholder: 'Enter note', multiline: true, rows: 4 }}
                                name="note"
                                label={<FormattedMessage id="note" />}
                            />
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

export default AddOrEditHoliday;
