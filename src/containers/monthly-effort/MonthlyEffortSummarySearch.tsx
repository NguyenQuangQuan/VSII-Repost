import React from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { IMonthlyEffortSummaryConfig, monthlyEffortSummaryConfig, monthlyEffortSummarySchema } from 'pages/monthly-effort/Config';
import { IOption } from 'types';
import { Months, SearchForm, Years } from '../search';

// third party
import { FormattedMessage } from 'react-intl';

interface IMonthlyEffortSummarySearchProps {
    conditions: IMonthlyEffortSummaryConfig;
    months: IOption[];
    handleChangeYear: (e: any) => void;
    handleSearch: (value: any) => void;
}

const MonthlyEffortSummarySearch = (props: IMonthlyEffortSummarySearchProps) => {
    const { conditions, months, handleChangeYear, handleSearch } = props;

    return (
        <SearchForm
            defaultValues={monthlyEffortSummaryConfig}
            formSchema={monthlyEffortSummarySchema}
            handleSubmit={handleSearch}
            formReset={conditions}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={4}>
                    <Years handleChangeYear={handleChangeYear} />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Months months={months} />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default MonthlyEffortSummarySearch;
