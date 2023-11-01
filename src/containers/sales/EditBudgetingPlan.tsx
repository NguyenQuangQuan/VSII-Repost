// react-hook-form
import { SyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, Grid, Stack } from '@mui/material';

// project imports
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from 'app/hooks';
import { FormProvider, Input, NumericFormatCustom, PercentageFormat } from 'components/extended/Form';
import Modal from 'components/extended/Modal';
import { TabPanel } from 'components/extended/Tabs';
import { EditBudgetingPlanTabs, FIELD_BY_TAB_BUDGETING_PLAN, MONEY_PLACEHOLDER, RISK_FACTOR_PLACEHOLDER } from 'constants/Common';
import TabCustom from 'containers/TabCustom';
import AddedEbitdaType from 'containers/search/AddedEbitda';
import { editBudgetingPlanDefaultValue, editBudgetingPlanSchema } from 'pages/sales/Config';
import { gridSpacing } from 'store/constant';
import { IBudgetingPlanItem } from 'types';
import { getTabValueByFieldError, isEmpty } from 'utils/common';
import { openConfirm } from 'store/slice/confirmSlice';

interface IEditBudgetingPlanProps {
    isEdit: boolean;
    open: boolean;
    loading?: boolean;
    handleClose: () => void;
    budgetingPlan?: IBudgetingPlanItem;
    editBudgetingPlan: (payload: IBudgetingPlanItem) => void;
}

