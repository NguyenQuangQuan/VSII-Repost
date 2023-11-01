import { FormattedMessage, useIntl } from 'react-intl';

// third-party
import Chart from 'react-apexcharts';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Grid,
    Typography,
    List,
    ListItem,
    ListItemText,
    Stack,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';
import SkeletonSummaryCard from 'components/cards/Skeleton/SummaryCard';
import { gridSpacing } from 'store/constant';
import { IEffortStatistics, IMonthlyCost } from 'types';
import { formatPrice } from 'utils/common';
import { costStatisticsChartOption } from 'pages/cost-monitoring/Config';

// =========================|| EFFORT STATISTIC CHART CARD ||========================= //

// Render effort list by monthlyCost
const Effort = ({ efforts, year }: { efforts: IMonthlyCost[]; year: number | string }) => {
    const monthReversed = [...efforts].reverse();
    return (
        <>
            {monthReversed.map((effort: IMonthlyCost, index) => (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={index}>
                    {effort.actualCosts !== null && effort.accumulatedEffort !== null && (
                        <>
                            <TableCell>
                                <FormattedMessage id={effort.type} />-{`${year && year.toString().slice(-2)}`}
                            </TableCell>
                            <TableCell align="right">{formatPrice(effort.actualCosts)}</TableCell>
                            <TableCell align="right">{formatPrice(effort.accumulatedEffort)}</TableCell>
                        </>
                    )}
                </TableRow>
            ))}
        </>
    );
};

// Render total effort
const TotalEffort = ({ label, value, color }: { label: string; value: number; color?: string }) => {
    return (
        <ListItem secondaryAction={<Typography sx={{ color }}>{formatPrice(value)}</Typography>}>
            <ListItemText sx={{ '& .MuiTypography-root': { color } }}>
                <FormattedMessage id={label} />
            </ListItemText>
        </ListItem>
    );
};

interface IEffortStatisticCardProps {
    data: IEffortStatistics;
    isLoading: boolean;
    year: string | number;
}

const EffortStatisticCard = ({ data, isLoading, year }: IEffortStatisticCardProps) => {
    const theme = useTheme();
    const intl = useIntl();
    const labels = data.cost && data.cost.monthlyCost.map((item) => `${intl.formatMessage({ id: item.type })}`);
    const colors = ['#df6842', '#3EEE64', '#067603'];
    const actualCosts = data.cost && data.cost.monthlyCost.map((item) => item.actualCosts).filter((cost) => cost !== null);
    const accumulatedEffort = data.cost && data.cost.monthlyCost.map((item) => item.accumulatedEffort);
    const effortQuota = [...Array(actualCosts.length)].map((_, i) => data.effortQuota);
    const series = [
        { name: intl.formatMessage({ id: 'effort_chart' }), type: 'column', data: actualCosts },
        { name: intl.formatMessage({ id: 'accumulated-effort' }), type: 'line', data: accumulatedEffort },
        { name: intl.formatMessage({ id: 'effort-quota' }), type: 'line', data: effortQuota }
    ];

    /**
     *  Khi "remaining cost" âm thì hiển thị màu đỏ
     *  Ngược lại nếu "remaining cost" dương và lớn hơn 10% "cost limit" thì hiển thị màu xanh dương
     *  Nếu nhỏ hơn 10% "cost limit" thì hiển thị màu hồng
     */
    const remainingEffort = data.remainingCost < 0 ? '#F20F0F' : data.remainingCost > (data.effortQuota * 10) / 100 ? '#3163D4' : '#DB7093';

    return (
        <>
            {isLoading ? (
                <SkeletonSummaryCard />
            ) : (
                <MainCard sx={{ marginBottom: theme.spacing(gridSpacing) }} title={<FormattedMessage id="statistic-effort" />}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={5}>
                            <List
                                sx={{
                                    '& .MuiTypography-body1': {
                                        fontWeight: '700 !important'
                                    }
                                }}
                            >
                                <TotalEffort label="effort-quota" value={data.effortQuota} />
                                <TotalEffort label="actual-effort" value={data.actualCost} />
                                <TotalEffort label="remaining-effort" value={data.remainingCost} color={remainingEffort} />
                            </List>
                            <TableContainer sx={{ maxHeight: 300 }}>
                                <Table aria-label="simple table" size="small" stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <FormattedMessage id="time" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <FormattedMessage id="actual-effort" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <FormattedMessage id="accumulated-effort" />
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <Effort efforts={data.cost.monthlyCost} year={year} />
                                        {data.cost.previousQuota && (
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell>{`${data.cost.previousQuota?.type}`}</TableCell>
                                                <TableCell align="right">{formatPrice(data.cost.previousQuota?.actualCosts)}</TableCell>
                                                <TableCell align="right">
                                                    {formatPrice(data.cost.previousQuota?.accumulatedEffort)}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} lg={7}>
                            <Chart options={costStatisticsChartOption(labels, colors)} series={series} type="line" height={450} />
                            <Stack direction="row" alignItems="center" justifyContent="center">
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    <FormattedMessage id="effort-chart" />
                                    {year}
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

export default EffortStatisticCard;
