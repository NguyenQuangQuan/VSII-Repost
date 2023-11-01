/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

// third-party
import { yupResolver } from '@hookform/resolvers/yup';
import { FormattedMessage } from 'react-intl';
// material-ui
import {
    Button,
    DialogActions,
    Grid,
    IconButton,
    SelectChangeEvent,
    Stack,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Tooltip
} from '@mui/material';

// project imports
import { DatePicker, FormProvider, Input, Label, NumericFormatCustom } from 'components/extended/Form';
import Modal from 'components/extended/Modal';
import { ContractType, Currency, Months, PaymentTerm, ProductivityType, Project } from 'containers/search';
import { HcInfoDefault, productionPerformanceAddOrEditFormSchema } from 'pages/sales/Config';
import { useFieldArray, useForm } from 'react-hook-form';
import { gridSpacing } from 'store/constant';
import { IMonthlyProductionPerformance, IMonthlyProductionPerformanceAddOrEditForm, IOption, IHcInfos } from 'types';
import { CONTRACT_TYPE_SALE_REPORT, DEPARTMENTS } from 'constants/Common';
import { AddCircleOutlineIcon } from 'assets/images/icons';
import { Table } from 'components/extended/Table';
import SaleTableTHead from './SaleTableTHead';
import SaleTableTBody from './SaleTableTBody';
import { LoadingButton } from '@mui/lab';
import { formatPrice, getDataProductivityByMonth } from 'utils/common';
import { convertMonthFromToDate, dateFormat } from 'utils/date';

// ==============================|| ADD OR EDIT PRODUCTION PERFORMANCE ||============================== //

