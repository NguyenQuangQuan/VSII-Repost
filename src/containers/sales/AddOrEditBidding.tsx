/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { SyntheticEvent, useEffect, useState } from 'react';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, Grid, Stack } from '@mui/material';

// project imports
import { FormProvider } from 'components/extended/Form';
import Modal from 'components/extended/Modal';
import { TabPanel } from 'components/extended/Tabs';
import { IMember, IMonthlyBillable, IOption, ISaleBidding } from 'types';
import { CONTRACT_TYPE_SALE_REPORT, FIELD_BY_TAB_BIDDING, addOrEditBiddingTabs } from 'constants/Common';
import { TabCustom } from 'containers';

// third party
import { yupResolver } from '@hookform/resolvers/yup';
import { FormattedMessage } from 'react-intl';
import { useForm, useFieldArray } from 'react-hook-form';
import {
    calculateAmountBidding,
    calculateHCS,
    calculateMonthDifference,
    calculateNetEarn,
    calculateNewSaleUSD,
    calculateQuarterlyBillable,
    calculateRateUsdBidding,
    calculateRemain,
    calculateSizeUSD,
    calculateSizeVND,
    calculateTotalAmount,
    calculateTotalBillable,
    calculateTotalHours,
    getObjectByMonth,
    getTabValueByFieldError,
    getWorkingDaysByMonth,
    isEmpty,
    updateBillableDayInMonthlyHCList,
    updateBillableInMonthlyHCList
} from 'utils/common';
import {
    IRateByMonth,
    addOrEditBiddingConfig,
    addOrEditBiddingSchema,
    addOrEditRateByMonthSchema,
    defaultHcInfoMonths,
    defaultHcInfoMonthsFC,
    hcInfoMonthdefault
} from 'pages/sales/Config';
import { dateFormat } from 'utils/date';
import AddOrEditProjectInfo from './AddOrEditProjectInfo';
import AddOrEditFinancialInfo from './AddOrEditFinancialInfo';
import AddOrEditHcInfo from './AddOrEditHcInfo';
import AddOrEditOtherInfo from './AddOrEditOtherInfo';
import TMOrFCBidding from './TMOrFCBidding';
import { useAppDispatch } from 'app/hooks';
import { openSnackbar } from 'store/slice/snackbarSlice';

interface IAddOrEditBiddingProps {
    open: boolean;
    isEdit: boolean;
    handleClose: () => void;
    loading?: boolean;
    saleBidding?: ISaleBidding;
    year?: number;
    postAddOrEdit: (payload: ISaleBidding) => void;
    monthlyBillable?: IMonthlyBillable;
    exchangeRateVND?: number;
}

