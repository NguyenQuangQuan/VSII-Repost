import { FormattedMessage } from 'react-intl';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { IWeeklyEffortConfig, weeklyEffortConfig, weeklyEffortProjectSchema } from 'pages/Config';
import { IOption } from 'types';
import { Project, SearchForm, Weeks, Years } from '../search';

interface IWeeklyEffortProjectSearchProps {
    formReset: IWeeklyEffortConfig;
    weeks: IOption[];
    handleChangeYear: (e: any) => void;
    handleSearch: (value: any) => void;
    handleWeekChange: (e: any) => void;
    week: any;
}

const WeeklyEffortProjectSearch = (props: IWeeklyEffortProjectSearchProps) => {
    const { formReset, weeks, handleChangeYear, handleSearch, handleWeekChange, week } = props;

    return (
        <SearchForm
            defaultValues={weeklyEffortConfig}
            formSchema={weeklyEffortProjectSchema}
            handleSubmit={handleSearch}
            formReset={formReset}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={3}>
                    <Years handleChangeYear={handleChangeYear} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Weeks weeks={weeks} onChange={handleWeekChange} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Project isNotStatus week={week} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default WeeklyEffortProjectSearch;
