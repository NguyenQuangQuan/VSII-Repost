import { yupResolver } from '@hookform/resolvers/yup';
import { FormattedMessage, useIntl } from 'react-intl';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, Grid } from '@mui/material';

// project imports
import { DatePicker, FormProvider, Input } from 'components/extended/Form';
import Modal from 'components/extended/Modal';
import { DATE_FORMAT, E_IS_LOGTIME } from 'constants/Common';
import { Member } from 'containers/search';
import SpecialHoursType from 'containers/search/SpecialHoursType';
import { saveOrUpdateSpecialHoursConfig, saveOrUpdateSpecialHoursSchema } from 'pages/administration/Config';
import { gridSpacing } from 'store/constant';
import { IMember, ISpecialHours } from 'types';
import { getUserInfoCookies } from 'utils/cookies';
import { dateFormat } from 'utils/date';

// ==============================|| ADD NEW SPECIAL HOURS ||============================== //

interface IAddOrEditSpecialHoursProps {
    specialHours?: any;
    loading?: boolean;
    open: boolean;
    isEdit: boolean;
    handleClose: () => void;
    setSpecialHours: React.Dispatch<any>;
    addSpecialHours: (specialHours: ISpecialHours) => void;
    editSpecialHours: (specialHours: ISpecialHours) => void;
}

const AddOrEditSpecialHours = ({
    specialHours,
    loading,
    open,
    isEdit,
    handleClose,
    addSpecialHours,
    editSpecialHours,
    setSpecialHours
}: IAddOrEditSpecialHoursProps) => {
    const { userName } = getUserInfoCookies();
    const intl = useIntl();

    const handleChangeMember = (userSelected: IMember) => {
        userSelected &&
            setSpecialHours({
                ...specialHours,
                userId: { value: userSelected.userId, label: `${userSelected.firstName} ${userSelected.lastName}` },
                userName: userSelected.userName,
                memberCode: userSelected.memberCode,
                lastName: userSelected.lastName,
                firstName: userSelected.firstName
            });
    };

    const handleSubmit = (values: any) => {
        const currentDate = dateFormat(new Date());
        const fromDate = dateFormat(values.fromDate, DATE_FORMAT.DDMMYYYY);
        const toDate = dateFormat(values.toDate, DATE_FORMAT.DDMMYYYY);
        const payload = { ...values, fromDate, toDate };
        const id = values.userId.value;
        const userId = specialHours.userId;
        const newSpecialHours = { ...payload, fromDate: values.fromDate, toDate: values.toDate };

        if (isEdit) {
            editSpecialHours({
                ...payload,
                userUpdate: userName,
                lastUpdate: currentDate,
                userId: userId,
                idHexString: specialHours?.idHexString
            });
        } else {
            addSpecialHours({ ...payload, userCreate: userName, dateCreate: currentDate, userId: id });
        }
        setSpecialHours(newSpecialHours);
    };

    return (
        <Modal isOpen={open} title={isEdit ? 'edit-special-hours' : 'add-special-hours'} onClose={handleClose} keepMounted={false}>
            <FormProvider
                form={{
                    defaultValues: saveOrUpdateSpecialHoursConfig,
                    resolver: yupResolver(saveOrUpdateSpecialHoursSchema)
                }}
                formReset={{
                    ...specialHours,
                    userId: !!specialHours.userId
                        ? {
                              value: isEdit ? specialHours.userId : specialHours.userId.value,
                              label: `${specialHours.firstName} ${specialHours.lastName}`
                          }
                        : specialHours.userId
                }}
                onSubmit={handleSubmit}
            >
                {/* Tabs  */}
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={6}>
                        <Member
                            required
                            isLogTime={E_IS_LOGTIME.YES}
                            label={<FormattedMessage id="user" />}
                            handleChange={handleChangeMember}
                            disabled={isEdit}
                            isIdHexString
                            isDefaultAll
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Input name="hourPerDay" label={<FormattedMessage id="hours-per-day" />} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <DatePicker required name="fromDate" label={<FormattedMessage id="from-date" />} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <DatePicker required name="toDate" label={<FormattedMessage id="to-date" />} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SpecialHoursType required select={true} />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            textFieldProps={{
                                placeholder: intl.formatMessage({ id: 'note_placeholder' }),
                                multiline: true,
                                rows: 4
                            }}
                            name="note"
                            label={<FormattedMessage id="note" />}
                        />
                    </Grid>
                </Grid>
                {/* </TabPanel> */}

                <DialogActions>
                    <Button color="error" onClick={handleClose}>
                        <FormattedMessage id="cancel" />
                    </Button>
                    <LoadingButton loading={loading} variant="contained" type="submit">
                        <FormattedMessage id="submit" />
                    </LoadingButton>
                </DialogActions>
            </FormProvider>
        </Modal>
    );
};

export default AddOrEditSpecialHours;
