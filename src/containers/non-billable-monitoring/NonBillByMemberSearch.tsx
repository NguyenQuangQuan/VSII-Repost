// material-ui
import { Grid } from '@mui/material';

// project imports
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { INonBillConfig, nonBillConfig, nonBillSchema } from 'pages/non-billable-monitoring/Config';
import { FormattedMessage } from 'react-intl';
import { IOption } from 'types';
import { Department, TimeStatus, SearchForm, Weeks, Years } from '../search';

interface INonBillByMemberSearchProps {
    conditions: INonBillConfig;
    weeks: IOption[];
    handleChangeYear: (e: any) => void;
    handleSearch: (value: any) => void;
    tabValue?: number;
}

const NonBillByMemberSearch = (props: INonBillByMemberSearchProps) => {
    const { conditions, weeks, handleChangeYear, handleSearch, tabValue } = props;

    return (
        <SearchForm defaultValues={nonBillConfig} formSchema={nonBillSchema} handleSubmit={handleSearch} formReset={conditions}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={2.4}>
                    <Years handleChangeYear={handleChangeYear} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Weeks weeks={weeks} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Department />
                </Grid>

                <Grid item xs={12} lg={2.4}>
                    {tabValue === 0 && <TimeStatus isNonBill />}
                </Grid>

                <Grid item xs={12} lg={2.4}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default NonBillByMemberSearch;
