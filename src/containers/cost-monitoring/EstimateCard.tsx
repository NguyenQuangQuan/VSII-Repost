// third-party
import Chart from 'react-apexcharts';
import { FormattedMessage, useIntl } from 'react-intl';

// material-ui
import { Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'components/cards/MainCard';
import SkeletonSummaryCard from 'components/cards/Skeleton/SummaryCard';
import { estimatedCostChartOption } from 'pages/cost-monitoring/Config';
import { gridSpacing } from 'store/constant';
import { IWeeklyCostMonitoring, IWeeklyCostMonitoringList } from 'types';
import { formatPrice } from 'utils/common';
import { getNumberOfWeek } from 'utils/date';

// =========================|| ESTIMADED COST CHART CARD ||========================= //

interface IEstimateCardProps {
    data: IWeeklyCostMonitoringList;
    isLoading: boolean;
    year: string | number;
    week: string | number;
}

const EstimateCard = ({ data, isLoading, week }: IEstimateCardProps) => {
    const theme = useTheme();
    const intl = useIntl();
    const newData = [...data.weeklyCostMonitoringList].reverse();
    const labels = newData && newData.map((item) => item.week.substring(0, 7));
    const colors = ['#4272df', '#e72b2b'];
    const series = [
        {
            name: `${intl.formatMessage({ id: 'cost-vnd' })}`,
            data: newData.map((value) => value.estimatedCode)
        },
        {
            name: `${intl.formatMessage({ id: 'effort' })}`,
            data: newData.map((value) => value.effort)
        }
    ];

    const titles = series.map((item) => item.name);

    return (
        <>
            {isLoading ? (
                <SkeletonSummaryCard />
            ) : (
                <MainCard sx={{ marginBottom: theme.spacing(gridSpacing) }} title={<FormattedMessage id="cost-statistics" />}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={5}>
                            <Table aria-label="simple table" size="small" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <FormattedMessage id="weeks" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <FormattedMessage id="estimated-cost" />
                                        </TableCell>
                                        <TableCell align="right">
                                            <FormattedMessage id="effort" />
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.weeklyCostMonitoringList.map((item: IWeeklyCostMonitoring, key) => {
                                        return (
                                            <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell>{`${item.week}`}</TableCell>
                                                <TableCell align="right">{formatPrice(item.estimatedCode)}</TableCell>
                                                <TableCell align="right">{formatPrice(item.effort)}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item xs={12} lg={7}>
                            <Chart options={estimatedCostChartOption(labels, colors, titles)} series={series} type="bar" height={450} />
                            <Stack direction="row" alignItems="center" justifyContent="center">
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    <FormattedMessage id="estimated-chart" />
                                    {getNumberOfWeek(week)}
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

export default EstimateCard;
