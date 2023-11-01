import { FormattedMessage } from 'react-intl';

// material-ui
import { Grid } from '@mui/material';
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { E_IS_LOGTIME } from 'constants/Common';
import { IMonthlyEffortConfig, monthlyEffortConfig, monthlyEffortDepartmentMemberSchema } from 'pages/monthly-effort/Config';

// project imports
import { IOption } from 'types';
import { Department, Member, Months, SearchForm, TimeStatus, Years } from '../search';

interface IMonthlyEffortMemberSearchProps {
    formReset: IMonthlyEffortConfig;
    months: IOption[];
    handleChangeYear: (e: any) => void;
    handleSearch: (value: any) => void;
}

const MonthlyEffortMemberSearch = (props: IMonthlyEffortMemberSearchProps) => {
    const { formReset, months, handleChangeYear, handleSearch } = props;

    return (
        <SearchForm
            defaultValues={monthlyEffortConfig}
            formSchema={monthlyEffortDepartmentMemberSchema}
            handleSubmit={handleSearch}
            formReset={formReset}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={2}>
                    <Years handleChangeYear={handleChangeYear} />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Months months={months} />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <TimeStatus />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Department />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Member isLogTime={E_IS_LOGTIME.YES} />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default MonthlyEffortMemberSearch;