const AddOrEditBidding = (props: IAddOrEditBiddingProps) => {
    // Hooks, State, Variable, Props
    const { open, handleClose, loading, isEdit, postAddOrEdit, year, saleBidding, monthlyBillable, exchangeRateVND } = props;

    const dispatch = useAppDispatch();
    const [tabValue, setTabValue] = useState(0);
    const [total, setTotal] = useState(0);
    const [rateUsd, setRateUsd] = useState<number>();
    const [rate, setRate] = useState<{ value: string; index: number }>();
    const [quantity, setQuantity] = useState<number>();
    const [contractType, setContractType] = useState<string>(saleBidding?.project?.contractType!);
    const [openTMFC, setopenTMFC] = useState<boolean>();
    const [hcInfoMonths, setHcInfoMonths] = useState<any>(defaultHcInfoMonths);
    const [hcInfoMonthsFC, setHcInfoMonthsFC] = useState(defaultHcInfoMonthsFC);
    const [userContactOption, setUserContactOption] = useState<{ idHexString: string; firstName: string; lastName: string } | null>(null);
    const [submitMonthlyBillable, setsubmitMonthlyBillable] = useState<boolean>(false);
    const [workingDay, setWorkingDay] = useState(0);
    const [contractAllocation, setContractAllocation] = useState(0);

    const handleSubmit = (values: any) => {
        const data = {
            idHexString: isEdit ? saleBidding?.idHexString : '',
            financialInfo: {
                originalContractSize: values.originalContractSize,
                sizeVND: values.sizeVND,
                sizeUSD: values.sizeUSD,
                managementRevenueAllocated: values.managementRevenueAllocated,
                accountRevenueAllocatedVND: values.accountRevenueAllocatedVND,
                newSaleUSD: values.newSaleUSD,
                currency: values.currency,
                exchangeRate: values.exchangeRate,
                acctReceivables: values.acctReceivables,
                netEarn: values.netEarn,
                paid: values.paid,
                remain: values.remain,
                quarterLicense1st: values.quarterLicense1st,
                quarterLicense2nd: values.quarterLicense2nd,
                quarterLicense3rd: values.quarterLicense3rd,
                quarterLicense4th: values.quarterLicense4th,
                licenseFee: values.licenseFee
            },
            hcInfo: {
                billableHcs: values.billableHcs,
                hcs: values.hcs,
                teamLeadHcs: values.teamLeadHcs,
                seniorHcs: values.seniorHcs,
                middleHcs: values.middleHcs,
                juniorHcs: values.juniorHcs,
                quarter1st: values.quarter1st,
                quarter2nd: values.quarter2nd,
                quarter3rd: values.quarter3rd,
                quarter4th: values.quarter4th,
                totalBillable: values.totalBillable,
                totalNewSale: values.totalNewSale,
                monthlyHCList: values.monthlyHCList,
                hcInfoMonth: values.contractType === CONTRACT_TYPE_SALE_REPORT.TM ? hcInfoMonths : [],
                fixCostHcInfo: values.contractType === CONTRACT_TYPE_SALE_REPORT.FIX_COST_BIDDING ? hcInfoMonthsFC : []
            },
            project: {
                productionPerformanceIdHexString: values.productionPerformanceIdHexString,
                year: values.year,
                customer: values.customer,
                projectName: values.projectName,
                type: values.type,
                serviceType: values.serviceType,
                contractType: values.contractType,
                note: values.note,
                contractNo: values.contractNo,
                probability: values.probability,
                status: values.status,
                contractDueDate: dateFormat(values.contractDueDate),
                contractDurationFrom: dateFormat(values.contractDurationFrom),
                contractDurationTo: dateFormat(values.contractDurationTo),
                warrantyTime: values.warrantyTime
            },
            otherInfo: {
                contact: userContactOption,
                presaleFolder: values.presaleFolder,
                customerContact: values.customerContact,
                phoneNumber: values.phoneNumber,
                emailAddress: values.emailAddress
            }
        };

        postAddOrEdit(data as any);
        setHcInfoMonths(defaultHcInfoMonths);
        setHcInfoMonthsFC(defaultHcInfoMonthsFC);
    };
    const handleChangeTab = (event: SyntheticEvent, value: number) => {
        setTabValue(value);
    };

    const methods = useForm({
        defaultValues: {
            //project
            year: isEdit ? saleBidding?.project.year : year,
            productionPerformanceIdHexString: isEdit ? saleBidding?.project.productionPerformanceIdHexString : '',
            customer: isEdit ? saleBidding?.project.customer : '',
            projectName: isEdit ? saleBidding?.project.projectName : '',
            type: isEdit ? saleBidding?.project.type : '',
            serviceType: isEdit ? saleBidding?.project.serviceType : '',
            contractType: isEdit ? saleBidding?.project.contractType : '',
            note: isEdit ? saleBidding?.project.note : '',
            contractNo: isEdit ? saleBidding?.project.contractNo : '',
            probability: isEdit ? saleBidding?.project.probability : '',
            status: isEdit ? saleBidding?.project.status : '',
            contractDueDate: isEdit ? saleBidding?.project.contractDueDate : '',
            contractDurationFrom: isEdit ? saleBidding?.project.contractDurationFrom : '',
            contractDurationTo: isEdit ? saleBidding?.project.contractDurationTo : '',
            warrantyTime: isEdit ? saleBidding?.project.warrantyTime : '',
            //financialInfo

            originalContractSize: isEdit
                ? saleBidding?.financialInfo.originalContractSize
                : addOrEditBiddingConfig.financialInfo.originalContractSize,
            sizeUSD: isEdit ? saleBidding?.financialInfo.sizeUSD : addOrEditBiddingConfig.financialInfo.sizeUSD,
            sizeVND: isEdit ? saleBidding?.financialInfo.sizeVND : addOrEditBiddingConfig.financialInfo.sizeVND,
            managementRevenueAllocated: isEdit
                ? saleBidding?.financialInfo.managementRevenueAllocated
                : addOrEditBiddingConfig.financialInfo.managementRevenueAllocated,
            accountRevenueAllocatedVND: isEdit
                ? saleBidding?.financialInfo.accountRevenueAllocatedVND
                : addOrEditBiddingConfig.financialInfo.accountRevenueAllocatedVND,
            newSaleUSD: isEdit ? saleBidding?.financialInfo.newSaleUSD : addOrEditBiddingConfig.financialInfo.newSaleUSD,
            currency: isEdit ? saleBidding?.financialInfo.currency : '',
            exchangeRate: isEdit ? saleBidding?.financialInfo.exchangeRate : addOrEditBiddingConfig.financialInfo.exchangeRate,
            acctReceivables: isEdit ? saleBidding?.financialInfo.acctReceivables : addOrEditBiddingConfig.financialInfo.acctReceivables,
            netEarn: isEdit ? saleBidding?.financialInfo.netEarn : '',
            paid: isEdit ? saleBidding?.financialInfo.paid : addOrEditBiddingConfig.financialInfo.paid,
            remain: isEdit ? saleBidding?.financialInfo.remain : addOrEditBiddingConfig.financialInfo.remain,
            quarterLicense1st: isEdit ? saleBidding?.financialInfo.quarterLicense1st : '',
            quarterLicense2nd: isEdit ? saleBidding?.financialInfo.quarterLicense2nd : '',
            quarterLicense3rd: isEdit ? saleBidding?.financialInfo.quarterLicense3rd : '',
            quarterLicense4th: isEdit ? saleBidding?.financialInfo.quarterLicense4th : '',
            licenseFee: isEdit ? saleBidding?.financialInfo.licenseFee : '',
            //HC info
            billableHcs: isEdit ? saleBidding?.hcInfo.billableHcs : '',
            hcs: isEdit ? saleBidding?.hcInfo.hcs : addOrEditBiddingConfig.hcInfo.hcs,
            teamLeadHcs: isEdit ? saleBidding?.hcInfo.teamLeadHcs : addOrEditBiddingConfig.hcInfo.teamLeadHcs,
            seniorHcs: isEdit ? saleBidding?.hcInfo.seniorHcs : addOrEditBiddingConfig.hcInfo.seniorHcs,
            middleHcs: isEdit ? saleBidding?.hcInfo.middleHcs : addOrEditBiddingConfig.hcInfo.middleHcs,
            juniorHcs: isEdit ? saleBidding?.hcInfo.juniorHcs : addOrEditBiddingConfig.hcInfo.juniorHcs,
            quarter1st: isEdit ? saleBidding?.hcInfo.quarter1st : addOrEditBiddingConfig.hcInfo.quarter1st,
            quarter2nd: isEdit ? saleBidding?.hcInfo.quarter2nd : addOrEditBiddingConfig.hcInfo.quarter2nd,
            quarter3rd: isEdit ? saleBidding?.hcInfo.quarter3rd : addOrEditBiddingConfig.hcInfo.quarter3rd,
            quarter4th: isEdit ? saleBidding?.hcInfo.quarter4th : addOrEditBiddingConfig.hcInfo.quarter4th,
            totalBillable: isEdit ? saleBidding?.hcInfo.totalBillable : addOrEditBiddingConfig.hcInfo.totalBillable,
            totalNewSale: isEdit ? saleBidding?.hcInfo.totalNewSale : addOrEditBiddingConfig.hcInfo.totalNewSale,
            monthlyHCList: isEdit ? saleBidding?.hcInfo.monthlyHCList : addOrEditBiddingConfig.hcInfo.monthlyHCList,
            hcInfoMonth: isEdit ? saleBidding?.hcInfo.hcInfoMonth : [hcInfoMonthdefault],
            rateByMonth: [IRateByMonth],
            month: '',
            contractAllocationByMonth: 0,
            hcMonthly: 0,
            billable: 0,

            //otherInfo
            contact: isEdit
                ? {
                    value: saleBidding?.otherInfo?.contact?.idHexString ? saleBidding?.otherInfo?.contact?.idHexString : '',
                    label: `${saleBidding?.otherInfo?.contact?.firstName ? saleBidding?.otherInfo?.contact?.firstName : ''} ${saleBidding?.otherInfo?.contact?.lastName ? saleBidding?.otherInfo?.contact?.lastName : ''
                        }`
                }
                : { value: '', label: '' },

            presaleFolder: isEdit ? saleBidding?.otherInfo.presaleFolder : '',
            customerContact: isEdit ? saleBidding?.otherInfo.customerContact : '',
            phoneNumber: isEdit ? saleBidding?.otherInfo.phoneNumber : '',
            emailAddress: isEdit ? saleBidding?.otherInfo.emailAddress : ''
        },
        resolver: yupResolver(addOrEditBiddingSchema),
        mode: 'all'
    });

    const methodRateByMonths = useForm({
        defaultValues: {
            contractType: contractType,
            month: '',
            contractAllocationByMonth: 0,
            rateByMonth: [IRateByMonth],
            billable: 0
        },
        resolver: yupResolver(addOrEditRateByMonthSchema),
        mode: 'all'
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fields } = useFieldArray({
        control: methods.control,
        name: 'monthlyHCList'
    });

    const { remove, append } = useFieldArray({
        control: methodRateByMonths.control,
        name: 'rateByMonth'
    });

    const { errors } = methods.formState;

    const hcInfoMonthValues = methodRateByMonths.watch('rateByMonth');
    const monthValue = methodRateByMonths.watch('month');
    const contractAllocationByMonthValue = methodRateByMonths.watch('contractAllocationByMonth');
    const billableValue = methodRateByMonths.watch('billable');
    const monthlyHCListValues = methods.watch('monthlyHCList');
    const originalValue = methods.watch('originalContractSize');
    const exchangeValue = methods.watch('exchangeRate');
    const managementRevenueAllocatedValues = methods.watch('managementRevenueAllocated');
    const accountRevenueAllocatedVNDValue = methods.watch('accountRevenueAllocatedVND');
    const paidValue = methods.watch('paid');
    const teamLeadHcsValue = methods.watch('teamLeadHcs');
    const seniorHcsValue = methods.watch('seniorHcs');
    const middleHcsValue = methods.watch('middleHcs');
    const juniorHcsValue = methods.watch('juniorHcs');
    const quarter1stValue = methods.watch('quarter1st');
    const quarter2ndValue = methods.watch('quarter2nd');
    const quarter3rdValue = methods.watch('quarter3rd');
    const quarter4thValue = methods.watch('quarter4th');
    const contractTypeValue = methods.watch('contractType');
    const sizeVNDValue = methods.watch('sizeVND');
    const fromDateValue = methods.watch('contractDurationFrom');
    const toDateValue = methods.watch('contractDurationTo');
    const acctReceivablesValue = methods.watch('acctReceivables');
    const qL1stValue = methods.watch('quarterLicense1st');
    const qL2ndValue = methods.watch('quarterLicense2nd');
    const qL3rdValue = methods.watch('quarterLicense3rd');
    const qL4thValue = methods.watch('quarterLicense4th');

    const handleResetNetearn = () => {
        const total = calculateNetEarn(qL1stValue, qL2ndValue, qL3rdValue, qL4thValue);
        const totalNetEarn = +acctReceivablesValue! - total!;
        methods.reset({
            ...methods.getValues(),
            netEarn: totalNetEarn ? totalNetEarn : acctReceivablesValue
        });
    };

    useEffect(() => {
        handleResetNetearn();
    }, [acctReceivablesValue, qL1stValue, qL2ndValue, qL3rdValue, qL4thValue]);

    const focusErrors = () => {
        const tabNumber = getTabValueByFieldError(errors, FIELD_BY_TAB_BIDDING);
        setTabValue(tabNumber);
    };

    // handle reset from
    const handleCalculateSizeUSD = () => {
        if (sizeVNDValue && exchangeRateVND) {
            const totalSizeUSD = calculateSizeUSD(+sizeVNDValue, +exchangeRateVND);
            methods.reset({
                ...methods.getValues(),
                sizeUSD: totalSizeUSD
            });
        }
    };
    const handleCalculateSizeVND = () => {
        if (exchangeValue && originalValue) {
            const totalSizeVND = calculateSizeVND(+originalValue, +exchangeValue);
            methods.reset({
                ...methods.getValues(),
                sizeVND: totalSizeVND
            });
        }
    };

    const handleCalculateNewSaleUSD = () => {
        if (exchangeRateVND && managementRevenueAllocatedValues) {
            const totalCalculateNewSaleUSD = calculateNewSaleUSD(+managementRevenueAllocatedValues, +exchangeRateVND);
            methods.reset({
                ...methods.getValues(),
                newSaleUSD: totalCalculateNewSaleUSD
            });
        }
    };

    const handleCalculateacctReceivables = () => {
        methods.reset({
            ...methods.getValues(),
            acctReceivables: accountRevenueAllocatedVNDValue ? +accountRevenueAllocatedVNDValue : ''
        });
    };
    const handleCalculateacctRemain = () => {
        const totalRemain = calculateRemain(+sizeVNDValue!, +paidValue!);
        methods.reset({
            ...methods.getValues(),
            remain: totalRemain
        });
    };

    const handleCalculateacctHcs = () => {
        const totalHcs = calculateHCS(+teamLeadHcsValue!, +seniorHcsValue!, +middleHcsValue!, +juniorHcsValue!);

        methods.reset({
            ...methods.getValues(),
            hcs: totalHcs ? totalHcs : ''
        });
    };

    const handleCalculateacctTotalNewSale = () => {
        const totalTotalNewSale = calculateNetEarn(quarter1stValue, quarter2ndValue, quarter3rdValue, quarter4thValue);
        methods.reset({
            ...methods.getValues(),
            totalNewSale: totalTotalNewSale
        });
    };

    const handleResetBillableDay = () => {
        if (monthlyBillable && monthlyHCListValues) {
            const monthlyHCList = updateBillableDayInMonthlyHCList(monthlyHCListValues, monthlyBillable);
            methods.reset({
                ...methods.getValues(),
                monthlyHCList: monthlyHCList
            });
        }
    };

    // calculate Rate Usd

    const handleCalculateRateUsd = () => {
        if (rate || exchangeValue) {
            const rateVND = calculateRateUsdBidding(+exchangeValue!, +rate?.value!);
            let currentValues = methodRateByMonths.getValues().rateByMonth;
            currentValues[rate?.index!] = { ...currentValues[rate?.index!], rateVND };
            methodRateByMonths.reset({ ...methodRateByMonths.getValues(), rateByMonth: currentValues });
        }
    };

    //Event
    const handleChangeCurrency = (data: IOption) => {
        methods.reset({
            ...methods.getValues(),
            currency: data.value as string,
            exchangeRate: data.number
        });
    };

    const handleChangeUser = (userSelected: IMember) => {
        userSelected &&
            setUserContactOption({
                idHexString: userSelected?.idHexString!,
                firstName: userSelected?.firstName,
                lastName: userSelected?.lastName
            });
    };

    const handleOpenMonthlyBillable = () => {
        // on TM
        if (contractType === 'TM') {
            methodRateByMonths.reset({
                ...methodRateByMonths.getValues()
            });
        } else {
            methodRateByMonths.reset({
                ...methodRateByMonths.getValues()
            });
        }
        setopenTMFC(true);
    };
    const handleCloseMonthlyBillable = () => {
        setopenTMFC(false);
    };

    // tạm tính
    const handleProvisionalCalculation = () => {
        if (contractTypeValue !== CONTRACT_TYPE_SALE_REPORT.TM) {
            methodRateByMonths.reset({
                ...methodRateByMonths.getValues(),
                billable: +sizeVNDValue! / +contractAllocationByMonthValue
            });
        } else {
            methodRateByMonths.reset({
                ...methodRateByMonths.getValues(),
                billable: +total
            });
        }
    };

    const handleChangeRate = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        setRate({ value: e.target.value, index });
    };
    const handleChangeRateVND = (e: any) => {
        setRateUsd(+e.target.value);
    };
    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(+e.target.value);
    };

    const addRankCostHistoryHandler = () => {
        const costHistoryListFormDefault = [IRateByMonth];
        append(costHistoryListFormDefault);
    };

    // change month
    const handleRateByMonth = () => {
        const lastMonth = +monthValue - 1;

        if (contractTypeValue === CONTRACT_TYPE_SALE_REPORT.TM) {
            const objectForMonth = getObjectByMonth(+monthValue, hcInfoMonths);
            const objectForLastMonth = getObjectByMonth(lastMonth ? lastMonth : +monthValue, hcInfoMonths);
            const amount = objectForMonth?.rateByMonth[0]?.amount;

            const rateByMonth = amount ? objectForMonth?.rateByMonth : objectForLastMonth?.rateByMonth;
            const billable = amount ? objectForMonth?.billable : objectForLastMonth?.billable;
            methodRateByMonths.reset({
                ...methodRateByMonths.getValues(),
                billable,
                rateByMonth
            });
        } else {
            const objectForMonthFC = getObjectByMonth(+monthValue, hcInfoMonthsFC);
            const objectForMonthFCLastMonth = getObjectByMonth(lastMonth ? lastMonth : +monthValue, hcInfoMonthsFC);

            const billable = objectForMonthFC?.billable;
            const contractAllocationByMonth = objectForMonthFC?.contractAllocationByMonth;
            const contractAllocationLastMonth = objectForMonthFCLastMonth?.contractAllocationByMonth;

            methodRateByMonths.reset({
                ...methodRateByMonths.getValues(),
                billable: billable ? billable : objectForMonthFCLastMonth?.billable,
                contractAllocationByMonth: contractAllocationByMonth
                    ? contractAllocationByMonth
                    : contractAllocationLastMonth
                        ? contractAllocationLastMonth
                        : contractAllocation
            });
        }
    };

    const onChangeHcMonthly = () => {
        const totalBillableHours = calculateTotalHours(monthlyHCListValues);
        methods.reset({
            ...methods.getValues(),
            totalBillable: totalBillableHours
        });
    };

    //hand submit TM FC
    const handleSubmitMonthlyBillable = () => {
        setsubmitMonthlyBillable(true);

        dispatch(
            openSnackbar({
                open: true,
                message: 'add-success',
                variant: 'alert',
                alert: { color: 'success' }
            })
        );

        if (contractTypeValue === CONTRACT_TYPE_SALE_REPORT.TM) {
            const data = { month: +monthValue, billable: billableValue };

            if (monthlyHCListValues && data) {
                const monthlyHCList = updateBillableInMonthlyHCList(data!, monthlyHCListValues!);
                methods.reset({
                    ...methods.getValues(),
                    monthlyHCList
                });
            }

            const hcInfoMonthValuesList = hcInfoMonthValues.map((item: any) => ({
                role: item.role,
                rate: +item.rate,
                rateVND: +item.rateVND,
                quantity: +item.quantity,
                amount: +item.amount
            }));

            const hcInfoMonth = {
                month: +monthValue,
                billable: +billableValue,
                rateByMonth: hcInfoMonthValuesList
            };

            const updateHcInfoMonths = (hcInfoMonth: any) => {
                setHcInfoMonths((prevState: any) => {
                    const updatedMonths = prevState?.map((month: any) => {
                        if (month.month === hcInfoMonth.month) {
                            return hcInfoMonth;
                        }
                        return month;
                    });
                    return updatedMonths;
                });
            };

            updateHcInfoMonths(hcInfoMonth);
        } else {
            const data = { month: +monthValue, billable: +billableValue };

            if (monthlyHCListValues && data) {
                const monthlyHCList = updateBillableInMonthlyHCList(data, monthlyHCListValues);
                methods.reset({
                    ...methods.getValues(),
                    monthlyHCList
                });
            }

            const fixCostHcInfo = {
                month: +monthValue,
                billable: +billableValue,
                contractAllocationByMonth: +contractAllocationByMonthValue
            };

            const updateHcInfoMonthsFC = (fixCostHcInfo: any) => {
                setHcInfoMonthsFC((prevState) => {
                    const updatedMonthsFC = prevState?.map((month) => {
                        if (month.month === fixCostHcInfo.month) {
                            return fixCostHcInfo;
                        }
                        return month;
                    });
                    return updatedMonthsFC;
                });
            };
            updateHcInfoMonthsFC(fixCostHcInfo);
        }
    };

    const handleCalculateTotalAmount = () => {
        if (hcInfoMonthValues && workingDay) {
            calculateAmountBidding(hcInfoMonthValues, workingDay);
            const total: number = calculateTotalAmount(hcInfoMonthValues as any);

            setTotal(total);
        } else {
            setTotal(0);
        }
    };

    const handleChangeContractType = (e: any) => {
        setContractType(e.target.value);
    };

    // Calculation Delivered (Fix code) -----------------
    const handleCalculateMonthDifference = () => {
        const fromDate = dateFormat(fromDateValue);
        const toDate = dateFormat(toDateValue);
        if (fromDateValue && toDateValue) {
            const contractAllocationByMonth = calculateMonthDifference(fromDate, toDate);
            setContractAllocation(contractAllocationByMonth);
        }
    };

    const handleResetManagementRevenueAndQuarte = () => {
        if (submitMonthlyBillable) {
            const totalQuy = calculateQuarterlyBillable(monthlyHCListValues);

            const totalBillable = calculateTotalBillable(monthlyHCListValues);

            methods.reset({
                ...methods.getValues(),
                managementRevenueAllocated: totalBillable ? totalBillable : methods.getValues().totalBillable,
                quarter1st: totalQuy.monthly1 ? totalQuy.monthly1 : methods.getValues().quarter1st,
                quarter2nd: totalQuy.monthly2 ? totalQuy.monthly2 : methods.getValues().quarter2nd,
                quarter3rd: totalQuy.monthly3 ? totalQuy.monthly3 : methods.getValues().quarter3rd,
                quarter4th: totalQuy.monthly4 ? totalQuy.monthly4 : methods.getValues().quarter4th
            });
        }

        setsubmitMonthlyBillable(false);
    };

    const handleRemoveHcInfo = (index: number) => {
        remove(index);
        const updateHcInfoCalculation = hcInfoMonthValues.filter((item: any, i: number) => i !== index);

        methodRateByMonths.setValue('rateByMonth', updateHcInfoCalculation);

        methodRateByMonths.reset({
            ...methodRateByMonths.getValues(),
            rateByMonth: updateHcInfoCalculation
        });
    };

    useEffect(() => {
        handleResetManagementRevenueAndQuarte();
    }, [submitMonthlyBillable]);

    useEffect(() => {
        handleCalculateMonthDifference();
    }, [isEdit, fromDateValue, toDateValue]);

    useEffect(() => {
        methodRateByMonths.reset({
            contractType: contractType,
            rateByMonth: [IRateByMonth]
        });
    }, [contractType]);

    useEffect(() => {
        handleCalculateRateUsd();
    }, [rate, exchangeValue]);

    useEffect(() => {
        const day = getWorkingDaysByMonth(monthlyBillable, +monthValue);
        setWorkingDay(day);
        handleRateByMonth();
    }, [monthValue]);

    useEffect(() => {
        handleCalculateSizeUSD();
    }, [sizeVNDValue]);

    useEffect(() => {
        handleCalculateSizeVND();
    }, [originalValue, exchangeValue]);

    useEffect(() => {
        handleCalculateNewSaleUSD();
    }, [managementRevenueAllocatedValues]);

    useEffect(() => {
        handleCalculateacctReceivables();
    }, [accountRevenueAllocatedVNDValue]);

    useEffect(() => {
        handleCalculateacctRemain();
    }, [sizeVNDValue, paidValue]);

    useEffect(() => {
        handleCalculateacctHcs();
    }, [teamLeadHcsValue, seniorHcsValue, middleHcsValue, juniorHcsValue]);

    useEffect(() => {
        handleCalculateacctTotalNewSale();
    }, [quarter1stValue, quarter2ndValue, quarter3rdValue, quarter4thValue]);

    useEffect(() => {
        handleResetBillableDay();
    }, [monthlyBillable]);

    useEffect(() => {
        handleCalculateTotalAmount();
    }, [hcInfoMonthValues, rateUsd, quantity]);

    useEffect(() => {
        !isEmpty(errors) && focusErrors();
    }, [errors]);

    useEffect(() => {
        if (isEdit) {
            setHcInfoMonthsFC(saleBidding?.hcInfo.fixCostHcInfo ? saleBidding?.hcInfo.fixCostHcInfo : defaultHcInfoMonthsFC);
            setHcInfoMonths(saleBidding?.hcInfo.hcInfoMonth ? saleBidding?.hcInfo.hcInfoMonth : defaultHcInfoMonths);
        }
    }, [isEdit]);

    return (
        <>
            <Modal isOpen={open} title={isEdit ? 'edit-bidding' : 'add-bidding'} onClose={handleClose} keepMounted={false} maxWidth="lg">
                <TabCustom value={tabValue} handleChange={handleChangeTab} tabs={addOrEditBiddingTabs} />
                <FormProvider formReturn={methods} onSubmit={handleSubmit}>
                    <TabPanel value={tabValue} index={0}>
                        <AddOrEditProjectInfo isEdit={isEdit} handleChange={handleChangeContractType} />
                    </TabPanel>
                    {/* Choose permission */}
                    <TabPanel value={tabValue} index={1}>
                        <AddOrEditFinancialInfo handleChangeCurrency={handleChangeCurrency} isEdit={isEdit} />
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        <AddOrEditHcInfo
                            monthlyHCLists={monthlyHCListValues}
                            handleOpen={handleOpenMonthlyBillable}
                            onChangeHcMonthly={onChangeHcMonthly}
                            contractTypeValue={contractTypeValue}
                        />
                    </TabPanel>
                    <TabPanel value={tabValue} index={3}>
                        <AddOrEditOtherInfo handleChange={handleChangeUser} />
                    </TabPanel>
                    {/* Cancel | Submit */}
                    <Grid item xs={12}>
                        <DialogActions>
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                <Button color="error" onClick={handleClose}>
                                    <FormattedMessage id="cancel" />
                                </Button>
                                <LoadingButton loading={loading} variant="contained" type="submit">
                                    {isEdit ? <FormattedMessage id="submit" /> : <FormattedMessage id="add" />}
                                </LoadingButton>
                            </Stack>
                        </DialogActions>
                    </Grid>
                </FormProvider>
            </Modal>

            {/* modal  */}
            <TMOrFCBidding
                open={openTMFC}
                hcInfoMonthValues={hcInfoMonthValues}
                handleClose={handleCloseMonthlyBillable}
                handleSubmit={handleSubmitMonthlyBillable}
                total={total}
                handleProvisionalCalculation={handleProvisionalCalculation}
                handleRemoveHcInfo={handleRemoveHcInfo}
                handleChangeRate={handleChangeRate}
                handleChangeRateVND={handleChangeRateVND}
                handleChangeQuantity={handleChangeQuantity}
                addRankCostHistoryHandler={addRankCostHistoryHandler}
                methods={methodRateByMonths}
                contractTypeValue={contractTypeValue}
                sizeVNDValue={sizeVNDValue}
            />
        </>
    );
};

export default AddOrEditBidding;
