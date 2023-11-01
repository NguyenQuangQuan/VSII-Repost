// material-ui
import { Grid } from '@mui/material';

// project imports
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { INonBillConfig, nonBillConfig, nonBillSchema } from 'pages/non-billable-monitoring/Config';
import { FormattedMessage } from 'react-intl';
import { IOption } from 'types';
import { SearchForm, Weeks, Years } from '../search';

interface INonBillCostByWeekSearchProps {
    conditions: INonBillConfig;
    weeks: IOption[];
    handleChangeYear: (e: any) => void;
    handleSearch: (value: any) => void;
}

const NonBillCostByWeekSearch = (props: INonBillCostByWeekSearchProps) => {
    const { conditions, weeks, handleChangeYear, handleSearch } = props;

    return (
        <SearchForm defaultValues={nonBillConfig} formSchema={nonBillSchema} handleSubmit={handleSearch} formReset={conditions}>
            <Grid container alignItems="center" justifyContent="space-beetween" spacing={2}>
                <Grid item xs={12} lg={8} container alignItems="center" spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <Years handleChangeYear={handleChangeYear} />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Weeks weeks={weeks} />
                    </Grid>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default NonBillCostByWeekSearch;
