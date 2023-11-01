import React from 'react';

// material-ui
import { Grid, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';

// project imports
import SkeletonSummaryCard from 'components/cards/Skeleton/SummaryCard';
import MainCard from 'components/cards/MainCard';
import { gridSpacing } from 'store/constant';

// third party
import { FormattedMessage } from 'react-intl';
import { ITotalOnGoing } from 'types';
import { formatPrice } from 'utils/common';

interface IOnGoingTotalProps {
    loading: boolean;
    total: ITotalOnGoing;
}

const OnGoingTotal = (props: IOnGoingTotalProps) => {
    const { loading, total } = props;
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
                        paddingBottom: '1px !important'
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
                    lg={6}
                    container
                    direction="row"
                    wrap="wrap"
                    sx={{
                        borderBottom: { xs: '1px solid #D5D5D5', lg: 'none' },
                        borderRight: { xs: 'none', lg: '1px solid #D5D5D5' },
                        marginBottom: '10px',
                        '& div .MuiList-root': {
                            padding: '0 !important'
                        }
                    }}
                >
                    <Grid item xs={12} lg={12}>
                        <List>
                            <ListItem secondaryAction={<Typography>{formatPrice(total?.domesticITO)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="total-domestic-ito" />
                                </ListItemText>
                            </ListItem>
                            <ListItem secondaryAction={<Typography>{formatPrice(total?.product)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="total-product" />
                                </ListItemText>
                            </ListItem>
                            <ListItem secondaryAction={<Typography>{formatPrice(total?.license)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="total-license" />
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>

                <Grid
                    item
                    xs={12}
                    lg={6}
                    container
                    direction="row"
                    wrap="wrap"
                    sx={{
                        marginBottom: '10px',
                        '& div .MuiList-root': {
                            padding: '0 !important'
                        }
                    }}
                >
                    <Grid item xs={12} lg={12}>
                        <List>
                            <ListItem secondaryAction={<Typography>{formatPrice(total?.siallocated)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="total-si-allocated" />
                                </ListItemText>
                            </ListItem>
                            <ListItem secondaryAction={<Typography>{formatPrice(total?.domesticITOAllocated)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="total-domestic-ito-allocated" />
                                </ListItemText>
                            </ListItem>
                            <ListItem secondaryAction={<Typography>{formatPrice(total?.productAllocated)}</Typography>}>
                                <ListItemText>
                                    <FormattedMessage id="total-product-allocated" />
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default OnGoingTotal;
