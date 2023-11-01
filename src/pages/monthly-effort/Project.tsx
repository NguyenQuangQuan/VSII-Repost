/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

// project imports
import MainCard from 'components/cards/MainCard';
import { Table } from 'components/extended/Table';
import Api from 'constants/Api';
import { PERMISSIONS } from 'constants/Permission';
import { MonthlyEffortProjectSearch, MonthlyEffortProjectTBody, MonthlyEffortProjectThead } from 'containers/monthly-effort';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import { IMonthlyEffortProject, IMonthlyEffortProjectList, IOption, IResponseList } from 'types';
import { checkAllowedPermission } from 'utils/authorization';
import { transformObject, exportDocument, getSearchParam, isEmpty } from 'utils/common';
import { getMonthsOfYear } from 'utils/date';
import { IMonthlyEffortProjectConfig, monthEffortProjectDefault, monthlyEffortProjectConfig } from './Config';
import { SEARCH_PARAM_KEY } from 'constants/Common';

// third party
import { useSearchParams } from 'react-router-dom';

// ==============================|| Monthy Effort - Project ||============================== //
/**
 *  URL Params
 *  year
 *  month
 *  departmentId
 *  projectType
 *  projectId
 *  projectName
 */
const MonthlyEffortProject = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [
        SEARCH_PARAM_KEY.year,
        SEARCH_PARAM_KEY.month,
        SEARCH_PARAM_KEY.departmentId,
        SEARCH_PARAM_KEY.projectType,
        SEARCH_PARAM_KEY.projectId,
        SEARCH_PARAM_KEY.projectName
    ];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);
    // delete unnecessary key value
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projectName, ...cloneParams }: any = params;

    // Hooks, State, Variable
    const defaultConditions = {
        ...monthlyEffortProjectConfig,
        ...cloneParams,
        projectId: params.projectId ? { value: params.projectId, label: params.projectName } : null
    };
    const [loading, setLoading] = useState<boolean>(false);
    const [project, setProject] = useState<IMonthlyEffortProject>(monthEffortProjectDefault);
    const [conditions, setConditions] = useState<IMonthlyEffortProjectConfig>(defaultConditions);
    const [formReset, setFormReset] = useState<IMonthlyEffortProjectConfig>(defaultConditions);
    const [year, setYear] = useState<number>(defaultConditions.year);
    const [months, setMonths] = useState<IOption[]>([]);
    const [isChangeYear, setIsChangeYear] = useState<boolean>(false);
    const { monthlyEffort } = PERMISSIONS.report;

    // Function
    const getDataTable = async () => {
        setLoading(true);
        const response: IResponseList<IMonthlyEffortProjectList> = await sendRequest(Api.monthly_efford.getProject, {
            ...conditions,
            projectId: conditions.projectId ? conditions.projectId.value : null
        });

        if (response) {
            const { result } = response;
            setProject(isEmpty(result.content) ? monthEffortProjectDefault : result.content);
            setLoading(false);
            return;
        } else {
            setDataEmpty();
        }
    };

    const setDataEmpty = () => {
        setProject(monthEffortProjectDefault);
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
    };

    const handleExportDocument = () => {
        exportDocument(Api.monthly_efford.getDownload.url, { year: conditions.year, month: conditions.month });
    };

    // Handle submit
    const handleSearch = (value: any) => {
        const { projectId } = value;
        transformObject(value);
        setSearchParams(projectId ? { ...value, projectId: projectId.value, projectName: projectId.label } : value);
        setConditions(value);
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
            <FilterCollapse handleExport={checkAllowedPermission(monthlyEffort.download) ? handleExportDocument : undefined}>
                <MonthlyEffortProjectSearch
                    formReset={formReset}
                    months={months}
                    handleChangeYear={handleChangeYear}
                    handleSearch={handleSearch}
                />
            </FilterCollapse>

            {/* Table */}
            <MainCard>
                <Table
                    heads={<MonthlyEffortProjectThead projectLength={project?.users.length} currentYear={conditions.year} />}
                    isLoading={loading}
                    data={project?.users}
                >
                    <MonthlyEffortProjectTBody projects={project?.users} total={project?.total} />
                </Table>
            </MainCard>
        </>
    );
};

export default MonthlyEffortProject;
