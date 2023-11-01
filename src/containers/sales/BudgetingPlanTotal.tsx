import { FormattedMessage } from 'react-intl';

// material-ui
import { Grid, ListItem, Typography, useTheme } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';
import SkeletonSummaryCard from 'components/cards/Skeleton/SummaryCard';
import { gridSpacing } from 'store/constant';
import { ITotalBudgetingPlan } from 'types';
import { formatPrice } from 'utils/common';

// third party

interface IBudgetingPlanTotalProps {
    loading: boolean;
    total: ITotalBudgetingPlan | undefined;
}

const BudgetingPlanTotal = (props: IBudgetingPlanTotalProps) => {
    const { loading, total } = props;
    const theme = useTheme();

    const totals = [
        { id: 'total-contract-value', value: total ? total.totalContractValue : '-' },
        { id: 'total-cost-limit', value: total ? total.totalCostLimit : '-' },
        { id: 'total-effort-limit', value: total ? total.totalEffortLimit : '-' },
        { id: 'total-projectSet-revenue', value: total ? total.totalProjectSetRevenue : '-' },
        { id: 'total-actual-cost-by-ACD', value: total ? total.totalActualCostByACD : '-' }
    ];

    return loading ? (
        <SkeletonSummaryCard />
    ) : (
        <MainCard sx={{ marginBottom: theme.spacing(gridSpacing) }}>
            <Grid
                container
                columns={{ xs: 12, sm: 8, md: 12 }}
                sx={{
                    '& .MuiListItemSecondaryAction-root .MuiTypography-root': {
                        fontWeight: '700 !important'
                    }
                }}
            >
                {totals.map((item) => (
                    <Grid item xs={12} sm={4} md={4} key={item.id} sx={{ paddingRight: { xs: '0', sm: '10px' } }}>
                        <ListItem
                            sx={{ color: '#3163D4', fontWeight: '700 !important' }}
                            secondaryAction={<Typography sx={{ color: '#000000 !important' }}>{formatPrice(item.value)}</Typography>}
                        >
                            <Typography
                                sx={{
                                    wordWrap: 'break-word',
                                    width: '100%',
                                    '@media (max-width: 600px)': {
                                        width: '50%'
                                    },
                                    fontWeight: '700'
                                }}
                            >
                                <FormattedMessage id={item.id} />
                            </Typography>
                        </ListItem>
                    </Grid>
                ))}
            </Grid>
        </MainCard>
    );
};

export default BudgetingPlanTotal;
