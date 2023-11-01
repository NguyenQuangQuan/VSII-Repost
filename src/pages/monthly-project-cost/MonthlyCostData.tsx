/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

// project imports
import { useAppDispatch } from 'app/hooks';
import MainCard from 'components/cards/MainCard';
import { Table } from 'components/extended/Table';
import Api from 'constants/Api';
import { TableToolbar } from 'containers';
import { MonthlyCostDataSearch, MonthlyCostDataTBody, MonthlyCostDataThead } from 'containers/monthly-project-cost';
import AddActualCost from 'containers/monthly-project-cost/AddActualCost';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import { closeConfirm, openConfirm } from 'store/slice/confirmSlice';
import { openSnackbar } from 'store/slice/snackbarSlice';
import { IMonthlyCostData, IMonthlyCostDataList, IMonthlyCostDataResponse, IOption, IResponseList } from 'types';
import { exportDocument, getSearchParam, transformObject } from 'utils/common';
import { convertMonthFromToDate, getMonthsOfYear } from 'utils/date';
import { IMonthlyCostDataConfig, monthlyCostDataConfig, monthlyCostDataFormDefault } from './Config';
import { checkAllowedPermission } from 'utils/authorization';
import { PERMISSIONS } from 'constants/Permission';
import { SEARCH_PARAM_KEY } from 'constants/Common';

// third party
import { useSearchParams } from 'react-router-dom';

// ==============================|| Monthly Project Cost - Data ||============================== //
/**
 *  URL Params
 *  year
 *  month
 *  projectId
 *  projectName
 */
