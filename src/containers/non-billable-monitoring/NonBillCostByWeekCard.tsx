// third-party
import Chart from 'react-apexcharts';
import { FormattedMessage, useIntl } from 'react-intl';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';
import SkeletonSummaryCard from 'components/cards/Skeleton/SummaryCard';
import { gridSpacing } from 'store/constant';
import { INonBillByWeek, INonBillByWeekList } from 'types';
import { formatPrice } from 'utils/common';
import { nonBillCostByWeekChartOption } from 'pages/non-billable-monitoring/Config';

// =========================|| NonBill Cost By Week Card ||========================= //

interface INonBillCostByWeekCardProps {
    data: INonBillByWeekList;
    isLoading: boolean;
    year: string | number;
}

const NonBillCostByWeekCard = ({ data, isLoading, year }: INonBillCostByWeekCardProps) => {
    const theme = useTheme();
    const intl = useIntl();
    const newData = [...data.nonbillByWeekList].reverse();
    const labels = newData && newData.map((item) => item.week.substring(0, 7));
    const colors = ['#4272df'];
    const series = [
        {
            name: `${intl.formatMessage({ id: 'budget-by-week' })}`,
            data: newData.map((value) => value.budgetByWeek)
        }
    ];

    return (
        <>
            {isLoading ? (
                <SkeletonSummaryCard />
            ) : (
                <MainCard sx={{ marginBottom: theme.spacing(gridSpacing) }} title={<FormattedMessage id="NBM-ratio" />}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={5}>
                            <TableContainer sx={{ maxHeight: 300 }}>
                                <Table aria-label="simple table" size="small" stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <FormattedMessage id="weeks" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <FormattedMessage id="budget-by-week" />
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.nonbillByWeekList.map((item: INonBillByWeek, key) => {
                                            return (
                                                <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell>{`${item.week}`}</TableCell>
                                                    <TableCell align="right">{formatPrice(item.budgetByWeek)}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} lg={7}>
                            <Chart options={nonBillCostByWeekChartOption(labels, colors)} series={series} type="bar" height={450} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

export default NonBillCostByWeekCard;
