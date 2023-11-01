import { FormattedMessage } from 'react-intl';

// yup
import { yupResolver } from '@hookform/resolvers/yup';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, Grid, Stack } from '@mui/material';

// project imports
import { FormProvider, Input } from 'components/extended/Form';
import Modal from 'components/extended/Modal';
import { updateSystemConfig, updateSystemConfigSchema } from 'pages/administration/Config';
import { gridSpacing } from 'store/constant';
import { getUserInfoCookies } from 'utils/cookies';
import { dateFormat } from 'utils/date';
import { ISystemConfig } from 'types';

interface IEditSystemConfigProps {
    open: boolean;
    handleClose: () => void;
    systemConfig: ISystemConfig | undefined;
    loading: boolean;
    editSystemConfig: (systemConfig: ISystemConfig) => void;
}

const EditSystemConfig = (props: IEditSystemConfigProps) => {
    const { open, handleClose, systemConfig, loading, editSystemConfig } = props;
    const { userName } = getUserInfoCookies();
    const currentDate = dateFormat(new Date());

    const handleSubmit = (values: any) => {
        const payload = {
            ...values,
            idHexString: systemConfig?.idHexString,
            description: systemConfig?.description,
            userUpdate: userName,
            lastUpdate: currentDate
        };
        editSystemConfig(payload);
    };

    return (
        <Modal isOpen={open} title={'edit-config'} onClose={handleClose} keepMounted={false}>
            <FormProvider
                form={{ defaultValues: updateSystemConfig, resolver: yupResolver(updateSystemConfigSchema) }}
                onSubmit={handleSubmit}
                formReset={systemConfig}
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={6}>
                        <Input required name="key" label={<FormattedMessage id="key" />} />
                    </Grid>
                    <Grid item xs={6}>
                        <Input required name="value" label={<FormattedMessage id="value" />} />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            textFieldProps={{ placeholder: 'Enter note', multiline: true, rows: 4 }}
                            name="note"
                            label={<FormattedMessage id={'note'} />}
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
    );
};

export default EditSystemConfig;
