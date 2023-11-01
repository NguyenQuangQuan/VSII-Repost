import { FormattedMessage } from 'react-intl';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { E_IS_LOGTIME } from 'constants/Common';
import { IWeeklyEffortConfig, weeklyEffortConfig, weeklyEffortMemberSchema } from 'pages/Config';
import { IOption } from 'types';
import { Member, SearchForm, TimeStatus, Weeks, Years } from '../search';

interface IWeeklyEffortMemberSearchProps {
    formReset: IWeeklyEffortConfig;
    weeks: IOption[];
    handleChangeYear: (e: any) => void;
    handleSearch: (value: any) => void;
}

const WeeklyEffortMemberSearch = (props: IWeeklyEffortMemberSearchProps) => {
    const { formReset, weeks, handleChangeYear, handleSearch } = props;

    return (
        <SearchForm
            defaultValues={weeklyEffortConfig}
            formSchema={weeklyEffortMemberSchema}
            handleSubmit={handleSearch}
            formReset={formReset}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={2.4}>
                    <Years handleChangeYear={handleChangeYear} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Weeks weeks={weeks} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <TimeStatus isMultiple />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Member isLogTime={E_IS_LOGTIME.YES} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default WeeklyEffortMemberSearch;
