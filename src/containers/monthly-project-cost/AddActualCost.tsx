import { useCallback, useEffect, useState } from 'react';

// material-ui
import { LoadingButton } from '@mui/lab';
import { Button, Grid, Stack } from '@mui/material';

// project imports
import { FormProvider, Input, NumericFormatCustom } from 'components/extended/Form';
import Modal from 'components/extended/Modal';
import Api from 'constants/Api';
import { MONEY_PLACEHOLDER } from 'constants/Common';
import { Months, Project, Years } from 'containers/search';
import { monthlyCostDataFormDefault, monthlyCostDataFormSchema } from 'pages/monthly-project-cost/Config';
import sendRequest from 'services/ApiService';
import { gridSpacing } from 'store/constant';
import { IMonthlyCostData, IMonthlyCostDataResponse, IOption, IResponseList } from 'types';
import { isEmpty } from 'utils/common';
import { getUserInfoCookies } from 'utils/cookies';
import { dateFormat, getMonthsOfYear } from 'utils/date';

// third party
import { yupResolver } from '@hookform/resolvers/yup';
import { FormattedMessage } from 'react-intl';

// ==============================|| ADD NEW ACTUAL COST ||============================== //

interface IAddActualCostProps {
    actualCost: IMonthlyCostData;
    loading?: boolean;
    open: boolean;
    isEdit: boolean;
    handleClose: () => void;
    setActualCost: (actualCost: IMonthlyCostData) => void;
    addActualCost: (actualCost: IMonthlyCostData) => void;
    editActualCost: (actualCost: IMonthlyCostData) => void;
    handleOpenConfirm: (actualCost: IMonthlyCostData, type?: string) => void;
}

const AddActualCost = (props: IAddActualCostProps) => {
    // Hooks, State, Variable
    const { actualCost, loading, open, isEdit, setActualCost, handleClose, addActualCost, editActualCost, handleOpenConfirm } = props;
    const userInfo = getUserInfoCookies();
    const [year, setYear] = useState<number>(monthlyCostDataFormDefault.year);
    const [months, setMonths] = useState<IOption[]>([]);
    const [isChangeYear, setIsChangeYear] = useState<boolean>(false);

    // Function
    const getFindProjectCost = async (year: number, month: number, projectId: number) => {
        const response: IResponseList<IMonthlyCostDataResponse> = await sendRequest(Api.monthly_project_cost.getFindProjectCost, {
            year,
            month,
            projectId
        });
        if (response) return response.result.content;
        return;
    };

    const getMonthInYears = useCallback(async (y: number) => {
        const monthInYears = await getMonthsOfYear(y);
        return monthInYears;
    }, []);

    const handleChangeYear = (e: any) => {
        const { value } = e.target;
        setYear(value);
        setIsChangeYear(true);
    };

    // Handle submit
    const handleSubmit = (values: any) => {
        const { projectId, year, month } = values;
        const currentDate = `${dateFormat(new Date())}`;
        const payload = { ...values, projectId: projectId?.value };

        if (isEdit) {
            editActualCost({ ...payload, lastUpdate: currentDate, userUpdate: userInfo?.userName });
        } else {
            getFindProjectCost(year, month, projectId.value).then((item: any) => {
                if (!isEmpty(item)) {
                    handleOpenConfirm(
                        {
                            ...payload,
                            idHexString: item.idHexString,
                            projectName: projectId.label,
                            createDate: currentDate,
                            userCreate: userInfo.userName
                        },
                        'overwrite'
                    );
                } else {
                    addActualCost({ ...payload, projectName: projectId.label, createDate: currentDate, userCreate: userInfo?.userName });
                }
            });
        }
    };

    // Effect
    useEffect(() => {
        getMonthInYears(year).then((items: IOption[]) => {
            setMonths([...items]);
            if (items.length > 0 && isChangeYear) {
                setActualCost({ ...actualCost, year, month: items[0].value });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year]);

    return (
        <Modal isOpen={open} title={`${isEdit ? 'edit-actual-cost' : 'add-actual-cost'}`} onClose={handleClose} keepMounted={false}>
            <FormProvider
                form={{
                    defaultValues: monthlyCostDataFormDefault,
                    resolver: yupResolver(monthlyCostDataFormSchema)
                }}
                formReset={actualCost}
                onSubmit={handleSubmit}
            >
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Project required disabled={isEdit} isDefaultAll={true} />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Years handleChangeYear={handleChangeYear} disabled={isEdit} />
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <Months months={months} disabled={isEdit} isShow13MonthSalary />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Input
                            required
                            textFieldProps={{
                                placeholder: MONEY_PLACEHOLDER,
                                InputProps: {
                                    inputComponent: NumericFormatCustom as any
                                }
                            }}
                            name="allocatedAmount"
                            label={<FormattedMessage id="overhead-allocated-amount" />}
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Input
                            required
                            textFieldProps={{
                                placeholder: MONEY_PLACEHOLDER,
                                InputProps: {
                                    inputComponent: NumericFormatCustom as any
                                }
                            }}
                            name="actualCost"
                            label={<FormattedMessage id="salary-cost" />}
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Input
                            required
                            textFieldProps={{
                                placeholder: MONEY_PLACEHOLDER,
                                InputProps: {
                                    inputComponent: NumericFormatCustom as any
                                }
                            }}
                            name="totalCost"
                            label={<FormattedMessage id="total-cost" />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            textFieldProps={{ placeholder: 'Enter note', multiline: true, rows: 4 }}
                            name="note"
                            label={<FormattedMessage id="note" />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                            <Button color="error" onClick={handleClose}>
                                <FormattedMessage id="cancel" />
                            </Button>
                            <LoadingButton loading={loading} variant="contained" type="submit">
                                <FormattedMessage id="submit" />
                            </LoadingButton>
                        </Stack>
                    </Grid>
                </Grid>
            </FormProvider>
        </Modal>
    );
};

export default AddActualCost;
