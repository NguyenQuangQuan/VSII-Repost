import { FormattedMessage } from 'react-intl';
// material-ui
import { Grid } from '@mui/material';

// project imports
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { IMonthlyCostDataConfig, monthlyCostDataConfig, monthlyCostDataSchema } from 'pages/monthly-project-cost/Config';
import { IOption } from 'types';
import { Project, SearchForm, Months, Years } from '../search';

interface IMonthlyCostDataSearchProps {
    formReset: IMonthlyCostDataConfig;
    months: IOption[];
    handleChangeYear: (e: any) => void;
    handleSearch: (value: any) => void;
    handleChangeMonth: (e: any) => void;
    month: any;
}

const MonthlyCostDataSearch = (props: IMonthlyCostDataSearchProps) => {
    const { formReset, months, handleChangeYear, handleSearch, handleChangeMonth, month } = props;

    return (
        <SearchForm
            defaultValues={monthlyCostDataConfig}
            formSchema={monthlyCostDataSchema}
            handleSubmit={handleSearch}
            formReset={formReset}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={3}>
                    <Years handleChangeYear={handleChangeYear} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Months months={months} isShow13MonthSalary onChange={handleChangeMonth} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Project isNotStatus month={month} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default MonthlyCostDataSearch;