const EditBudgetingPlan = (props: IEditBudgetingPlanProps) => {
    const { open, loading, handleClose, isEdit, budgetingPlan, editBudgetingPlan } = props;
    const [tabValue, setTabValue] = useState(0);
    const dispatch = useAppDispatch();
    const [budgetingPlanForm, setBudgetingPlanForm] = useState<IBudgetingPlanItem>();

    const handleSubmit = (values: IBudgetingPlanItem) => {
        if (budgetingPlan) {
            const effortLimitManHoursInit = budgetingPlan.projectInfo.effortLimitManHours;
            const costLimitVNDInit = budgetingPlan.projectInfo.costLimitVND;
            const { effortLimitManHours, costLimitVND } = values.projectInfo;
            const payload = {
                ...values,
                projectInfo: {
                    ...values.projectInfo,
                    effortLimitManHours: +effortLimitManHours! === effortLimitManHoursInit ? null : effortLimitManHours,
                    costLimitVND: +costLimitVND! === costLimitVNDInit ? null : costLimitVND
                }
            };
            setBudgetingPlanForm(payload);
        }
    };

    const handleChangeTab = (event: SyntheticEvent, value: number) => {
        setTabValue(value);
    };

    const methods = useForm({
        defaultValues: {
            ...editBudgetingPlanDefaultValue
        },
        resolver: yupResolver(editBudgetingPlanSchema),
        mode: 'all'
    });
    const { errors } = methods.formState;

    const focusErrors = () => {
        const tabNumber = getTabValueByFieldError(errors, FIELD_BY_TAB_BUDGETING_PLAN);
        setTabValue(tabNumber);
    };

    useEffect(() => {
        isEdit &&
            methods.reset({
                ...budgetingPlan
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit]);

    useEffect(() => {
        !isEmpty(errors) && focusErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

    useEffect(() => {
        budgetingPlanForm &&
            dispatch(
                openConfirm({
                    open: true,
                    title: <FormattedMessage id="warning" />,
                    content: <FormattedMessage id="confirm-record" />,
                    handleConfirm: () => editBudgetingPlan(budgetingPlanForm)
                })
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [budgetingPlanForm]);

    return (
        <Modal isOpen={open} title={'edit-budgeting-plan'} onClose={handleClose} keepMounted={false} maxWidth="md">
            <FormProvider formReturn={methods} onSubmit={handleSubmit}>
                <TabCustom value={tabValue} tabs={EditBudgetingPlanTabs} handleChange={handleChangeTab} />
                {/* Project info */}
                <TabPanel value={tabValue} index={0}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={6}>
                            <Input name="projectInfo.year" label={<FormattedMessage id="year" />} disabled />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={6}
                            sx={{
                                '& .MuiFormLabel-root': {
                                    color: '#000000 !important'
                                }
                            }}
                        >
                            <Input
                                name="projectInfo.riskFactor"
                                label={<FormattedMessage id="risk-factor" />}
                                textFieldProps={{
                                    placeholder: RISK_FACTOR_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: PercentageFormat as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="projectInfo.salePipelineType" label={<FormattedMessage id="sale-pipeline-type" />} disabled />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="projectInfo.numberOfMonths" label={<FormattedMessage id="of-months" />} disabled />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="projectInfo.projectName" label={<FormattedMessage id="project-name" />} disabled />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="projectInfo.contractedValue"
                                label={<FormattedMessage id="contracted-value" />}
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
                            <Input name="projectInfo.type" label={<FormattedMessage id="type" />} disabled />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="projectInfo.effortLimitManHours" label={<FormattedMessage id="effort-limit-man-hours" />} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="projectInfo.serviceType" label={<FormattedMessage id="service-type" />} disabled />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="projectInfo.costLimitVND"
                                label={<FormattedMessage id="cost-limit-vnd" />}
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={6}
                            sx={{
                                '& .MuiFormLabel-root': {
                                    color: '#000000 !important'
                                }
                            }}
                        >
                            <Input
                                name="projectInfo.note"
                                label={<FormattedMessage id="note" />}
                                textFieldProps={{ multiline: true, rows: 5 }}
                            />
                        </Grid>
                    </Grid>
                </TabPanel>
                {/* Project KPI Score */}
                <TabPanel value={tabValue} index={1}>
                    <Grid container spacing={gridSpacing}>
                        <Grid
                            item
                            xs={12}
                            lg={6}
                            sx={{
                                '& .MuiFormLabel-root': {
                                    color: '#000000 !important'
                                }
                            }}
                        >
                            <Input
                                name="projectKPIScore.estimateUsedEffort"
                                label={<FormattedMessage id="estimated-used-effort" />}
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="projectKPIScore.effortKPIScore" label={<FormattedMessage id="effort-KPI-score" />} disabled />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={6}
                            sx={{
                                '& .MuiFormLabel-root': {
                                    color: '#000000 !important'
                                }
                            }}
                        >
                            <Input
                                name="projectKPIScore.estimatedUseCost"
                                label={<FormattedMessage id="estimated-use-cost" />}
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="projectKPIScore.costKPI" label={<FormattedMessage id="cost-KPI" />} disabled />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={6}
                            sx={{
                                '& .MuiFormLabel-root': {
                                    color: '#000000 !important'
                                }
                            }}
                        >
                            <Input
                                name="projectKPIScore.planDelivery"
                                label={<FormattedMessage id="plan-delivery" />}
                                textFieldProps={{
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="projectKPIScore.deadlineKPI" label={<FormattedMessage id="deadline-KPI" />} disabled />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={6}
                            sx={{
                                '& .MuiFormLabel-root': {
                                    color: '#000000 !important'
                                }
                            }}
                        >
                            <Input
                                name="projectKPIScore.totalOnTimeDelivery"
                                label={<FormattedMessage id="total-on-time-delivery" />}
                                textFieldProps={{
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={6}
                            sx={{
                                '& .MuiFormLabel-root': {
                                    color: '#000000 !important'
                                }
                            }}
                        >
                            <Input
                                name="projectKPIScore.taskMGT"
                                label={<FormattedMessage id="task-mgt" />}
                                textFieldProps={{
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}></Grid>
                        <Grid item xs={12} lg={6}>
                            <Input name="projectKPIScore.kpiScore" label={<FormattedMessage id="KPI-score" />} disabled />
                        </Grid>
                    </Grid>
                </TabPanel>
                {/* Project KPI Bonus info */}
                <TabPanel value={tabValue} index={2}>
                    <Grid container spacing={gridSpacing}>
                        <Grid
                            item
                            xs={12}
                            lg={6}
                            sx={{
                                '& .MuiFormLabel-root': {
                                    color: '#000000 !important'
                                }
                            }}
                        >
                            <AddedEbitdaType isShowAll name="projectKPIBonus.addedEbitda" />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="projectKPIBonus.estimatedKPIProjectSavingCost"
                                label={<FormattedMessage id="estimated-KPI-project-saving-cost" />}
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
                                name="projectKPIBonus.projectSetRevenue"
                                label={<FormattedMessage id="project-set-revenue" />}
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
                                name="projectKPIBonus.estimatedShareCompanyProfit"
                                label={<FormattedMessage id="estimated-share-company-profit" />}
                                disabled
                                textFieldProps={{
                                    placeholder: MONEY_PLACEHOLDER,
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={6}
                            sx={{
                                '& .MuiFormLabel-root': {
                                    color: '#000000 !important'
                                }
                            }}
                        >
                            <Input
                                name="projectKPIBonus.actualCostByACD"
                                label={<FormattedMessage id="actual-cost-by-ACD" />}
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
                                name="projectKPIBonus.estimatedTotalKPIBonus"
                                label={<FormattedMessage id="estimated-total-KPI-bonus" />}
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
                                name="projectKPIBonus.companyRevActualCost"
                                label={<FormattedMessage id="company-rev-actual-cost" />}
                                disabled
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={6}
                            sx={{
                                '& .MuiFormLabel-root': {
                                    color: '#000000 !important'
                                }
                            }}
                        >
                            <Input
                                name="projectKPIBonus.kpiBonus"
                                label={<FormattedMessage id="KPI-bonus" />}
                                textFieldProps={{
                                    InputProps: {
                                        inputComponent: NumericFormatCustom as any
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="projectKPIBonus.projectMGTPerformanceLevel"
                                label={<FormattedMessage id="project-mgt-performance-level" />}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Input
                                name="projectKPIBonus.totalKPIBonus"
                                label={<FormattedMessage id="total-KPI-bonus" />}
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
                                name="projectKPIBonus.projectSavingCost"
                                label={<FormattedMessage id="project-saving-cost" />}
                                disabled
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

export default EditBudgetingPlan;
