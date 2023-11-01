// third-party
import Chart from 'react-apexcharts';
import { FormattedMessage, useIntl } from 'react-intl';

// material-ui
import { Grid, Typography, List, ListItem, ListItemText } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';
import SkeletonSummaryCard from 'components/cards/Skeleton/SummaryCard';
import { IActualEffort } from 'types';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { IMonthlyEffortSummaryConfig, actualEffortAllocationChartOptions, numberOfProjectColorsChart } from 'pages/monthly-effort/Config';

// =========================|| ACTUAL EFFORT ALLOCATION CARD ||========================= //

interface IActualEffortAllocationCardProps {
    isLoading: boolean;
    conditions: IMonthlyEffortSummaryConfig;
    data: IActualEffort;
}

const ActualEffortAllocationCard = ({ isLoading, data, conditions }: IActualEffortAllocationCardProps) => {
    const series = Object.values(data);
    const intl = useIntl();
    const labels = numberOfProjectColorsChart.map((x) => `${intl.formatMessage({ id: x.name })}`);

    return (
        <>
            {isLoading ? (
                <SkeletonSummaryCard />
            ) : (
                <MainCard title={<FormattedMessage id="effort-allocation" />}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} lg={4}>
                            <List>
                                <ListItem
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontWeight: '700 !important'
                                        }
                                    }}
                                    secondaryAction={
                                        <Typography>
                                            <FormattedMessage id="effort" />
                                        </Typography>
                                    }
                                >
                                    <ListItemText>
                                        <FormattedMessage id="type" />
                                    </ListItemText>
                                </ListItem>
                                <ListItem secondaryAction={<Typography>{data.developmentProjects}</Typography>}>
                                    <ListItemText>
                                        <FormattedMessage id="development-projects" />
                                    </ListItemText>
                                </ListItem>
                                <ListItem secondaryAction={<Typography>{data.maintainanceProjects}</Typography>}>
                                    <ListItemText>
                                        <FormattedMessage id="maintenance-projects" />
                                    </ListItemText>
                                </ListItem>
                                <ListItem secondaryAction={<Typography>{data.outsourcingProjects}</Typography>}>
                                    <ListItemText>
                                        <FormattedMessage id="outsourcing-projects" />
                                    </ListItemText>
                                </ListItem>
                                <ListItem secondaryAction={<Typography>{data.presaleProjects}</Typography>}>
                                    <ListItemText>
                                        <FormattedMessage id="presale-projects" />
                                    </ListItemText>
                                </ListItem>
                                <ListItem secondaryAction={<Typography>{data.productProjects}</Typography>}>
                                    <ListItemText>
                                        <FormattedMessage id="product-projects" />
                                    </ListItemText>
                                </ListItem>
                                <ListItem secondaryAction={<Typography>{data.trainingProjects}</Typography>}>
                                    <ListItemText>
                                        <FormattedMessage id="training-projects" />
                                    </ListItemText>
                                </ListItem>
                                <ListItem secondaryAction={<Typography>{data.otherJointProjects}</Typography>}>
                                    <ListItemText>
                                        <FormattedMessage id="other-joint-projects" />
                                    </ListItemText>
                                </ListItem>
                                <ListItem secondaryAction={<Typography>{data.vacationProjects}</Typography>}>
                                    <ListItemText>
                                        <FormattedMessage id="leave" />
                                    </ListItemText>
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} lg={6}>
                                    <Chart options={actualEffortAllocationChartOptions(labels, conditions)} series={series} type="pie" />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    {numberOfProjectColorsChart.map((item, index) => (
                                        <Grid item xs={12} lg={12} key={index}>
                                            <Grid container spacing={2} alignItems="center" justifyContent="center">
                                                <Grid item>
                                                    <FiberManualRecordIcon sx={{ color: item.color }} />
                                                </Grid>
                                                <Grid item xs zeroMinWidth>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs zeroMinWidth>
                                                            <Typography align="left" variant="body2">
                                                                <FormattedMessage id={item.name} />
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

export default ActualEffortAllocationCard;
