// Third party
import { FormattedMessage } from 'react-intl';

// yup
import { yupResolver } from '@hookform/resolvers/yup';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, Grid, Stack } from '@mui/material';

// project import
import { DatePicker, FormProvider, Input, NumericFormatCustom } from 'components/extended/Form';
import Modal from 'components/extended/Modal';
import { Member, WorkType } from 'containers/search';
import { gridSpacing } from 'store/constant';
import { ISupplierChecking } from 'types';
import { addOrEditSupplierCheckingFormDefault, addOrEditSupplierCheckingFormSchema } from 'pages/sales/Config';
import { dateFormat } from 'utils/date';
import { DATE_FORMAT, E_IS_LOGTIME, MONEY_PLACEHOLDER } from 'constants/Common';

interface IAddOrEditSupplierCheckingProps {
    open: boolean;
    handleClose: () => void;
    loading?: boolean;
    supplierChecking: ISupplierChecking;
    isEdit: boolean;
    addSupplier: (supplier: ISupplierChecking) => void;
    editSupplier: (supplier: ISupplierChecking) => void;
}

const AddOrEditSupplierChecking = (props: IAddOrEditSupplierCheckingProps) => {
    const { open, handleClose, supplierChecking, isEdit, loading, addSupplier, editSupplier } = props;

    const handleSubmit = (values: ISupplierChecking) => {
        const fromDate = dateFormat(values.fromDate, DATE_FORMAT.DDMMYYYY);
        const toDate = dateFormat(values.toDate, DATE_FORMAT.DDMMYYYY);
        if (isEdit) {
            editSupplier({ ...values, fromDate, toDate });
        } else {
            addSupplier({ ...values, fromDate, toDate });
        }
    };

    return (
        <>
            <Modal isOpen={open} title={isEdit ? 'edit-supplier' : 'add-supplier'} onClose={handleClose} keepMounted={false}>
                <FormProvider
                    form={{
                        defaultValues: addOrEditSupplierCheckingFormDefault,
                        resolver: yupResolver(addOrEditSupplierCheckingFormSchema)
                    }}
                    onSubmit={handleSubmit}
                    formReset={supplierChecking}
                >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={6}>
                            <Input required name="supplierName" label={<FormattedMessage id="supplier-name" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input required name="quantity" label={<FormattedMessage id="quantity" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <DatePicker required name="fromDate" label={<FormattedMessage id="from-date" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <DatePicker required name="toDate" label={<FormattedMessage id="to-date" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                required
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                                name="unitPrice"
                                label={<FormattedMessage id="unit-price" />}
                            />
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
                        <Grid item xs={12} lg={12}>
                            <WorkType required isShowAll />
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

export default AddOrEditSupplierChecking;
