import React from 'react';

// third-party
import { FormattedMessage } from 'react-intl';
import { yupResolver } from '@hookform/resolvers/yup';

// material-ui
import { Grid, Button, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// project imports
import Modal from 'components/extended/Modal';
import { FormProvider, Input } from 'components/extended/Form';
import { IOption } from 'types';
import { gridSpacing } from 'store/constant';
import { Months } from 'containers/search';
import { productivityHeadCountEditFormDefault, productivityHeadCountEditFormSchema } from 'pages/sales/Config';
import { IProductivityHeadCountEditForm } from 'types';

// ==============================|| EDIT HEADCOUNT DIALOG ||============================== //

interface IEditHeadCountProps {
    headCount: IProductivityHeadCountEditForm;
    months: IOption[];
    loading: boolean;
    open: boolean;
    handleClose: () => void;
    getDetailByMonth: (month: string) => void;
    editHeadCount: (headCount: IProductivityHeadCountEditForm) => void;
}

const EditHeadCount = ({ headCount, months, loading, open, handleClose, getDetailByMonth, editHeadCount }: IEditHeadCountProps) => {
    const handleChangeMonth = (month: string) => {
        getDetailByMonth(month);
    };

    const handleSubmit = async (value: IProductivityHeadCountEditForm) => {
        editHeadCount(value);
    };

    return (
        <Modal isOpen={open} title="edit-headcount" onClose={handleClose} keepMounted={false} maxWidth="xs">
            <FormProvider
                form={{
                    defaultValues: productivityHeadCountEditFormDefault,
                    resolver: yupResolver(productivityHeadCountEditFormSchema)
                }}
                onSubmit={handleSubmit}
                formReset={headCount}
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} lg={12}>
                        <Input name="year" label={<FormattedMessage id="year" />} disabled />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <Months months={months} onChange={handleChangeMonth} />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <Input name="value" label={<FormattedMessage id="number-headcount" />} />
                    </Grid>
                </Grid>

                <DialogActions sx={{ mt: 3 }}>
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

export default EditHeadCount;
