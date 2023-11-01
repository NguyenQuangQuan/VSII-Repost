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
import { ICostStatistics, IMonthlyCost } from 'types';
import { formatPrice } from 'utils/common';
import { FormattedMessage, useIntl } from 'react-intl';
import { costStatisticsChartOption } from 'pages/cost-monitoring/Config';

// =========================|| COST STATISTIC CHART CARD ||========================= //

interface ICostStatisticCardProps {
    data: ICostStatistics;
    isLoading: boolean;
    year: string | number;
}

// Render cost list by monthlyCost/yearCost
const Cost = ({ costs, year }: { costs: IMonthlyCost[]; year: number | string }) => {
    const monthReversed = [...costs].reverse();

    return (
        <>
            {monthReversed.map((cost: IMonthlyCost, index) => (
                <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, '& td': { color: cost.temporary ? '#FCC804' : 'inherit' } }}
                    key={index}
                >
                    {cost.actualCosts !== null && cost.accumulatedCosts !== null && (
                        <>
                            <TableCell>
                                <FormattedMessage id={cost.type} />-{`${year.toString().slice(-2)}`}
                            </TableCell>
                            <TableCell align="right">{formatPrice(cost.actualCosts)}</TableCell>
                            <TableCell align="right">{formatPrice(cost.accumulatedCosts)}</TableCell>
                        </>
                    )}
                </TableRow>
            ))}
        </>
    );
};

// Render total cost
const TotalCost = ({ label, value, color }: { label: string; value: number; color?: string }) => {
    return (
        <ListItem secondaryAction={<Typography sx={{ color }}>{formatPrice(value)}</Typography>}>
            <ListItemText sx={{ '& .MuiTypography-root': { color } }}>
                <FormattedMessage id={label} />
            </ListItemText>
        </ListItem>
    );
};

const CostStatisticCard = ({ data, isLoading, year }: ICostStatisticCardProps) => {
    const theme = useTheme();
    const intl = useIntl();
    const labels = data.cost && data.cost.monthlyCost.map((item) => `${intl.formatMessage({ id: item.type })}`);
    const colors = ['#4272df', '#ee863e', '#f2210f'];
    const actualCosts = data.cost && data.cost.monthlyCost.map((item) => item.actualCosts).filter((cost) => cost !== null);
    const accumulatedCosts = data.cost && data.cost.monthlyCost.map((item) => item.accumulatedCosts);
    const costLimit = [...Array(actualCosts.length)].map((_, i) =>
        data.costLimit !== 0 && accumulatedCosts.length ? data.costLimit : data.contractSize
    );

    /**
     *  Khi "remaining cost" âm thì hiển thị màu đỏ
     *  Ngược lại nếu "remaining cost" dương và lớn hơn 10% "cost limit" thì hiển thị màu xanh dương
     *  Nếu nhỏ hơn 10% "cost limit" thì hiển thị màu hồng
     */
    const remainingCostColor =
        data.remainingCost < 0 ? '#F20F0F' : data.remainingCost > (data.costLimit * 10) / 100 ? '#3163D4' : '#DB7093';

    const series = [
        {
            name: `${intl.formatMessage({ id: 'actual-cost' })}`,
            data: actualCosts,
            type: 'column'
        },
        {
            name: `${intl.formatMessage({ id: 'accumulated-cost' })}`,
            data: accumulatedCosts,
            type: 'line'
        },
        {
            name: `${intl.formatMessage({ id: 'cost-limit' })}`,
            data: costLimit,
            type: 'line'
        }
    ];

    return (
        <>
            {isLoading ? (
                <SkeletonSummaryCard />
            ) : (
                <MainCard sx={{ marginBottom: theme.spacing(gridSpacing) }} title={<FormattedMessage id="cost-statistics" />}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={5}>
                            <List
                                sx={{
                                    '& .MuiTypography-body1': {
                                        fontWeight: '700 !important'
                                    }
                                }}
                            >
                                <TotalCost label="contract-size" value={data.contractSize} color="#3163D4" />
                                <TotalCost label="license" value={data.licenseAmt} />
                                <TotalCost label="cost-limit" value={data.costLimit} />
                                <TotalCost label="actual-cost" value={data.actualCost} />
                                <TotalCost label="remaining-cost" value={data.remainingCost} color={remainingCostColor} />
                            </List>
                            <TableContainer sx={{ maxHeight: 250 }}>
                                <Table aria-label="simple table" size="small" stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <FormattedMessage id="time" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <FormattedMessage id="actual-cost" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <FormattedMessage id="accumulated-cost" />
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <Cost costs={data.cost.monthlyCost} year={year} />
                                        {data.cost.previousQuota && (
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell>{`${data.cost.previousQuota?.type}`}</TableCell>
                                                <TableCell align="right">{formatPrice(data.cost.previousQuota?.actualCosts)}</TableCell>
                                                <TableCell align="right">
                                                    {formatPrice(data.cost.previousQuota?.accumulatedCosts)}
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
                                    <FormattedMessage id="cost-chart" />
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

export default CostStatisticCard;
