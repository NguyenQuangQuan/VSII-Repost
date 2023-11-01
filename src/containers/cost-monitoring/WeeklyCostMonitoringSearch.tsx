// material-ui
import { Grid } from '@mui/material';

// project imports
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { FormattedMessage } from 'react-intl';
import { IOption } from 'types';
import { Weeks, SearchForm, Years, Project } from '../search';
import { ICostMonitoringFilterConfig, costMonitoringFilterConfig, costMonitoringFilterSchema } from 'pages/cost-monitoring/Config';

interface IWeeklyCostMonitoringSearchProps {
    conditions: ICostMonitoringFilterConfig;
    weeks: IOption[];
    handleChangeYear: (e: any) => void;
    handleSearch: (value: any) => void;
    handleWeekChange: (e: any) => void;
    week: any;
}

const WeeklyCostMonitoringSearch = (props: IWeeklyCostMonitoringSearchProps) => {
    const { conditions, weeks, handleChangeYear, handleSearch, week, handleWeekChange } = props;

    return (
        <SearchForm
            defaultValues={costMonitoringFilterConfig}
            formSchema={costMonitoringFilterSchema}
            handleSubmit={handleSearch}
            formReset={conditions}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={3}>
                    <Years handleChangeYear={handleChangeYear} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Weeks weeks={weeks} onChange={handleWeekChange} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Project isDefaultAll isDisableClearable isNotStatus week={week} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default WeeklyCostMonitoringSearch;
