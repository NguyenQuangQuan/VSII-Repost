// material-ui
import { Grid } from '@mui/material';

// project imports
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { FormattedMessage } from 'react-intl';
import { SearchForm, Years, BiddingType, BiddingStatus } from '../search';
import { IBiddingFilterConfig, biddingFilterConfig, biddingFilterShemcha } from 'pages/sales/Config';

interface IBiddingSearchProps {
    formReset: IBiddingFilterConfig;
    handleSearch: (value: any) => void;
}

const BiddingSearch = (props: IBiddingSearchProps) => {
    const { formReset, handleSearch } = props;

    return (
        <SearchForm defaultValues={biddingFilterConfig} formSchema={biddingFilterShemcha} handleSubmit={handleSearch} formReset={formReset}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={3}>
                    <BiddingType />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Years />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <BiddingStatus />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default BiddingSearch;
