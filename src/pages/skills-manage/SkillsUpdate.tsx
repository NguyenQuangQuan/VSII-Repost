/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

// project imports
import MainCard from 'components/cards/MainCard';
import { Table, TableFooter } from 'components/extended/Table';
import Api from 'constants/Api';
import { SEARCH_PARAM_KEY, paginationParamDefault, paginationResponseDefault } from 'constants/Common';
import { ROUTER } from 'constants/Routers';
import { TableToolbar } from 'containers';
import { FilterCollapse } from 'containers/search';
import { SkillsUpdateSearch, SkillsUpdateTBody, SkillsUpdateTHead } from 'containers/skills-manage';
import sendRequest from 'services/ApiService';
import { IPaginationResponse } from 'types';
import { exportDocument, getSearchParam, showPdfInNewTab, transformObject } from 'utils/common';
import { ISkillsUpdateSearchConfig, skillsUpdateSearchConfig } from './Config';

// third party
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { PERMISSIONS } from 'constants/Permission';
import { checkAllowedPermission } from 'utils/authorization';

// ==============================|| Skills Update ||============================== //
/**
 *  URL Params
 *  page
 *  size
 *  memberCode
 *  fullname
 *  userName
 *  titleCode
 *  departmentId
 */

const SkillsUpdate = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [
        SEARCH_PARAM_KEY.page,
        SEARCH_PARAM_KEY.size,
        SEARCH_PARAM_KEY.fullname,
        SEARCH_PARAM_KEY.userName,
        SEARCH_PARAM_KEY.titleCode,
        SEARCH_PARAM_KEY.titleName,
        SEARCH_PARAM_KEY.departmentId,
        SEARCH_PARAM_KEY.status
    ];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);
    // delete unnecessary key value
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fullname, titleName, ...cloneParams }: any = params;

    // Hooks, State, Variable
    const navigate = useNavigate();
    const defaultConditions = {
        ...skillsUpdateSearchConfig,
        ...cloneParams,
        userName: params.userName ? { value: params.userName, label: params.fullname } : null,
        titleCode: params.titleCode ? { value: params.titleCode, label: params.titleName } : null
    };
    const [loading, setLoading] = useState<boolean>(false);
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse>({
        ...paginationResponseDefault,
        pageNumber: params.page ? params.page : paginationResponseDefault.pageNumber,
        pageSize: params.size ? params.size : paginationResponseDefault.pageSize
    });
    const [members, setMembers] = useState([]);
    const [conditions, setConditions] = useState<ISkillsUpdateSearchConfig>(defaultConditions);
    const [formReset] = useState<ISkillsUpdateSearchConfig>(defaultConditions);
    const CVRouter = `/${ROUTER.reports.skills_manage.index}/${ROUTER.reports.skills_manage.skills_update}/${ROUTER.reports.skills_manage.cv}`;
    const { skillsUpdate } = PERMISSIONS.report.skillManage;

    // Functions
    const setDataEmpty = () => {
        setLoading(false);
        setMembers([]);
    };

    const getDataTable = async () => {
        setLoading(true);
        const response = await sendRequest(Api.skills_manage.getSkillsUpdate, {
            ...conditions,
            userName: conditions.userName ? conditions.userName.value : null,
            titleCode: conditions.titleCode ? conditions.titleCode.value! : null,
            page: conditions.page + 1
        });
        if (response?.status) {
            const { content, pagination } = response.result;
            setMembers(content);
            setLoading(false);
            setPaginationResponse({ ...paginationResponse, totalElement: pagination?.totalElement });
            return;
        }
        setDataEmpty();
    };

    const handleViewPDF = async (params: { memberCode: string }) => {
        const response = await sendRequest(Api.skills_manage.viewPDF, params);
        if (response?.status) {
            const { content } = response.result;
            showPdfInNewTab(content.pdf);
        } else {
            return;
        }
    };

    const handleDownloadCV = async (params: { memberCode: string; type: string }) => {
        exportDocument(Api.skills_manage.downloadCV.url, params);
    };

    // Events
    const handleSearch = (values: any) => {
        const { userName, titleCode } = values;
        const member = userName
            ? {
                userName: userName.value,
                fullname: userName.label
            }
            : null;
        const title = titleCode
            ? {
                titleCode: titleCode.value,
                titleName: titleCode.label
            }
            : null;
        const cloneValues = { ...values, ...member, ...title };
        transformObject(cloneValues);
        setSearchParams(cloneValues);
        setConditions({ ...values });
    };

    const handleOpenCVForm = () => {
        navigate(CVRouter);
    };

    const handleShowDetail = (params: { memberCode: string; userName: string }) => {
        transformObject(params)
        navigate({
            pathname: CVRouter,
            search: `?${createSearchParams({ ...params })}`
        });
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setConditions({ ...conditions, page: newPage });
        setSearchParams({ ...params, page: newPage } as any);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setConditions({ ...conditions, page: paginationParamDefault.page, size: parseInt(event.target.value, 10) });
        setSearchParams({ ...params, page: paginationParamDefault.page, size: parseInt(event.target.value, 10) } as any);
    };

    // Effects
    useEffect(() => {
        getDataTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conditions]);

    return (
        <>
            {/* Search form  */}
            <FilterCollapse>
                <SkillsUpdateSearch handleSubmit={handleSearch} formReset={formReset} />
            </FilterCollapse>

            {/* Table and Toolbar */}
            <MainCard>
                <TableToolbar handleOpen={checkAllowedPermission(skillsUpdate.add) ? handleOpenCVForm : undefined} />
                <Table heads={<SkillsUpdateTHead />} data={members} isLoading={loading}>
                    <SkillsUpdateTBody
                        pageNumber={conditions.page}
                        pageSize={conditions.size}
                        members={members}
                        handleShowDetail={handleShowDetail}
                        handleViewPDF={handleViewPDF}
                        handleDownloadCV={handleDownloadCV}
                    />
                </Table>
            </MainCard>

            {/* Pagination  */}
            {!loading && (
                <TableFooter
                    pagination={{ total: paginationResponse.totalElement, page: conditions.page, size: conditions.size }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </>
    );
};

export default SkillsUpdate;
