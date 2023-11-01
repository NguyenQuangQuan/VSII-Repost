import { ChangeEvent } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { ProductionPerformance, SalePipelineOnGoingStatus, SalePipelineOnGoingType, SearchForm, Years } from 'containers/search';
import { IOnGoingConfig, onGoingConfig, onGoingSchema } from 'pages/sales/Config';

// third party
import { FormattedMessage } from 'react-intl';

interface OnGoingSearchProps {
    formReset: IOnGoingConfig;
    handleSearch: (value: any) => void;
    handleChangeYear?: (year: ChangeEvent<HTMLInputElement>) => void;
    year?: number;
}

const OnGoingSearch = (props: OnGoingSearchProps) => {
    const { formReset, handleSearch, handleChangeYear, year } = props;

    return (
        <SearchForm defaultValues={onGoingConfig} formSchema={onGoingSchema} handleSubmit={handleSearch} formReset={formReset}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={2.4}>
                    <SalePipelineOnGoingType isShowAll />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Years handleChangeYear={handleChangeYear} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <ProductionPerformance isDefaultAll={false} year={year} />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <SalePipelineOnGoingStatus isShowAll />
                </Grid>
                <Grid item xs={12} lg={2.4}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default OnGoingSearch;
