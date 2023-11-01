/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

// material-ui
import { TableBody } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';
import { Table, TableFooter } from 'components/extended/Table';
import Api from 'constants/Api';
import { SEARCH_PARAM_KEY, paginationParamDefault, paginationResponseDefault } from 'constants/Common';
import { FilterCollapse } from 'containers/search';
import sendRequest from 'services/ApiService';
import { IPaginationResponse, IResponseList, ISkillsReport, ISkillsReportResponse } from 'types';
import { ISkillsReportSearchDefaultValue, skillsReportSearchDefaultValue } from './Config';
import { SkillsReportSearch, SkillsReportRow, SkillsReportThead } from 'containers/skills-manage';
import { PERMISSIONS } from 'constants/Permission';

// third party
import { useSearchParams } from 'react-router-dom';
import { exportDocument, getSearchParam, transformObject } from 'utils/common';
import { checkAllowedPermission } from 'utils/authorization';

// ==============================|| Skills Report ||============================== //
/**
 *  URL Params
 *  memberCode
 *  useName
 *  titleCode
 *  skill
 *  page
 *  size
 */
const SkillsReport = () => {
    // URL Params
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [
        SEARCH_PARAM_KEY.page,
        SEARCH_PARAM_KEY.size,
        SEARCH_PARAM_KEY.memberCode,
        SEARCH_PARAM_KEY.userName,
        SEARCH_PARAM_KEY.fullname,
        SEARCH_PARAM_KEY.titleCode,
        SEARCH_PARAM_KEY.titleName
    ];
    const keyParamsArray = [SEARCH_PARAM_KEY.skill, SEARCH_PARAM_KEY.level, SEARCH_PARAM_KEY.degree];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams, keyParamsArray);
    transformObject(params);
    // delete unnecessary key value
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fullname, userName, titleCode, titleName, ...cloneParams }: any = params;
    // Hooks, State, Variable
    const prepareSkillsArray = (skills: any) => {
        return (
            skills &&
            skills.map((item: any) => ({
                value: item,
                label: item
            }))
        );
    };

    const defaultConditions = {
        ...skillsReportSearchDefaultValue,
        ...cloneParams,
        userName: params.userName ? { value: params.userName, label: params.fullname } : null,
        titleCode: params.titleCode ? { value: params.titleCode, label: params.titleName } : null,
        skill: params.skill ? prepareSkillsArray(params.skill) : []
    };

    const [loading, setLoading] = useState<boolean>(false);
    const [paginationResponse, setPaginationResponse] = useState<IPaginationResponse>({
        ...paginationResponseDefault,
        pageNumber: params.page ? params.page : paginationResponseDefault.pageNumber,
        pageSize: params.size ? params.size : paginationResponseDefault.pageSize
    });
    const [conditions, setConditions] = useState<ISkillsReportSearchDefaultValue>(defaultConditions);
    const [formReset] = useState<ISkillsReportSearchDefaultValue>(defaultConditions);
    const [skillReports, setSkillReports] = useState<ISkillsReport[]>([]);
    const { skillsReportPermission } = PERMISSIONS.report.skillManage;

    // Function
    const getDataTable = async () => {
        setLoading(true);
        const response: IResponseList<ISkillsReportResponse> = await sendRequest(Api.skills_manage.getReport, {
            ...conditions,
            page: conditions.page + 1,
            userName: conditions.userName ? conditions.userName.value! : null,
            titleCode: conditions.titleCode ? conditions.titleCode.value! : null,
            skill: conditions.skill.map((item: any) => (typeof item === 'object' ? item.value : item))
        });

        if (response) {
            const { status, result } = response;

            if (status) {
                const { content, pagination } = result;
                setSkillReports(content);
                setPaginationResponse({ ...paginationResponse, totalElement: pagination.totalElement });
                setLoading(false);
            } else {
                setDataEmpty();
            }
            return;
        } else {
            setDataEmpty();
        }
    };

    const setDataEmpty = () => {
        setSkillReports([]);
        setLoading(false);
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

    // Handle submit
    const handleSearch = (values: any) => {
        const newSkill = values.skill.map((item: any) => item.value);
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
        const cloneValues = { ...values, skill: newSkill, ...member, ...title };
        transformObject(cloneValues);
        setSearchParams(cloneValues);
        setConditions({ ...conditions, ...values, skill: newSkill, page: paginationParamDefault.page });
    };

    const handleExportDocument = () => {
        exportDocument(Api.skills_manage.getDownload.url, {
            ...conditions,
            userName: conditions.userName?.value,
            titleCode: conditions.titleCode?.value
        });
    };

    // Effect
    useEffect(() => {
        getDataTable();
    }, [conditions]);

    return (
        <>
            {/* Search form  */}
            <FilterCollapse handleExport={checkAllowedPermission(skillsReportPermission.download) ? handleExportDocument : undefined}>
                <SkillsReportSearch formReset={formReset} handleSearch={handleSearch} />
            </FilterCollapse>

            <MainCard>
                <Table heads={<SkillsReportThead />} isLoading={loading} data={skillReports}>
                    <TableBody>
                        {skillReports &&
                            skillReports.map((data, index) => (
                                <SkillsReportRow key={index} page={conditions.page} size={conditions.size} index={index} data={data} />
                            ))}
                    </TableBody>
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

export default SkillsReport;
