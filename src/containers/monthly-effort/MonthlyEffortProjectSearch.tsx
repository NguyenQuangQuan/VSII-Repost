import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
// material-ui
import { Grid } from '@mui/material';

// project imports
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { IMonthlyEffortProjectConfig, monthlyEffortProjectConfig, monthlyEffortProjectSchema } from 'pages/monthly-effort/Config';
import { IOption } from 'types';
import { Department, Project, SearchForm, Months, Years, ProjectType } from '../search';
import { convertMonthFromToDate } from 'utils/date';

interface IMonthlyEffortProjectSearchProps {
    months: IOption[];
    handleChangeYear: (e: any) => void;
    handleSearch: (value: any) => void;
    formReset: IMonthlyEffortProjectConfig;
}

const MonthlyEffortProjectSearch = (props: IMonthlyEffortProjectSearchProps) => {
    const { months, handleChangeYear, handleSearch, formReset } = props;
    const [month, setMonth] = useState({ fromDate: '', toDate: '' });

    const handleMonthChange = (value: string) => {
        const getMonth = months.filter((month) => {
            return month.value === value;
        });

        return setMonth(convertMonthFromToDate(getMonth[0].label));
    };

    return (
        <SearchForm
            defaultValues={monthlyEffortProjectConfig}
            formSchema={monthlyEffortProjectSchema}
            handleSubmit={handleSearch}
            formReset={formReset}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={2}>
                    <Years handleChangeYear={handleChangeYear} />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Months months={months} onChange={handleMonthChange} />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Department />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <ProjectType />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Project month={month} isNotStatus />
                </Grid>
                <Grid item xs={12} lg={2}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default MonthlyEffortProjectSearch;
