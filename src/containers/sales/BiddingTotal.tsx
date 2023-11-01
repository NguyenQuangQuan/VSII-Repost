import React from 'react';

// material-ui
import { Grid, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';

// project imports
import SkeletonSummaryCard from 'components/cards/Skeleton/SummaryCard';
import MainCard from 'components/cards/MainCard';
import { gridSpacing } from 'store/constant';

// third party
import { FormattedMessage } from 'react-intl';
import { ITotalBidding } from 'types';
import { formatPrice } from 'utils/common';

interface IBiddingTotalProps {
    loading: boolean;
    totalBidding: ITotalBidding;
}

const BiddingTotal = (props: IBiddingTotalProps) => {
    const { loading, totalBidding } = props;
    const theme = useTheme();

    return loading ? (
        <SkeletonSummaryCard />
    ) : (
        <MainCard sx={{ marginBottom: theme.spacing(gridSpacing) }}>
            <Grid
                container
                sx={{
                    '& .MuiListItem-root': {
                        paddingTop: '1px !important',
                        paddingBottom: '1px !important',
                        paddingRight: '16px',
                        height: '44px',
                        '& .MuiListItemSecondaryAction-root': {
                            position: 'unset',
                            transform: 'unset'
                        }
                    },
                    '& .MuiListItemText-root .MuiTypography-root': {
                        color: '#3163D4 !important',
                        fontSize: '11px',
                        fontWeight: '700 !important'
                    },
                    '& .MuiListItemSecondaryAction-root .MuiTypography-root': {
                        fontWeight: '700 !important'
                    }
                }}
            >
                <Grid
                    item
                    xs={12}
                    lg={5}
                    container
                    sx={{
                        borderBottom: { xs: '1px solid #D5D5D5', lg: 'none' },
                        borderRight: { xs: 'none', lg: '1px solid #D5D5D5' }
                    }}
                >
                    <Grid item xs={12} lg={6}>
                        <List>
                            <ListItem secondaryAction={<Typography>{formatPrice(totalBidding?.totalSmm)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="total-smm" />
                                </ListItemText>
                            </ListItem>
                            <ListItem secondaryAction={<Typography>{formatPrice(totalBidding?.totalDomesticITO)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="total-domestic-ito" />
                                </ListItemText>
                            </ListItem>
                            <ListItem secondaryAction={<Typography>{formatPrice(totalBidding?.totalProduct)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="total-product" />
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <List>
                            <ListItem secondaryAction={<Typography>{formatPrice(totalBidding?.si)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="si-bidding" />
                                </ListItemText>
                            </ListItem>
                            <ListItem secondaryAction={<Typography>{formatPrice(totalBidding?.domesticITO)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="domestic-ito" />
                                </ListItemText>
                            </ListItem>
                            <ListItem secondaryAction={<Typography>{formatPrice(totalBidding?.prd)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="prd" />
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>

                <Grid item xs={12} lg={7} container>
                    <Grid item xs={12} lg={6}>
                        <List>
                            <ListItem secondaryAction={<Typography>{formatPrice(totalBidding?.totalSmmManagement)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="total-smm-management" />
                                </ListItemText>
                            </ListItem>
                            <ListItem secondaryAction={<Typography>{formatPrice(totalBidding?.totalDomesticITOManagement)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="total-domestic-ito-management" />
                                </ListItemText>
                            </ListItem>
                            <ListItem secondaryAction={<Typography>{formatPrice(totalBidding?.totalPrdValueManagement)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="total-prd-value-management" />
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <List>
                            <ListItem secondaryAction={<Typography>{formatPrice(totalBidding?.domesticITOAccountant)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="domestic-ito-accountant" />
                                </ListItemText>
                            </ListItem>
                            <ListItem secondaryAction={<Typography>{formatPrice(totalBidding?.sivalueAccountant)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="sivalue-accountant" />
                                </ListItemText>
                            </ListItem>
                            <ListItem secondaryAction={<Typography>{formatPrice(totalBidding?.prdaccountant)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="prd-accountant" />
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default BiddingTotal;
