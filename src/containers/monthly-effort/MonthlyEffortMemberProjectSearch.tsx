import { FormattedMessage } from 'react-intl';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { IMonthlyEffortConfig, monthlyEffortConfig, monthlyEffortDepartmentProjectSchema } from 'pages/monthly-effort/Config';
import { IOption } from 'types';
import { Months, Project, SearchForm, Years } from '../search';

interface IMonthlyEffortMemberProjectSearchProps {
    formReset: IMonthlyEffortConfig;
    months: IOption[];
    handleChangeYear: (e: any) => void;
    handleSearch: (value: any) => void;
}

const MonthlyEffortMemberProjectSearch = (props: IMonthlyEffortMemberProjectSearchProps) => {
    const { formReset, months, handleChangeYear, handleSearch } = props;

    return (
        <SearchForm
            defaultValues={monthlyEffortConfig}
            formSchema={monthlyEffortDepartmentProjectSchema}
            handleSubmit={handleSearch}
            formReset={formReset}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={3}>
                    <Years handleChangeYear={handleChangeYear} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Months months={months} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Project isDefaultAll />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default MonthlyEffortMemberProjectSearch;