const MonthlyCostData = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [SEARCH_PARAM_KEY.year, SEARCH_PARAM_KEY.month, SEARCH_PARAM_KEY.projectId, SEARCH_PARAM_KEY.projectName];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);
    // delete unnecessary key value
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projectName, ...cloneParams }: any = params;

    // Hooks, State, Variable
    const defaultConditions = {
        ...monthlyCostDataConfig,
        ...cloneParams,
        projectId: params.projectId ? { value: params.projectId, label: params.projectName } : null
    };

    //get current month
    const getCurrentMonth = getMonthsOfYear(defaultConditions.year).filter((month) => {
        return defaultConditions.month === month.value;
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [addOrEditLoading, setAddOrEditLoading] = useState<boolean>(false);
    const [monthlyCostData, setMonthlyCostData] = useState<IMonthlyCostData[]>([]);
    const [conditions, setConditions] = useState<IMonthlyCostDataConfig>(defaultConditions);
    const [formReset, setFormReset] = useState<IMonthlyCostDataConfig>(defaultConditions);
    const [actualCost, setActualCost] = useState<IMonthlyCostData>(monthlyCostDataFormDefault);
    const [year, setYear] = useState<number>(defaultConditions.year);
    const [months, setMonths] = useState<IOption[]>([]);
    const [month, setMonth] = useState(convertMonthFromToDate(getCurrentMonth[0].label));
    const [isChangeYear, setIsChangeYear] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { monthlyProjectCost } = PERMISSIONS.report;

    // Function
    const getDataTable = async () => {
        setLoading(true);
        const response: IResponseList<IMonthlyCostDataList> = await sendRequest(Api.monthly_project_cost.getMonthlyCost, {
            ...conditions,
            projectId: conditions.projectId ? conditions.projectId.value : null
        });

        if (response) {
            const { status, result } = response;
            if (status) {
                const { content } = result;
                setMonthlyCostData(content as IMonthlyCostData[]);
                setLoading(false);
            } else {
                setDataEmpty();
            }
            return;
        } else {
            setDataEmpty();
        }
    };

    const postAddOrEditActualCost = async (payload: IMonthlyCostData) => {
        setAddOrEditLoading(true);
        const response: IResponseList<IMonthlyCostDataResponse> = await sendRequest(
            Api.monthly_project_cost.postSaveOrUpdateActualCost,
            payload
        );
        const { status } = response;
        if (status) {
            setAddOrEditLoading(false);
            setOpen(false);
            dispatch(
                openSnackbar({
                    open: true,
                    message: isEdit ? 'update-success' : 'add-success',
                    variant: 'alert',
                    alert: { color: 'success' }
                })
            );
            dispatch(closeConfirm());
            getDataTable();
        }
    };

    const deleteActualCost = async (id: string) => {
        const response: IResponseList<IMonthlyCostDataResponse> = await sendRequest(Api.monthly_project_cost.deleteActualCost, {
            id
        });
        const { status } = response;
        if (status) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'delete-success',
                    variant: 'alert',
                    alert: { color: 'success' }
                })
            );
            dispatch(closeConfirm());
            getDataTable();
        }
    };

    const setDataEmpty = () => {
        setMonthlyCostData([]);
        setLoading(false);
    };

    const getMonthInYears = useCallback(async (y: number) => {
        const monthInYears = await getMonthsOfYear(y);
        return monthInYears;
    }, []);

    // Event
    const handleChangeYear = (e: any) => {
        const { value } = e.target;
        setYear(value);
        setIsChangeYear(true);
        setMonth(convertMonthFromToDate(getMonthsOfYear(value)[0].label));
    };

    const handleChangeMonth = (e: any) => {
        const { value } = e.target;
        const getMonth = months.filter((month) => {
            return month.value === value;
        });

        setMonth(convertMonthFromToDate(getMonth[0].label));
    };

    const handleOpenDialog = (item?: any) => {
        setIsEdit(item ? true : false);
        setActualCost(item ? { ...item, projectId: { value: item.projectId, label: item.projectName } } : monthlyCostDataFormDefault);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleOpenConfirm = (item: IMonthlyCostData, type?: string) => {
        dispatch(
            openConfirm({
                open: true,
                title: <FormattedMessage id="warning" />,
                content: type === 'delete' ? <FormattedMessage id="delete-record" /> : <FormattedMessage id="overwrite-record" />,
                handleConfirm: () => (type === 'delete' ? deleteActualCost(`${item.idHexString}`) : handleAddActualCost(item))
            })
        );
    };

    const handleExportTemplate = () => {
        exportDocument(Api.monthly_project_cost.getDownloadTemplateMonthlyCost.url, { year: conditions.year, month: conditions.month });
    };

    // Handle submit
    const handleSearch = (value: any) => {
        const { projectId } = value;
        transformObject(value);
        setSearchParams(projectId ? { ...value, projectId: projectId.value, projectName: projectId.label } : value);
        setConditions(value);
    };

    const handleAddActualCost = (actualCostNew: IMonthlyCostData) => {
        postAddOrEditActualCost(actualCostNew);
    };

    const handleEditActualCost = (actualCostEdit: IMonthlyCostData) => {
        postAddOrEditActualCost(actualCostEdit);
    };

    // Effect
    useEffect(() => {
        getDataTable();
    }, [conditions]);

    useEffect(() => {
        getMonthInYears(year).then((items: IOption[]) => {
            setMonths(items);
            if (items.length > 0 && isChangeYear) {
                setFormReset({ ...formReset, year, month: items[0].value });
            }
        });
    }, [year]);

    return (
        <>
            {/* Search form  */}
            <FilterCollapse>
                <MonthlyCostDataSearch
                    formReset={formReset}
                    months={months}
                    handleChangeYear={handleChangeYear}
                    handleSearch={handleSearch}
                    handleChangeMonth={handleChangeMonth}
                    month={month}
                />
            </FilterCollapse>

            {/* Table and Toolbar */}
            <MainCard>
                <TableToolbar
                    handleOpen={checkAllowedPermission(monthlyProjectCost.addCost) ? handleOpenDialog : undefined}
                    handleExportTemplate={checkAllowedPermission(monthlyProjectCost.downloadTemplate) ? handleExportTemplate : undefined}
                    handleRefreshData={getDataTable}
                    isShowUpload={checkAllowedPermission(monthlyProjectCost.importTemplate)}
                />
                <Table heads={<MonthlyCostDataThead />} isLoading={loading} data={monthlyCostData}>
                    <MonthlyCostDataTBody data={monthlyCostData} handleOpen={handleOpenDialog} handleOpenDelete={handleOpenConfirm} />
                </Table>
            </MainCard>

            {/* Add or Edit Actual Cost Dialog */}
            <AddActualCost
                open={open}
                loading={addOrEditLoading}
                isEdit={isEdit}
                actualCost={actualCost}
                handleClose={handleCloseDialog}
                setActualCost={setActualCost}
                addActualCost={handleAddActualCost}
                editActualCost={handleEditActualCost}
                handleOpenConfirm={handleOpenConfirm}
            />
        </>
    );
};

export default MonthlyCostData;
