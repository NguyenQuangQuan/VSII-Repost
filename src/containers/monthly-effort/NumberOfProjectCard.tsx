// third-party
import Chart from 'react-apexcharts';
import { FormattedMessage } from 'react-intl';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';
import SkeletonSummaryCard from 'components/cards/Skeleton/SummaryCard';
import { gridSpacing } from 'store/constant';
import { INumberOfProject } from 'types';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
    numberOfProjectChartPRDOptions,
    numberOfProjectChartRDCOptions,
    numberOfProjectChartSCSOptions,
    numberOfProjectColorsChart
} from 'pages/monthly-effort/Config';

// =========================|| NUMBER OF PROJECT CHART CARD ||========================= //

interface INumberOfProjectCardProps {
    data: INumberOfProject;
    isLoading: boolean;
}

const NumberOfProjectCard = ({ data, isLoading }: INumberOfProjectCardProps) => {
    const theme = useTheme();
    return (
        <>
            {isLoading ? (
                <SkeletonSummaryCard />
            ) : (
                <MainCard sx={{ marginBottom: theme.spacing(gridSpacing) }} title={<FormattedMessage id="number-of-projects" />}>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                        <Grid item xs={12} lg={4}>
                            <Chart
                                options={numberOfProjectChartPRDOptions}
                                series={[{ name: 'Number of projects', data: data.prd }]}
                                type="bar"
                                height={350}
                            />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Chart
                                options={numberOfProjectChartRDCOptions}
                                series={[{ name: 'Number of projects', data: data.rdc }]}
                                type="bar"
                                height={350}
                            />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Chart
                                options={numberOfProjectChartSCSOptions}
                                series={[{ name: 'Number of projects', data: data.scs }]}
                                type="bar"
                                height={350}
                            />
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <Grid container>
                                {numberOfProjectColorsChart.map((item, index: number) => (
                                    <Grid item xs={12} lg={3} key={index}>
                                        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
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
                </MainCard>
            )}
        </>
    );
};

export default NumberOfProjectCard;
