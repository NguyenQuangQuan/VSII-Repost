import { FormattedMessage } from 'react-intl';

// material-ui
import { Grid } from '@mui/material';
import { Button } from 'components';

// project imports
import { Label } from 'components/extended/Form';
import {
    IMonthlyProjectCostSummaryConfig,
    monthlyProjectCostSummarySchema,
    monthlyProjectCostSummaryConfig
} from 'pages/monthly-project-cost/Config';
import { IOption } from 'types';
import { Department, Months, Project, ProjectType, SearchForm, Years } from '../search';

interface IMonthlyProjectCostSummarySearchProps {
    months: IOption[];
    handleChangeYear: (e: any) => void;
    handleSearch: (value: any) => void;
    formReset: IMonthlyProjectCostSummaryConfig;
}

const MonthlyProjectCostSummarySearch = (props: IMonthlyProjectCostSummarySearchProps) => {
    const { months, handleChangeYear, handleSearch, formReset } = props;

    return (
        <SearchForm
            defaultValues={monthlyProjectCostSummaryConfig}
            formSchema={monthlyProjectCostSummarySchema}
            handleSubmit={handleSearch}
            formReset={formReset}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} lg={2}>
                    <Years handleChangeYear={handleChangeYear} />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Months months={months} isShow13MonthSalary />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Department />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <ProjectType />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Project />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default MonthlyProjectCostSummarySearch;
