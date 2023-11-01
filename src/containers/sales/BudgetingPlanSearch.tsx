import { FormattedMessage } from 'react-intl';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { Button } from 'components';
import { Label } from 'components/extended/Form';
import { SearchForm, Years } from 'containers/search';
import BudgetingPlanServiceType from 'containers/search/SalePipelineBudgetingPlanServiceType';
import { IBudgetingPlanSearch, budgetingPlanSearchConfig, budgetingPlanSearchSchema } from 'pages/sales/Config';

// third party
interface BudgetingPlanSearchProps {
    formReset: IBudgetingPlanSearch;
    handleSearch: (value: IBudgetingPlanSearch) => void;
}

const BudgetingPlanSearch = (props: BudgetingPlanSearchProps) => {
    const { formReset, handleSearch } = props;

    return (
        <SearchForm
            defaultValues={budgetingPlanSearchConfig}
            formSchema={budgetingPlanSearchSchema}
            handleSubmit={handleSearch}
            formReset={formReset}
        >
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} lg={3}>
                    <Years />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <BudgetingPlanServiceType isShowAll />
                </Grid>
                <Grid item xs={12} lg={3}></Grid>
                <Grid item xs={12} lg={3}>
                    <Label label="&nbsp;" />
                    <Button type="submit" size="medium" children={<FormattedMessage id="search" />} variant="contained" />
                </Grid>
            </Grid>
        </SearchForm>
    );
};

export default BudgetingPlanSearch;