interface IAddOrEditProductionPerformanceProps {
    months: IOption[];
    loading: boolean;
    open: boolean;
    isEdit?: boolean;
    handleClose: () => void;
    addProductivity: (payload: IMonthlyProductionPerformanceAddOrEditForm) => void;
    editProductivity: (payload: IMonthlyProductionPerformanceAddOrEditForm) => void;
    onChangeYearGetStandardWorkingDay: (
        payload: IMonthlyProductionPerformanceAddOrEditForm,
        startDate: string,
        endDate: string,
        month?: number,
        paymentTerm?: any
    ) => void;
    productivity: IMonthlyProductionPerformanceAddOrEditForm;
    productivityManyMonths?: IMonthlyProductionPerformance;
}
const AddOrEditProductionPerformance = (props: IAddOrEditProductionPerformanceProps) => {
    // props, state, variables
    const {
        months,
        open,
        isEdit,
        loading,
        handleClose,
        productivity,
        addProductivity,
        editProductivity,
        onChangeYearGetStandardWorkingDay
    } = props;
    const [contractTypeValue, setContractTypeValue] = useState<string>('');
    const [totalAmount, setTotalAmount] = useState<number>(0);

    // useForm
    const methods = useForm<any>({
        resolver: yupResolver(productionPerformanceAddOrEditFormSchema),
        mode: 'all'
    });
    const { watch, setValue, getValues } = methods;

    const {
        fields: hcInfoValues,
        append,
        remove
    } = useFieldArray({
        control: methods.control,
        name: 'hcInfo'
    });

    // add hc info
    const handleAddHcInfo = () => {
        append(HcInfoDefault);
    };

    const handleRemoveHcInfo = (index: number) => {
        let total = 0;
        const hcInfoDelete = getValues().hcInfo;
        hcInfoDelete.forEach((item: IHcInfos) => {
            total += +item.amount;
        });
        setTotalAmount(total);
        remove(index);
    };

    const onChangeCurrency = (item: IOption) => {
        setValue('exchangeRate', item.number);
    };

    const calculateTotalAmount = (hcInfos: IHcInfos[]) => {
        let total = 0;
        hcInfos &&
            hcInfos.length > 0 &&
            hcInfos.forEach((item: IHcInfos) => {
                total += +item.amount;
            });
        return total;
    };

    const estimate = () => {
        const productivityBase = productivity.productivity ? productivity.productivity : [];
        const lastMonthData = getDataProductivityByMonth(productivityBase, getValues().month - 1);
        const { contractSize, contractAllocation, receivable, financial } = getValues();
        const totalAmount = calculateTotalAmount(getValues()?.hcInfo);

        if (contractTypeValue === CONTRACT_TYPE_SALE_REPORT.FIX_COST_BIDDING) {
            setValue('financial', financial ? financial : 0);
            setValue('receivable', receivable ? receivable : 0);
            setValue('received', receivable ? receivable : 0);
            setValue('delivered', contractAllocation === 0 ? 0 : +contractSize / +contractAllocation);
        } else {
            setValue('financial', totalAmount);
            setValue('delivered', totalAmount);
            setValue('receivable', receivable ? receivable : lastMonthData ? lastMonthData[0]?.receivable?.value : 0);
            setValue('received', receivable ? receivable : lastMonthData ? lastMonthData[0]?.receivable?.value : 0);
        }
    };

    // submit
    const handleSubmit = (values: IMonthlyProductionPerformanceAddOrEditForm) => {
        const projectId = values.projectId?.value;
        const payload = {
            ...values,
            projectId,
            duration: {
                fromDate: dateFormat(values.duration.fromDate),
                toDate: dateFormat(values.duration.toDate)
            },
            projectName: values.projectId ? values.projectId.label : values.projectName
        };

        if (isEdit) {
            editProductivity(payload);
        } else {
            addProductivity(payload);
        }
    };

    // chọn tháng
    const handleChangeMonth = (value: string) => {
        const getMonth = months.filter((month) => {
            return month.value === value;
        });
        const { fromDate, toDate } = convertMonthFromToDate(getMonth[0].label);
        onChangeYearGetStandardWorkingDay(getValues(), fromDate, toDate, +value);
    };

    // chọn payment term
    const handleChangePaymentTerm = (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => {
        const paymentTerm = e.target.value;
        const getMonth = months.filter((month) => {
            return month.value === getValues().month;
        });
        const { fromDate, toDate } = convertMonthFromToDate(getMonth[0].label);
        onChangeYearGetStandardWorkingDay(getValues(), fromDate, toDate, +getValues().month, paymentTerm);
    };

    // useEffect
    useEffect(() => {
        const totalAmount = calculateTotalAmount(productivity?.hcInfo);
        setTotalAmount(totalAmount);
        methods.reset({ ...productivity } as IMonthlyProductionPerformanceAddOrEditForm);
    }, [productivity]);

    useEffect(() => {
        const { unsubscribe } = watch((value, info) => {
            const { standardWorkingDay } = getValues();

            setContractTypeValue(value?.contractType!);

            if (info.name?.endsWith('contractType')) {
                setValue('originalContractSize', '');
                setValue('contractSize', '');
                setValue('delivered', 0);
                setValue('receivable', 0);
                setValue('received', 0);
                setValue('financial', 0);
            }

            if (value.contractType === CONTRACT_TYPE_SALE_REPORT.FIX_COST_BIDDING) {
                if (info.name?.endsWith('currency') || info.name?.endsWith('originalContractSize')) {
                    setValue('contractSize', +value.originalContractSize / +value.exchangeRate);
                }
            }

            if ((info.name?.startsWith('hcInfo') && info.name?.endsWith('rate')) || info.name?.endsWith('currency')) {
                const index = parseInt(info.name.split('.')[1]);
                const rate = Number(value.hcInfo?.at(index)?.rate);
                if (rate) {
                    if (value.currency === 'USD') {
                        setValue(`hcInfo.${index}.rateUSD`, rate);
                    } else {
                        setValue(`hcInfo.${index}.rateUSD`, rate / +value.exchangeRate);
                    }
                } else {
                    setValue(`hcInfo.${index}.rateUSD`, 0);
                }
            }

            if (info.name?.endsWith('currency')) {
                setValue('hcInfo', []);
            }

            if (info.name?.startsWith('hcInfo') && (info.name?.endsWith('rateUSD') || info.name?.endsWith('quantity'))) {
                const index = parseInt(info.name.split('.')[1]);
                const rateUSD = Number(value.hcInfo?.at(index)?.rateUSD);
                const quantity = Number(value.hcInfo?.at(index)?.quantity);
                if (rateUSD && quantity) setValue(`hcInfo.${index}.amount`, rateUSD * quantity * +standardWorkingDay);
            }

            if (info.name?.startsWith('hcInfo') && info.name?.endsWith('amount')) {
                const totalAmount = calculateTotalAmount(value?.hcInfo);
                setTotalAmount(totalAmount);
            }
        });
        return () => unsubscribe();
    }, [watch]);

    return (
        <Modal
            isOpen={open}
            title={isEdit ? 'edit-productivity' : 'add-productivity'}
            onClose={handleClose}
            keepMounted={false}
            maxWidth="md"
        >
            <FormProvider formReturn={methods} onSubmit={handleSubmit}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} lg={3}>
                        <Input name="departmentId" label={<FormattedMessage id="department" />} disabled required />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Input name="year" label={<FormattedMessage id="year" />} disabled required />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Months months={months} onChange={handleChangeMonth} required />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        {productivity.departmentId === DEPARTMENTS.SCS || productivity.departmentId === DEPARTMENTS.PRD ? (
                            <Project
                                isDefaultAll={true}
                                disabled={isEdit}
                                departmentId={productivity.departmentId}
                                required
                                isNotStatus
                                projectAuthorization="false"
                            />
                        ) : (
                            <Input required name="projectName" label={<FormattedMessage id="project-name" />} />
                        )}
                    </Grid>
                    {productivity.departmentId === DEPARTMENTS.SCS && (
                        <Grid item xs={12} lg={6}>
                            <Input
                                textFieldProps={{
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                                disabled={contractTypeValue === CONTRACT_TYPE_SALE_REPORT.TM}
                                name="originalContractSize"
                                label={<FormattedMessage id="original-contract-size" />}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12} lg={6}>
                        <Currency
                            isShow={true}
                            disabled={isEdit}
                            required
                            year={productivity.year}
                            currency={productivity.currency}
                            handleChangeFullOption={onChangeCurrency}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Input
                            textFieldProps={{
                                InputProps: {
                                    inputComponent: NumericFormatCustom as any
                                }
                            }}
                            disabled={contractTypeValue === CONTRACT_TYPE_SALE_REPORT.TM && productivity.departmentId === DEPARTMENTS.SCS}
                            name="contractSize"
                            label={<FormattedMessage id="contract-size" />}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <ProductivityType required />
                    </Grid>
                    {productivity.departmentId === DEPARTMENTS.SCS && (
                        <>
                            <Grid item xs={12} lg={3}>
                                <DatePicker name="duration.fromDate" label={<FormattedMessage id="from-date" />} />
                            </Grid>
                            <Grid item xs={12} lg={3}>
                                <DatePicker name="duration.toDate" label={<FormattedMessage id="to-date" />} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Input
                                    textFieldProps={{
                                        InputProps: {
                                            inputComponent: NumericFormatCustom as any
                                        }
                                    }}
                                    name="exchangeRate"
                                    label={<FormattedMessage id="exchange-rate" />}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Input
                                    textFieldProps={{
                                        InputProps: {
                                            inputComponent: NumericFormatCustom as any
                                        }
                                    }}
                                    name="standardWorkingDay"
                                    label={<FormattedMessage id="standard-working-day" />}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <ContractType disabled={isEdit} required />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                {contractTypeValue === CONTRACT_TYPE_SALE_REPORT.TM ? (
                                    <PaymentTerm handleChange={handleChangePaymentTerm} required />
                                ) : (
                                    <Input
                                        textFieldProps={{
                                            InputProps: {
                                                inputComponent: NumericFormatCustom as any
                                            }
                                        }}
                                        name="contractAllocation"
                                        label={<FormattedMessage id="contract-allocation-by-month" />}
                                    />
                                )}
                            </Grid>

                            <Grid item xs={12} lg={12}>
                                {productivity.departmentId === DEPARTMENTS.SCS && contractTypeValue === CONTRACT_TYPE_SALE_REPORT.TM && (
                                    <TableContainer>
                                        <Stack
                                            direction="row"
                                            justifyContent="left"
                                            alignItems="left"
                                            paddingTop={'20px'}
                                            paddingLeft={'10px'}
                                            maxWidth="md"
                                        >
                                            <Tooltip placement="top" title="a" onClick={() => handleAddHcInfo()}>
                                                <IconButton aria-label="add" size="small">
                                                    <AddCircleOutlineIcon sx={{ fontSize: '1.1rem' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                        <Table
                                            heads={<SaleTableTHead dataArray={hcInfoValues} />}
                                            data={hcInfoValues}
                                            heightTableEmpty="100px"
                                        >
                                            <TableBody>
                                                {hcInfoValues?.map((item: any, key: number) => (
                                                    <SaleTableTBody key={item.id} item={item} index={key} remove={handleRemoveHcInfo} />
                                                ))}
                                                <TableRow>
                                                    <TableCell colSpan={4} />
                                                    <TableCell align="center">
                                                        <FormattedMessage id="total" />
                                                    </TableCell>
                                                    <TableCell>{formatPrice(totalAmount)}</TableCell>
                                                    <TableCell />
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </Grid>
                        </>
                    )}
                    {productivity.departmentId === DEPARTMENTS.SCS && (
                        <Grid item xs={12} lg={12}>
                            <Label label="&nbsp;" />
                            <Button variant="contained" onClick={estimate}>
                                <FormattedMessage id="estimate" />
                            </Button>
                        </Grid>
                    )}

                    <Grid item xs={12} lg={6}>
                        <Input
                            textFieldProps={{
                                InputProps: {
                                    inputComponent: NumericFormatCustom as any
                                }
                            }}
                            name="delivered"
                            label={<FormattedMessage id="delivered" />}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Input
                            textFieldProps={{
                                InputProps: {
                                    inputComponent: NumericFormatCustom as any
                                }
                            }}
                            name="receivable"
                            label={<FormattedMessage id="receivable" />}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Input
                            textFieldProps={{
                                InputProps: {
                                    inputComponent: NumericFormatCustom as any
                                }
                            }}
                            name="received"
                            label={<FormattedMessage id="received" />}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Input
                            textFieldProps={{
                                InputProps: {
                                    inputComponent: NumericFormatCustom as any
                                }
                            }}
                            name="financial"
                            label={<FormattedMessage id="financial" />}
                        />
                    </Grid>
                </Grid>

                {/* Sale */}
                <DialogActions sx={{ mt: 2 }}>
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

export default AddOrEditProductionPerformance;
