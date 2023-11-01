import { ChangeEvent, useState } from 'react';
// Third party
import { FormattedMessage } from 'react-intl';

// yup
import { yupResolver } from '@hookform/resolvers/yup';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, Grid, InputAdornment, SelectChangeEvent, Stack } from '@mui/material';

// project import
import { FormProvider, Input, MultipleEmailCustom, Radio } from 'components/extended/Form';
import Modal from 'components/extended/Modal';
import { addOrEditEmailConfigFormDefault, addOrEditEmailConfigSchema } from 'pages/administration/Config';
import { gridSpacing } from 'store/constant';
import { IEmailConfig } from 'types';
import { DayInMonth, DayInWeek, EmailType } from 'containers/search';
import { EMAIL_TYPE, EMAIL_CONFIG_OPTIONS } from 'constants/Common';

interface IAddOrEditEmailConfigProps {
    open: boolean;
    handleClose: () => void;
    loading?: boolean;
    emailConfig: IEmailConfig | undefined;
    isEdit: boolean;
    addEmailConfig: (emailConfig: IEmailConfig) => void;
    editEmailConfig: (emailConfig: IEmailConfig) => void;
}

const AddOrEditEmailConfig = (props: IAddOrEditEmailConfigProps) => {
    const { open, handleClose, emailConfig, isEdit, loading, addEmailConfig, editEmailConfig } = props;
    const [typeEmail, setTypeEmail] = useState('');

    const handleSubmit = (values: IEmailConfig) => {
        if (isEdit) {
            editEmailConfig({
                ...values,
                idHexString: emailConfig?.idHexString
            });
        } else {
            addEmailConfig({
                ...values,
                idHexString: emailConfig?.idHexString,
                emailCode: `${`${values.emailType}_`}${values.emailCode}`
            });
        }
    };

    const handleChange = (event: SelectChangeEvent<unknown> | ChangeEvent<HTMLSelectElement>) => {
        const newValue = (event.target as HTMLSelectElement).value;
        setTypeEmail(newValue);
    };

    return (
        <>
            <Modal isOpen={open} title={isEdit ? 'edit-email-config' : 'add-email-config'} onClose={handleClose} keepMounted={false}>
                <FormProvider
                    form={{ defaultValues: addOrEditEmailConfigFormDefault, resolver: yupResolver(addOrEditEmailConfigSchema) }}
                    onSubmit={handleSubmit}
                    formReset={emailConfig}
                >
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6}>
                            <EmailType required handleChange={handleChange} disabled={isEdit} />
                        </Grid>
                        <Grid item xs={6}>
                            <Input
                                label={<FormattedMessage id="email-code" />}
                                required
                                name="emailCode"
                                disabled={isEdit}
                                textFieldProps={{
                                    InputProps: {
                                        startAdornment: !isEdit ? (
                                            <InputAdornment position="start">{typeEmail}</InputAdornment>
                                        ) : (
                                            <span></span>
                                        )
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                name="sendTo"
                                required
                                textFieldProps={{
                                    InputProps: {
                                        inputComponent: MultipleEmailCustom as any
                                    }
                                }}
                                label={<FormattedMessage id="send-to" />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                name="sendCC"
                                textFieldProps={{
                                    InputProps: {
                                        inputComponent: MultipleEmailCustom as any
                                    }
                                }}
                                label={<FormattedMessage id="send-cc" />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                name="sendBCC"
                                textFieldProps={{
                                    InputProps: {
                                        inputComponent: MultipleEmailCustom as any
                                    }
                                }}
                                label={<FormattedMessage id="send-bcc" />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input label={<FormattedMessage id="template" />} required name="template" disabled={isEdit} />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Input required name="timeSendMail.hour" label={<FormattedMessage id="hour" />} type="time" />
                                </Grid>
                                {(isEdit && emailConfig!.emailType === EMAIL_TYPE.RP_WEEK) ||
                                (!isEdit && typeEmail === EMAIL_TYPE.RP_WEEK) ? (
                                    <Grid item xs={6}>
                                        <DayInWeek required />
                                    </Grid>
                                ) : (
                                    <Grid item xs={6}>
                                        <DayInMonth required />
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Input required label={<FormattedMessage id="name-file" />} name="nameFile" />
                        </Grid>
                        <Grid item xs={6}>
                            <Input required label={<FormattedMessage id="subject" />} name="subject" />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                textFieldProps={{ placeholder: 'Enter note', multiline: true, rows: 4 }}
                                name="content"
                                label={<FormattedMessage id="content" />}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Radio required name="status" label="status" options={EMAIL_CONFIG_OPTIONS} />
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

export default AddOrEditEmailConfig;
