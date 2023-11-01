import { FormattedMessage } from 'react-intl';

// material-ui
import { Grid, SelectChangeEvent } from '@mui/material';

// project imports
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import {
    IMonthlyProductionPerformanceFilterConfig,
    monthlyProductionPerformanceFilterConfig,
    monthlyProductionPerformanceFilterSchema
} from 'pages/sales/Config';
import { IOption } from 'types';
import { Months, SearchForm, Years } from '../search';

interface IMonthlyProductionPerformanceSearchProps {
    conditions: IMonthlyProductionPerformanceFilterConfig;
    months: IOption[];
    handleChangeYear: (e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<unknown>) => void;
    handleSearch: (value: IMonthlyProductionPerformanceFilterConfig) => void;
}

const MonthlyProductionPerformanceSearch = (props: IMonthlyProductionPerformanceSearchProps) => {
    const { conditions, months, handleChangeYear, handleSearch } = props;

    return (
        <SearchForm
            defaultValues={monthlyProductionPerformanceFilterConfig}
            formSchema={monthlyProductionPerformanceFilterSchema}
            handleSubmit={handleSearch}
            formReset={conditions}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={4}>
                    <Years handleChangeYear={handleChangeYear} />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Months months={months} isMultiple />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default MonthlyProductionPerformanceSearch;
