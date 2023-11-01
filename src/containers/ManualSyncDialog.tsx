import React, { useCallback, useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';

// material-ui
import { Grid, Button, DialogActions, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// yup
import * as yup from 'yup';

// project imports
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Modal from 'components/extended/Modal';
import { FormProvider, DatePicker, Input } from 'components/extended/Form';
import { Table } from 'components/extended/Table';
import {
    getCurrentMonth,
    getCurrentWeek,
    getCurrentYear,
    getMonthsOfYear,
    getWeeksPeriodsInYear,
    getNumberOfWeek,
    dateFormat
} from 'utils/date';
import { IOption } from 'types';
import { gridSpacing } from 'store/constant';
import { Years, Months, Weeks, Period, DataSource } from 'containers/search';
import manualSyncAPI from 'services/others/manualSyncAPI';
import { closeSync, syncSelector } from 'store/slice/syncSlice';
import { store } from 'app/store';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { VALIDATE_MESSAGES } from 'constants/Message';
import ErrorImportThead from './ErrorImportThead';
import ErrorImportTBody from './ErrorImportTBody';
import { Download } from 'components/icons';
import { exportDocument } from 'utils/common';
import Api from 'constants/Api';
import sendRequest from 'services/ApiService';

// ==============================|| MANUAL SYNC DIALOG ||============================== //

interface IManualSyncFilterConfig {
    dataSource: string;
    fromDate: Date | null | string;
    toDate: Date | null | string;
    period: string;
    year: number;
    month: string | number;
    week: string | number;
}

export interface IImportError {
    name: string;
    errorList: string[];
}

const manualSyncFilterDefault: IManualSyncFilterConfig = {
    dataSource: 'redmine',
    fromDate: null,
    toDate: null,
    period: 'month',
    year: getCurrentYear(),
    month: getCurrentMonth(),
    week: getCurrentWeek().value
};

export const manualSyncFilterSchema = yup.object().shape({
    dataSource: yup.string(),
    fromDate: yup.date().when('dataSource', {
        is: 'excel',
        then: yup.date().nullable().required(VALIDATE_MESSAGES.REQUIRED),
        otherwise: yup.date().nullable()
    }),
    toDate: yup.date().when('dataSource', {
        is: 'excel',
        then: yup
            .date()
            .nullable()
            .required(VALIDATE_MESSAGES.REQUIRED)
            .test('toDate-after-fromDate', VALIDATE_MESSAGES.AFTER_DAY, function (value) {
                const fromDate = this.resolve(yup.ref('fromDate'));
                return !value || !fromDate || moment(value).isSameOrAfter(fromDate, 'day');
            }),
        otherwise: yup.date().nullable()
    }),
    excel: yup.mixed().when('dataSource', {
        is: 'excel',
        then: yup
            .mixed()
            .nullable()
            .test('required', VALIDATE_MESSAGES.REQUIRED, (file) => {
                if (file) return true;
                return false;
            })
            .test({
                message: 'Please provide a supported file extension',
                test: (file, context) => {
                    const isValid = ['xlsx'].includes(file && file.split('.').pop());
                    if (!isValid) context?.createError();
                    return isValid;
                }
            }),
        otherwise: yup.mixed().nullable()
    }),
    period: yup.string(),
    year: yup.string(),
    month: yup.string(),
    week: yup.string()
});

const ManualSyncDialog = () => {
    // state, selector
    const dispatch = useAppDispatch();
    const { open } = useAppSelector(syncSelector);
    const [formReset, setFormReset] = useState<IManualSyncFilterConfig>(manualSyncFilterDefault);
    const [period, setPeriod] = useState<string>(manualSyncFilterDefault.period);
    const [year, setYear] = useState<number>(manualSyncFilterDefault.year);
    const [months, setMonths] = useState<IOption[]>([]);
    const [weeks, setWeeks] = useState<IOption[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isChangeYear, setIsChangeYear] = useState<boolean>(false);
    const [dataSource, setDataSource] = useState<string>('redmine');
    const [isShowMessageModal, setIsShowMessageModal] = useState<boolean>(false);
    const [fileSelected, setFileSelected] = useState<File | null>(null);
    const [importErrors, setImportErrors] = useState<any>([]);

    const getMonthInYears = useCallback(async (y: number) => {
        const monthInYears = await getMonthsOfYear(y);
        return monthInYears;
    }, []);

    const getWeekInYears = useCallback(async (y: number) => {
        const weekInYears = await getWeeksPeriodsInYear(y);
        return weekInYears;
    }, []);

    // Event
    const handleChangePeriod = (e: any) => {
        const { value } = e.target;
        setPeriod(value);
    };

    const handleChangeYear = (e: any) => {
        const { value } = e.target;
        setYear(value);
        setIsChangeYear(true);
    };

    const handleChangeDataSource = (e: any) => {
        const { value } = e.target;
        setDataSource(value);
    };

    const handleChangeFile = (e: any) => {
        const { files } = e.target;
        const selectedFiles = files as FileList;
        setFileSelected(selectedFiles?.[0]);
    };

    const handleClose = () => {
        dispatch(closeSync());
        setDataSource('redmine');
    };

    const handleCloseMessageModal = () => {
        setIsShowMessageModal(false);
        setImportErrors([]);
    };

    const handleSubmit = async (value: IManualSyncFilterConfig) => {
        setLoading(true);
        try {
            let response = null;
            if (dataSource === 'redmine' && period === 'month') {
                // call API manual sync by month
                response = await manualSyncAPI.getSyncMonth(value.year, value.month);
            }

            if (dataSource === 'redmine' && period === 'week') {
                // call API manual sync by week
                const numberOfWeek = getNumberOfWeek(value.week);
                response = await manualSyncAPI.getSyncWeek(value.year, numberOfWeek!);
            }

            if (dataSource === 'excel') {
                const formData = new FormData() as any;
                formData.append('file', fileSelected);
                formData.append('fromDate', dateFormat(value.fromDate));
                formData.append('toDate', dateFormat(value.toDate));
                formData.append('action', 'sync');

                // call API import data source by excel file
                response = await sendRequest(Api.synchronize.postImportExcel, formData);
            }

            if (response && response.status) {
                const { result } = response;
                setLoading(false);
                handleClose();
                const successMsg = {
                    open: true,
                    message: result.content.message,
                    variant: 'alert',
                    alert: { color: 'success' }
                };
                store.dispatch(openSnackbar(successMsg));
            } else {
                setLoading(false);
                setImportErrors(response?.result.content.message);
            }
        } catch (error) {
            setLoading(false);
            let errorMessage = 'Failed to do something exceptional';
            if (error instanceof Error) errorMessage = error.message;
            const errorMsg = {
                open: true,
                message: errorMessage,
                variant: 'alert',
                alert: { color: 'error' }
            };
            store.dispatch(openSnackbar(errorMsg));
        }
    };

    const handleDownloadTemplate = () => {
        exportDocument(Api.synchronize.getDownloadTemplate.url);
    };

    // hooks
    useEffect(() => {
        if (period === 'month') {
            getMonthInYears(year).then((items: IOption[]) => {
                setMonths(items);
                if (items.length > 0 && isChangeYear) setFormReset({ ...formReset, period: 'month', year, month: items[0].value });
            });
        } else {
            getWeekInYears(year).then((items: IOption[]) => {
                setWeeks(items);
                if (items.length > 0 && isChangeYear) setFormReset({ ...formReset, period: 'week', year, week: items[0].value });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year, period]);

    useEffect(() => {
        if (importErrors.length > 0) setIsShowMessageModal(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [importErrors]);

    return (
        <Modal isOpen={open} title="synchronize" onClose={handleClose} keepMounted={false} maxWidth="xs">
            <FormProvider
                form={{
                    defaultValues: manualSyncFilterDefault,
                    resolver: yupResolver(manualSyncFilterSchema)
                }}
                onSubmit={handleSubmit}
                formReset={formReset}
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} lg={12}>
                        <DataSource handleChange={handleChangeDataSource} />
                    </Grid>
                    {dataSource === 'excel' && (
                        <>
                            <Grid item xs={12} lg={6}>
                                <DatePicker required name="fromDate" label={<FormattedMessage id="from-date" />} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <DatePicker required name="toDate" label={<FormattedMessage id="to-date" />} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Input
                                    required
                                    label={<FormattedMessage id="attachment" />}
                                    name="excel"
                                    type="file"
                                    onChangeInput={handleChangeFile}
                                />
                            </Grid>
                            <Grid item container xs={12} lg={6} alignItems="center">
                                <Grid item mt="15px">
                                    <Button onClick={() => handleDownloadTemplate()}>
                                        <Stack alignItems="center" direction="row" gap={1}>
                                            <Download />
                                            <Typography fontWeight={500}>
                                                <FormattedMessage id="download-template" />
                                            </Typography>
                                        </Stack>
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    )}

                    {dataSource === 'redmine' && (
                        <>
                            <Grid item xs={12} lg={12}>
                                <Period handleChangePeriod={handleChangePeriod} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Years handleChangeYear={handleChangeYear} />
                            </Grid>
                            {period === 'month' && (
                                <Grid item xs={12} lg={6}>
                                    <Months months={months} />
                                </Grid>
                            )}
                            {period === 'week' && (
                                <Grid item xs={12} lg={6}>
                                    <Weeks weeks={weeks} />
                                </Grid>
                            )}
                        </>
                    )}
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

            <Modal isOpen={isShowMessageModal} title="error-message" keepMounted={false} onClose={handleCloseMessageModal}>
                <Table heads={<ErrorImportThead />} data={importErrors}>
                    <ErrorImportTBody errorMessages={importErrors} />
                </Table>
            </Modal>
        </Modal>
    );
};

export default ManualSyncDialog;
