import { FormattedMessage } from 'react-intl';

// material-ui
import { Button, DialogActions, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// project imports
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker, FormProvider, Input } from 'components/extended/Form';
import Modal from 'components/extended/Modal';
import { ClosingDateWorkingCalendarConfig, ClosingDateWorkingCalendarSchema } from 'pages/register-working-calendar/Config';
import { gridSpacing } from 'store/constant';
import { IClosingDate } from 'types/working-calendar';
import { getUserInfoCookies } from 'utils/cookies';

// ==============================|| CLosing Date Working Calendar Modal ||============================== //

interface IClosingDateWorkingCalendarProps {
    open: boolean;
    handleClose?: () => void;
    item: IClosingDate;
    editClosingDate: (item: IClosingDate) => void;
    closingDate: IClosingDate;
}

const EditClosingDateWorkingCalendar = ({ handleClose, item, open, editClosingDate, closingDate }: IClosingDateWorkingCalendarProps) => {
    const { userName } = getUserInfoCookies();
    const currentDate = new Date();
    const { closingDates } = closingDate;

    const handleSubmit = (values: any) => {
        closingDates.forEach((element, index) => {
            if (element.month === values.closingDates.month) closingDates[index] = values.closingDates;
        });
        const payload = { ...closingDate, closingDates: closingDates, userUpdate: userName, lastUpdate: currentDate };
        editClosingDate(payload);
    };

    return (
        <Modal isOpen={open} title={'closing-date'} onClose={handleClose} keepMounted={false}>
            <FormProvider
                form={{
                    defaultValues: ClosingDateWorkingCalendarConfig,
                    resolver: yupResolver(ClosingDateWorkingCalendarSchema)
                }}
                formReset={item}
                onSubmit={handleSubmit}
            >
                {/* Tabs  */}
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} lg={6}>
                        <Input name="closingDates.month" label={<FormattedMessage id="month" />} disabled />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <DatePicker required name="closingDates.closingDate" label={<FormattedMessage id="closing-date" />} />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <DialogActions>
                            <Button color="error" onClick={handleClose}>
                                <FormattedMessage id="cancel" />
                            </Button>
                            <LoadingButton variant="contained" type="submit">
                                <FormattedMessage id="submit" />
                            </LoadingButton>
                        </DialogActions>
                    </Grid>
                </Grid>
            </FormProvider>
        </Modal>
    );
};

export default EditClosingDateWorkingCalendar;
