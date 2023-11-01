// third-party
import Chart from 'react-apexcharts';
import { FormattedMessage, useIntl } from 'react-intl';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';
import SkeletonSummaryCard from 'components/cards/Skeleton/SummaryCard';
import { gridSpacing } from 'store/constant';
import { ILogTimesheetOnRedmine } from 'types';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { logTimesheetOnRedmineChartOptions, logTimesheetOnRedmineColorsChart } from 'pages/monthly-effort/Config';

// =========================|| LOG TIMESHEET CHART CARD ||========================= //

interface ILogTimesheetOnRedmineCardProps {
    data: ILogTimesheetOnRedmine;
    isLoading: boolean;
}

const LogTimesheetOnRedmineCard = ({ isLoading, data }: ILogTimesheetOnRedmineCardProps) => {
    const theme = useTheme();
    const intl = useIntl();
    const labels = logTimesheetOnRedmineColorsChart.map((x) => `${intl.formatMessage({ id: x.name })}`);
    return (
        <>
            {isLoading ? (
                <SkeletonSummaryCard />
            ) : (
                <MainCard
                    sx={{ marginBottom: theme.spacing(gridSpacing), overflow: 'unset' }}
                    title={<FormattedMessage id="creation-and-log-time" />}
                >
                    {/* <Grid>
                        <Typography variant="h4">Thống kê tình hình tạo và log timesheet trên Redmine</Typography>
                    </Grid> */}
                    <Grid container spacing={2} alignItems="center" sx={{ marginTop: theme.spacing(gridSpacing) }}>
                        <Grid item xs={12} lg={6} sx={{ height: '100%' }}>
                            <Chart options={logTimesheetOnRedmineChartOptions(labels)} type="pie" series={data.logTime} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            {logTimesheetOnRedmineColorsChart.map((item, index) => (
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
                        <Grid item xs={12} lg={12}>
                            <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: '600' }}>
                                <FormattedMessage id="logtime-ratio-chart" />
                            </Typography>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

export default LogTimesheetOnRedmineCard;
