/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { SyntheticEvent, useEffect, useState } from 'react';

// react-hook-form
import { useForm, useFieldArray } from 'react-hook-form';

// material-ui
import { Button, DialogActions, Grid, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// project imports
import Modal from 'components/extended/Modal';
import { IMember, IMonthlyHCList, IProductionPerformanceItem, ISaleOnGoingItem } from 'types';
import { DatePicker, FormProvider, Input, NumericFormatCustom, PercentageFormat } from 'components/extended/Form';
import { AddOrEditOnGoingTabs, E_IS_LOGTIME, FIELD_BY_TAB_ONGOING, MONEY_PLACEHOLDER, PERCENT_PLACEHOLDER } from 'constants/Common';
import TabCustom from 'containers/TabCustom';
import { addOrEditOnGoingSchema, addOrEditOnGoingDefaultValue, monthlyHCListDefaultValue } from 'pages/sales/Config';
import { gridSpacing } from 'store/constant';
import { Member, ProductionPerformance, SalePipelineOnGoingStatus, SalePipelineOnGoingType } from 'containers/search';
import { TabPanel } from 'components/extended/Tabs';
import { getTabValueByFieldError, isEmpty } from 'utils/common';
import OnGoingHCThead from './OnGoingHCThead';
import OnGoingHCTBody from './OnGoingHCTBody';
import { Table } from 'components/extended/Table';

// third party
import { yupResolver } from '@hookform/resolvers/yup';
import { FormattedMessage } from 'react-intl';
import { dateFormat } from 'utils/date';

interface IAddOrEditOnGoingProps {
    year?: number;
    open: boolean;
    project?: any;
    loading?: boolean;
    isEdit: boolean;
    handleClose: () => void;
    postAddOrEdit: (payload: ISaleOnGoingItem) => void;
}

const AddOrEditOnGoing = (props: IAddOrEditOnGoingProps) => {
    const { open, project, loading, isEdit, handleClose, year, postAddOrEdit } = props;

    const [tabValue, setTabValue] = useState(0);
    const [projectOption, setProjectOption] = useState<{
        projectName: string;
        serviceType: string | null;
        contractType: string | null;
        contractDurationFrom: string | null;
        contractDurationTo: string | null;
        monthlyHCList: IMonthlyHCList[];
    } | null>(null);

    const [userContactOption, setUserContactOption] = useState<{ idHexString: string; firstName: string; lastName: string } | null>(null);

    const handleSubmit = (values: any) => {
        const filledHCInfo = values.monthlyHCList.map((item: IMonthlyHCList, index: number) => {
            const monthlyHCItem = monthlyHCListDefaultValue[index] || {};
            return {
                month: isEdit ? +item?.month : index + 1,
                hcMonthly: +item?.hcMonthly! || +monthlyHCItem.hcMonthly || 0
            };
        });

        const payload = {
            ...values,
            projectInfo: {
                ...values.projectInfo,
                productionPerformanceIdHexString: values.projectInfo.productionPerformanceIdHexString.value,
                contractDueDate: dateFormat(values.projectInfo?.contractDueDate),
                contractDurationFrom: dateFormat(values.projectInfo?.contractDurationFrom),
                contractDurationTo: dateFormat(values.projectInfo?.contractDurationTo)
            },

            otherInfo: {
                ...values.otherInfo,
                contact: userContactOption
            },
            hcInfo: { ...values.hcInfo, monthlyHCList: filledHCInfo }
        };
        delete payload.monthlyHCList;

        postAddOrEdit(payload);
    };

    const handleChangeTab = (event: SyntheticEvent, value: number) => {
        setTabValue(value);
    };

    const handleChangeUser = (userSelected: IMember) => {
        userSelected &&
            setUserContactOption({
                idHexString: userSelected?.idHexString!,
                firstName: userSelected?.firstName,
                lastName: userSelected?.lastName
            });
    };

    const handleChangeProject = (optionSelected: IProductionPerformanceItem) => {
        setProjectOption({
            projectName: optionSelected?.project.projectName,
            serviceType: optionSelected?.serviceType || null,
            contractType: optionSelected?.contractType || null,
            contractDurationFrom: optionSelected?.duration?.fromDate || null,
            contractDurationTo: optionSelected?.duration?.toDate || null,
            monthlyHCList: optionSelected.dataHcInfos || null
        });
    };

    const methods = useForm({
        defaultValues: {
            ...addOrEditOnGoingDefaultValue,
            projectInfo: {
                ...addOrEditOnGoingDefaultValue.projectInfo,
                year: year
            },
            monthlyHCList: [addOrEditOnGoingDefaultValue.hcInfo.monthlyHCList]
        },
        resolver: yupResolver(addOrEditOnGoingSchema),
        mode: 'all'
    });

    useEffect(() => {
        isEdit &&
            methods.reset({
                ...project,
                projectInfo: {
                    ...project.projectInfo,
                    productionPerformanceIdHexString: {
                        value: project.projectInfo.productionPerformanceIdHexString,
                        label: project.projectInfo.projectName
                    }
                },
                otherInfo: {
                    ...project.otherInfo,
                    contact: project.otherInfo.contact.idHexString
                        ? {
                            value: project.otherInfo.contact.idHexString,
                            label: `${project.otherInfo.contact.firstName} ${project.otherInfo.contact.lastName}`
                        }
                        : null
                },
                // hcInfo: project?.hcInfo,
                monthlyHCList: project?.hcInfo?.monthlyHCList
            });
    }, [isEdit]);

    useEffect(() => {
        projectOption &&
            methods.reset({
                ...methods.getValues(),
                projectInfo: {
                    ...methods.getValues().projectInfo,
                    serviceType: projectOption?.serviceType ? projectOption?.serviceType : '',
                    contractType: projectOption?.contractType ? projectOption?.contractType : '',
                    projectName: projectOption?.projectName,
                    contractDurationFrom: projectOption?.contractDurationFrom,
                    contractDurationTo: projectOption?.contractDurationTo
                }
            });
    }, [projectOption]);

    const { errors } = methods.formState;

    const { fields: monthlyHCListValues } = useFieldArray({
        control: methods.control,
        name: 'monthlyHCList'
    });

    const focusErrors = () => {
        const tabNumber = getTabValueByFieldError(errors, FIELD_BY_TAB_ONGOING);
        setTabValue(tabNumber);
    };

    useEffect(() => {
        !isEmpty(errors) && focusErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

    return (
        <Modal
            isOpen={open}
            title={isEdit ? 'edit-on-going-detail' : 'add-on-going-detail'}
            onClose={handleClose}
            keepMounted={false}
            maxWidth="md"
        >
            <FormProvider formReturn={methods} onSubmit={handleSubmit}>
                <TabCustom value={tabValue} tabs={AddOrEditOnGoingTabs} handleChange={handleChangeTab} />
                {/* Project info */}
                <TabPanel value={tabValue} index={0}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={6}>
                            <Input name="projectInfo.year" label={<FormattedMessage id="year" />} required disabled />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="projectInfo.contractNo" label={<FormattedMessage id="contract-no" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="projectInfo.customer" label={<FormattedMessage id="customer" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="projectInfo.probability"
                                label={<FormattedMessage id="probability" />}
                                textFieldProps={{
                                    placeholder: PERCENT_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: PercentageFormat as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <ProductionPerformance
                                name="projectInfo.productionPerformanceIdHexString"
                                required
                                label="project-name"
                                disabled={isEdit}
                                handleChange={handleChangeProject}
                                year={year}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <SalePipelineOnGoingStatus name="projectInfo.status" required />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <SalePipelineOnGoingType name="projectInfo.type" disabled={isEdit} label="sale-pipeline-type" required />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <DatePicker name="projectInfo.contractDueDate" label={<FormattedMessage id="contract-due-date" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="projectInfo.serviceType" label={<FormattedMessage id="service-type" />} disabled />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <DatePicker
                                name="projectInfo.contractDurationFrom"
                                label={<FormattedMessage id="contract-duration-from" />}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="projectInfo.contractType" label={<FormattedMessage id="contract-type" />} disabled />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <DatePicker
                                name="projectInfo.contractDurationTo"
                                label={<FormattedMessage id="contract-duration-to" />}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="projectInfo.note"
                                label={<FormattedMessage id="note" />}
                                textFieldProps={{ multiline: true, rows: 5 }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="projectInfo.warrantyTime" label={<FormattedMessage id="warranty-time" />} />
                        </Grid>
                    </Grid>
                </TabPanel>
                {/* Financial info */}
                <TabPanel value={tabValue} index={1}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="financialInfo.sizeVND"
                                label={<FormattedMessage id="size-vnd" />}
                                disabled
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="financialInfo.acctReceivables"
                                label={<FormattedMessage id="acct-receivables" />}
                                disabled
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="financialInfo.sizeUSD"
                                label={<FormattedMessage id="size-usd" />}
                                disabled
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="financialInfo.netEarn"
                                label={<FormattedMessage id="net-earn" />}
                                disabled
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="financialInfo.managementRevenueAllocated"
                                label={<FormattedMessage id="management-revenue-allocated" />}
                                disabled
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="financialInfo.paid"
                                label={<FormattedMessage id="paid" />}
                                disabled
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="financialInfo.accountRevenueAllocatedVND"
                                label={<FormattedMessage id="accountant-revenue-allocatedVND" />}
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="financialInfo.remain"
                                label={<FormattedMessage id="remain" />}
                                disabled
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="financialInfo.newSaleUSD"
                                label={<FormattedMessage id="new-sale-usd" />}
                                disabled
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="financialInfo.quarterLicense1st"
                                label={<FormattedMessage id="quarter-license-1st" />}
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="financialInfo.licenseFee"
                                label={<FormattedMessage id="license-fee" />}
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="financialInfo.quarterLicense2nd"
                                label={<FormattedMessage id="quarter-license-2nd" />}
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="financialInfo.currency" label={<FormattedMessage id="currency" />} disabled />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="financialInfo.quarterLicense3rd"
                                label={<FormattedMessage id="quarter-license-3rd" />}
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="financialInfo.exchangeRate"
                                label={<FormattedMessage id="exchange-rate" />}
                                disabled
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="financialInfo.quarterLicense4th"
                                label={<FormattedMessage id="quarter-license-4th" />}
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>
                {/* HC info */}
                <TabPanel value={tabValue} index={2}>
                    <Grid container spacing={gridSpacing} sx={{ mb: gridSpacing }}>
                        <Grid item xs={12} lg={6}>
                            <Input
                                textFieldProps={{
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                                name="hcInfo.billableHcs"
                                label={<FormattedMessage id="billable-hcs" />}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                textFieldProps={{
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                                name="hcInfo.quarter1st"
                                label={<FormattedMessage id="quarter-1st" />}
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
                                name="hcInfo.hcs"
                                label={<FormattedMessage id="hcs" />}
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
                                name="hcInfo.quarter2nd"
                                label={<FormattedMessage id="quarter-2nd" />}
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
                                name="hcInfo.teamLeadHcs"
                                label={<FormattedMessage id="team-lead-hcs" />}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                textFieldProps={{
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                                name="hcInfo.quarter3rd"
                                label={<FormattedMessage id="quarter-3rd" />}
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
                                name="hcInfo.seniorHcs"
                                label={<FormattedMessage id="senior-hcs" />}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                textFieldProps={{
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                                name="hcInfo.quarter4th"
                                label={<FormattedMessage id="quarter-4th" />}
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
                                name="hcInfo.middleHcs"
                                label={<FormattedMessage id="middle-hcs" />}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                textFieldProps={{
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                                name="hcInfo.totalNewSale"
                                label={<FormattedMessage id="total-new-sale" />}
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
                                name="hcInfo.juniorHcs"
                                label={<FormattedMessage id="junior-hcs" />}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                textFieldProps={{
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                                name="hcInfo.totalBillable"
                                label={<FormattedMessage id="total-billable" />}
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <Table
                        height="auto"
                        data={isEdit ? project?.hcInfo?.monthlyHCList : projectOption?.monthlyHCList}
                        heads={<OnGoingHCThead hcInfo={isEdit ? project?.hcInfo?.monthlyHCList : projectOption?.monthlyHCList} />}
                    >
                        <OnGoingHCTBody hcInfo={isEdit ? (monthlyHCListValues as any) : projectOption?.monthlyHCList} />
                    </Table>
                </TabPanel>
                {/* Other info */}
                <TabPanel value={tabValue} index={3}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={6}>
                            <Member
                                name="otherInfo.contact"
                                isLogTime={E_IS_LOGTIME.YES}
                                isDefaultAll
                                label={<FormattedMessage id="contact" />}
                                isIdHexString
                                handleChange={handleChangeUser}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="otherInfo.phoneNumber" label={<FormattedMessage id="phone-number" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="otherInfo.presaleFolder" label={<FormattedMessage id="presale-folder" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="otherInfo.emailAddress" label={<FormattedMessage id="email-address" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="otherInfo.customerContact" label={<FormattedMessage id="customer-contact" />} />
                        </Grid>
                    </Grid>
                </TabPanel>
                <DialogActions>
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button color="error" onClick={handleClose}>
                            <FormattedMessage id="cancel" />
                        </Button>
                        <LoadingButton variant="contained" type="submit" loading={loading}>
                            <FormattedMessage id="submit" />
                        </LoadingButton>
                    </Stack>
                </DialogActions>
            </FormProvider>
        </Modal>
    );
};

export default AddOrEditOnGoing;
