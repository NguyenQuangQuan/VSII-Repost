// material-ui
import { Grid } from '@mui/material';

// project imports
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { FormattedMessage } from 'react-intl';
import { IOption } from 'types';
import { ICostMonitoringFilterConfig, costMonitoringFilterConfig, costMonitoringFilterSchema } from 'pages/cost-monitoring/Config';
import { Months, Project, SearchForm, Years } from 'containers/search';

interface IMonthlyCostMonitoringSearchProps {
    conditions: ICostMonitoringFilterConfig;
    months: IOption[];
    handleChangeYear: (e: any) => void;
    handleSearch: (value: any) => void;
    handleChangeMonth: (e: any) => void;
    month: any;
}

const MonthlyCostMonitoringSearch = (props: IMonthlyCostMonitoringSearchProps) => {
    const { conditions, months, handleChangeYear, handleSearch, handleChangeMonth, month } = props;

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
                    <Months months={months} onChange={handleChangeMonth} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Project isDefaultAll isDisableClearable month={month} isNotStatus />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default MonthlyCostMonitoringSearch;
