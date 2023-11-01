/* eslint-disable prettier/prettier */
import { SyntheticEvent, useEffect, useState } from 'react';

// store
import { useAppDispatch, useAppSelector } from 'app/hooks';

// material-ui

// project imports
import MainCard from 'components/cards/MainCard';
import { Table, TableFooter } from 'components/extended/Table';
import { SEARCH_PARAM_KEY, paginationParamDefault } from 'constants/Common';
import { EditProject, ManageProjectSearch, ManageProjectTBody, ManageProjectThead } from 'containers/administration';
import { FilterCollapse } from 'containers/search';
import {
    detailLoadingSelector,
    getAllProject,
    getDetailProject,
    loadingSelector,
    projectDetailSelector,
    projectListSelector,
    quotaUpdateHistorySelector,
    getQuotaUpdateHistory,
    projectpaginationSelector
} from 'store/slice/projectSlice';
import { IProjectSearchConfig, projectSearchConfig } from './Config';
import { exportDocument, getSearchParam, transformObject } from 'utils/common';

// third party
import { useSearchParams } from 'react-router-dom';
import Api from 'constants/Api';

// ==============================|| Manage Project ||============================== //
/**
 *  URL Params
 *  page
 *  size
 *  projectType
 *  projectId
 *  projectName
 *  projectManager
 *  status
 */
const Project = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [
        SEARCH_PARAM_KEY.page,
        SEARCH_PARAM_KEY.size,
        SEARCH_PARAM_KEY.projectType,
        SEARCH_PARAM_KEY.projectId,
        SEARCH_PARAM_KEY.projectName,
        SEARCH_PARAM_KEY.status,
        SEARCH_PARAM_KEY.projectManager,
        SEARCH_PARAM_KEY.fullname
    ];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projectName, fullname, ...cloneParams } = params;

    // Hooks, State, Variable
    const defaultConditions = {
        ...projectSearchConfig,
        ...cloneParams,
        projectId: params.projectId ? { value: params.projectId, label: params.projectName } : null,
        projectManager: params.projectManager ? { value: params.projectManager, label: params.fullname } : null,
        projectType: params.projectType ? params.projectType : '',
        status: params.status ? params.status : ''
    };
    const dispatch = useAppDispatch();
    const projectList = useAppSelector(projectListSelector);
    const loading = useAppSelector(loadingSelector);
    const projectPagination = useAppSelector(projectpaginationSelector);
    const projectDetail = useAppSelector(projectDetailSelector);
    const quotaUpdateHistories = useAppSelector(quotaUpdateHistorySelector);
    const detailLoading = useAppSelector(detailLoadingSelector);
    const [conditions, setConditions] = useState<IProjectSearchConfig>(defaultConditions);
    const [formReset] = useState<IProjectSearchConfig>(defaultConditions);
    const [open, setOpen] = useState<boolean>(false);
    const [tabValue, setTabValue] = useState<number>(0);

    // Function
    const getDataTable = () => {
        dispatch(
            getAllProject({
                ...conditions,
                projectId: conditions.projectId?.value as any,
                projectManager: conditions.projectManager?.value as any,
                projectAuthorization: 'false',
                page: conditions.page + 1
            })
        );
    };

    // Event
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setConditions({ ...conditions, page: newPage });
        setSearchParams({ ...params, page: newPage } as any);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setConditions({ ...conditions, page: paginationParamDefault.page, size: parseInt(event.target.value, 10) });
        setSearchParams({ ...params, page: paginationParamDefault.page, size: parseInt(event.target.value, 10) } as any);
    };

    const handleOpenDialog = (item?: any) => {
        setTabValue(0);
        setOpen(true);
        dispatch(getDetailProject({ projectId: item.projectId }));
        dispatch(getQuotaUpdateHistory({ projectId: item.projectId }));
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleChangeTab = (event: SyntheticEvent, newTabValue: number) => {
        setTabValue(newTabValue);
    };

    const handleExportDocument = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { page, size, ...cloneConditions } = conditions;
        transformObject(cloneConditions);
        exportDocument(Api.project.getDownload.url, {
            ...cloneConditions,
            projectId: conditions.projectId?.value as any,
            projectManager: conditions.projectManager?.value as any
        });
    };

    // Handle submit
    const handleSearch = (value: any) => {
        const { projectId, projectManager } = value;
        transformObject(value);
        const searchParams = {
            page: paginationParamDefault.page,
            size: conditions.size,
            ...value
        };

        if (projectId && projectManager) {
            searchParams.projectId = projectId.value;
            searchParams.projectName = projectId.label;
            searchParams.projectManager = projectManager.value;
            searchParams.fullname = projectManager.label;
        } else if (projectId) {
            searchParams.projectId = projectId.value;
            searchParams.projectName = projectId.label;
        } else if (projectManager) {
            searchParams.projectManager = projectManager.value;
            searchParams.fullname = projectManager.label;
        }

        setSearchParams(searchParams);
        setConditions({ ...value, page: paginationParamDefault.page, size: conditions.size });
    };

    // Effect
    useEffect(() => {
        getDataTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conditions]);

    return (
        <>
            {/* Search form  */}
            <FilterCollapse handleExport={handleExportDocument}>
                <ManageProjectSearch formReset={formReset} handleSearch={handleSearch} />
            </FilterCollapse>

            {/* Table */}
            <MainCard>
                <Table heads={<ManageProjectThead />} isLoading={loading} data={projectList}>
                    <ManageProjectTBody
                        pageNumber={conditions.page}
                        pageSize={conditions.size}
                        projects={projectList}
                        handleOpen={handleOpenDialog}
                    />
                </Table>
            </MainCard>
            {/* Pagination  */}
            {!loading && (
                <TableFooter
                    pagination={{ total: projectPagination?.totalElement, page: conditions.page, size: conditions.size }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
            {/* Edit Project */}
            {projectDetail! && quotaUpdateHistories! && (
                <EditProject
                    open={open}
                    handleClose={handleCloseDialog}
                    projectDetail={projectDetail}
                    quotaUpdateHistories={quotaUpdateHistories}
                    loading={detailLoading}
                    tabValue={tabValue}
                    handleChangeTab={handleChangeTab}
                />
            )}
        </>
    );
};

export default Project;
