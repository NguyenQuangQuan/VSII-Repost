import { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';

// materia-ui
import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'components/cards/MainCard';
import SkeletonSummaryCard from 'components/cards/Skeleton/SummaryCard';
import { gridSpacing } from 'store/constant';
import { INonBillableMonitoringInfo, INonbillByLevelList } from 'types';
import { formatPrice } from 'utils/common';

interface INonBillByMemberTotalProps {
    nonBillByMember: INonBillableMonitoringInfo;
    isLoading: boolean;
}

const NonBillByMemberTotal = (props: INonBillByMemberTotalProps) => {
    const { nonBillByMember, isLoading } = props;
    const total = nonBillByMember?.nonBillTotal;
    const { nonbillByLevelList } = nonBillByMember?.nonbillPerPersonnelResponse;
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
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
                            <Grid item xs={12} lg={6}>
                                <List>
                                    <ListItem secondaryAction={<Typography>{total.mandayWeek}</Typography>}>
                                        <ListItemText>
                                            <FormattedMessage id="total-mandays-week" />
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem secondaryAction={<Typography>{total.mandayPresaleWeek}</Typography>}>
                                        <ListItemText>
                                            <FormattedMessage id="total-mandays-presale-week" />
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem secondaryAction={<Typography>{total.mandayNotPresale}</Typography>}>
                                        <ListItemText>
                                            <FormattedMessage id="total-mandays-week-no-presale" />
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem secondaryAction={<Typography>{formatPrice(total.mandayPayrollOnly)}</Typography>}>
                                        <ListItemText>
                                            <FormattedMessage id="mandays-payroll" />
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <List>
                                    <ListItem secondaryAction={<Typography>{formatPrice(total.totalWeek)}</Typography>}>
                                        <ListItemText>
                                            <FormattedMessage id="total-cost-week" />
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem secondaryAction={<Typography>{formatPrice(total.totalMonth)}</Typography>}>
                                        <ListItemText>
                                            <FormattedMessage id="total-cost-month" />
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem
                                        secondaryAction={
                                            <Typography sx={{ color: '#F02020 !important' }}>{total.salaryFundPer}</Typography>
                                        }
                                    >
                                        <ListItemText>
                                            <FormattedMessage id="percentage-cost" />
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} lg={6} container direction="row" wrap="wrap">
                            {nonbillByLevelList.map((item: INonbillByLevelList, index) => (
                                <Fragment key={index}>
                                    <Grid item xs={12} lg={6}>
                                        <ListItem secondaryAction={<Typography>{item.personnel}</Typography>}>
                                            <ListItemText>
                                                <FormattedMessage id={'total-member-' + item.level} />
                                            </ListItemText>
                                        </ListItem>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <ListItem
                                            secondaryAction={
                                                <Typography sx={{ color: '#F02020 !important' }}>{item.perNonbillStr}</Typography>
                                            }
                                        >
                                            <ListItemText>
                                                <FormattedMessage id={'effort-ratio-' + item.level} />
                                            </ListItemText>
                                        </ListItem>
                                    </Grid>
                                </Fragment>
                            ))}
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

export default NonBillByMemberTotal;
