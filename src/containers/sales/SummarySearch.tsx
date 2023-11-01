// material-ui
import { Grid, SelectChangeEvent } from '@mui/material';

// project imports
import {
    IMonthlyProductionPerformanceFilterConfig,
    monthlyProductionPerformanceFilterConfig,
    monthlyProductionPerformanceFilterSchema
} from 'pages/sales/Config';
import { SearchForm, Years } from '../search';

interface ISummarySearchProps {
    conditions: IMonthlyProductionPerformanceFilterConfig;
    handleChangeYear: (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => void;
    handleSearch: (value: IMonthlyProductionPerformanceFilterConfig) => void;
}

const SummarySearch = (props: ISummarySearchProps) => {
    const { conditions, handleChangeYear, handleSearch } = props;

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => {
        const value = { year: Number(e.target.value) };
        handleChangeYear(e);
        handleSearch(value);
    };

    return (
        <SearchForm
            defaultValues={monthlyProductionPerformanceFilterConfig}
            formSchema={monthlyProductionPerformanceFilterSchema}
            handleSubmit={handleSearch}
            formReset={conditions}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={2}>
                    <Years handleChangeYear={handleYearChange} />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default SummarySearch;
