import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// material-ui

// project imports
import MainCard from 'components/cards/MainCard';
import { SEARCH_PARAM_KEY } from 'constants/Common';
import { IBudgetingPlan, IBudgetingPlanItem, ITotalBudgetingPlan } from 'types';
import { getSearchParam, transformObject } from 'utils/common';
import { IBudgetingPlanSearch, budgetingPlanSearchConfig } from './Config';
import { Table } from 'components/extended/Table';
import Api from 'constants/Api';
import { BudgetingPlanSearch, BudgetingPlanTBody, BudgetingPlanThead, BudgetingPlanTotal } from 'containers/sales';
import EditBudgetingPlan from 'containers/sales/EditBudgetingPlan';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import { useAppDispatch } from 'app/hooks';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { closeConfirm } from 'store/slice/confirmSlice';

const BudgetingPlan = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [SEARCH_PARAM_KEY.year, SEARCH_PARAM_KEY.type];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);
    const dispatch = useAppDispatch();

    const defaultConditions = { ...budgetingPlanSearchConfig, ...params };
    const [formReset] = useState<IBudgetingPlanSearch>(defaultConditions);
    const [conditions, setConditions] = useState<IBudgetingPlanSearch>(defaultConditions);
    const [budgetingPlans, setBudgetingPlans] = useState<IBudgetingPlan[]>([]);
    const [budgetingPlan, setBudgetingPlan] = useState<IBudgetingPlanItem>();
    const [total, setTotal] = useState<ITotalBudgetingPlan>();
    const [open, setOpen] = useState<boolean>(false);
    const [editLoading, setEditLoading] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const getDataTable = async () => {
        setLoading(true);
        const response = await sendRequest(Api.budgeting_plan.getAll, {
            ...conditions
        });
        if (response) {
            const { status, result } = response;

            if (status && result) {
                setLoading(false);
                const { data, total } = result.content;
                setBudgetingPlans(data);
                setTotal(total);
            } else {
                setDataEmpty();
            }
        } else {
            setDataEmpty();
        }
    };

    const setDataEmpty = () => {
        setTotal(undefined);
        setBudgetingPlans([]);
        setLoading(false);
    };

    // Event
    const handleOpenDialog = (item: IBudgetingPlanItem) => {
        setIsEdit(item ? true : false);
        setBudgetingPlan(item);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    // Handle submit
    const handleSearch = (value: IBudgetingPlanSearch) => {
        transformObject(value);
        setSearchParams(value as any);
        setConditions({ ...value });
    };

    const handleEditBudgetingPlan = async (payload: IBudgetingPlanItem) => {
        setEditLoading(true);
        const response = await sendRequest(Api.budgeting_plan.editBudgetingPlan, payload);
        if (response) {
            if (response.status) {
                setEditLoading(false);
                setOpen(false);
                getDataTable();
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'update-success',
                        variant: 'alert',
                        alert: { color: 'success' }
                    })
                );
            } else {
                setEditLoading(false);
            }
        } else {
            setEditLoading(false);
        }
        dispatch(closeConfirm());
    };

    // Effects
    useEffect(() => {
        getDataTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conditions]);

    return (
        <>
            {/* Search form */}
            <FilterCollapse>
                <BudgetingPlanSearch formReset={formReset} handleSearch={handleSearch} />
            </FilterCollapse>

            {/* Total */}
            {total && <BudgetingPlanTotal total={total} loading={loading} />}

            {/* Table */}
            <MainCard>
                <Table heads={<BudgetingPlanThead />} isLoading={loading} data={budgetingPlans}>
                    <BudgetingPlanTBody handleOpen={handleOpenDialog} data={budgetingPlans} />
                </Table>
            </MainCard>

            {/* Edit Budgeting Plan */}
            {open && (
                <EditBudgetingPlan
                    open={open}
                    isEdit={isEdit}
                    budgetingPlan={budgetingPlan}
                    handleClose={handleCloseDialog}
                    loading={editLoading}
                    editBudgetingPlan={handleEditBudgetingPlan}
                />
            )}
        </>
    );
};

export default BudgetingPlan;
