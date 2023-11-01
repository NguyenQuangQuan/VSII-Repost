// React
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// project imports
import { Table } from 'components/extended/Table';
import Api from 'constants/Api';
import { SEARCH_PARAM_KEY } from 'constants/Common';
import { exportDocument, getSearchParam, transformObject } from 'utils/common';
import { getMonthsOfYear } from 'utils/date';
import { IMonthlyProductionPerformanceFilterConfig, monthlyProductionPerformanceFilterConfig } from './Config';
import { IOption, ISalePipelineSummary } from 'types';
import { SummaryTBody, SummaryThead, SummarySearch } from 'containers/sales';
import sendRequest from 'services/ApiService';
import { PERMISSIONS } from 'constants/Permission';

// material-ui
import { SelectChangeEvent } from '@mui/material';
import { FilterCollapse } from 'containers/search';
import { checkAllowedPermission } from 'utils/authorization';

const Summary = () => {
    const [summary, setSummary] = useState<ISalePipelineSummary>();
    const [loading, setLoading] = useState<boolean>(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParams = [SEARCH_PARAM_KEY.year];
    const params: { [key: string]: any } = getSearchParam(keyParams, searchParams);
    transformObject(params);
    const defaultConditions = { ...monthlyProductionPerformanceFilterConfig, ...params };
    const [conditions, setConditions] = useState<IMonthlyProductionPerformanceFilterConfig>(defaultConditions);
    const [formReset, setFormReset] = useState<IMonthlyProductionPerformanceFilterConfig>(defaultConditions);
    const [year, setYear] = useState<number>(defaultConditions.year);
    const [isChangeYear, setIsChangeYear] = useState<boolean>(false);
    const { summaryPermission } = PERMISSIONS.sale.salePipeline;

    const getDataTable = async () => {
        setLoading(true);
        const response = await sendRequest(Api.sale_list.getSaleSummary, {
            ...conditions
        });
        if (response) {
            const { status, result } = response;
            if (status && result) {
                setSummary(result.content as ISalePipelineSummary);
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    // Event
    const handleChangeYear = (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => {
        const value = e.target.value;
        setYear(value as number);
        setIsChangeYear(true);
    };

    // Handle submit
    const handleSearch = (value: IMonthlyProductionPerformanceFilterConfig) => {
        transformObject(value);
        setSearchParams(value as any);
        setConditions(value);
    };

    const getMonthInYears = useCallback(async (y: number) => {
        const monthInYears = await getMonthsOfYear(y);
        return monthInYears;
    }, []);

    const handleExportDocument = () => {
        exportDocument(Api.sale_list.getDownloadSalePineLine.url, { year });
    };

    useEffect(() => {
        getMonthInYears(year).then((items: IOption[]) => {
            if (items.length > 0 && isChangeYear) setFormReset({ ...formReset, year });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year]);

    // Effect
    useEffect(() => {
        getDataTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conditions]);

    return (
        <div className="summary-container">
            <FilterCollapse handleExport={checkAllowedPermission(summaryPermission.download) ? handleExportDocument : undefined}>
                <SummarySearch conditions={formReset} handleChangeYear={handleChangeYear} handleSearch={handleSearch} />
                <Table
                    sx={{
                        '& table': {
                            borderCollapse: 'collapse'
                        },
                        '& td, th': {
                            border: '1px solid #ccc',
                            color: '#000000'
                        },
                        marginTop: '10px'
                    }}
                    maxHeight="auto"
                    heads={<SummaryThead summaryLength={[summary!].length} />}
                    isLoading={loading}
                    data={summary?.tableLarge || summary?.tableSmall ? [summary!] : []}
                >
                    <SummaryTBody summary={summary} />
                </Table>
            </FilterCollapse>
        </div>
    );
};

export default Summary;
